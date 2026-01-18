"""
Management command to migrate static learning content from JavaScript files to database.
"""
import json
import re
from django.core.management.base import BaseCommand
from learning.models import Sport, Rule, Technique, LearningSection, LearningTopic


class Command(BaseCommand):
    help = 'Migrate static learning content from frontend JavaScript files to database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--rules-file',
            type=str,
            default='frontend/src/constants/rulesContent.js',
            help='Path to rules content JavaScript file'
        )
        parser.add_argument(
            '--learn-file',
            type=str,
            default='frontend/src/constants/learnContent.js',
            help='Path to learn content JavaScript file'
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting migration of static content...'))
        
        # Create or get Table Tennis sport
        sport, created = Sport.objects.get_or_create(
            name='Table Tennis',
            defaults={'slug': 'table-tennis'}
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created sport: {sport.name}'))
        else:
            self.stdout.write(f'Sport already exists: {sport.name}')
        
        # Migrate rules
        rules_file = options['rules_file']
        self.migrate_rules(rules_file, sport)
        
        # Migrate learning content
        learn_file = options['learn_file']
        self.migrate_learning_content(learn_file)
        
        self.stdout.write(self.style.SUCCESS('Migration completed successfully!'))

    def parse_js_file(self, file_path):
        """Parse JavaScript file and extract JSON-like data."""
        try:
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Extract the main array/object
            # Find the export statement
            match = re.search(r'export\s+const\s+\w+\s*=\s*(\[[\s\S]*?\]);', content)
            if not match:
                self.stdout.write(self.style.ERROR(f'Could not parse {file_path}'))
                return None
            
            js_data = match.group(1)
            
            # Convert JavaScript to JSON
            # Replace single quotes with double quotes
            js_data = re.sub(r"'", '"', js_data)
            # Remove trailing commas
            js_data = re.sub(r',(\s*[}\]])', r'\1', js_data)
            # Remove comments
            js_data = re.sub(r'//.*$', '', js_data, flags=re.MULTILINE)
            
            return json.loads(js_data)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
            return None
        except json.JSONDecodeError as e:
            self.stdout.write(self.style.ERROR(f'JSON decode error: {e}'))
            return None

    def migrate_rules(self, file_path, sport):
        """Migrate rules from JavaScript to database."""
        self.stdout.write('Migrating rules...')
        
        data = self.parse_js_file(file_path)
        if not data:
            return
        
        rules_created = 0
        
        # Map to store created rules for relationships
        rules_map = {}
        
        # First pass: create all rules without relationships
        for section in data:
            section_id = section.get('id')
            section_title = section.get('title')
            priority = section.get('priority', 0)
            
            for rule_data in section.get('rules', []):
                rule_id = rule_data.get('id')
                
                # Skip if already exists
                if Rule.objects.filter(rule_id=rule_id).exists():
                    self.stdout.write(f'Rule already exists: {rule_id}')
                    rules_map[rule_id] = Rule.objects.get(rule_id=rule_id)
                    continue
                
                rule = Rule.objects.create(
                    sport=sport,
                    rule_id=rule_id,
                    title=rule_data.get('title', ''),
                    description=rule_data.get('description', ''),
                    is_legal=True,  # Default, adjust if needed
                    difficulty_level='beginner',  # Default
                    legal_text=rule_data.get('legal', {}).get('text', ''),
                    legal_details=rule_data.get('legal', {}).get('details', ''),
                    illegal_text=rule_data.get('illegal', {}).get('text', ''),
                    illegal_details=rule_data.get('illegal', {}).get('details', ''),
                    why_this_rule=rule_data.get('whyThisRule', ''),
                    category=rule_data.get('category', 'fault'),
                    is_myth=rule_data.get('mythBusting', False),
                    priority=priority
                )
                rules_map[rule_id] = rule
                rules_created += 1
                self.stdout.write(f'Created rule: {rule_id}')
        
        # Second pass: add relationships
        for section in data:
            for rule_data in section.get('rules', []):
                rule_id = rule_data.get('id')
                rule = rules_map.get(rule_id)
                
                if rule:
                    related_ids = rule_data.get('relatedRules', [])
                    for related_id in related_ids:
                        related_rule = rules_map.get(related_id)
                        if related_rule:
                            rule.related_rules.add(related_rule)
        
        self.stdout.write(self.style.SUCCESS(f'Created {rules_created} rules'))

    def migrate_learning_content(self, file_path):
        """Migrate learning sections and topics from JavaScript to database."""
        self.stdout.write('Migrating learning content...')
        
        data = self.parse_js_file(file_path)
        if not data:
            return
        
        sections_created = 0
        topics_created = 0
        
        # Map to store created topics for relationships
        topics_map = {}
        
        # First pass: create sections and topics without relationships
        for section_data in data:
            section_id = section_data.get('id')
            
            # Create or get section
            section, created = LearningSection.objects.get_or_create(
                section_id=section_id,
                defaults={
                    'title': section_data.get('title', ''),
                    'description': section_data.get('description', ''),
                    'icon': section_data.get('icon', '📚'),
                    'color': section_data.get('color', 'primary'),
                    'priority': section_data.get('priority', 0) if 'priority' in section_data else sections_created
                }
            )
            
            if created:
                sections_created += 1
                self.stdout.write(f'Created section: {section_id}')
            else:
                self.stdout.write(f'Section already exists: {section_id}')
            
            # Create topics
            for topic_data in section_data.get('topics', []):
                topic_id = topic_data.get('id')
                
                # Skip if already exists
                if LearningTopic.objects.filter(topic_id=topic_id).exists():
                    self.stdout.write(f'Topic already exists: {topic_id}')
                    topics_map[topic_id] = LearningTopic.objects.get(topic_id=topic_id)
                    continue
                
                topic = LearningTopic.objects.create(
                    section=section,
                    topic_id=topic_id,
                    title=topic_data.get('title', ''),
                    description=topic_data.get('description', ''),
                    content=topic_data.get('content', ''),
                    key_tips=topic_data.get('keyTips', []),
                    common_mistakes=topic_data.get('commonMistakes', []),
                    ctas=topic_data.get('ctas', {})
                )
                topics_map[topic_id] = topic
                topics_created += 1
                self.stdout.write(f'Created topic: {topic_id}')
        
        # Second pass: add relationships
        for section_data in data:
            for topic_data in section_data.get('topics', []):
                topic_id = topic_data.get('id')
                topic = topics_map.get(topic_id)
                
                if topic:
                    related_ids = topic_data.get('relatedTopics', [])
                    for related_id in related_ids:
                        related_topic = topics_map.get(related_id)
                        if related_topic:
                            topic.related_topics.add(related_topic)
        
        self.stdout.write(self.style.SUCCESS(
            f'Created {sections_created} sections and {topics_created} topics'
        ))
