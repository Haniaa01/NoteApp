from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', getRoutes, name='routes'),
    path('notes/', getNotes, name='notes'),
    #path('notes/create', createNote, name="create-note"),
    #path('notes/<str:pk>/update', updateNote, name='update-note'),
    #path('notes/<str:pk>/delete', deleteNote, name='delete-note'),
    path('notes/<str:pk>/', getNote, name='note'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Add more patterns if needed
]
