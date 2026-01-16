/**
 * Learn Hub Content Structure
 * All learning content organized by sections and topics
 */

export const learnSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Essential knowledge for table tennis beginners. Learn the basics of the sport, equipment, and how to begin your journey.',
    icon: '🎯',
    color: 'primary',
    topics: [
      {
        id: 'what-is-table-tennis',
        title: 'What is Table Tennis?',
        description: "An introduction to the sport of table tennis, its history, and why it's a great game to learn.",
        content: `Table tennis, also known as ping-pong, is a fast-paced racquet sport played on a table divided by a net. Players use small paddles to hit a lightweight ball back and forth across the net.

The game can be played as singles (one player per side) or doubles (two players per side). Points are scored when your opponent fails to return the ball within the rules.

Table tennis is one of the most popular sports in the world, with over 300 million active players. It's an excellent sport for developing hand-eye coordination, reflexes, and strategic thinking.`,
        keyTips: [
          'Table tennis is played on a 9ft × 5ft table with a 6-inch net',
          'The ball must bounce once on your side before you hit it',
          'Points are scored when the ball isn\'t returned legally',
          'Games are typically played to 11 points, best of 5 or 7 games'
        ],
        commonMistakes: [
          'Not understanding the basic rules before playing',
          'Using incorrect equipment for your skill level',
          'Skipping warm-up and basic technique practice'
        ],
        relatedTopics: ['equipment-overview', 'how-matches-work'],
        ctas: {
          practice: true,
          community: true,
          struggles: false
        }
      },
      {
        id: 'equipment-overview',
        title: 'Basic Equipment Overview',
        description: 'Learn about the essential equipment you need to start playing table tennis.',
        content: `Having the right equipment is crucial for learning and enjoying table tennis. Here's what you need:

**Paddle (Racket)**
- Choose a paddle appropriate for your skill level
- Beginners should start with a pre-made paddle with good control
- As you improve, you can customize with different rubbers and blades

**Balls**
- Official balls are 40mm in diameter and weigh 2.7g
- Use 3-star balls for practice (best quality)
- Always have spare balls available

**Table and Net**
- Standard table dimensions: 9ft × 5ft × 2.5ft height
- Net height: 6 inches (15.25cm)
- Ensure proper lighting and space around the table

**Clothing and Shoes**
- Wear comfortable athletic clothing
- Non-marking court shoes with good grip
- Avoid loose clothing that might interfere with your swing`,
        keyTips: [
          'Start with a beginner-friendly paddle - you can upgrade later',
          'Invest in quality balls - they last longer and play consistently',
          'Proper shoes prevent injuries and improve movement',
          'Keep your paddle clean and protected in a case'
        ],
        commonMistakes: [
          'Buying expensive equipment before learning basics',
          'Using damaged or low-quality balls',
          'Not maintaining your paddle properly',
          'Wearing inappropriate footwear'
        ],
        relatedTopics: ['what-is-table-tennis', 'how-matches-work'],
        ctas: {
          practice: false,
          community: true,
          struggles: false
        }
      },
      {
        id: 'how-matches-work',
        title: 'How Matches Work',
        description: 'Understand the scoring system, game structure, and match format in table tennis.',
        content: `Understanding how matches work will help you enjoy playing and competing:

**Scoring System**
- Games are played to 11 points
- You must win by 2 points (e.g., 11-9, 12-10)
- Players alternate serves every 2 points
- At 10-10 (deuce), serves alternate every point

**Match Format**
- Matches are typically best of 5 or best of 7 games
- You must win the majority of games to win the match
- In tournaments, matches may be best of 3 for early rounds

**Serving Rules**
- Ball must be tossed at least 6 inches vertically
- Ball must be visible to opponent during serve
- Serve must bounce on your side, then opponent's side
- In doubles, serve must go diagonally

**Let Serves**
- If the ball touches the net but lands correctly, it's a let (replay)
- No point is awarded for a let serve`,
        keyTips: [
          'Focus on winning points, not just hitting the ball',
          'Serving is crucial - practice different serves',
          'Understand when to call a let vs. a point',
          'Keep track of the score and serve rotation'
        ],
        commonMistakes: [
          'Not understanding the 2-point lead requirement',
          'Forgetting serve rotation',
          'Incorrect serving technique',
          'Not knowing when a let should be called'
        ],
        relatedTopics: ['what-is-table-tennis', 'beginner-mindset'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'beginner-mindset',
        title: 'Beginner Mindset & Progression',
        description: 'Develop the right mindset and understand how to progress effectively as a beginner.',
        content: `Having the right mindset is essential for learning table tennis effectively:

**Patience is Key**
- Table tennis is a skill-based sport - improvement takes time
- Don't expect to master techniques immediately
- Celebrate small victories and progress

**Focus on Fundamentals**
- Master basic strokes before advanced techniques
- Consistency is more important than power
- Proper form prevents injuries and bad habits

**Practice Regularly**
- Regular practice is more effective than occasional long sessions
- Quality practice beats quantity
- Mix solo practice with partner play

**Learn from Mistakes**
- Every player makes mistakes - it's part of learning
- Analyze what went wrong and adjust
- Don't get discouraged by setbacks

**Enjoy the Process**
- Table tennis should be fun, not just competitive
- Play with players of different skill levels
- Join a club or community for support and motivation`,
        keyTips: [
          'Set realistic goals and track your progress',
          'Focus on one technique at a time',
          'Practice with purpose - have a plan for each session',
          'Watch better players and learn from them',
          'Stay positive and patient with yourself'
        ],
        commonMistakes: [
          'Trying to learn too many techniques at once',
          'Comparing yourself to advanced players too early',
          'Getting frustrated and giving up',
          'Skipping fundamentals to learn advanced moves',
          'Not practicing consistently'
        ],
        relatedTopics: ['what-is-table-tennis', 'training-tips'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      }
    ]
  },
  {
    id: 'techniques',
    title: 'Core Techniques & Shots',
    description: 'Master the fundamental strokes and techniques that form the foundation of table tennis.',
    icon: '🏓',
    color: 'accent',
    topics: [
      {
        id: 'forehand-drive',
        title: 'Forehand Drive',
        description: 'The most fundamental offensive stroke in table tennis. Learn proper technique and timing.',
        content: `The forehand drive is your primary attacking shot. It's used to hit the ball with speed and control from your dominant side.

**Basic Technique**
- Stand with your feet shoulder-width apart, slightly sideways
- Hold the paddle with a comfortable grip
- As the ball approaches, rotate your body and bring the paddle back
- Contact the ball at the peak of its bounce or slightly before
- Follow through forward and upward, transferring weight to your front foot

**Key Elements**
- Use your body rotation, not just your arm
- Keep your wrist firm but not rigid
- Contact the ball in front of your body
- Follow through naturally after contact

**When to Use**
- When the ball is on your forehand side
- For attacking shots with speed
- To control the pace of the rally
- When you have time to set up properly`,
        keyTips: [
          'Start with slow, controlled drives before adding power',
          'Focus on consistency first, then speed',
          'Use your legs and body rotation for power',
          'Keep your eyes on the ball throughout the stroke',
          'Practice both cross-court and down-the-line drives'
        ],
        commonMistakes: [
          'Using only arm strength instead of body rotation',
          'Hitting too hard before mastering control',
          'Poor timing - hitting too early or too late',
          'Not following through after contact',
          'Standing too close or too far from the table'
        ],
        relatedTopics: ['backhand-drive', 'footwork-fundamentals', 'block'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'backhand-drive',
        title: 'Backhand Drive',
        description: 'Master the backhand stroke for effective two-winged play and better court coverage.',
        content: `The backhand drive is essential for balanced play. It allows you to attack from both sides of the table.

**Basic Technique**
- Stand with your body slightly turned toward the table
- Bring the paddle across your body, elbow close to your side
- Contact the ball in front of your body, slightly to your left (for right-handers)
- Use a compact, forward motion with wrist snap
- Follow through toward your target

**Key Elements**
- Keep the stroke compact and efficient
- Use wrist action for control and spin
- Maintain good balance throughout
- Contact point is crucial - slightly in front of body

**When to Use**
- When the ball is on your backhand side
- For quick exchanges and counter-attacks
- To change the direction of play
- When you need a fast response`,
        keyTips: [
          "Practice the backhand drive regularly - it's often neglected",
          'Keep your elbow close to your body for control',
          'Use your wrist for spin and placement',
          'Develop both defensive and offensive backhand drives',
          'Work on transitioning between forehand and backhand smoothly'
        ],
        commonMistakes: [
          'Swinging too wide and losing control',
          'Not using wrist action effectively',
          'Poor positioning - too close or too far',
          'Relying only on forehand and avoiding backhand',
          'Not following through properly'
        ],
        relatedTopics: ['forehand-drive', 'footwork-fundamentals', 'block'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'push',
        title: 'Push',
        description: 'Learn the push shot for defensive play, short balls, and controlling the pace of rallies.',
        content: `The push is a defensive shot used to return short, low balls with backspin. It's essential for controlling rallies and setting up attacks.

**Basic Technique**
- Open the paddle face slightly (angled upward)
- Use a short, controlled forward motion
- Contact the ball with a brushing motion underneath
- Keep the stroke compact and close to the table
- Aim for consistency and placement over power

**Forehand Push**
- Use when the ball is on your forehand side
- Slight body rotation helps with control
- Place the ball short or long depending on strategy

**Backhand Push**
- More commonly used for short returns
- Keep the motion compact and efficient
- Excellent for returning serves and short balls

**When to Use**
- Returning short serves
- Defensive play when under pressure
- Setting up your next shot
- Controlling the pace of the rally
- Returning backspin balls`,
        keyTips: [
          'Focus on placement and consistency, not power',
          'Keep the ball low over the net',
          'Vary placement to keep opponent guessing',
          'Use push to set up your attacking shots',
          'Practice both short and long pushes'
        ],
        commonMistakes: [
          'Pushing too hard and losing control',
          'Not reading the spin correctly',
          'Poor placement - always pushing to the same spot',
          'Standing too far from the table for short pushes',
          'Not using push as a setup for attacks'
        ],
        relatedTopics: ['block', 'serve-basics', 'footwork-fundamentals'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'block',
        title: 'Block',
        description: 'Master the block shot for quick defensive returns and counter-attacking fast shots.',
        content: `The block is a defensive shot used to return fast, attacking shots with minimal backswing. It's about timing and placement.

**Basic Technique**
- Hold the paddle in front of your body, ready position
- Minimal backswing - just enough to control the ball
- Contact the ball early, right after it bounces
- Use a short, controlled forward motion
- Let the opponent's speed and spin work for you

**Forehand Block**
- Block fast shots coming to your forehand side
- Use opponent's pace to return quickly
- Can be used for counter-attacking

**Backhand Block**
- Most common blocking technique
- Quick, efficient return of fast shots
- Excellent for close-to-table play

**When to Use**
- Returning fast drives and loops
- Quick exchanges at the table
- When you don't have time for a full stroke
- Counter-attacking fast shots
- Defensive play under pressure`,
        keyTips: [
          'Keep the block simple - minimal movement',
          'Contact the ball early for better control',
          "Use the opponent's pace, don't add too much of your own",
          'Focus on placement over power',
          'Practice blocking from both sides'
        ],
        commonMistakes: [
          'Over-swinging on blocks',
          'Blocking too late and losing control',
          "Not reading the opponent's spin",
          'Standing too far from the table',
          'Trying to add too much power to blocks'
        ],
        relatedTopics: ['forehand-drive', 'backhand-drive', 'push'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'serve-basics',
        title: 'Serve Basics',
        description: 'Learn the fundamentals of serving, including legal serves and basic serve types.',
        content: `The serve is the only shot you have complete control over. A good serve can give you an immediate advantage.

**Legal Serve Requirements**
- Toss the ball at least 6 inches (15cm) vertically
- Ball must be visible to opponent throughout serve
- Ball must bounce on your side first, then opponent's side
- Serve from behind the end line
- In doubles, serve diagonally

**Basic Serve Types**

**Backspin Serve**
- Brush underneath the ball with downward motion
- Creates backspin that makes returns difficult
- Good for setting up attacks

**Topspin Serve**
- Brush upward on the ball
- Creates topspin for aggressive serves
- Can catch opponents off guard

**Sidespin Serve**
- Brush the side of the ball
- Creates curve and makes returns tricky
- Effective when combined with other spins

**No-Spin Serve**
- Contact ball with minimal spin
- Can confuse opponents expecting spin
- Good for variation`,
        keyTips: [
          "Practice consistent ball toss - it's crucial",
          'Vary your serves to keep opponents guessing',
          'Use serves to set up your next shot',
          "Learn to read opponent's serve returns",
          'Practice both short and long serves'
        ],
        commonMistakes: [
          'Illegal serves (not tossing high enough, hiding ball)',
          'Always serving the same way',
          'Not using serves strategically',
          'Poor ball toss consistency',
          'Serving too predictably'
        ],
        relatedTopics: ['push', 'forehand-drive', 'illegal-serves'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'footwork-fundamentals',
        title: 'Footwork Fundamentals',
        description: 'Develop proper footwork for better positioning, balance, and court coverage.',
        content: `Good footwork is the foundation of effective table tennis. It allows you to get into position for every shot.

**Basic Footwork Principles**
- Stay on the balls of your feet, ready to move
- Keep your weight balanced and centered
- Use small, quick steps for adjustments
- Return to ready position after each shot
- Anticipate where the ball will go

**Side-to-Side Movement**
- Use shuffle steps to move left and right
- Cross step for longer distances
- Always return to center position
- Don't cross your feet

**Forward and Backward Movement**
- Step forward for short balls
- Step back for deep shots
- Maintain balance while moving
- Use your legs to generate power

**Ready Position**
- Feet shoulder-width apart
- Slight bend in knees
- Weight on balls of feet
- Paddle in front, ready to react`,
        keyTips: [
          'Practice footwork drills regularly',
          'Focus on small, efficient movements',
          'Always return to ready position',
          'Use your legs, not just your arms',
          'Anticipate and move early'
        ],
        commonMistakes: [
          'Standing flat-footed and not ready to move',
          'Using only arm reach instead of footwork',
          'Not returning to ready position',
          'Crossing feet and losing balance',
          'Moving too late and rushing shots'
        ],
        relatedTopics: ['forehand-drive', 'backhand-drive', 'training-tips'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      }
    ]
  },
  {
    id: 'playing-styles',
    title: 'Playing Styles',
    description: 'Discover different playing styles and find the one that matches your strengths and preferences.',
    icon: '🎯',
    color: 'primary',
    topics: [
      {
        id: 'offensive-player',
        title: 'Offensive Player',
        description: 'Learn the aggressive playing style focused on attacking and winning points through power and spin.',
        content: `Offensive players focus on attacking and dictating the pace of play. They look for opportunities to hit winners and control rallies.

**Characteristics**
- Aggressive, attacking mindset
- Strong forehand and backhand drives
- Good at creating and finishing points
- Comfortable with fast-paced play
- Strong serve and return game

**Key Techniques**
- Powerful forehand and backhand loops
- Aggressive serves with spin variation
- Quick transitions from defense to attack
- Strong footwork for positioning
- Ability to finish points

**Strengths**
- Can overwhelm opponents with pace
- Creates pressure and forces errors
- Exciting, dynamic playing style
- Effective against defensive players

**Challenges**
- Requires good physical fitness
- Can be error-prone if not controlled
- Needs strong technique foundation
- May struggle against consistent defenders`,
        keyTips: [
          'Develop strong attacking shots on both wings',
          'Practice creating opportunities to attack',
          'Work on serve and return to set up attacks',
          'Learn to control power - consistency matters',
          'Develop good footwork for positioning'
        ],
        commonMistakes: [
          'Attacking every ball without strategy',
          'Using too much power and losing control',
          'Not developing defensive skills',
          'Ignoring placement in favor of power',
          'Not being patient when needed'
        ],
        relatedTopics: ['all-rounder', 'close-to-table-vs-mid-distance', 'training-tips'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'defensive-player',
        title: 'Defensive Player',
        description: 'Master the defensive style focused on consistency, placement, and forcing opponents into errors.',
        content: `Defensive players excel at consistency, placement, and forcing opponents to make mistakes. They win through patience and precision.

**Characteristics**
- Patient, consistent approach
- Excellent ball control and placement
- Strong defensive shots (chops, blocks)
- Good at reading opponents
- Ability to frustrate aggressive players

**Key Techniques**
- Consistent pushes and blocks
- Defensive chops with backspin
- Excellent placement and variation
- Strong serve return game
- Ability to counter-attack when needed

**Strengths**
- Very consistent and reliable
- Forces opponents into errors
- Effective against aggressive players
- Less physically demanding
- Can control the pace of play

**Challenges**
- May struggle against very consistent players
- Requires patience and mental strength
- Needs to develop counter-attacking ability
- Can be passive if not careful`,
        keyTips: [
          'Focus on consistency and placement',
          'Develop strong defensive shots',
          'Learn to read and anticipate opponents',
          'Practice varying placement and spin',
          'Develop counter-attacking skills for opportunities'
        ],
        commonMistakes: [
          'Being too passive and never attacking',
          'Not varying placement enough',
          'Poor footwork due to defensive mindset',
          'Not recognizing when to counter-attack',
          'Lacking offensive skills when needed'
        ],
        relatedTopics: ['all-rounder', 'close-to-table-vs-mid-distance', 'training-tips'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'all-rounder',
        title: 'All-Rounder',
        description: 'Develop a balanced playing style that combines offensive and defensive skills for versatility.',
        content: `All-rounders combine offensive and defensive skills, making them versatile and adaptable to different opponents and situations.

**Characteristics**
- Balanced offensive and defensive skills
- Adaptable to different playing styles
- Strong in all areas of the game
- Can switch between styles as needed
- Well-rounded technique

**Key Techniques**
- Strong attacking shots when needed
- Solid defensive skills
- Good serve and return variety
- Adaptable footwork
- Ability to change tactics

**Strengths**
- Versatile against any opponent
- Can adapt to different situations
- Hard to predict and counter
- Well-rounded game development
- Effective in various playing conditions

**Challenges**
- Requires more practice time
- May not excel in any one area
- Needs to develop all skills equally
- Can be indecisive about style`,
        keyTips: [
          'Develop both offensive and defensive skills',
          'Practice adapting to different situations',
          'Learn to read opponents and adjust',
          'Work on all aspects of your game',
          'Develop tactical awareness'
        ],
        commonMistakes: [
          'Not committing to developing any skill fully',
          'Being indecisive during play',
          'Trying to do everything at once',
          'Not having a go-to style when needed',
          'Neglecting certain aspects of the game'
        ],
        relatedTopics: ['offensive-player', 'defensive-player', 'close-to-table-vs-mid-distance'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'close-to-table-vs-mid-distance',
        title: 'Close-to-Table vs Mid-Distance',
        description: 'Understand the differences between playing close to the table versus mid-distance and when to use each.',
        content: `Your distance from the table significantly affects your playing style and shot selection. Understanding both positions is crucial.

**Close-to-Table Play**
- Quick exchanges and fast reactions
- Blocks, pushes, and short drives
- Less time to react
- Requires quick footwork
- Good for aggressive, fast play

**Advantages**
- Faster reaction time
- Can pressure opponents
- Good for quick counter-attacks
- Effective against slow shots
- Exciting, dynamic play

**Disadvantages**
- Less time to react
- Harder to generate power
- Vulnerable to deep shots
- Requires excellent reflexes

**Mid-Distance Play**
- More time to set up shots
- Can generate more power
- Better for loops and drives
- More space to work with
- Good for defensive play

**Advantages**
- More time to react and plan
- Can generate more power and spin
- Better court coverage
- More options for shot selection
- Good for defensive chops

**Disadvantages**
- Slower reaction time
- Vulnerable to fast, short shots
- Requires more movement
- Can be pressured by close-to-table players`,
        keyTips: [
          'Practice playing at both distances',
          'Learn when to move forward or back',
          'Develop skills for your preferred distance',
          'Understand the advantages of each position',
          'Work on transitions between distances'
        ],
        commonMistakes: [
          'Always playing at one distance',
          'Not adjusting position based on situation',
          'Poor footwork when changing distance',
          'Not understanding when each position is best',
          'Standing in the wrong position for your style'
        ],
        relatedTopics: ['offensive-player', 'defensive-player', 'footwork-fundamentals'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      }
    ]
  },
  {
    id: 'training-tips',
    title: 'Training Tips',
    description: 'Effective practice methods and training routines to improve your skills and consistency.',
    icon: '💪',
    color: 'accent',
    topics: [
      {
        id: 'solo-practice',
        title: 'Solo Practice Ideas',
        description: 'Learn how to practice effectively on your own to improve your skills without a partner.',
        content: `Solo practice is essential for developing consistency and muscle memory. Here are effective ways to practice alone:

**Wall Practice**
- Hit the ball against a wall repeatedly
- Focus on consistency and control
- Practice different strokes
- Work on timing and rhythm
- Great for developing feel

**Shadow Practice**
- Practice strokes without a ball
- Focus on technique and form
- Work on footwork patterns
- Visualize playing scenarios
- Improve muscle memory

**Serve Practice**
- Practice different serve types
- Work on consistency and placement
- Practice serve and return sequences
- Develop spin variation
- Master legal serving technique

**Ball Control Drills**
- Bounce ball on paddle (forehand/backhand)
- Practice keeping ball in play
- Work on touch and feel
- Develop paddle control
- Improve hand-eye coordination`,
        keyTips: [
          'Set specific goals for each practice session',
          'Focus on quality over quantity',
          'Practice regularly, even if briefly',
          'Use a mirror to check your form',
          'Record yourself to analyze technique'
        ],
        commonMistakes: [
          'Practicing without purpose or goals',
          'Not focusing on technique',
          'Practicing too fast and losing control',
          'Skipping solo practice entirely',
          'Not being consistent with practice'
        ],
        relatedTopics: ['partner-drills', 'consistency-training', 'warm-up-cooldown'],
        ctas: {
          practice: true,
          community: true,
          struggles: false
        }
      },
      {
        id: 'partner-drills',
        title: 'Partner Drills',
        description: 'Structured practice drills with a partner to improve specific skills and game situations.',
        content: `Partner drills are essential for developing game-specific skills and learning to handle different situations.

**Forehand-to-Forehand**
- Both players hit forehand drives
- Focus on consistency and control
- Gradually increase pace
- Work on placement
- Develop rhythm and timing

**Backhand-to-Backhand**
- Practice backhand exchanges
- Focus on control and placement
- Develop backhand consistency
- Work on quick exchanges
- Improve backhand technique

**Cross-Court Drills**
- Hit cross-court consistently
- Practice forehand and backhand
- Work on placement and control
- Develop consistency
- Improve footwork

**Serve and Return Practice**
- Practice serving and returning
- Work on different serve types
- Practice reading serves
- Develop return strategies
- Improve serve-return game

**Multi-Ball Training**
- One player feeds balls rapidly
- Other player practices specific shots
- Great for developing reflexes
- Improves consistency
- Builds muscle memory`,
        keyTips: [
          'Start slow and focus on control',
          'Gradually increase pace and difficulty',
          'Practice both sides equally',
          'Set specific goals for each drill',
          'Communicate with your partner'
        ],
        commonMistakes: [
          'Practicing too fast and losing control',
          'Not practicing both sides',
          'Skipping warm-up before drills',
          'Not having clear goals',
          'Getting frustrated and giving up'
        ],
        relatedTopics: ['solo-practice', 'consistency-training', 'warm-up-cooldown'],
        ctas: {
          practice: true,
          community: true,
          struggles: false
        }
      },
      {
        id: 'consistency-training',
        title: 'Consistency Training',
        description: 'Develop consistency through focused practice on keeping the ball in play and reducing errors.',
        content: `Consistency is the foundation of good table tennis. Being able to keep the ball in play is more important than hitting winners.

**Why Consistency Matters**
- Most points are won through opponent errors
- Consistent players are harder to beat
- Builds confidence and control
- Foundation for advanced techniques
- Reduces unforced errors

**Consistency Drills**
- Rally counting - see how many shots you can keep in play
- Target practice - hit specific areas consistently
- Slow, controlled rallies - focus on control
- Cross-court consistency - keep ball in play
- Serve return consistency - return every serve

**Building Consistency**
- Start slow and focus on control
- Gradually increase pace while maintaining control
- Practice regularly
- Focus on technique over power
- Track your progress

**Mental Aspects**
- Stay patient and focused
- Don't get frustrated by mistakes
- Celebrate small improvements
- Focus on the process, not just results
- Build confidence through consistency`,
        keyTips: [
          'Quality over quantity - focus on control',
          'Start with slow, controlled shots',
          'Gradually increase difficulty',
          'Track your consistency (count rallies)',
          'Practice regularly for best results'
        ],
        commonMistakes: [
          'Trying to hit too hard too soon',
          'Not focusing on control',
          'Getting frustrated and giving up',
          'Skipping consistency practice',
          'Not tracking progress'
        ],
        relatedTopics: ['solo-practice', 'partner-drills', 'warm-up-cooldown'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'warm-up-cooldown',
        title: 'Warm-up & Cooldown Basics',
        description: 'Learn proper warm-up and cooldown routines to prevent injuries and improve performance.',
        content: `Proper warm-up and cooldown are essential for preventing injuries and performing your best.

**Warm-Up Routine**

**General Warm-Up (5-10 minutes)**
- Light jogging or jumping jacks
- Arm circles and shoulder rotations
- Leg swings and stretches
- Light stretching of major muscle groups
- Gradually increase intensity

**Table Tennis Specific (10-15 minutes)**
- Slow rallies with partner
- Gradual increase in pace
- Practice different strokes
- Footwork drills
- Serve practice

**Why Warm-Up Matters**
- Prepares muscles for activity
- Reduces risk of injury
- Improves performance
- Increases flexibility
- Gets you mentally ready

**Cooldown Routine**

**Active Cooldown (5-10 minutes)**
- Slow, gentle rallies
- Light stretching
- Walking around
- Gradual decrease in activity
- Focus on relaxation

**Static Stretching (5-10 minutes)**
- Stretch major muscle groups
- Hold stretches for 20-30 seconds
- Focus on arms, shoulders, legs
- Don't bounce during stretches
- Breathe deeply and relax`,
        keyTips: [
          'Never skip warm-up, even for casual play',
          'Start general, then move to table tennis specific',
          'Listen to your body',
          'Take time for proper cooldown',
          'Stay hydrated throughout'
        ],
        commonMistakes: [
          'Skipping warm-up entirely',
          'Not warming up long enough',
          'Starting too intense too quickly',
          'Skipping cooldown',
          'Not stretching properly'
        ],
        relatedTopics: ['solo-practice', 'partner-drills', 'consistency-training'],
        ctas: {
          practice: true,
          community: false,
          struggles: false
        }
      }
    ]
  },
  {
    id: 'common-mistakes',
    title: 'Common Mistakes',
    description: 'Learn about frequent beginner mistakes and how to avoid them to accelerate your improvement.',
    icon: '⚠️',
    color: 'primary',
    topics: [
      {
        id: 'illegal-serves',
        title: 'Illegal Serves',
        description: 'Understand what makes a serve illegal and how to serve correctly according to the rules.',
        content: `Many beginners unknowingly serve illegally. Understanding and fixing illegal serves is crucial for fair play.

**Common Illegal Serve Violations**

**Ball Toss Issues**
- Not tossing ball high enough (must be at least 6 inches)
- Tossing ball forward or backward instead of straight up
- Not letting ball drop naturally
- Catching or hitting ball on the way up

**Ball Visibility**
- Hiding ball with body or arm
- Ball not visible to opponent during serve
- Serving from behind body
- Using clothing to hide ball

**Contact Issues**
- Ball not bouncing on server's side first
- Ball bouncing twice on server's side
- Ball not bouncing on receiver's side
- Hitting ball before it bounces

**Position Issues**
- Serving from wrong position
- Not behind end line
- Moving during serve
- Incorrect doubles serve direction

**How to Serve Legally**
- Toss ball straight up at least 6 inches
- Keep ball visible throughout serve
- Let ball bounce on your side, then opponent's
- Serve from behind end line
- Stay in position during serve`,
        keyTips: [
          "Practice your ball toss until it's consistent",
          'Have someone watch your serves',
          'Record yourself serving to check form',
          'Learn the rules thoroughly',
          'Practice legal serves regularly'
        ],
        commonMistakes: [
          'Not knowing the rules',
          'Developing bad serving habits',
          'Not practicing legal serves',
          'Getting called for illegal serves in matches',
          'Not fixing serve issues'
        ],
        relatedTopics: ['serve-basics', 'how-matches-work', 'poor-grip'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'poor-grip',
        title: 'Poor Grip',
        description: 'Learn about common grip mistakes and how to develop a proper, comfortable grip.',
        content: `Your grip is fundamental to everything in table tennis. A poor grip limits your potential and can cause injuries.

**Common Grip Mistakes**

**Gripping Too Tightly**
- Causes tension and reduces feel
- Limits wrist movement
- Reduces control and touch
- Can lead to injuries
- Makes you tired faster

**Gripping Too Loosely**
- Paddle slips during play
- Lack of control
- Inconsistent shots
- Difficulty generating power
- Paddle may fly out of hand

**Wrong Grip Type for Your Style**
- Using shakehand when penhold might suit you better
- Not adapting grip for different shots
- Using advanced grips before mastering basics
- Copying pros without understanding why

**Grip Position Issues**
- Holding paddle too high or too low
- Not adjusting for forehand vs backhand
- Inconsistent grip between shots
- Wrong angle for your playing style

**Developing a Good Grip**
- Find comfortable, natural position
- Hold firmly but not tightly
- Allow wrist movement
- Practice with different grips to find what works
- Get feedback from experienced players`,
        keyTips: [
          'Hold the paddle like shaking hands (shakehand grip)',
          'Keep grip relaxed but secure',
          'Allow wrist to move freely',
          'Practice with proper grip until it feels natural',
          'Get advice from experienced players or coaches'
        ],
        commonMistakes: [
          'Gripping too tightly',
          'Not finding a comfortable grip',
          'Changing grip too often',
          'Not seeking help with grip issues',
          'Ignoring grip problems'
        ],
        relatedTopics: ['forehand-drive', 'backhand-drive', 'bad-foot-positioning'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'bad-foot-positioning',
        title: 'Bad Foot Positioning',
        description: 'Understand how poor foot positioning affects your game and learn proper positioning techniques.',
        content: `Foot positioning affects every aspect of your game. Poor positioning limits your shots and makes you vulnerable.

**Common Foot Positioning Mistakes**

**Standing Too Close to Table**
- No room to generate power
- Rushed shots
- Vulnerable to deep balls
- Limited shot options
- Poor balance

**Standing Too Far from Table**
- Can't reach short balls
- Vulnerable to drop shots
- Too much time for opponent
- Inefficient movement
- Wasted energy

**Standing Flat-Footed**
- Slow to react
- Poor balance
- Can't move quickly
- Limited shot power
- Vulnerable to fast shots

**Poor Ready Position**
- Not balanced
- Feet too close or too far apart
- Weight on heels instead of balls of feet
- Not ready to move
- Poor body alignment

**Not Adjusting Position**
- Standing in same spot for all shots
- Not moving forward for short balls
- Not moving back for deep shots
- Poor court coverage
- Inefficient play`,
        keyTips: [
          'Stay on balls of feet, ready to move',
          'Maintain balanced, athletic stance',
          'Adjust position based on ball location',
          'Return to ready position after each shot',
          'Practice footwork drills regularly'
        ],
        commonMistakes: [
          'Standing flat-footed',
          'Not adjusting position',
          'Poor ready position',
          'Standing too close or too far',
          'Not practicing footwork'
        ],
        relatedTopics: ['footwork-fundamentals', 'overusing-power', 'training-tips'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      },
      {
        id: 'overusing-power',
        title: 'Overusing Power',
        description: 'Learn why control and placement are more important than power, especially for beginners.',
        content: `Many beginners think power is everything. However, control and placement are far more important, especially when learning.

**Why Too Much Power is Problematic**

**Loss of Control**
- Hard to keep ball in play
- High error rate
- Inconsistent shots
- Difficulty with placement
- Frustrating play

**Poor Technique Development**
- Power masks technique flaws
- Develops bad habits
- Hard to unlearn later
- Injuries from poor form
- Limited skill development

**Ineffective Against Good Players**
- Good players use your power against you
- Easy to block and counter
- Predictable play
- Wasted energy
- Poor strategy

**When Power is Appropriate**
- After mastering control
- When you have a clear opportunity
- Against weak returns
- To finish points
- As part of varied strategy

**Developing Control First**
- Focus on consistency
- Master placement
- Develop proper technique
- Build confidence
- Add power gradually`,
        keyTips: [
          'Focus on control and consistency first',
          'Master technique before adding power',
          'Placement beats power',
          'Use power strategically, not constantly',
          'Practice control drills regularly'
        ],
        commonMistakes: [
          'Trying to hit every ball hard',
          'Using power to compensate for poor technique',
          'Not developing control first',
          'Ignoring placement',
          "Getting frustrated when power doesn't work"
        ],
        relatedTopics: ['forehand-drive', 'consistency-training', 'beginner-mindset'],
        ctas: {
          practice: true,
          community: true,
          struggles: true
        }
      }
    ]
  }
];

/**
 * Helper function to get a section by ID
 */
export function getSection(sectionId) {
  return learnSections.find(section => section.id === sectionId);
}

/**
 * Helper function to get a topic by section and topic IDs
 */
export function getTopic(sectionId, topicId) {
  const section = getSection(sectionId);
  if (!section) return null;
  return section.topics.find(topic => topic.id === topicId);
}

/**
 * Helper function to get all topics in a section
 */
export function getSectionTopics(sectionId) {
  const section = getSection(sectionId);
  return section ? section.topics : [];
}

/**
 * Helper function to get next/previous topic
 */
export function getAdjacentTopics(sectionId, topicId) {
  const topics = getSectionTopics(sectionId);
  const currentIndex = topics.findIndex(t => t.id === topicId);
  
  if (currentIndex === -1) return { prev: null, next: null };
  
  return {
    prev: currentIndex > 0 ? topics[currentIndex - 1] : null,
    next: currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null
  };
}

/**
 * Helper function to get related topics
 */
export function getRelatedTopics(sectionId, topicId) {
  const topic = getTopic(sectionId, topicId);
  if (!topic || !topic.relatedTopics) return [];
  
  return topic.relatedTopics.map(relatedId => {
    // Search across all sections for related topics
    for (const section of learnSections) {
      const relatedTopic = section.topics.find(t => t.id === relatedId);
      if (relatedTopic) {
        return {
          ...relatedTopic,
          sectionId: section.id,
          sectionTitle: section.title
        };
      }
    }
    return null;
  }).filter(Boolean);
}