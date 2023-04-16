from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

import jwt
from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.conf import settings

from .serializers.common import UserSerializer, UserCollection
from .serializers.populated import PopulatedUserSerializer

from records.models import Record
from records.serializers.common import RecordSerializer

from lib.exceptions import exceptions

User = get_user_model()

# Create your views here.
class RegisterView(APIView):
    
    #Register Route
    #Endpoint: /api/auth/register/

    @exceptions
    def post(self, request):
        print('REQUEST DATA =>', request.data)
        new_user = UserSerializer(data=request.data)
        new_user.is_valid(raise_exception=True)
        new_user.save()
        return Response(new_user.data, status.HTTP_201_CREATED)
    

class LoginView(APIView):
    
    #Login Route
    #Endpoint: /api/auth/login/
    @exceptions
    def post(self, request):
        print('LOGIN ROUTE HIT')
        email = request.data['email']
        password = request.data['password']
        user_to_login = User.objects.get(email=email)

        if not user_to_login.check_password(password):
          print('PASSWORDS DO NOT MATCH')
          raise PermissionDenied('Unauthorized')
        
        print('USER TO LOGIN ID', user_to_login.id)
        dt = datetime.now() + timedelta(days=2)
        exp = int(dt.strftime('%s'))
        print(exp)
        
        token = jwt.encode({ 'sub': user_to_login.id, 'exp': exp }, settings.SECRET_KEY, algorithm='HS256')
        print('TOKEN', token)
        
        return Response({ 'message': f'Welcome back, {user_to_login}', 'token': token })
    
class ProfileView(APIView):
    
    @exceptions
    def get(self, request, id):
        print('PROFILE ROUTE HIT')
        print('USER ID =>', id)
        user = User.objects.get(id=id)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data)
    

class AddRecordToCollectionView(APIView):
    

    @exceptions
    def put(self, request, id1, id2):
        
        #Retrieve both the user profile and the record
        user = User.objects.get(id=id1)
        record = Record.objects.get(id=id2)
        
        #Serialize record instance and save to variable
        serialized_record = RecordSerializer(record)

        #Save record data to variable
        to_add = serialized_record.data

        #Serialize User instance and save to variable
        serialized_user = UserCollection(user)

        #Save User data to variable
        to_update = serialized_user.data

        #Append the Record ID to the User Collection
        to_update['collection'].append(to_add['id'])

        #Update/Validate/Save and return User with updated collection field
        final = UserCollection(user, to_update, partial=True)

        final.is_valid(raise_exception=True)
        final.save()

        return Response(final.data)
    
