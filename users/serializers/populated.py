from .common import UserSerializer
from records.serializers.common import RecordSerializer
from reviews.serializers.common import ReviewSerializer

class PopulatedUserSerializer(UserSerializer):
    collection = RecordSerializer(many=True)
    wishlist = RecordSerializer(many=True)
    following = UserSerializer(many=True)
    reviews = ReviewSerializer(many=True, default=0)

