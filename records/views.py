from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import RecordSerializer
from .models import Record

from lib.exceptions import exceptions

# Create your views here.

class RecordListView(APIView):
    
    #GET ALL RECORDS
    #endpoint: /api/records/
    def get(self, request):
        print('GET RECORDS ENDPOINT HIT')

        records = Record.objects.all()
        serialized_records = RecordSerializer(records, many=True)
        return Response(serialized_records.data)
    
    #POST NEW RECORD
    #endpoint: /api/records/
    @exceptions
    def post(self, request):
        print('POST RECORD ROUTE HIT')
        print('REQUEST DATA =>', request.data)
        record = RecordSerializer(data=request.data)
        record.is_valid(raise_exception=True)
        record.save()
        return Response(record.data, status.HTTP_201_CREATED)
    



    
class RecordDetailView(APIView):
    
    #GET A SPECIFIC RECORD
    #endpoint: /api/records/:id
    @exceptions
    def get(self, request, id):
        print('GET SINGLE RECORD WORKING')    

        record = Record.objects.get(id=id)
        serialized_record = RecordSerializer(record)
        return Response(serialized_record.data)
    
    #DELETE RECORD
    #endpoint: /api/records/:id

    def delete(self, request, id):
        record = Record.objects.get(id=id)
        record.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
