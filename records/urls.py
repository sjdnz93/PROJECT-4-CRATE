from django.urls import path
from .views import RecordListView, RecordDetailView

urlpatterns = [
    path('', RecordListView.as_view()),
    path('<int:id>/', RecordDetailView.as_view())

]