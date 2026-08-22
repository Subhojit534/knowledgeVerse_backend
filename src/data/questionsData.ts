import { LearningContentPayload, MCQuestion } from '../types/index.js';

export const predefinedQuestions: Record<string, LearningContentPayload> = {
  // Computer Science & Coding
  code: {
    building_id: 'code',
    building_name: 'Tower of Algorithms',
    subject: 'Computer Science',
    topic: 'Core Algorithms & Logic Control',
    explanation:
      'In programming, algorithms are structured recipes of instructions. Sequential code executes top-to-bottom, conditionals (if-else) make dynamic decisions, and loops automate repetitive operations with efficiency.',
    audio_available: false,
    source: 'prepopulated',
    cache_key: 'prepopulated_code',
    questions: [
      {
        id: 1,
        question: 'What is the primary function of a loop in programming?',
        options: ['Store user data', 'Repeat code execution', 'Delete system memory', 'Render UI styles'],
        correct_index: 1,
        explanation: 'Loops allow code instructions to repeat without duplicating lines of code.',
      },
      {
        id: 2,
        question: 'Which component enables conditional branching in code?',
        options: ['Variable', 'Function', 'If-Else Statement', 'Array'],
        correct_index: 2,
        explanation: 'If-else statements evaluate dynamic conditions to run target code paths.',
      },
      {
        id: 3,
        question: 'What purpose does a variable serve in program execution?',
        options: ['Stores data values', 'Calculates screen resolution', 'Speeds up CPU clock', 'Secures network ports'],
        correct_index: 0,
        explanation: 'Variables allocate memory to hold values that can be referenced and updated.',
      },
      {
        id: 4,
        question: 'What happens when a loop has no exit condition?',
        options: ['Terminates immediately', 'Runs infinitely', 'Compiles faster', 'Converts into a variable'],
        correct_index: 1,
        explanation: 'Without a stopping condition, a loop becomes an infinite loop.',
      },
    ],
  },

  // Mathematics
  math: {
    building_id: 'math',
    building_name: 'Sanctum of Numeromancy',
    subject: 'Mathematics',
    topic: 'Algebraic Expressions & Geometry',
    explanation:
      'Mathematics provides the universal language of patterns. Algebra uses variables to solve unknown quantities, while geometry explores angles, shapes, and spatial dimensions in the physical world.',
    audio_available: false,
    source: 'prepopulated',
    cache_key: 'prepopulated_math',
    questions: [
      {
        id: 1,
        question: 'Solve for x: 3x + 9 = 24',
        options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'],
        correct_index: 1,
        explanation: 'Subtract 9 from 24 to get 15, then divide 15 by 3 to find x = 5.',
      },
      {
        id: 2,
        question: 'What is the sum of interior angles in any triangle?',
        options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
        correct_index: 1,
        explanation: 'The interior angles of every Euclidean triangle always total 180 degrees.',
      },
      {
        id: 3,
        question: 'What is the square root of 144?',
        options: ['10', '12', '14', '16'],
        correct_index: 1,
        explanation: '12 multiplied by 12 equals 144.',
      },
      {
        id: 4,
        question: 'In a right triangle, what does the Pythagorean Theorem state?',
        options: ['a + b = c', 'a² + b² = c²', 'a × b = c', 'a² - b² = c²'],
        correct_index: 1,
        explanation: 'The square of the hypotenuse (c) equals the sum of the squares of the legs (a² + b²).',
      },
    ],
  },

  // Science & Physics
  science: {
    building_id: 'science',
    building_name: 'Hall of Alchemy & Elements',
    subject: 'Physical Science',
    topic: 'Newtonian Physics & Chemical Reactions',
    explanation:
      'Science explains matter and motion. Newton’s laws govern forces and momentum, while chemistry studies atomic interactions, molecular bonding, and energy exchange.',
    audio_available: false,
    source: 'prepopulated',
    cache_key: 'prepopulated_science',
    questions: [
      {
        id: 1,
        question: 'Which subatomic particle carries a negative electrical charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        correct_index: 2,
        explanation: 'Electrons orbit the nucleus and hold a negative charge.',
      },
      {
        id: 2,
        question: 'According to Newton’s First Law, an object in motion will:',
        options: ['Stop immediately', 'Stay in motion unless acted upon by a net force', 'Accelerate automatically', 'Turn around'],
        correct_index: 1,
        explanation: 'Inertia keeps objects in uniform motion unless unbalanced forces act on them.',
      },
      {
        id: 3,
        question: 'What process do plants use to transform sunlight into glucose energy?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Oxidation'],
        correct_index: 1,
        explanation: 'Photosynthesis converts light, carbon dioxide, and water into glucose and oxygen.',
      },
      {
        id: 4,
        question: 'What is the chemical symbol for Gold in the periodic table?',
        options: ['Go', 'Ag', 'Au', 'Fe'],
        correct_index: 2,
        explanation: 'Au comes from the Latin word for gold, Aurum.',
      },
    ],
  },

  // Magic & Arcane Lore
  magic: {
    building_id: 'magic',
    building_name: 'High Spire of Incantations',
    subject: 'Arcane Arts',
    topic: 'Spellcraft & Elemental Focus',
    explanation:
      'Channeling arcane energy requires mental focus, precise spell formulation, and balance between elemental forces: Fire, Water, Earth, and Air.',
    audio_available: false,
    source: 'prepopulated',
    cache_key: 'prepopulated_magic',
    questions: [
      {
        id: 1,
        question: 'Which elemental force is traditionally effective against Frost magic?',
        options: ['Water', 'Fire', 'Earth', 'Shadow'],
        correct_index: 1,
        explanation: 'Fire energy melts and dispels ice and frost elemental barriers.',
      },
      {
        id: 2,
        question: 'What artifact focuses mana during complex spell casting?',
        options: ['Leather Boot', 'Wand or Staff', 'Iron Shield', 'Wooden Spoon'],
        correct_index: 1,
        explanation: 'Wands and staves act as conduits for focusing spell energy.',
      },
      {
        id: 3,
        question: 'What key requirement prevents spell disruption under pressure?',
        options: ['Shouting loudly', 'High Concentration & Mana Control', 'Fast running', 'Closing eyes'],
        correct_index: 1,
        explanation: 'Mental concentration stabilizes the weave of magical energy.',
      },
      {
        id: 4,
        question: 'Which potion ingredient accelerates mana recovery?',
        options: ['Dragon Scale Dust', 'Moonstone Powder', 'Starflower Essence', 'Pinecone'],
        correct_index: 2,
        explanation: 'Starflower Essence is known across realms for restoring mana channels.',
      },
    ],
  },
};

export function getQuestionsForBuilding(
  buildingId: string,
  subjectName: string
): LearningContentPayload {
  const normalizedId = buildingId.toLowerCase();
  const normalizedSub = subjectName.toLowerCase();

  for (const key of Object.keys(predefinedQuestions)) {
    if (normalizedId.includes(key) || normalizedSub.includes(key)) {
      return predefinedQuestions[key];
    }
  }

  // General fallback
  return {
    building_id: buildingId,
    building_name: `${subjectName} Academy Building`,
    subject: subjectName,
    topic: `Foundations of ${subjectName}`,
    explanation: `Welcome to the ${subjectName} lesson! Mastery comes from active engagement, conceptual understanding, and consistent practice across key topics.`,
    audio_available: false,
    source: 'prepopulated_fallback',
    cache_key: `prepopulated_${buildingId}`,
    questions: [
      {
        id: 1,
        question: `What is the key principle to mastering ${subjectName}?`,
        options: ['Rote memorization', 'Conceptual understanding & active practice', 'Guessing quickly', 'Skipping fundamental topics'],
        correct_index: 1,
        explanation: 'Active problem solving and concept mastery produce long-lasting understanding.',
      },
      {
        id: 2,
        question: 'Why break complex problems into smaller components?',
        options: ['Makes topics manageable', 'Wastes study time', 'Disables logic', 'Confuses memory'],
        correct_index: 0,
        explanation: 'Deconstructing problems clarifies core steps and prevents overwhelm.',
      },
      {
        id: 3,
        question: 'How should mistakes during quizzes be treated?',
        options: ['As proof of failure', 'As valuable learning feedback', 'As irrelevant', 'As reason to quit'],
        correct_index: 1,
        explanation: 'Errors highlight specific areas for targeted review and growth.',
      },
      {
        id: 4,
        question: 'What method solidifies learning into long-term memory?',
        options: ['Passive reading', 'Regular active retrieval practice', 'Studying without breaks', 'Ignoring feedback'],
        correct_index: 1,
        explanation: 'Retrieval practice strengthens cognitive connections.',
      },
    ],
  };
}
