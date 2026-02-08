from rest_framework import serializers
from .models import LandBasedProject, ServiceProvider, CapitalSource, DirectorySubmission


class LandBasedProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandBasedProject
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'is_verified', 'featured')


class ServiceProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvider
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'is_verified', 'featured')


class CapitalSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapitalSource
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'is_verified', 'featured')


class DirectorySubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectorySubmission
        fields = '__all__'
        read_only_fields = ('status', 'admin_notes', 'created_at', 'reviewed_at')
