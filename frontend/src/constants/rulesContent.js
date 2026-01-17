/**
 * Rules & Legality Content Structure
 * Interactive table tennis rulebook with clear legal/illegal examples
 */

export const rulesSections = [
  {
    id: 'serving-rules',
    title: 'Serving Rules',
    description: 'Master the legal serve requirements and avoid common violations',
    icon: '🏓',
    color: 'primary',
    priority: 1,
    rules: [
      {
        id: 'ball-toss-height',
        title: 'Ball Toss Height',
        description: 'The ball must be tossed at least 6 inches (16cm) vertically from an open palm.',
        legal: {
          text: 'Toss the ball straight up at least 6 inches high from your open, flat palm.',
          details: 'Hold the ball in your open palm, toss it vertically upward at least 16cm (roughly the height of a water bottle), and hit it as it falls.'
        },
        illegal: {
          text: 'Tossing the ball less than 6 inches, or throwing it from your fingers.',
          details: 'Short tosses (less than 6 inches), tossing from a closed hand, or throwing the ball forward/backward instead of straight up.'
        },
        whyThisRule: 'This ensures fairness by giving the receiver time to see the serve and react. A proper toss prevents deceptive or hidden serves.',
        category: 'serving',
        relatedRules: ['visible-ball', 'open-palm']
      },
      {
        id: 'visible-ball',
        title: 'Visible Ball Requirement',
        description: 'The ball must be visible to your opponent at all times during the serve.',
        legal: {
          text: 'Keep your body, arm, and clothing away from the ball during the entire serve motion.',
          details: 'Stand to the side so your opponent can clearly see the ball from the toss through contact. The ball should never be hidden behind your body or arm.'
        },
        illegal: {
          text: 'Hiding the ball behind your body, arm, or clothing at any point during the serve.',
          details: 'Serving from behind your body, using your arm to block the view, or positioning yourself so the ball passes through a hidden zone.'
        },
        whyThisRule: 'Visibility ensures fair play by allowing your opponent to read the spin and speed of the serve. Hidden serves give an unfair advantage.',
        category: 'serving',
        relatedRules: ['ball-toss-height', 'service-position']
      },
      {
        id: 'open-palm',
        title: 'Open Palm Rule',
        description: 'The ball must rest on your open, flat palm before serving.',
        legal: {
          text: 'Place the ball on your completely flat, open palm with fingers together before tossing.',
          details: 'Your palm should be flat and open, fingers extended together (not cupped or closed), with the ball resting stationary on top.'
        },
        illegal: {
          text: 'Holding the ball in your fingers, cupping your hand, or gripping the ball.',
          details: 'Pinching the ball between fingers, holding it in a cupped hand, or having fingers curled around the ball.'
        },
        whyThisRule: 'An open palm prevents spin manipulation during the toss. Gripping the ball allows servers to add hidden spin, making the serve unfair.',
        category: 'serving',
        relatedRules: ['ball-toss-height', 'visible-ball']
      },
      {
        id: 'ball-contact-position',
        title: 'Ball Contact Position',
        description: 'You must hit the ball behind the end line and above the table surface.',
        legal: {
          text: 'Contact the ball while it is behind the end line of the table and above table height.',
          details: 'Stand behind the baseline, toss the ball up, and make contact while both you and the ball are behind the end line (not over the table).'
        },
        illegal: {
          text: 'Hitting the ball while it is over the table surface or in front of the end line.',
          details: 'Leaning forward so the ball is struck above the playing surface, or making contact after the ball has crossed the end line plane.'
        },
        whyThisRule: 'This ensures both players have equal distance to cover and prevents serves that are too close to the net, which would be unfair.',
        category: 'serving',
        relatedRules: ['service-position']
      },
      {
        id: 'service-alternation',
        title: 'Service Alternation',
        description: 'Players alternate serves every 2 points, except during deuce (10-10).',
        legal: {
          text: 'Serve 2 points, then your opponent serves 2 points. At 10-10, alternate every 1 point.',
          details: 'Player A serves points 1-2, Player B serves points 3-4, continue alternating every 2 points. At 10-10 (deuce), switch every single point.'
        },
        illegal: {
          text: 'Serving more than 2 consecutive points (except at 10-10), or forgetting to alternate.',
          details: 'Serving 3+ points in a row, or not switching serves at the right time.'
        },
        whyThisRule: 'Regular alternation ensures both players have equal opportunities to serve and receive throughout the game.',
        category: 'serving',
        relatedRules: ['deuce-rules']
      },
      {
        id: 'doubles-serve-direction',
        title: 'Doubles Serve Direction',
        description: 'In doubles, the serve must go diagonally from right court to right court.',
        legal: {
          text: 'Serve from your right side, ball bounces on your right court, then opponent\'s right court.',
          details: 'The server stands on the right side of their court, serves diagonally so the ball bounces in their right half-court, then the receiver\'s right half-court.'
        },
        illegal: {
          text: 'Serving straight ahead, or serving to the wrong half of the opponent\'s court.',
          details: 'Ball bouncing on the wrong half-court on either side, or serving from/to the left side when it should be right.'
        },
        whyThisRule: 'Diagonal serving in doubles ensures fair positioning and clear rotation between partners.',
        category: 'serving',
        relatedRules: ['service-alternation']
      }
    ]
  },
  {
    id: 'scoring-system',
    title: 'Scoring System',
    description: 'Understand how points are scored and games are won',
    icon: '🎯',
    color: 'accent',
    priority: 2,
    rules: [
      {
        id: 'eleven-point-system',
        title: '11-Point System',
        description: 'Games are played to 11 points, and you must win by 2 points.',
        legal: {
          text: 'First player to reach 11 points with at least a 2-point lead wins the game.',
          details: 'Score 11 points before your opponent, with a minimum 2-point gap. Examples: 11-9, 11-7, 11-5 are winning scores.'
        },
        illegal: {
          text: 'Claiming victory at 11-10 without the required 2-point lead.',
          details: 'Stopping play at 11-10. The game must continue until someone has a 2-point lead (12-10, 13-11, 14-12, etc.).'
        },
        whyThisRule: 'The 2-point lead ensures a clear winner and prevents games from ending on a single lucky point.',
        category: 'scoring',
        relatedRules: ['deuce-rules', 'winning-conditions']
      },
      {
        id: 'deuce-rules',
        title: 'Deuce Rules (10-10)',
        description: 'At 10-10, service alternates every point until someone wins by 2.',
        legal: {
          text: 'At 10-10, players alternate serves every single point until someone leads by 2.',
          details: 'When the score reaches 10-10 (called deuce), switch servers after every point. Play continues until one player has a 2-point lead (12-10, 13-11, 15-13, etc.).'
        },
        illegal: {
          text: 'Continuing to serve 2 points at a time after reaching 10-10.',
          details: 'Serving 2 consecutive points during deuce, or forgetting to alternate serves.'
        },
        whyThisRule: 'Single-point alternation at deuce maintains fairness when the game is close, ensuring neither player has a serving advantage.',
        category: 'scoring',
        relatedRules: ['service-alternation', 'eleven-point-system']
      },
      {
        id: 'service-change-logic',
        title: 'Service Change Logic',
        description: 'Serves switch every 2 points, regardless of who scores.',
        legal: {
          text: 'After every 2 points (total, not per player), service switches to the other player.',
          details: 'If you serve at 0-0, you serve until the score reaches 2 total points (2-0, 1-1, or 0-2). Then your opponent serves until 4 total points, and so on.'
        },
        illegal: {
          text: 'Keeping the serve until you lose a point, or switching based on who scored.',
          details: 'Thinking "I serve until I lose a rally" or "the person who scored gets to serve next."'
        },
        whyThisRule: 'Time-based rotation (every 2 points) is simpler and fairer than score-based rotation.',
        category: 'scoring',
        relatedRules: ['service-alternation']
      },
      {
        id: 'winning-conditions',
        title: 'Winning a Match',
        description: 'Win the majority of games in a best-of-5 or best-of-7 match.',
        legal: {
          text: 'Win 3 games in a best-of-5 match, or 4 games in a best-of-7 match.',
          details: 'Most matches are best-of-5 (first to win 3 games) or best-of-7 (first to win 4 games). Each game goes to 11 points.'
        },
        illegal: {
          text: 'Claiming match victory after winning just 2 games in a best-of-5.',
          details: 'Stopping play before winning the required number of games for the match format.'
        },
        whyThisRule: 'Multi-game matches test consistency and endurance, ensuring the better player wins overall.',
        category: 'scoring',
        relatedRules: ['eleven-point-system', 'match-format']
      },
      {
        id: 'point-scoring',
        title: 'How Points Are Scored',
        description: 'You score a point when your opponent fails to return the ball legally.',
        legal: {
          text: 'Score when opponent misses the table, hits the net, or commits a fault.',
          details: 'You win the point if opponent: hits ball off the table, hits net (not during serve), doesn\'t return the ball, or commits any rule violation.'
        },
        illegal: {
          text: 'Claiming a point when you committed the fault, or when the ball is still in play.',
          details: 'Calling the point when you hit it off the table, or when the opponent can still legally return it.'
        },
        whyThisRule: 'Clear point-scoring rules prevent disputes and keep the game flowing.',
        category: 'scoring',
        relatedRules: ['common-faults']
      }
    ]
  },
  {
    id: 'match-format',
    title: 'Match Format',
    description: 'Learn about match structures, side changes, and game procedures',
    icon: '📋',
    color: 'primary',
    priority: 3,
    rules: [
      {
        id: 'singles-vs-doubles',
        title: 'Singles vs Doubles',
        description: 'Understand the key differences between singles and doubles play.',
        legal: {
          text: 'Singles: 1v1, serve anywhere. Doubles: 2v2, serve diagonally, partners alternate hits.',
          details: 'Singles allows serving to any part of the opponent\'s court. Doubles requires diagonal serving and partners must take turns hitting the ball.'
        },
        illegal: {
          text: 'In doubles: serving straight ahead, or one partner hitting twice in a row.',
          details: 'Doubles players must alternate hits strictly. If A serves to B, then C must hit the next shot, then D, then A, then B, etc.'
        },
        whyThisRule: 'Different formats create variety and teamwork challenges in doubles while keeping singles straightforward.',
        category: 'format',
        relatedRules: ['doubles-serve-direction']
      },
      {
        id: 'best-of-format',
        title: 'Best of 5 / Best of 7',
        description: 'Most matches use best-of-5 or best-of-7 game formats.',
        legal: {
          text: 'Best-of-5: first to 3 games wins. Best-of-7: first to 4 games wins.',
          details: 'Recreational and club play often uses best-of-5. Professional and tournament play typically uses best-of-7. Each game is to 11 points.'
        },
        illegal: {
          text: 'Playing a different number of games than agreed upon before the match.',
          details: 'Changing the match format mid-match, or claiming victory with fewer wins than required.'
        },
        whyThisRule: 'Standardized formats ensure fair competition and allow players to prepare mentally for match length.',
        category: 'format',
        relatedRules: ['winning-conditions', 'eleven-point-system']
      },
      {
        id: 'side-changes',
        title: 'Side Changes',
        description: 'Players switch sides between games and during the final game.',
        legal: {
          text: 'Switch sides after each game. In the final game, switch when one player reaches 5 points.',
          details: 'After games 1, 2, 3, 4 (if needed), players switch ends. In the deciding game (game 5 or 7), switch sides when either player first reaches 5 points.'
        },
        illegal: {
          text: 'Not switching sides, or switching at the wrong time.',
          details: 'Staying on the same side for multiple games, or forgetting to switch at 5 points in the final game.'
        },
        whyThisRule: 'Side changes balance out any environmental factors like lighting, air currents, or floor conditions.',
        category: 'format',
        relatedRules: ['best-of-format']
      },
      {
        id: 'warmup-rules',
        title: 'Warm-up Rules',
        description: 'Players are entitled to a brief warm-up period before matches.',
        legal: {
          text: 'Take up to 2 minutes on the match table to warm up before play begins.',
          details: 'Both players can practice serves, returns, and rallies on the competition table. Keep it brief and respectful.'
        },
        illegal: {
          text: 'Taking excessive warm-up time or preventing your opponent from warming up.',
          details: 'Warming up for 10+ minutes, hogging the table during warm-up, or rushing your opponent.'
        },
        whyThisRule: 'Brief warm-ups help prevent injuries and allow players to adjust to table conditions.',
        category: 'format',
        relatedRules: []
      },
      {
        id: 'timeout-rules',
        title: 'Timeouts',
        description: 'Each player may request one timeout per match.',
        legal: {
          text: 'Call one timeout (up to 1 minute) per match during a break between points.',
          details: 'Signal to the umpire or opponent that you want a timeout. Use it for strategy, equipment issues, or rest. Only one per player per match.'
        },
        illegal: {
          text: 'Taking multiple timeouts, or calling timeout during a rally.',
          details: 'Requesting more than one timeout per match, or stopping play while the ball is in motion.'
        },
        whyThisRule: 'Limited timeouts maintain game flow while allowing brief strategic breaks.',
        category: 'format',
        relatedRules: []
      }
    ]
  },
  {
    id: 'common-faults',
    title: 'Common Faults',
    description: 'Recognize faults and violations that cost you points',
    icon: '⚠️',
    color: 'accent',
    priority: 4,
    rules: [
      {
        id: 'double-hit',
        title: 'Double Hit',
        description: 'Hitting the ball twice in succession is illegal.',
        legal: {
          text: 'Hit the ball once cleanly with your paddle. The ball can touch the paddle edge and rubber in one motion.',
          details: 'A single, continuous swing that contacts the ball once is legal, even if the ball touches both the rubber and edge simultaneously.'
        },
        illegal: {
          text: 'Hitting the ball, then hitting it again before it crosses the net or bounces.',
          details: 'Making two distinct contacts with the ball in one return, or "carrying" the ball with prolonged contact.'
        },
        whyThisRule: 'Single hits ensure the game remains about reflexes and skill, not ball manipulation.',
        category: 'fault',
        relatedRules: ['free-hand-interference']
      },
      {
        id: 'edge-ball-rules',
        title: 'Edge Ball vs Side Ball',
        description: 'Understanding when a ball on the edge is good or out.',
        legal: {
          text: 'If the ball hits the TOP edge of the table (even slightly), it is GOOD and in play.',
          details: 'Any contact with the playing surface, including the very top edge, counts as good. You can hear a distinct "edge ball" sound.'
        },
        illegal: {
          text: 'The ball hitting the SIDE of the table below the top edge is out of play.',
          details: 'If the ball strikes the vertical side panel of the table (not the top surface), it is out and the opponent wins the point.'
        },
        whyThisRule: 'The top edge is part of the playing surface, but the sides are not. This is a common source of confusion.',
        category: 'fault',
        relatedRules: [],
        mythBusting: true
      },
      {
        id: 'touching-table',
        title: 'Touching the Table',
        description: 'Moving or touching the table during play results in a point loss.',
        legal: {
          text: 'Keep your free hand and body away from the table during rallies.',
          details: 'You may lean close to the table, but don\'t touch it with your free hand, body, or clothing while the ball is in play.'
        },
        illegal: {
          text: 'Touching the table with your free hand, body, or moving the table during a rally.',
          details: 'Leaning on the table for support, accidentally bumping it, or touching the net assembly while the ball is in play.'
        },
        whyThisRule: 'Touching the table can affect the ball\'s bounce and gives an unfair advantage or distraction.',
        category: 'fault',
        relatedRules: ['free-hand-interference', 'net-touching']
      },
      {
        id: 'free-hand-interference',
        title: 'Free Hand Interference',
        description: 'Your non-paddle hand cannot touch the table or interfere with play.',
        legal: {
          text: 'Keep your free hand completely away from the table and playing surface.',
          details: 'Your non-paddle hand can be anywhere (in the air, by your side) as long as it doesn\'t touch the table or net while the ball is in play.'
        },
        illegal: {
          text: 'Placing your free hand on the table during a rally for balance or support.',
          details: 'Using your free hand to steady yourself on the table, touching the net, or having your hand on the playing surface when the ball is live.'
        },
        whyThisRule: 'Free hand contact with the table can cause vibrations or obstruction, affecting fair play.',
        category: 'fault',
        relatedRules: ['touching-table']
      },
      {
        id: 'net-touching',
        title: 'Net Touching',
        description: 'Touching the net or net assembly during play loses you the point.',
        legal: {
          text: 'Keep paddle, body, and clothing away from the net during rallies.',
          details: 'You can get close to the net, but any contact with the net, posts, or net assembly while the ball is in play results in a point loss.'
        },
        illegal: {
          text: 'Hitting the net with your paddle, body, or clothing during a rally.',
          details: 'Accidentally brushing the net with your paddle during a shot, or having your shirt touch the net while reaching for a ball.'
        },
        whyThisRule: 'Net contact can disturb the playing area and is considered a fault.',
        category: 'fault',
        relatedRules: ['touching-table']
      },
      {
        id: 'volley',
        title: 'Volleying (Hitting Before Bounce)',
        description: 'You must let the ball bounce on your side before hitting it.',
        legal: {
          text: 'Wait for the ball to bounce once on your side of the table, then hit it.',
          details: 'After your opponent hits the ball, it must bounce once on your side. Then you can hit it after it bounces (or even on the way down).'
        },
        illegal: {
          text: 'Hitting the ball before it bounces on your side of the table (volleying).',
          details: 'Intercepting the ball in mid-air before it touches your side of the table. This is called volleying and is illegal in table tennis.'
        },
        whyThisRule: 'The bounce requirement differentiates table tennis from other racquet sports and ensures consistent rally rules.',
        category: 'fault',
        relatedRules: []
      },
      {
        id: 'obstruction',
        title: 'Obstruction',
        description: 'Interfering with your opponent\'s view or play is illegal.',
        legal: {
          text: 'Stay in your own playing area and don\'t block your opponent\'s view of the ball.',
          details: 'Play from your side of the table, keep clear of your opponent\'s line of sight, and don\'t make distracting movements.'
        },
        illegal: {
          text: 'Deliberately blocking your opponent\'s view, or interfering with their ability to play.',
          details: 'Waving your arms in their line of sight, moving into their playing space, or deliberately distracting them during play.'
        },
        whyThisRule: 'Fair play requires both players have equal opportunity to see and play the ball.',
        category: 'fault',
        relatedRules: ['visible-ball']
      }
    ]
  },
  {
    id: 'myths-misconceptions',
    title: 'Myths & Misconceptions',
    description: 'Debunk common table tennis myths and clarify confusing rules',
    icon: '💡',
    color: 'primary',
    priority: 5,
    rules: [
      {
        id: 'myth-edge-ball-out',
        title: 'MYTH: "If it hits the edge, it\'s out"',
        description: 'FALSE! Edge balls that hit the TOP edge are completely legal and in play.',
        legal: {
          text: 'Edge balls that hit the TOP surface of the table edge are 100% legal and in play.',
          details: 'If the ball makes contact with the top playing surface (including the very edge), it\'s good. You\'ll hear a distinctive high-pitched sound.'
        },
        illegal: {
          text: 'Only SIDE hits (below the top surface) are out. Vertical side hits do not count.',
          details: 'If the ball hits the vertical side panel beneath the top edge, that is out of play.'
        },
        whyThisRule: 'The TOP edge is part of the playing surface by rule. This confuses many beginners who think all edge balls are out.',
        category: 'myth',
        mythBusting: true,
        relatedRules: ['edge-ball-rules']
      },
      {
        id: 'myth-hit-on-way-down',
        title: 'MYTH: "You can\'t hit the ball on the way down"',
        description: 'FALSE! You can hit the ball anytime after it bounces—up or down.',
        legal: {
          text: 'After the ball bounces on your side, you can hit it at any point: rising, peak, or falling.',
          details: 'Once the ball bounces once on your court, you have complete freedom to hit it at any height during its trajectory—even as it\'s falling or bouncing a second time on your side.'
        },
        illegal: {
          text: 'Hitting the ball BEFORE it bounces on your side (volleying), or after it bounces twice.',
          details: 'The only restrictions: you must let it bounce once first, and you can\'t hit it after it bounces twice on your side or hits the floor.'
        },
        whyThisRule: 'This myth likely comes from other racquet sports. In table tennis, timing is up to you after the required bounce.',
        category: 'myth',
        mythBusting: true,
        relatedRules: ['volley']
      },
      {
        id: 'myth-short-toss-ok',
        title: 'MYTH: "A short toss is okay in casual play"',
        description: 'FALSE! The 6-inch toss is mandatory in all levels of play.',
        legal: {
          text: 'Always toss the ball at least 6 inches high, even in recreational or casual games.',
          details: 'The 6-inch vertical toss from an open palm is a fundamental rule at ALL levels. It ensures fair and consistent serves.'
        },
        illegal: {
          text: 'Tossing less than 6 inches is illegal, even in casual play—it\'s a bad habit.',
          details: 'Short tosses, no-toss serves, or tossing from a closed hand are always illegal.'
        },
        whyThisRule: 'Developing proper serving habits from the start prevents issues in competitive play and ensures fairness.',
        category: 'myth',
        mythBusting: true,
        relatedRules: ['ball-toss-height']
      },
      {
        id: 'myth-hide-serve',
        title: 'MYTH: "Hiding my serve adds spin and is smart strategy"',
        description: 'FALSE! Hidden serves are illegal and unsportsmanlike.',
        legal: {
          text: 'Keep the ball visible to your opponent throughout the entire serve motion.',
          details: 'Stand to the side, keep your arm away, and ensure your opponent can clearly see the ball from toss to contact. Visible serves are required.'
        },
        illegal: {
          text: 'Intentionally hiding the ball with your body, arm, or paddle is illegal.',
          details: 'Using your body position or arm to block the receiver\'s view of the ball during the serve motion.'
        },
        whyThisRule: 'Hidden serves give an unfair advantage and are against the spirit of table tennis. Referees will penalize this in matches.',
        category: 'myth',
        mythBusting: true,
        relatedRules: ['visible-ball']
      },
      {
        id: 'myth-spin-determines-legality',
        title: 'MYTH: "Too much spin makes a serve illegal"',
        description: 'FALSE! Any amount of spin is legal as long as the serve mechanics are legal.',
        legal: {
          text: 'You can generate as much spin as you want with legal serve mechanics.',
          details: 'Legal serves can have extreme spin. As long as you follow the rules (6-inch toss, visible ball, open palm, behind the line), any spin is allowed.'
        },
        illegal: {
          text: 'What makes a serve illegal is HOW the spin is created, not how much spin there is.',
          details: 'Illegal serves: hidden contact point, gripping the ball during toss, tossing forward instead of up. These are what make serves illegal, not spin amount.'
        },
        whyThisRule: 'Spin is a core skill in table tennis. The rules focus on serve fairness and visibility, not limiting spin.',
        category: 'myth',
        mythBusting: true,
        relatedRules: ['open-palm', 'visible-ball']
      },
      {
        id: 'myth-let-serve-point',
        title: 'MYTH: "Too many let serves gives the point to the receiver"',
        description: 'FALSE! There is no limit on let serves—replay every time.',
        legal: {
          text: 'If the serve touches the net but lands correctly, it\'s a let. Replay the serve with no limit.',
          details: 'You can have 5, 10, or 100 let serves in a row (theoretically). Each one is simply replayed. No points are awarded or deducted.'
        },
        illegal: {
          text: 'Claiming a point after multiple let serves, or refusing to replay a let.',
          details: 'Awarding points for repeated lets, or counting a let serve as a fault.'
        },
        whyThisRule: 'Net interference during serves is not the fault of either player, so fairness requires a replay every time.',
        category: 'myth',
        mythBusting: true,
        relatedRules: []
      },
      {
        id: 'myth-rally-lets',
        title: 'MYTH: "Call a let if the ball clips the net during a rally"',
        description: 'FALSE! There are NO lets during rallies—play continues.',
        legal: {
          text: 'If the ball touches the net during a rally and goes over, play continues normally.',
          details: 'Unlike serves, net touches during rallies don\'t stop play. If the ball clips the net but still lands on the opponent\'s side, it\'s in play.'
        },
        illegal: {
          text: 'Stopping play or calling a let because the ball touched the net during a rally.',
          details: 'Let rules ONLY apply to serves. During rallies, net touches are irrelevant unless the ball fails to go over.'
        },
        whyThisRule: 'Rally lets would interrupt the flow of the game. Only serve lets exist to ensure fair serve reception.',
        category: 'myth',
        mythBusting: true,
        relatedRules: []
      }
    ]
  }
];

/**
 * Helper function to get a section by ID
 */
export function getRulesSection(sectionId) {
  return rulesSections.find(section => section.id === sectionId);
}

/**
 * Helper function to get a rule by section and rule IDs
 */
export function getRule(sectionId, ruleId) {
  const section = getRulesSection(sectionId);
  if (!section) return null;
  return section.rules.find(rule => rule.id === ruleId);
}

/**
 * Helper function to get all rules in a section
 */
export function getSectionRules(sectionId) {
  const section = getRulesSection(sectionId);
  return section ? section.rules : [];
}

/**
 * Helper function to get related rules
 */
export function getRelatedRules(sectionId, ruleId) {
  const rule = getRule(sectionId, ruleId);
  if (!rule || !rule.relatedRules) return [];
  
  const related = [];
  rule.relatedRules.forEach(relatedId => {
    // Search across all sections for related rules
    for (const section of rulesSections) {
      const relatedRule = section.rules.find(r => r.id === relatedId);
      if (relatedRule) {
        related.push({
          ...relatedRule,
          sectionId: section.id,
          sectionTitle: section.title
        });
        break;
      }
    }
  });
  
  return related;
}

/**
 * Helper function to get all myths
 */
export function getAllMyths() {
  const myths = [];
  rulesSections.forEach(section => {
    section.rules.forEach(rule => {
      if (rule.mythBusting) {
        myths.push({
          ...rule,
          sectionId: section.id,
          sectionTitle: section.title
        });
      }
    });
  });
  return myths;
}
