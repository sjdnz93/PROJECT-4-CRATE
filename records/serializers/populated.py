from .common import RecordSerializer
from reviews.serializers.common import ReviewSerializer

class PopulatedRecordSerializer(RecordSerializer):
    reviews = ReviewSerializer(many=True)