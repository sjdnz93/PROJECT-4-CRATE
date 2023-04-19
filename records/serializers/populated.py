from .common import RecordSerializer
from reviews.serializers.common import ReviewSerializer
from reviews.serializers.populated import PopulatedReviewSerializer

class PopulatedRecordSerializer(RecordSerializer):
    reviews = PopulatedReviewSerializer(many=True)