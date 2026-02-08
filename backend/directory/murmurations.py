"""
Murmurations Protocol Integration
Generates Murmurations-compatible JSON profiles for directory entries.
https://murmurations.network/
"""
from django.conf import settings


def generate_project_profile(project):
    """Generate Murmurations profile for a land-based project."""
    profile_url = f"{settings.SITE_URL}/murmurations/projects/{project.id}.json"
    
    return {
        "linked_schemas": [
            "organizations_schema-v1.0.0",
            "offers_wants_schema-v0.1.0"
        ],
        "name": project.name,
        "nickname": project.name,
        "primary_url": project.url,
        "description": project.description,
        "geolocation": {
            "name": project.location
        },
        "tags": project.tags,
        "urls": [project.url] if project.url else [],
        "profile_url": profile_url,
        "status": "active",
        "last_updated": int(project.updated_at.timestamp()),
        # Earth Care Network specific
        "ecn_category": "land-based-project",
        "ecn_project_category": project.category,
        "ecn_verified": project.is_verified,
        "ecn_featured": project.featured,
    }


def generate_service_profile(provider):
    """Generate Murmurations profile for a service provider."""
    profile_url = f"{settings.SITE_URL}/murmurations/services/{provider.id}.json"
    
    return {
        "linked_schemas": [
            "organizations_schema-v1.0.0",
            "offers_wants_schema-v0.1.0"
        ],
        "name": provider.name,
        "nickname": provider.name,
        "primary_url": provider.url,
        "description": provider.description,
        "geolocation": {
            "name": provider.location
        },
        "tags": provider.tags,
        "urls": [provider.url] if provider.url else [],
        "profile_url": profile_url,
        "status": "active",
        "last_updated": int(provider.updated_at.timestamp()),
        # Earth Care Network specific
        "ecn_category": "service-provider",
        "ecn_service_category": provider.category,
        "ecn_services": provider.services,
        "ecn_verified": provider.is_verified,
        "ecn_featured": provider.featured,
    }


def generate_capital_profile(source):
    """Generate Murmurations profile for a capital source."""
    profile_url = f"{settings.SITE_URL}/murmurations/capital/{source.id}.json"
    
    return {
        "linked_schemas": [
            "organizations_schema-v1.0.0"
        ],
        "name": source.name,
        "nickname": source.name,
        "primary_url": source.url,
        "description": source.description,
        "geolocation": {
            "name": source.location
        },
        "tags": source.tags,
        "urls": [source.url] if source.url else [],
        "profile_url": profile_url,
        "status": "active",
        "last_updated": int(source.updated_at.timestamp()),
        # Earth Care Network specific
        "ecn_category": "capital-source",
        "ecn_capital_category": source.category,
        "ecn_funding_type": source.funding_type,
        "ecn_focus_areas": source.focus_areas,
        "ecn_funding_range": source.funding_range if hasattr(source, 'funding_range') else None,
        "ecn_verified": source.is_verified,
        "ecn_featured": source.featured,
    }
