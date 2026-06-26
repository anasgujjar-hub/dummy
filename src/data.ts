import { Product, BlogPost } from './types';

export const productsData: Product[] = [
  {
    id: 'whole_milk',
    name: 'Whole Milk',
    category: 'Milk',
    description: 'Fresh and full-bodied milk with a naturally creamy taste, ideal for drinking, cereals, and daily cooking.',
    popularItems: 'Whole Milk, Toned Milk, Skim Milk',
    price: 3.49,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600',
    unit: '1 Gallon',
    sizes: ['500ml Canister', '1 Liter Bottle', '1 Gallon Jug'],
    specs: {
      protein: '8g per serving',
      calcium: '30% DV',
      fat: '3.25% whole fat',
      energy: '150 kcal'
    }
  },
  {
    id: 'greek_yogurt',
    name: 'Greek Yogurt',
    category: 'Yogurt',
    description: 'Thick, protein-rich yogurt with a velvety texture, perfect for breakfast bowls, smoothies, or healthy snacks.',
    popularItems: 'Plain Yogurt, Greek Yogurt, Fruit Yogurt',
    price: 4.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    unit: '32 oz',
    sizes: ['150g Cup', '500g Tub', '1kg Family Pack'],
    specs: {
      protein: '15g per serving',
      calcium: '15% DV',
      fat: '0% or 2% options',
      energy: '120 kcal'
    }
  },
  {
    id: 'farmhouse_cheese',
    name: 'Farmhouse Cheese',
    category: 'Cheese',
    description: 'A mild, creamy cheese that works beautifully in sandwiches, salads, and baked dishes, carefully aged to preserve texture.',
    popularItems: 'Farmhouse Cheese, Cheddar Blocks, Mozzarella',
    price: 6.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1486887396153-fa416526c13b?auto=format&fit=crop&q=80&w=600',
    unit: '250g Block',
    sizes: ['200g Block', '400g Gourmet Pack', '1kg Wheel Piece'],
    specs: {
      protein: '7g per serving',
      calcium: '20% DV',
      fat: '28% mature fat',
      energy: '110 kcal'
    }
  },
  {
    id: 'salted_butter',
    name: 'Salted Butter',
    category: 'Butter',
    description: 'Smooth and flavorful butter made to enhance toast, recipes, and everyday meals, premium-churned for density.',
    popularItems: 'Salted Butter, Unsalted Butter',
    price: 3.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600',
    unit: '1 lb Pack',
    sizes: ['250g Wrap', '500g Tub', '1 lb Blocks'],
    specs: {
      protein: '0.1g per serving',
      calcium: '1% DV',
      fat: '81% butterfat',
      energy: '100 kcal'
    }
  },
  {
    id: 'vanilla_ice_cream',
    name: 'Vanilla Ice Cream',
    category: 'Ice Cream',
    description: 'Classic vanilla ice cream with a rich dairy base and a soft, satisfying finish, flavored with organic vanilla bean pod extract.',
    popularItems: 'Vanilla, Chocolate, Strawberry',
    price: 5.49,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?auto=format&fit=crop&q=80&w=600',
    unit: '1 Pint',
    sizes: ['1 Pint Tub', '1 Quart Tub', '3 Gallon Party Box'],
    specs: {
      protein: '3g per serving',
      calcium: '8% DV',
      fat: '12% premium cream fat',
      energy: '210 kcal'
    }
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'greek-yogurt-breakfast',
    title: '5 Easy Breakfast Ideas with Greek Yogurt',
    excerpt: 'Start your morning with simple and nutritious breakfast recipes using MilkRise Greek Yogurt, from fruit parfaits to smoothie bowls.',
    date: 'June 14, 2026',
    author: 'Emily Henderson, Nutrition Specialist',
    category: 'Recipes',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=600',
    tags: ['Yogurt', 'Breakfast', 'Healthy Habits', 'Nourishment'],
    content: [
      'The morning is a clean canvas for your nutrition. Greek yogurt, with its luxurious texture and exceptional protein content, serves as the ultimate base for a vibrant day. Here are five simple, time-tested recipes designed by our wellness team.',
      '1. The Golden Dawn Parfait: Build alternating layers of MilkRise Greek Yogurt, organic wildflower honey, and raw walnuts. Add a sprinkle of cinnamon to kickstart your metabolism and satisfy your natural morning sweet tooth.',
      '2. Green Power Smoothie Bowl: In a high-speed blender, combine 1 cup of plain Greek yogurt with baby spinach, ripe banana, frozen mango pieces, and a splash of milk. Pour into a bowl and top with chia seeds.',
      '3. Savory Herbed Spread: Mix yogurt with minced dill, cucumber water, garlic, and sea salt. Spread over sourdough toast, then top with sliced radishes and cracked black pepper for a savory, low-fat protein powerhouse.',
      '4. Overnight Protein Oats: Combine rolled oats, almond milk, greek yogurt, mashed banana, and flax seeds to hydrate overnight. In the morning, you get an ultra-creamy, cold pudding ready to grab and go.',
      '5. Berry Wave Blend: Swirl active strawberry yogurt with fresh blueberries, a touch of dark chocolate shavings, and toasted hemp seeds. The contrast between crunch and creaminess makes it a household favorite.'
    ]
  },
  {
    id: 'farm-to-bottle-journey',
    title: 'How Fresh Milk Goes from Farm to Bottle',
    excerpt: 'A behind-the-scenes look at the journey of milk, including collection, quality checks, processing, and packaging.',
    date: 'June 10, 2026',
    author: 'Marcus Sterling, Chief of Farm Operations',
    category: 'Farm Life',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
    tags: ['Fresh Milk', 'Transparency', 'Responsible Farming'],
    content: [
      'Have you ever wondered what happens in the short hours between milking our heritage cows and the moment you open a chilled bottle in your own kitchen? At MilkRise, speed, hygiene, and absolute path safety are standard parameters of the daily cycle.',
      'Phase 1: Ethical Sunrise Milking. Every morning, our cows enter our spotless, highly ventilated milking parlor. Automated gentle touch cup systems collect the milk at the perfect temperature of 101°F, keeping the process stress-free for each animal.',
      'Phase 2: Ultra-Fast Cold Storage. Within seconds, the milk is transferred via sanitary pipelines into state-of-the-art storage silos that flash-cool the milk down to 36°F. This halts any bacterial growth instantly while preserving vital enzymes and authentic dairy taste.',
      'Phase 3: Lab Verification & Validation. Before exiting the farm gates, every single batch is analyzed for purity, solid matter ratios, and trace minerals. We reject any milk below our strict standard deviation, maintaining a transparent, clean ledger.',
      'Phase 4: Pasteurized Balance. We apply gentle thermal pasteurization—heating the product only as much as needed to protect health, while protecting the luxurious creamline that defines true MilkRise pedigree.',
      'Phase 5: Sustainable Bottling. Our bottling line is powered by dairy-roof solar panels. Packed in recyclable canisters and bottles, the milk begins its direct journey to nearby family refrigerators, reaching shelves inside 24-36 hours.'
    ]
  },
  {
    id: 'animal-care-importance',
    title: 'Why Animal Care Matters in Dairy Farming',
    excerpt: 'Healthy animals are essential to quality dairy. Learn how proper nutrition, clean housing, and gentle handling make a difference.',
    date: 'June 05, 2026',
    author: 'Dr. Sarah Paulson, Resident Veterinarian',
    category: 'Sustainability',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600',
    tags: ['Animal Care', 'Ethics', 'Purity', 'Cow Health'],
    content: [
      'The math of a dairy farm is incredibly simple: happy and stress-free animals produce richer, sweeter dairy products with significantly better fat and protein profiles. That is why at MilkRise, animal well-being is not a compliance checklist; it is our primary operating standard.',
      '1. Open Pasture Philosophy: Our herds spend hours grazing on the rolling clover meadows of Brookvale. Fresh air, natural sunlight, and freedom of movement keep their joints healthy and their moods light.',
      '2. Customized Scientific Nutrition: When they are not on pasture, we provide high-grade dry hay, corn silage, and custom mineral mixes selected by veterinary dietary tables. Optimal digestion translates immediately to better milk taste.',
      '3. Soft Bedding & Air Conditioning: For summer months or damp winter nights, our barns act as premium shelters. We install custom rubber-coated memory mattresses and tall rotating water-spray fans so cows can lie down in fresh, cool environments.',
      '4. Gentle Handling Protocols: We enforce a strict zero-shouting policy. Our herd managers are trained in low-stress cattle techniques, understanding cow vision angles and herd psychology to move animals without fear.'
    ]
  },
  {
    id: 'cheese-pairing-guide',
    title: 'Choosing the Right Cheese for Everyday Meals',
    excerpt: 'Not all cheese is the same. This guide helps you pick the best options for sandwiches, pasta, salads, and snacks.',
    date: 'May 28, 2026',
    author: 'Chef Julian Vance, Culinary Partner',
    category: 'Guides',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=600',
    tags: ['Culinary Arts', 'Cheese Guide', 'Baking', 'Recipes'],
    content: [
      'The cheese counter can be intimidating. With endless choices of profiles—ranging from sharp and dry to gooey and crumbly—finding a versatile everyday workhorse is an art form. Let\'s unpack our core cheese varieties and how to apply them.',
      '1. The Melter: Cheddar Blocks. Our aged cheddar melts like a golden dream. Tips for the perfect grilled cheese: grate the block freshly instead of using pre-sliced cards, and melt on medium-low under cover to allow the core to liquefy before burning the bread.',
      '2. The All-Rounder: Farmhouse Mild. MilkRise Farmhouse is a mild, moist creation that slice cleanly. Since its moisture content is balanced, it doesn\'t separate or release grease. Cube it for grazing boards, crumble it into organic leafy salads, or layer in fresh deli paninis.',
      '3. The Stretching Star: Mozzarella. If you are baking a homemade vegetable pizza, mozzarella is essential for the iconic stretch. Squeeze excess liquid before putting it on the sauce to avoid a soggy dough bottom.',
      '4. Caring for Cheese: Wrap your blocks in porous butcher paper or parchment paper rather than air-tight plastic wrap. Cheese is alive—letting it breathe extends flavor and protects texture.'
    ]
  },
  {
    id: 'dairy-balanced-diet',
    title: 'Simple Ways Dairy Fits into a Balanced Diet',
    excerpt: 'Milk, yogurt, and cheese can provide protein, calcium, and convenience when included thoughtfully in daily meals.',
    date: 'May 15, 2026',
    author: 'Dr. Arthur Bell, Lifestyle Coach',
    category: 'Nutrition',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1528498033943-341498f865a5?auto=format&fit=crop&q=80&w=600',
    tags: ['Healthy Living', 'Nutrients', 'Protein', 'Calcium'],
    content: [
      'In a world of fluctuating diet trends, dairy remains a bedrock of human nutrition. As a high-density source of essential calcium, bioavailable vitamin D, and crucial branch-chain proteins, simple moderate dairy insertions elevate your physical health baseline.',
      'The Calcium Anchor: Our bones depend on structural regeneration throughout life. Getting a daily glass of milk or bowl of yogurt provides highly bioavailable calcium complexed with phosphorus, making it exceptionally easy for our body to assimilate.',
      'Slow-Release Casein Protein: Dairy carries a combination of whey and casein. Whey absorbs rapidly, making it great for post-workouts, but Casein digests slowly. A little cheese or unsweetened Greek yogurt before bedtime supplies muscles with a steady flow of tissue-repairing amino acids during rest.',
      'Gut Health Support: Active fermented products—like our live culture Greek yogurt—are teeming with lactobacillus probiotics. Incorporating 3-4 servings a week strengthens your digestive tract lining and supports immunity benefits.'
    ]
  }
];
