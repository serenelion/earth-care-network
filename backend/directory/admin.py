from django.contrib import admin
from .models import LandBasedProject, ServiceProvider, CapitalSource, DirectorySubmission


@admin.register(LandBasedProject)
class LandBasedProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'location', 'is_verified', 'featured', 'created_at')
    list_filter = ('category', 'is_verified', 'featured', 'tags')
    search_fields = ('name', 'description', 'location')
    list_editable = ('is_verified', 'featured')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'url', 'location', 'description')
        }),
        ('Details', {
            'fields': ('size_acres', 'tags')
        }),
        ('Contact', {
            'fields': ('contact_email', 'contact_phone')
        }),
        ('Status', {
            'fields': ('is_verified', 'featured', 'created_at', 'updated_at')
        }),
    )


@admin.register(ServiceProvider)
class ServiceProviderAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'location', 'is_verified', 'featured', 'created_at')
    list_filter = ('category', 'is_verified', 'featured', 'tags')
    search_fields = ('name', 'description', 'location', 'services')
    list_editable = ('is_verified', 'featured')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'url', 'location', 'description')
        }),
        ('Services', {
            'fields': ('services', 'service_area', 'tags')
        }),
        ('Contact', {
            'fields': ('contact_email', 'contact_phone')
        }),
        ('Status', {
            'fields': ('is_verified', 'featured', 'created_at', 'updated_at')
        }),
    )


@admin.register(CapitalSource)
class CapitalSourceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'funding_type', 'location', 'is_verified', 'featured', 'created_at')
    list_filter = ('category', 'funding_type', 'is_verified', 'featured', 'tags')
    search_fields = ('name', 'description', 'location', 'focus_areas')
    list_editable = ('is_verified', 'featured')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'url', 'location', 'description')
        }),
        ('Funding Details', {
            'fields': ('funding_type', 'focus_areas', 'typical_investment_range', 'application_url', 'tags')
        }),
        ('Contact', {
            'fields': ('contact_email',)
        }),
        ('Status', {
            'fields': ('is_verified', 'featured', 'created_at', 'updated_at')
        }),
    )


@admin.register(DirectorySubmission)
class DirectorySubmissionAdmin(admin.ModelAdmin):
    list_display = ('entry_type', 'status', 'submitter_email', 'created_at', 'reviewed_at')
    list_filter = ('entry_type', 'status', 'created_at')
    search_fields = ('submitter_email', 'data', 'submitter_notes')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Submission', {
            'fields': ('entry_type', 'status', 'data', 'submitter_email', 'submitter_notes')
        }),
        ('Review', {
            'fields': ('admin_notes', 'reviewed_at')
        }),
        ('Metadata', {
            'fields': ('created_at',)
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if change and obj.status in ['approved', 'rejected']:
            from django.utils import timezone
            if not obj.reviewed_at:
                obj.reviewed_at = timezone.now()
        super().save_model(request, obj, form, change)
