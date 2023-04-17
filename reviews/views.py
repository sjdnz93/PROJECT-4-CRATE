from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import ReviewSerializer
from .models import Review

from lib.exceptions import exceptions

# Create your views here.

class ReviewListView(APIView):
    
    @exceptions
    def post(self, request):
        
        print('POST REVIEW', request.data)

        sighting_to_create = ReviewSerializer(data=request.data)
        
        sighting_to_create.is_valid(raise_exception=True)
        sighting_to_create.save()
        print('CONTENT', sighting_to_create)
        return Response(sighting_to_create.data, status.HTTP_201_CREATED)
    
class DetailReviewListView(APIView):
    @exceptions
    def delete(self, request, id):
      print('DETAIL ROUTE HIT')

      review = Review.objects.get(id=id)
      review.delete()

      return Response(status=status.HTTP_204_NO_CONTENT)
