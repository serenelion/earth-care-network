from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LandBasedProjectViewSet,
    ServiceProviderViewSet,
    CapitalSourceViewSet,
    DirectorySubmissionViewSet,
    murmurations_project_profile,
    murmurations_service_profile,
    murmurations_capital_profile
)

router = DefaultRouter()
router.register(r'projects', LandBasedProjectViewSet, basename='project')
router.register(r'services', ServiceProviderViewSet, basename='service')
router.register(r'capital', CapitalSourceViewSet, basename='capital')
router.register(r'submissions', DirectorySubmissionViewSet, basename='submission')

urlpatterns = [
    path('', include(router.urls)),
    # Murmurations Protocol endpoints
    path('murmurations/projects/<int:project_id>.json', murmurations_project_profile, name='murmurations-project'),
    path('murmurations/services/<int:service_id>.json', murmurations_service_profile, name='murmurations-service'),
    path('murmurations/capital/<int:capital_id>.json', murmurations_capital_profile, name='murmurations-capital'),
]
