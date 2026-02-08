import json
from pathlib import Path
from django.core.management.base import BaseCommand
from directory.models import LandBasedProject, ServiceProvider, CapitalSource


class Command(BaseCommand):
    help = 'Load research data into the database'

    def handle(self, *args, **options):
        # Get the path to earth-care-network/research
        # This file is at: earth-care-network/backend/directory/management/commands/load_research_data.py
        # We need to go up to earth-care-network then to research
        base_path = Path(__file__).resolve().parent.parent.parent.parent.parent.parent
        research_path = base_path / 'earth-care-network' / 'research'
        
        # Load Land-Based Projects
        self.stdout.write('Loading Land-Based Projects...')
        with open(research_path / 'land-based-projects.json', 'r') as f:
            projects_data = json.load(f)
            
        for project_data in projects_data:
            contact = project_data.pop('contact', {})
            project, created = LandBasedProject.objects.update_or_create(
                name=project_data['name'],
                defaults={
                    'url': project_data['url'],
                    'category': self._map_category(project_data['category'], 'project'),
                    'location': project_data['location'],
                    'description': project_data['description'],
                    'tags': project_data.get('tags', []),
                    'is_verified': True,
                    'featured': False,
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  Created: {project.name}'))
        
        # Load Service Providers
        self.stdout.write('Loading Service Providers...')
        with open(research_path / 'service-providers.json', 'r') as f:
            providers_data = json.load(f)
            
        for provider_data in providers_data:
            contact = provider_data.pop('contact', {})
            provider, created = ServiceProvider.objects.update_or_create(
                name=provider_data['name'],
                defaults={
                    'url': provider_data['url'],
                    'category': self._map_category(provider_data['category'], 'service'),
                    'location': provider_data['location'],
                    'description': provider_data['description'],
                    'services': provider_data.get('services', []),
                    'tags': provider_data.get('tags', []),
                    'is_verified': True,
                    'featured': False,
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  Created: {provider.name}'))
        
        # Load Capital Sources
        self.stdout.write('Loading Capital Sources...')
        with open(research_path / 'capital-sources.json', 'r') as f:
            capital_data = json.load(f)
            
        for source_data in capital_data:
            contact = source_data.pop('contact', {})
            source, created = CapitalSource.objects.update_or_create(
                name=source_data['name'],
                defaults={
                    'url': source_data['url'],
                    'category': self._map_category(source_data['category'], 'capital'),
                    'location': source_data['location'],
                    'description': source_data['description'],
                    'funding_type': self._map_funding_type(source_data.get('funding_type', '')),
                    'focus_areas': source_data.get('focus_areas', []),
                    'tags': source_data.get('tags', []),
                    'is_verified': True,
                    'featured': False,
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  Created: {source.name}'))
        
        # Print summary
        self.stdout.write(self.style.SUCCESS('\n=== Summary ==='))
        self.stdout.write(f'Land-Based Projects: {LandBasedProject.objects.count()}')
        self.stdout.write(f'Service Providers: {ServiceProvider.objects.count()}')
        self.stdout.write(f'Capital Sources: {CapitalSource.objects.count()}')
        self.stdout.write(self.style.SUCCESS(f'Total Entries: {LandBasedProject.objects.count() + ServiceProvider.objects.count() + CapitalSource.objects.count()}'))
    
    def _map_category(self, category, entry_type):
        """Map research category names to model choices"""
        category_map = {
            'project': {
                'Retreat Center': 'retreat',
                'Regenerative Farm': 'farm',
                'Regenerative Farm & Resort': 'farm',
                'Educational Farm & Retreat': 'education',
                'Intentional Community': 'community',
                'Retreat Center & Educational Institute': 'retreat',
                'Educational Farm': 'education',
                'Biodynamic Farm & Educational Center': 'farm',
                'Rewilding Project': 'rewilding',
                'Regenerative Ranch': 'ranch',
                'Research & Educational Center': 'research',
                'Intentional Community & Research Center': 'community',
            },
            'service': {
                'Regenerative Design & Consulting': 'design',
                'Food Forest Design & Implementation': 'design',
                'Regenerative Building & Design': 'architecture',
                'Regenerative Development Consulting': 'design',
                'Regenerative Agriculture Consulting': 'agriculture',
                'Permaculture Design & Education': 'education',
                'Ecological Restoration & Design': 'restoration',
                'Permaculture Design & Consulting': 'design',
                'Systems Thinking & Regenerative Design Education': 'education',
                'Holistic Management Training & Consulting': 'agriculture',
                'Biomimicry Consulting & Education': 'education',
                'Regenerative Business Consulting': 'design',
                'Ecological Design & Restoration': 'restoration',
                'Regenerative Design & Engineering': 'design',
                'Holistic Land Management': 'agriculture',
                'Education & Media': 'education',
                'Ecological Architecture & Design': 'architecture',
                'Natural Building & Design': 'architecture',
                'Ecological Restoration': 'restoration',
                'Blockchain for Regenerative Agriculture': 'design',
                'Carbon Farming & Climate Solutions': 'agriculture',
                'Climate Solutions & Education': 'education',
                'Soil Health Education & Advocacy': 'education',
                'Regenerative Textiles & Systems': 'design',
                'Organic Agriculture Research & Education': 'research',
                'Regenerative Ranching & Land Management': 'agriculture',
                'Sustainable Agriculture Education': 'education',
                'Soil Carbon & Climate Solutions': 'agriculture',
                'Regenerative Agriculture Standards & Certification': 'design',
            },
            'capital': {
                'Philanthropic Funding': 'grants',
                'Impact Investment Firm': 'impact',
                'Venture Capital': 'vc',
                'Impact Investment & Loans': 'impact',
                'Local Investment Network': 'impact',
                'Conservation Grants': 'grants',
                'Corporate Philanthropy': 'grants',
                'Government Programs': 'government',
                'Farmland Investment': 'impact',
                'Impact Investment Fund': 'impact',
                'Community Development Finance': 'impact',
                'Research Grants': 'grants',
                'Land Restoration Fund': 'grants',
                'Agricultural Grants': 'grants',
                'Philanthropic Grants': 'grants',
                'Impact Investment & Philanthropy': 'impact',
                'Research Grants': 'grants',
                'Community-Based Grants': 'grants',
                'Agricultural Lending': 'loans',
                'Philanthropic Platform': 'grants',
                'Environmental Philanthropy': 'grants',
                'Organic Agriculture Philanthropy': 'grants',
                'Environmental Grants': 'grants',
                'Farmland Financing': 'loans',
                'Regenerative Grazing Investment': 'impact',
                'Impact Investment': 'impact',
            }
        }
        return category_map.get(entry_type, {}).get(category, 'design' if entry_type == 'service' else 'farm' if entry_type == 'project' else 'grants')
    
    def _map_funding_type(self, funding_type):
        """Map research funding types to model choices"""
        funding_map = {
            'Grants': 'grants',
            'Equity Investment': 'equity',
            'Venture Capital': 'equity',
            'Loans': 'debt',
            'Loans, Grants, Investment': 'mixed',
            'Local Investment, Loans': 'debt',
            'Government Grants & Cost-Share': 'government',
            'Farmland Financing': 'debt',
            'Private Equity': 'equity',
            'Grants & Impact Investment': 'mixed',
            'Research Grants': 'grants',
            'Grants & Donor-Advised Funds': 'grants',
            'Loans & Financing': 'debt',
            'Investment': 'equity',
            'Impact Investment': 'equity',
        }
        return funding_map.get(funding_type, 'grants')
