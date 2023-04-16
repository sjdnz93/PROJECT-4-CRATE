from .common import UserSerializer
from records.serializers.common import RecordSerializer

class PopulatedUserSerializer(UserSerializer):
    collection = RecordSerializer(many=True)
    wishlist = RecordSerializer(many=True)

