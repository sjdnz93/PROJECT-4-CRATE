from django.urls import path
from .views import RegisterView, LoginView, ProfileView, AddRecordToCollectionView, AddRecordToWishlistView, RemoveRecordFromCollection, RemoveRecordFromWishlist, FollowUser

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('<int:id>/', ProfileView.as_view()),
    path('<int:id1>/collection/<int:id2>/', AddRecordToCollectionView.as_view()),
    path('<int:id1>/wishlist/<int:id2>/', AddRecordToWishlistView.as_view()),
    path('<int:id1>/delete-collection/<int:id2>/', RemoveRecordFromCollection.as_view()),
    path('<int:id1>/delete-wishlist/<int:id2>/', RemoveRecordFromWishlist.as_view()),
    path('<int:id1>/follow/<int:id2>/', FollowUser.as_view())
]