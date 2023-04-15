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
    



    
class RecordDetailView(APIView):
    
    #GET A SPECIFIC RECORD
    #endpoint: /api/records/:id

    @exceptions
    def get(self, request, id):
        print('GET SINGLE RECORD WORKING')    

        record = Record.objects.get(id=id)
        serialized_record = RecordSerializer(record)
        return Response(serialized_record.data)