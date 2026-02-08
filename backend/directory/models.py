from django.db import models


class BaseDirectoryEntry(models.Model):
    """Abstract base class for all directory entries"""
    name = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField()
    location = models.CharField(max_length=255)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    
    class Meta:
        abstract = True
        ordering = ['-featured', '-created_at']
    
    def __str__(self):
        return self.name


class LandBasedProject(BaseDirectoryEntry):
    """Land-based regenerative projects: farms, retreats, communities"""
    CATEGORY_CHOICES = [
        ('farm', 'Regenerative Farm'),
        ('retreat', 'Retreat Center'),
        ('community', 'Intentional Community'),
        ('research', 'Research Center'),
        ('education', 'Educational Center'),
        ('rewilding', 'Rewilding Project'),
        ('ranch', 'Regenerative Ranch'),
    ]
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=50, blank=True, null=True)
    size_acres = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    class Meta:
        verbose_name = "Land-Based Project"
        verbose_name_plural = "Land-Based Projects"


class ServiceProvider(BaseDirectoryEntry):
    """Regenerative service providers: consultants, designers, implementers"""
    CATEGORY_CHOICES = [
        ('design', 'Design & Consulting'),
        ('implementation', 'Implementation'),
        ('education', 'Education & Training'),
        ('research', 'Research'),
        ('restoration', 'Ecological Restoration'),
        ('architecture', 'Regenerative Architecture'),
        ('agriculture', 'Agriculture Consulting'),
    ]
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    services = models.JSONField(default=list, blank=True)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=50, blank=True, null=True)
    service_area = models.CharField(max_length=255, blank=True, help_text="Geographic service area")
    
    class Meta:
        verbose_name = "Service Provider"
        verbose_name_plural = "Service Providers"


class CapitalSource(BaseDirectoryEntry):
    """Conscious capital sources: grants, investors, funds"""
    CATEGORY_CHOICES = [
        ('grants', 'Grants & Philanthropy'),
        ('vc', 'Venture Capital'),
        ('impact', 'Impact Investment'),
        ('loans', 'Loans & Financing'),
        ('government', 'Government Programs'),
        ('crowdfunding', 'Crowdfunding'),
    ]
    
    FUNDING_TYPE_CHOICES = [
        ('grants', 'Grants'),
        ('equity', 'Equity Investment'),
        ('debt', 'Loans/Debt'),
        ('mixed', 'Mixed Funding'),
        ('government', 'Government Programs'),
    ]
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    funding_type = models.CharField(max_length=50, choices=FUNDING_TYPE_CHOICES)
    focus_areas = models.JSONField(default=list, blank=True)
    typical_investment_range = models.CharField(max_length=100, blank=True)
    application_url = models.URLField(blank=True)
    contact_email = models.EmailField(blank=True, null=True)
    
    class Meta:
        verbose_name = "Capital Source"
        verbose_name_plural = "Capital Sources"


class DirectorySubmission(models.Model):
    """User-submitted entries pending review"""
    ENTRY_TYPE_CHOICES = [
        ('project', 'Land-Based Project'),
        ('service', 'Service Provider'),
        ('capital', 'Capital Source'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    entry_type = models.CharField(max_length=20, choices=ENTRY_TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    data = models.JSONField()
    submitter_email = models.EmailField()
    submitter_notes = models.TextField(blank=True)
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.entry_type} submission - {self.status}"
