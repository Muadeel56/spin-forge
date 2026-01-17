from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from posts.models import Post, Comment
from profiles.models import Profile
import random

User = get_user_model()


class Command(BaseCommand):
    help = 'Seed the database with sample data for development'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing posts and comments before seeding',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing posts and comments...')
            Comment.objects.all().delete()
            Post.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Cleared successfully'))

        self.stdout.write('Creating sample users and profiles...')
        users_data = [
            {
                'username': 'tabletennis_pro',
                'email': 'alex@example.com',
                'display_name': 'Alex Chen',
                'bio': 'Advanced player with 10 years of experience. Love teaching beginners!',
                'playing_level': 'Advanced',
                'forehand': 9,
                'backhand': 8,
                'serve': 9,
                'footwork': 8,
            },
            {
                'username': 'spin_king',
                'email': 'mike@example.com',
                'display_name': 'Mike Johnson',
                'bio': 'Intermediate player focused on improving backhand technique.',
                'playing_level': 'Intermediate',
                'forehand': 6,
                'backhand': 5,
                'serve': 6,
                'footwork': 6,
            },
            {
                'username': 'pingpong_master',
                'email': 'sarah@example.com',
                'display_name': 'Sarah Kim',
                'bio': 'Tournament player and coach. Here to help the community grow!',
                'playing_level': 'Advanced',
                'forehand': 9,
                'backhand': 9,
                'serve': 8,
                'footwork': 9,
            },
            {
                'username': 'racket_warrior',
                'email': 'emma@example.com',
                'display_name': 'Emma Davis',
                'bio': 'Just started playing table tennis. Excited to learn!',
                'playing_level': 'Beginner',
                'forehand': 3,
                'backhand': 2,
                'serve': 3,
                'footwork': 3,
            },
            {
                'username': 'serve_specialist',
                'email': 'james@example.com',
                'display_name': 'James Liu',
                'bio': 'All about that serve game. Working on consistency.',
                'playing_level': 'Intermediate',
                'forehand': 6,
                'backhand': 5,
                'serve': 8,
                'footwork': 5,
            },
        ]

        users = []
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(f'  Created user: {user.username}')
            
            # Update or create profile
            profile, _ = Profile.objects.get_or_create(user=user)
            profile.display_name = user_data['display_name']
            profile.bio = user_data['bio']
            profile.playing_level = user_data['playing_level']
            profile.forehand_rating = user_data['forehand']
            profile.backhand_rating = user_data['backhand']
            profile.serve_rating = user_data['serve']
            profile.footwork_rating = user_data['footwork']
            profile.save()
            
            users.append(user)

        self.stdout.write(self.style.SUCCESS(f'Created/updated {len(users)} users'))

        # Sample posts with realistic content
        posts_data = [
            {
                'author': users[0],  # Alex Chen
                'content': 'Improved serve accuracy today! Hit 8 out of 10 serves exactly where I wanted. The practice is paying off!',
                'post_type': 'achievement',
                'related_skill': 'serve',
            },
            {
                'author': users[1],  # Mike Johnson
                'content': 'Backhand block feels weak. Any tips on improving backhand technique? I keep missing easy shots.',
                'post_type': 'struggle',
                'related_skill': 'backhand',
            },
            {
                'author': users[2],  # Sarah Kim
                'content': 'Pro tip: When practicing forehand loops, focus on brushing the ball rather than hitting it hard. Speed comes with consistency!',
                'post_type': 'tip',
                'related_skill': 'forehand',
            },
            {
                'author': users[3],  # Emma Davis
                'content': 'Won my first local club match today! So excited to keep improving. Thank you all for the encouragement!',
                'post_type': 'achievement',
                'related_skill': 'general',
            },
            {
                'author': users[2],  # Sarah Kim
                'content': 'Confused about legal serve rules. When exactly does the ball need to be visible to the opponent?',
                'post_type': 'struggle',
                'related_skill': 'serve',
            },
            {
                'author': users[4],  # James Liu
                'content': 'Remember: A good serve is about placement, not just speed. Varying spin and placement will win you more points than pure power.',
                'post_type': 'tip',
                'related_skill': 'serve',
            },
            {
                'author': users[0],  # Alex Chen
                'content': 'Just competed in my first regional tournament. Placed 3rd! The nerves were real but the experience was invaluable.',
                'post_type': 'achievement',
                'related_skill': 'general',
            },
            {
                'author': users[3],  # Emma Davis
                'content': 'Having trouble with footwork during rallies. By the time I get to the ball, I\'m off balance. How do I improve?',
                'post_type': 'struggle',
                'related_skill': 'footwork',
            },
            {
                'author': users[1],  # Mike Johnson
                'content': 'Finally mastered the pendulum serve! Took weeks of practice but now I can do it consistently with both side spins.',
                'post_type': 'achievement',
                'related_skill': 'serve',
            },
            {
                'author': users[0],  # Alex Chen
                'content': 'Footwork tip: Stay on your toes and take small steps. Big steps make it harder to adjust and maintain balance.',
                'post_type': 'tip',
                'related_skill': 'footwork',
            },
            {
                'author': users[4],  # James Liu
                'content': 'My forehand topspin keeps going into the net. I know I need to brush more, but it feels awkward. Any drills to help?',
                'post_type': 'struggle',
                'related_skill': 'forehand',
            },
            {
                'author': users[2],  # Sarah Kim
                'content': 'When receiving serves, read your opponent\'s paddle angle and contact point. These tell you the spin before the ball even reaches you!',
                'post_type': 'tip',
                'related_skill': 'general',
            },
            {
                'author': users[1],  # Mike Johnson
                'content': 'Struggled with short pushes today. They keep popping up too high, giving my opponent easy attack opportunities.',
                'post_type': 'struggle',
                'related_skill': 'backhand',
            },
            {
                'author': users[3],  # Emma Davis
                'content': 'Managed to rally 30+ shots today without missing! Two months ago I could barely hit 5 in a row. Progress!',
                'post_type': 'achievement',
                'related_skill': 'general',
            },
            {
                'author': users[4],  # James Liu
                'content': 'For consistent serving: develop a routine. Same toss height, same stance, same motion every time. Muscle memory is key!',
                'post_type': 'tip',
                'related_skill': 'serve',
            },
        ]

        self.stdout.write('Creating sample posts...')
        posts = []
        for post_data in posts_data:
            post = Post.objects.create(**post_data)
            posts.append(post)
            self.stdout.write(f'  Created post by {post.author.username}: {post.post_type}')

        self.stdout.write(self.style.SUCCESS(f'Created {len(posts)} posts'))

        # Sample comments
        comments_data = [
            {'post': posts[0], 'author': users[2], 'content': 'Great work! Keep it up!'},
            {'post': posts[0], 'author': users[4], 'content': 'Consistency is everything. Keep grinding!'},
            
            {'post': posts[1], 'author': users[0], 'content': 'Try focusing on your wrist position and follow through. Practice with a partner doing slow, controlled blocks.'},
            {'post': posts[1], 'author': users[2], 'content': 'I had the same issue! What helped me was keeping my paddle angle more closed and moving my body into the shot.'},
            
            {'post': posts[2], 'author': users[1], 'content': 'Thanks for this tip! I\'ll try it in my next practice session.'},
            {'post': posts[2], 'author': users[3], 'content': 'This is exactly what I needed to hear!'},
            
            {'post': posts[3], 'author': users[0], 'content': 'Congratulations! Winning that first match is such a great feeling.'},
            {'post': posts[3], 'author': users[2], 'content': 'Well done Emma! Keep that momentum going!'},
            
            {'post': posts[4], 'author': users[0], 'content': 'The ball must be visible at all times during the serve. You cannot hide it with your body, arm, or paddle. The ball should be thrown at least 16cm high and struck on the way down.'},
            
            {'post': posts[7], 'author': users[0], 'content': 'Try the side-to-side footwork drill. Set up cones and practice moving between them while maintaining your ready position.'},
            {'post': posts[7], 'author': users[2], 'content': 'Also, make sure you\'re anticipating the shot early. Good footwork starts with good reading of your opponent.'},
            
            {'post': posts[8], 'author': users[0], 'content': 'Nice! The pendulum serve is a game changer when you get it down.'},
            
            {'post': posts[10], 'author': users[2], 'content': 'Try the multi-ball drill focusing on brushing. Have someone feed balls and focus purely on the brushing motion, not power.'},
            {'post': posts[10], 'author': users[0], 'content': 'Your elbow should be pointing down and your wrist should snap upward at contact. Start slow and build speed gradually.'},
            
            {'post': posts[13], 'author': users[0], 'content': 'That\'s awesome progress! 30+ rally shows great consistency.'},
            {'post': posts[13], 'author': users[1], 'content': 'Impressive! Keep up the great work!'},
        ]

        self.stdout.write('Creating sample comments...')
        for comment_data in comments_data:
            Comment.objects.create(**comment_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(comments_data)} comments'))
        
        self.stdout.write(self.style.SUCCESS('\n✅ Database seeding completed successfully!'))
        self.stdout.write(self.style.WARNING(f'\nLogin credentials for all users:'))
        self.stdout.write(self.style.WARNING(f'  Password: password123'))
        self.stdout.write(self.style.WARNING(f'\nUsers created:'))
        for user in users:
            self.stdout.write(f'  - {user.username} ({user.email})')
