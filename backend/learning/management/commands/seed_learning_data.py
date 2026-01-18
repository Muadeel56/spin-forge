"""
Management command to seed learning content data.
"""
from django.core.management.base import BaseCommand
from learning.models import Sport, Rule, Technique, LearningSection, LearningTopic


class Command(BaseCommand):
    help = 'Seed learning content with sample data from the original static files'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to seed learning content...'))
        
        # Create or get Table Tennis sport
        sport, created = Sport.objects.get_or_create(
            name='Table Tennis',
            defaults={'slug': 'table-tennis'}
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created sport: {sport.name}'))
        
        # Seed some sample rules
        self.seed_sample_rules(sport)
        
        # Seed learning sections and topics
        self.seed_learning_content()
        
        self.stdout.write(self.style.SUCCESS('Seeding completed successfully!'))

    def seed_sample_rules(self, sport):
        """Create sample rules from the original content."""
        self.stdout.write('Seeding rules...')
        
        rules_data = [
            {
                'rule_id': 'ball-toss-height',
                'title': 'Ball Toss Height',
                'description': 'The ball must be tossed at least 6 inches (16cm) vertically from an open palm.',
                'category': 'serving',
                'priority': 10,
                'legal_text': 'Toss the ball straight up at least 6 inches high from your open, flat palm.',
                'legal_details': 'Hold the ball in your open palm, toss it vertically upward at least 16cm (roughly the height of a water bottle), and hit it as it falls.',
                'illegal_text': 'Tossing the ball less than 6 inches, or throwing it from your fingers.',
                'illegal_details': 'Short tosses (less than 6 inches), tossing from a closed hand, or throwing the ball forward/backward instead of straight up.',
                'why_this_rule': 'This ensures fairness by giving the receiver time to see the serve and react. A proper toss prevents deceptive or hidden serves.',
                'is_myth': False,
            },
            {
                'rule_id': 'visible-ball',
                'title': 'Visible Ball Requirement',
                'description': 'The ball must be visible to your opponent at all times during the serve.',
                'category': 'serving',
                'priority': 9,
                'legal_text': 'Keep your body, arm, and clothing away from the ball during the entire serve motion.',
                'legal_details': 'Stand to the side so your opponent can clearly see the ball from the toss through contact. The ball should never be hidden behind your body or arm.',
                'illegal_text': 'Hiding the ball behind your body, arm, or clothing at any point during the serve.',
                'illegal_details': 'Serving from behind your body, using your arm to block the view, or positioning yourself so the ball passes through a hidden zone.',
                'why_this_rule': 'Visibility ensures fair play by allowing your opponent to read the spin and speed of the serve. Hidden serves give an unfair advantage.',
                'is_myth': False,
            },
            {
                'rule_id': 'myth-edge-ball-out',
                'title': 'MYTH: "If it hits the edge, it\'s out"',
                'description': 'FALSE! Edge balls that hit the TOP edge are completely legal and in play.',
                'category': 'myth',
                'priority': 8,
                'legal_text': 'Edge balls that hit the TOP surface of the table edge are 100% legal and in play.',
                'legal_details': 'If the ball makes contact with the top playing surface (including the very edge), it\'s good. You\'ll hear a distinctive high-pitched sound.',
                'illegal_text': 'Only SIDE hits (below the top surface) are out. Vertical side hits do not count.',
                'illegal_details': 'If the ball hits the vertical side panel beneath the top edge, that is out of play.',
                'why_this_rule': 'The TOP edge is part of the playing surface by rule. This confuses many beginners who think all edge balls are out.',
                'is_myth': True,
            },
        ]
        
        for rule_data in rules_data:
            rule, created = Rule.objects.get_or_create(
                sport=sport,
                rule_id=rule_data['rule_id'],
                defaults=rule_data
            )
            if created:
                self.stdout.write(f'Created rule: {rule.title}')

    def seed_learning_content(self):
        """Create sample learning sections and topics."""
        self.stdout.write('Seeding learning content...')
        
        # Getting Started Section
        section1, created = LearningSection.objects.get_or_create(
            section_id='getting-started',
            defaults={
                'title': 'Getting Started',
                'description': 'Essential knowledge for table tennis beginners. Learn the basics of the sport, equipment, and how to begin your journey.',
                'icon': '🎯',
                'color': 'primary',
                'priority': 1,
            }
        )
        if created:
            self.stdout.write(f'Created section: {section1.title}')
        
        # Topics for Getting Started
        topics_1 = [
            {
                'topic_id': 'what-is-table-tennis',
                'title': 'What is Table Tennis?',
                'description': 'An introduction to the sport of table tennis, its history, and why it\'s a great game to learn.',
                'content': 'Table tennis, also known as ping-pong, is a fast-paced racquet sport played on a table divided by a net. Players use small paddles to hit a lightweight ball back and forth across the net.\n\nThe game can be played as singles (one player per side) or doubles (two players per side). Points are scored when your opponent fails to return the ball within the rules.\n\nTable tennis is one of the most popular sports in the world, with over 300 million active players. It\'s an excellent sport for developing hand-eye coordination, reflexes, and strategic thinking.',
                'key_tips': [
                    'Table tennis is played on a 9ft × 5ft table with a 6-inch net',
                    'The ball must bounce once on your side before you hit it',
                    'Points are scored when the ball isn\'t returned legally',
                    'Games are typically played to 11 points, best of 5 or 7 games'
                ],
                'common_mistakes': [
                    'Not understanding the basic rules before playing',
                    'Using incorrect equipment for your skill level',
                    'Skipping warm-up and basic technique practice'
                ],
                'ctas': {'practice': True, 'community': True, 'struggles': False}
            },
        ]
        
        for topic_data in topics_1:
            topic, created = LearningTopic.objects.get_or_create(
                section=section1,
                topic_id=topic_data['topic_id'],
                defaults=topic_data
            )
            if created:
                self.stdout.write(f'Created topic: {topic.title}')
        
        # Techniques Section
        section2, created = LearningSection.objects.get_or_create(
            section_id='techniques',
            defaults={
                'title': 'Core Techniques & Shots',
                'description': 'Master the fundamental strokes and techniques that form the foundation of table tennis.',
                'icon': '🏓',
                'color': 'accent',
                'priority': 2,
            }
        )
        if created:
            self.stdout.write(f'Created section: {section2.title}')
        
        # Topics for Techniques
        topics_2 = [
            {
                'topic_id': 'forehand-drive',
                'title': 'Forehand Drive',
                'description': 'The most fundamental offensive stroke in table tennis. Learn proper technique and timing.',
                'content': 'The forehand drive is your primary attacking shot. It\'s used to hit the ball with speed and control from your dominant side.\n\n**Basic Technique**\n- Stand with your feet shoulder-width apart, slightly sideways\n- Hold the paddle with a comfortable grip\n- As the ball approaches, rotate your body and bring the paddle back\n- Contact the ball at the peak of its bounce or slightly before\n- Follow through forward and upward, transferring weight to your front foot',
                'key_tips': [
                    'Start with slow, controlled drives before adding power',
                    'Focus on consistency first, then speed',
                    'Use your legs and body rotation for power',
                    'Keep your eyes on the ball throughout the stroke',
                    'Practice both cross-court and down-the-line drives'
                ],
                'common_mistakes': [
                    'Using only arm strength instead of body rotation',
                    'Hitting too hard before mastering control',
                    'Poor timing - hitting too early or too late',
                    'Not following through after contact',
                    'Standing too close or too far from the table'
                ],
                'ctas': {'practice': True, 'community': True, 'struggles': True}
            },
        ]
        
        for topic_data in topics_2:
            topic, created = LearningTopic.objects.get_or_create(
                section=section2,
                topic_id=topic_data['topic_id'],
                defaults=topic_data
            )
            if created:
                self.stdout.write(f'Created topic: {topic.title}')
        
        self.stdout.write(self.style.SUCCESS('Learning content seeded successfully'))
