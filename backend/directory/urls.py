from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LandBasedProjectViewSet,
    ServiceProviderViewSet,
    CapitalSourceViewSet,
    DirectorySubmissionViewSet
)

router = DefaultRouter()
router.register(r'projects', LandBasedProjectViewSet, basename='project')
router.register(r'services', ServiceProviderViewSet, basename='service')
router.register(r'capital', CapitalSourceViewSet, basename='capital')
router.register(r'submissions', DirectorySubmissionViewSet, basename='submission')

urlpatterns = [
    path('', include(router.urls)),
]
