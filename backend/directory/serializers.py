from rest_framework import serializers
from .models import LandBasedProject, ServiceProvider, CapitalSource, DirectorySubmission, Sponsor


class LandBasedProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandBasedProject
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'is_verified', 'claimed_by', 'claimed_at')


class ServiceProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvider
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'is_verified', 'claimed_by', 'claimed_at')


class CapitalSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapitalSource
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'is_verified', 'claimed_by', 'claimed_at')


class DirectorySubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectorySubmission
        fields = '__all__'
        read_only_fields = ('created_at', 'reviewed_at', 'admin_notes', 'status')


class SponsorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = '__all__'
        read_only_fields = ('joined_at', 'status')


class ClaimEnterpriseSerializer(serializers.Serializer):
    """Serializer for claiming an enterprise"""
    email = serializers.EmailField()
    verification_code = serializers.CharField(max_length=100, required=False)
    message = serializers.CharField(max_length=500, required=False)
