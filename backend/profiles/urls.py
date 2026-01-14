from django.urls import path
from .views import ProfileRetrieveUpdateView, PublicProfileView

app_name = 'profiles'

urlpatterns = [
    path('me/', ProfileRetrieveUpdateView.as_view(), name='profile-me'),
    path('<str:username>/', PublicProfileView.as_view(), name='profile-public'),
]
