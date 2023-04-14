from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import UserSerializer


from lib.exceptions import exceptions

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