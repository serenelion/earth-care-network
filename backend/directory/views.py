from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from .models import LandBasedProject, ServiceProvider, CapitalSource, DirectorySubmission, Sponsor
from .serializers import (
    LandBasedProjectSerializer,
    ServiceProviderSerializer,
    CapitalSourceSerializer,
    DirectorySubmissionSerializer,
    SponsorSerializer,
    ClaimEnterpriseSerializer
)
from .murmurations import (
    generate_project_profile,
    generate_service_profile,
    generate_capital_profile
)


class LandBasedProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for land-based projects.
    Supports filtering by category and search.
    """
    queryset = LandBasedProject.objects.filter(is_verified=True)
    serializer_class = LandBasedProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured']
    search_fields = ['name', 'description', 'location', 'address']
    ordering_fields = ['created_at', 'name', 'featured']
    ordering = ['-featured', '-created_at']
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Return available categories"""
        categories = LandBasedProject.CATEGORY_CHOICES
        return Response([{'value': c[0], 'label': c[1]} for c in categories])
    
    @action(detail=False, methods=['get'])
    def tags(self, request):
        """Return all unique tags"""
        tags = set()
        for project in LandBasedProject.objects.all():
            tags.update(project.tags)
        return Response(sorted(list(tags)))
    
    @action(detail=True, methods=['post'])
    def claim(self, request, pk=None):
        """Claim an enterprise"""
        project = self.get_object()
        serializer = ClaimEnterpriseSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        email_domain = email.split('@')[1] if '@' in email else ''
        enterprise_domain = project.get_domain_from_url()
        
        if project.claimed_by:
            return Response({
                'error': 'This enterprise has already been claimed',
                'claimed_by': project.claimed_by
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not enterprise_domain or email_domain != enterprise_domain:
            return Response({
                'error': f'Email domain must match enterprise domain: {enterprise_domain}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # In a real app, send verification email here
        project.claimed_by = email
        project.claimed_at = timezone.now()
        project.save()
        
        return Response({
            'success': True,
            'message': 'Enterprise claimed successfully',
            'claimed_by': email,
            'claimed_at': project.claimed_at
        })


class ServiceProviderViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for service providers.
    Supports filtering by category and search.
    """
    queryset = ServiceProvider.objects.filter(is_verified=True)
    serializer_class = ServiceProviderSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured']
    search_fields = ['name', 'description', 'location', 'address']
    ordering_fields = ['created_at', 'name', 'featured']
    ordering = ['-featured', '-created_at']
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Return available categories"""
        categories = ServiceProvider.CATEGORY_CHOICES
        return Response([{'value': c[0], 'label': c[1]} for c in categories])
    
    @action(detail=False, methods=['get'])
    def services(self, request):
        """Return all unique services"""
        services = set()
        for provider in ServiceProvider.objects.all():
            services.update(provider.services)
        return Response(sorted(list(services)))
    
    @action(detail=False, methods=['get'])
    def tags(self, request):
        """Return all unique tags"""
        tags = set()
        for provider in ServiceProvider.objects.all():
            tags.update(provider.tags)
        return Response(sorted(list(tags)))
    
    @action(detail=True, methods=['post'])
    def claim(self, request, pk=None):
        """Claim an enterprise"""
        provider = self.get_object()
        serializer = ClaimEnterpriseSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        email_domain = email.split('@')[1] if '@' in email else ''
        enterprise_domain = provider.get_domain_from_url()
        
        if provider.claimed_by:
            return Response({
                'error': 'This enterprise has already been claimed',
                'claimed_by': provider.claimed_by
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not enterprise_domain or email_domain != enterprise_domain:
            return Response({
                'error': f'Email domain must match enterprise domain: {enterprise_domain}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        provider.claimed_by = email
        provider.claimed_at = timezone.now()
        provider.save()
        
        return Response({
            'success': True,
            'message': 'Enterprise claimed successfully',
            'claimed_by': email,
            'claimed_at': provider.claimed_at
        })


class CapitalSourceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for capital sources.
    Supports filtering by category, funding type, and search.
    """
    queryset = CapitalSource.objects.filter(is_verified=True)
    serializer_class = CapitalSourceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'funding_type', 'featured']
    search_fields = ['name', 'description', 'location', 'address']
    ordering_fields = ['created_at', 'name', 'featured']
    ordering = ['-featured', '-created_at']
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Return available categories"""
        categories = CapitalSource.CATEGORY_CHOICES
        return Response([{'value': c[0], 'label': c[1]} for c in categories])
    
    @action(detail=False, methods=['get'])
    def funding_types(self, request):
        """Return available funding types"""
        funding_types = CapitalSource.FUNDING_TYPE_CHOICES
        return Response([{'value': f[0], 'label': f[1]} for f in funding_types])
    
    @action(detail=False, methods=['get'])
    def focus_areas(self, request):
        """Return all unique focus areas"""
        focus_areas = set()
        for source in CapitalSource.objects.all():
            focus_areas.update(source.focus_areas)
        return Response(sorted(list(focus_areas)))
    
    @action(detail=False, methods=['get'])
    def tags(self, request):
        """Return all unique tags"""
        tags = set()
        for source in CapitalSource.objects.all():
            tags.update(source.tags)
        return Response(sorted(list(tags)))
    
    @action(detail=True, methods=['post'])
    def claim(self, request, pk=None):
        """Claim an enterprise"""
        capital = self.get_object()
        serializer = ClaimEnterpriseSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        email_domain = email.split('@')[1] if '@' in email else ''
        enterprise_domain = capital.get_domain_from_url()
        
        if capital.claimed_by:
            return Response({
                'error': 'This enterprise has already been claimed',
                'claimed_by': capital.claimed_by
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not enterprise_domain or email_domain != enterprise_domain:
            return Response({
                'error': f'Email domain must match enterprise domain: {enterprise_domain}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        capital.claimed_by = email
        capital.claimed_at = timezone.now()
        capital.save()
        
        return Response({
            'success': True,
            'message': 'Enterprise claimed successfully',
            'claimed_by': email,
            'claimed_at': capital.claimed_at
        })


class DirectorySubmissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for directory submissions.
    Allows users to submit new entries for review.
    """
    queryset = DirectorySubmission.objects.all()
    serializer_class = DirectorySubmissionSerializer
    http_method_names = ['get', 'post']
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return DirectorySubmission.objects.all()
        return DirectorySubmission.objects.none()


class SponsorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for sponsors.
    """
    queryset = Sponsor.objects.filter(status='active')
    serializer_class = SponsorSerializer
    ordering = ['-featured', 'tier', 'joined_at']
    
    @action(detail=False, methods=['post'])
    def apply(self, request):
        """Submit sponsor application"""
        serializer = SponsorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(status='pending')
            return Response({
                'success': True,
                'message': 'Sponsor application submitted successfully'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Murmurations Protocol Views
def murmurations_project_profile(request, project_id):
    """Return Murmurations-compatible JSON profile for a project."""
    project = get_object_or_404(LandBasedProject, pk=project_id, is_verified=True)
    profile = generate_project_profile(project)
    return JsonResponse(profile, json_dumps_params={'indent': 2})


def murmurations_service_profile(request, service_id):
    """Return Murmurations-compatible JSON profile for a service provider."""
    service = get_object_or_404(ServiceProvider, pk=service_id, is_verified=True)
    profile = generate_service_profile(service)
    return JsonResponse(profile, json_dumps_params={'indent': 2})


def murmurations_capital_profile(request, capital_id):
    """Return Murmurations-compatible JSON profile for a capital source."""
    capital = get_object_or_404(CapitalSource, pk=capital_id, is_verified=True)
    profile = generate_capital_profile(capital)
    return JsonResponse(profile, json_dumps_params={'indent': 2})
