export const predefinedQuestions = {
    // Computer Science & Coding
    code: {
        building_id: 'code',
        building_name: 'Tower of Algorithms',
        subject: 'Computer Science',
        topic: 'Core Algorithms & Logic Control',
        explanation: 'In programming, algorithms are structured recipes of instructions. Sequential code executes top-to-bottom, conditionals (if-else) make dynamic decisions, and loops automate repetitive operations with efficiency.',
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
        explanation: 'Mathematics provides the universal language of patterns. Algebra uses variables to solve unknown quantities, while geometry explores angles, shapes, and spatial dimensions in the physical world.',
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
        explanation: 'Science explains matter and motion. Newton’s laws govern forces and momentum, while chemistry studies atomic interactions, molecular bonding, and energy exchange.',
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
        explanation: 'Channeling arcane energy requires mental focus, precise spell formulation, and balance between elemental forces: Fire, Water, Earth, and Air.',
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
    // ==========================================
    // MATHEMATICS CHAPTERS
    // ==========================================
    math_real: {
        building_id: 'math_c10_real_numbers',
        building_name: 'Real Numbers & Primes Hall',
        subject: 'Mathematics',
        topic: 'Real Numbers, Prime Factorization & Euclid\'s Lemma',
        explanation: 'The Fundamental Theorem of Arithmetic states that every composite number can be uniquely expressed as a product of primes. Euclid\'s Division Lemma and prime factorization allow calculating HCF, LCM, and proving irrationality (such as √2, √3).',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_math_real',
        questions: [
            {
                id: 1,
                question: 'If HCF(a, b) = 12 and a × b = 1800, what is LCM(a, b)?',
                options: ['120', '150', '180', '200'],
                correct_index: 1,
                explanation: 'HCF × LCM = a × b. So LCM = 1800 / 12 = 150.',
            },
            {
                id: 2,
                question: 'Which of the following numbers is irrational?',
                options: ['√4', '√9', '√7', '0.75'],
                correct_index: 2,
                explanation: '√7 cannot be written in the form p/q with integers p and q.',
            },
            {
                id: 3,
                question: 'What does the Fundamental Theorem of Arithmetic guarantee?',
                options: ['All numbers are prime', 'Unique prime factorization for composites', 'Even numbers end in 5', 'Roots are integers'],
                correct_index: 1,
                explanation: 'Every composite number can be uniquely factored into prime powers.',
            },
            {
                id: 4,
                question: 'What is the HCF of two consecutive integers n and n+1?',
                options: ['0', '1', '2', 'n'],
                correct_index: 1,
                explanation: 'Consecutive integers are always coprime, so their HCF is 1.',
            },
        ],
    },
    math_poly: {
        building_id: 'math_c10_polynomials_quad',
        building_name: 'Polynomials & Quadratics Sanctum',
        subject: 'Mathematics',
        topic: 'Polynomials, Factorization & Quadratic Equations',
        explanation: 'Quadratic equations have the standard form ax² + bx + c = 0. The nature of roots is determined by the discriminant D = b² - 4ac: two distinct real roots if D > 0, two equal real roots if D = 0, and no real roots if D < 0.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_math_poly',
        questions: [
            {
                id: 1,
                question: 'What is the sum of roots (α + β) of the equation ax² + bx + c = 0?',
                options: ['-b/a', 'c/a', 'b/a', '-c/a'],
                correct_index: 0,
                explanation: 'The sum of roots is -b/a, and the product of roots is c/a.',
            },
            {
                id: 2,
                question: 'If the discriminant D = b² - 4ac is equal to 0, the roots are:',
                options: ['Real and distinct', 'Real and equal', 'Complex/Imaginary', 'Undefined'],
                correct_index: 1,
                explanation: 'When D = 0, both roots are real and identical: -b/(2a).',
            },
            {
                id: 3,
                question: 'Find the roots of x² - 5x + 6 = 0:',
                options: ['x = 1, 6', 'x = 2, 3', 'x = -2, -3', 'x = -1, 6'],
                correct_index: 1,
                explanation: '(x - 2)(x - 3) = 0 gives roots x = 2 and x = 3.',
            },
            {
                id: 4,
                question: 'What is the degree of a cubic polynomial?',
                options: ['1', '2', '3', '4'],
                correct_index: 2,
                explanation: 'A cubic polynomial has highest variable power 3.',
            },
        ],
    },
    math_trig: {
        building_id: 'math_c10_trigonometry',
        building_name: 'Trigonometry & Heights Spire',
        subject: 'Mathematics',
        topic: 'Trigonometric Ratios, Pythagorean Identities & Heights',
        explanation: 'Trigonometry relates side ratios to angles in right triangles: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj. Key identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, and 1 + cot²θ = cosec²θ.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_math_trig',
        questions: [
            {
                id: 1,
                question: 'What is the value of sin²(30°) + cos²(30°)?',
                options: ['0', '1/2', '1', '2'],
                correct_index: 2,
                explanation: 'For any angle θ, sin²θ + cos²θ is always equal to 1.',
            },
            {
                id: 2,
                question: 'What is tan(45°)?',
                options: ['0', '1/2', '1', '√3'],
                correct_index: 2,
                explanation: 'tan(45°) = sin(45°)/cos(45°) = (1/√2)/(1/√2) = 1.',
            },
            {
                id: 3,
                question: 'If sin θ = 3/5 in a right triangle, what is cos θ?',
                options: ['4/5', '3/4', '5/3', '1/5'],
                correct_index: 0,
                explanation: 'Using the 3-4-5 right triangle: cos θ = √(1 - (3/5)²) = 4/5.',
            },
            {
                id: 4,
                question: 'An observer looks up at the top of a tower. The angle formed with the horizontal is the:',
                options: ['Angle of Depression', 'Angle of Elevation', 'Refraction Angle', 'Critical Angle'],
                correct_index: 1,
                explanation: 'Looking upward from horizontal creates the angle of elevation.',
            },
        ],
    },
    math_linear: {
        building_id: 'math_c10_linear_equations',
        building_name: 'Pair of Linear Equations Tower',
        subject: 'Mathematics',
        topic: 'Systems of Linear Equations in Two Variables',
        explanation: 'A system a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 has a unique solution when a₁/a₂ ≠ b₁/b₂, infinitely many solutions when lines coincide (a₁/a₂ = b₁/b₂ = c₁/c₂), and no solution when lines are parallel.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_math_linear',
        questions: [
            {
                id: 1,
                question: 'Solve the system: x + y = 10, x - y = 4',
                options: ['x = 7, y = 3', 'x = 6, y = 4', 'x = 8, y = 2', 'x = 5, y = 5'],
                correct_index: 0,
                explanation: 'Adding equations: 2x = 14 => x = 7; then y = 10 - 7 = 3.',
            },
            {
                id: 2,
                question: 'If a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the system has:',
                options: ['Unique solution', 'Two solutions', 'No solution (Parallel lines)', 'Infinitely many solutions'],
                correct_index: 2,
                explanation: 'Parallel lines never intersect, resulting in no solution.',
            },
            {
                id: 3,
                question: 'Which method eliminates one variable by substitution?',
                options: ['Matrix multiplication', 'Substitution method', 'Factoring method', 'Differential method'],
                correct_index: 1,
                explanation: 'Substitution expresses one variable in terms of another.',
            },
            {
                id: 4,
                question: 'The graph of a linear equation in two variables is a:',
                options: ['Parabola', 'Circle', 'Straight line', 'Hyperbola'],
                correct_index: 2,
                explanation: 'Linear equations represent straight lines on Cartesian planes.',
            },
        ],
    },
    math_ap: {
        building_id: 'math_c10_ap_triangles',
        building_name: 'Progressions & Triangles Chamber',
        subject: 'Mathematics',
        topic: 'Arithmetic Progressions & Similar Triangles',
        explanation: 'In an Arithmetic Progression with first term a and common difference d, the nth term is a_n = a + (n - 1)d, and sum S_n = n/2 [2a + (n-1)d]. Thales\' theorem states that a line parallel to one triangle side divides other sides proportionally.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_math_ap',
        questions: [
            {
                id: 1,
                question: 'Find the 10th term of the AP: 2, 7, 12, 17...',
                options: ['42', '47', '52', '57'],
                correct_index: 1,
                explanation: 'a = 2, d = 5. a₁₀ = 2 + (10 - 1) × 5 = 2 + 45 = 47.',
            },
            {
                id: 2,
                question: 'What is the sum of the first n positive integers?',
                options: ['n(n+1)/2', 'n²', 'n(n-1)/2', '2n + 1'],
                correct_index: 0,
                explanation: 'Gauss\' formula: Sum = n(n+1)/2.',
            },
            {
                id: 3,
                question: 'If two triangles are similar, the ratio of their areas equals:',
                options: ['Ratio of sides', 'Ratio of squares of corresponding sides', 'Ratio of perimeters', 'Always 1'],
                correct_index: 1,
                explanation: 'Area ratio of similar triangles equals the ratio of squares of their corresponding sides.',
            },
            {
                id: 4,
                question: 'Which similarity criterion uses three proportional sides?',
                options: ['AAA', 'SAS', 'SSS', 'RHS'],
                correct_index: 2,
                explanation: 'SSS stands for Side-Side-Side proportionality criterion.',
            },
        ],
    },
    math_coord: {
        building_id: 'math_c10_coord_stats',
        building_name: 'Coordinate Geometry & Statistics',
        subject: 'Mathematics',
        topic: 'Distance Formula, Section Formula & Probability',
        explanation: 'Distance between (x₁, y₁) and (x₂, y₂) is d = √[(x₂ - x₁)² + (y₂ - y₁)²]. The Section Formula divides a line in ratio m:n. Probability P(E) = favorable outcomes / total outcomes (0 ≤ P(E) ≤ 1).',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_math_coord',
        questions: [
            {
                id: 1,
                question: 'What is the distance between points (0, 0) and (3, 4)?',
                options: ['3', '4', '5', '7'],
                correct_index: 2,
                explanation: 'd = √(3² + 4²) = √(9 + 16) = √25 = 5.',
            },
            {
                id: 2,
                question: 'What is the probability of rolling an even number on a standard 6-sided die?',
                options: ['1/6', '1/3', '1/2', '2/3'],
                correct_index: 2,
                explanation: 'Even numbers: 2, 4, 6 (3 outcomes). P = 3/6 = 1/2.',
            },
            {
                id: 3,
                question: 'The midpoint of line segment joining (2, 4) and (6, 8) is:',
                options: ['(3, 5)', '(4, 6)', '(8, 12)', '(2, 2)'],
                correct_index: 1,
                explanation: 'Midpoint = ((2+6)/2, (4+8)/2) = (4, 6).',
            },
            {
                id: 4,
                question: 'What is the sum of probabilities of all elementary events of an experiment?',
                options: ['0', '0.5', '1', '100'],
                correct_index: 2,
                explanation: 'Total probability of all mutually exclusive elementary events is always 1.',
            },
        ],
    },
    // ==========================================
    // PHYSICS CHAPTERS
    // ==========================================
    phys_light: {
        building_id: 'phys_c10_light',
        building_name: 'Light & Ray Optics Observatory',
        subject: 'Physics',
        topic: 'Reflection, Refraction, Spherical Mirrors & Lenses',
        explanation: 'Light reflects off mirrors following the Law of Reflection and refracts through lenses by Snell\'s Law: n₁ sin(i) = n₂ sin(r). Mirror formula: 1/f = 1/v + 1/u. Lens formula: 1/f = 1/v - 1/u. Convex lenses converge rays, concave diverge.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_phys_light',
        questions: [
            {
                id: 1,
                question: 'What is the unit of power of a lens?',
                options: ['Watt', 'Joule', 'Dioptre', 'Lumen'],
                correct_index: 2,
                explanation: 'Power of a lens P = 1/f (in meters) and is measured in Dioptres (D).',
            },
            {
                id: 2,
                question: 'What kind of mirror is used as a rear-view mirror in vehicles?',
                options: ['Concave Mirror', 'Convex Mirror', 'Plane Mirror', 'Parabolic Mirror'],
                correct_index: 1,
                explanation: 'Convex mirrors provide a wider field of view and upright virtual images.',
            },
            {
                id: 3,
                question: 'What is the speed of light in a vacuum?',
                options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '300 m/s'],
                correct_index: 1,
                explanation: 'Speed of light c ≈ 3.0 × 10⁸ meters per second.',
            },
            {
                id: 4,
                question: 'Splitting of white light into constituent colors through a prism is called:',
                options: ['Total Internal Reflection', 'Dispersion', 'Diffraction', 'Polarization'],
                correct_index: 1,
                explanation: 'Dispersion occurs because different colors travel at different speeds in glass.',
            },
        ],
    },
    phys_electricity: {
        building_id: 'phys_c10_electricity',
        building_name: 'Electricity & Ohm\'s Law Spire',
        subject: 'Physics',
        topic: 'Current, Voltage, Ohm\'s Law & Resistance Circuits',
        explanation: 'Ohm\'s Law states V = IR. In series circuits, current is constant and resistances add (R_eq = R₁ + R₂). In parallel circuits, voltage is constant and reciprocals add (1/R_eq = 1/R₁ + 1/R₂). Joule heating law: H = I²Rt.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_phys_electricity',
        questions: [
            {
                id: 1,
                question: 'If voltage is 12V and resistance is 4Ω, what is the current?',
                options: ['0.33 A', '3 A', '16 A', '48 A'],
                correct_index: 1,
                explanation: 'Using Ohm\'s Law I = V/R = 12/4 = 3 Amperes.',
            },
            {
                id: 2,
                question: 'Two 6Ω resistors are connected in parallel. What is equivalent resistance?',
                options: ['3Ω', '6Ω', '12Ω', '36Ω'],
                correct_index: 0,
                explanation: '1/R_eq = 1/6 + 1/6 = 2/6 = 1/3 => R_eq = 3Ω.',
            },
            {
                id: 3,
                question: 'Which instrument measures electric current in a circuit?',
                options: ['Voltmeter', 'Ammeter', 'Galvanometer', 'Barometer'],
                correct_index: 1,
                explanation: 'Ammeters are connected in series to measure electric current.',
            },
            {
                id: 4,
                question: 'What is the commercial unit of electrical energy (1 kWh) in Joules?',
                options: ['3.6 × 10⁴ J', '3.6 × 10⁵ J', '3.6 × 10⁶ J', '3.6 × 10⁷ J'],
                correct_index: 2,
                explanation: '1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ Joules.',
            },
        ],
    },
    // ==========================================
    // CHEMISTRY CHAPTERS
    // ==========================================
    chem_reactions: {
        building_id: 'chem_c10_reactions',
        building_name: 'Chemical Reactions & Equations Lab',
        subject: 'Chemistry',
        topic: 'Chemical Equations, Types of Reactions & Redox',
        explanation: 'Chemical equations must obey the Law of Conservation of Mass. Main types of reactions: Combination (A+B→AB), Decomposition (AB→A+B), Displacement (A+BC→AC+B), Double Displacement, and Redox (simultaneous Oxidation and Reduction).',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_chem_reactions',
        questions: [
            {
                id: 1,
                question: 'What occurs during an oxidation reaction?',
                options: ['Gain of electrons / Gain of Hydrogen', 'Loss of electrons / Gain of Oxygen', 'Gain of Neutrons', 'Absorption of cold'],
                correct_index: 1,
                explanation: 'Oxidation is the gain of oxygen or loss of electrons.',
            },
            {
                id: 2,
                question: '2H₂ + O₂ → 2H₂O is an example of which reaction type?',
                options: ['Decomposition', 'Displacement', 'Combination', 'Neutralization'],
                correct_index: 2,
                explanation: 'Two reactants combine to form a single product in combination reactions.',
            },
            {
                id: 3,
                question: 'What gas is evolved when zinc granules react with dilute sulphuric acid?',
                options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Chlorine'],
                correct_index: 2,
                explanation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑ (Hydrogen burns with a pop sound).',
            },
            {
                id: 4,
                question: 'Why do we balance chemical equations?',
                options: ['Law of Definite Proportions', 'Law of Conservation of Mass', 'Boyle\'s Law', 'Avogadro\'s Law'],
                correct_index: 1,
                explanation: 'Total mass of reactants must equal total mass of products.',
            },
        ],
    },
    chem_acids: {
        building_id: 'chem_c10_acids_bases',
        building_name: 'Acids, Bases & Salts Chamber',
        subject: 'Chemistry',
        topic: 'pH Scale, Indicators, Neutralization & Important Salts',
        explanation: 'Acids release H⁺ ions in water (pH < 7), while bases release OH⁻ ions (pH > 7). A neutral solution has pH = 7. Acid + Base → Salt + Water (Neutralization). Common salts include NaCl, NaHCO₃ (Baking soda), Na₂CO₃·10H₂O (Washing soda), and CaSO₄·½H₂O (Plaster of Paris).',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_chem_acids',
        questions: [
            {
                id: 1,
                question: 'What color does blue litmus paper turn in an acidic solution?',
                options: ['Blue', 'Red', 'Green', 'Yellow'],
                correct_index: 1,
                explanation: 'Acids turn blue litmus red; bases turn red litmus blue.',
            },
            {
                id: 2,
                question: 'What is the chemical name and formula of Baking Soda?',
                options: ['Sodium Carbonate (Na₂CO₃)', 'Sodium Hydrogen Carbonate (NaHCO₃)', 'Calcium Carbonate (CaCO₃)', 'Sodium Hydroxide (NaOH)'],
                correct_index: 1,
                explanation: 'Sodium hydrogen carbonate (NaHCO₃) is the active component of baking soda.',
            },
            {
                id: 3,
                question: 'A solution has a pH of 2. This solution is:',
                options: ['Strongly basic', 'Weakly basic', 'Neutral', 'Strongly acidic'],
                correct_index: 3,
                explanation: 'pH values below 3 represent strong acids.',
            },
            {
                id: 4,
                question: 'What is the chemical formula of Plaster of Paris?',
                options: ['CaSO₄ · 2H₂O', 'CaSO₄ · ½H₂O', 'CaCl₂ · 2H₂O', 'Ca(OH)₂'],
                correct_index: 1,
                explanation: 'Plaster of Paris is calcium sulphate hemihydrate: CaSO₄ · ½H₂O.',
            },
        ],
    },
    // ==========================================
    // BIOLOGY & LIFE SCIENCES
    // ==========================================
    bio_cell: {
        building_id: 'bio_cell_genetics',
        building_name: 'Cellular Biology Conservatory',
        subject: 'Biology',
        topic: 'Cell Structure, Organelles, Mitosis & DNA',
        explanation: 'The cell is the basic structural and functional unit of life. Mitochondria generate ATP energy via cellular respiration. The nucleus contains DNA organized in chromosomes. Plant cells possess cell walls and chloroplasts for photosynthesis.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_bio_cell',
        questions: [
            {
                id: 1,
                question: 'Which organelle is known as the powerhouse of the cell?',
                options: ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Lysosome'],
                correct_index: 1,
                explanation: 'Mitochondria synthesize cellular ATP during aerobic respiration.',
            },
            {
                id: 2,
                question: 'Which organelle is present in plant cells but absent in animal cells?',
                options: ['Cell wall & Chloroplast', 'Mitochondria', 'Cell membrane', 'Nucleus'],
                correct_index: 0,
                explanation: 'Rigid cellulose cell walls and chloroplasts are unique to plant cells.',
            },
            {
                id: 3,
                question: 'What molecule carries the primary genetic blueprint of organisms?',
                options: ['ATP', 'RNA', 'DNA', 'Hemoglobin'],
                correct_index: 2,
                explanation: 'Deoxyribonucleic acid (DNA) stores hereditary instructions.',
            },
            {
                id: 4,
                question: 'In cell division, what process produces two genetically identical daughter cells?',
                options: ['Mitosis', 'Meiosis', 'Fertilization', 'Budding'],
                correct_index: 0,
                explanation: 'Mitosis creates identical diploid cells for growth and tissue repair.',
            },
        ],
    },
    // ==========================================
    // HISTORY & SOCIAL STUDIES
    // ==========================================
    hist_ancient: {
        building_id: 'hist_ancient_empires',
        building_name: 'Ancient Civilizations Archive',
        subject: 'History',
        topic: 'Harappan Civilisation, Bronze Age & Early Societies',
        explanation: 'The Indus Valley Civilization (c. 2500–1900 BCE) is celebrated for advanced urban planning, grid-based street layouts, underground brick drainage systems, and the Great Bath at Mohenjo-Daro.',
        audio_available: false,
        source: 'prepopulated',
        cache_key: 'prepopulated_hist_ancient',
        questions: [
            {
                id: 1,
                question: 'Which ancient civilization was famous for its advanced grid town planning and drainage systems?',
                options: ['Indus Valley (Harappan)', 'Mesopotamian', 'Inca Empire', 'Viking Kingdom'],
                correct_index: 0,
                explanation: 'Harappan cities like Mohenjo-Daro and Harappa featured standardized grid street systems.',
            },
            {
                id: 2,
                question: 'Where was the famous "Great Bath" discovered?',
                options: ['Lothal', 'Mohenjo-Daro', 'Kalibangan', 'Ropar'],
                correct_index: 1,
                explanation: 'The Great Bath was excavated at Mohenjo-Daro in Sindh.',
            },
            {
                id: 3,
                question: 'Which port city of the Indus Valley Civilization featured a tidal dockyard?',
                options: ['Harappa', 'Lothal', 'Dholavira', 'Banawali'],
                correct_index: 1,
                explanation: 'Lothal in Gujarat served as an important maritime trade hub.',
            },
            {
                id: 4,
                question: 'What alloy of copper and tin defines the Bronze Age era?',
                options: ['Steel', 'Brass', 'Bronze', 'Pewter'],
                correct_index: 2,
                explanation: 'Bronze is formed by melting copper together with tin.',
            },
        ],
    },
};
export function getQuestionsForBuilding(buildingId, subjectName) {
    const normalizedId = buildingId.toLowerCase();
    const normalizedSub = subjectName.toLowerCase();
    // 1. Direct ID matching or partial prefix matching
    for (const key of Object.keys(predefinedQuestions)) {
        if (normalizedId === key || normalizedId.includes(key)) {
            return predefinedQuestions[key];
        }
    }
    // 2. Thematic keyword matching
    if (normalizedId.includes('trig') || normalizedId.includes('angle')) {
        return predefinedQuestions['math_trig'] || predefinedQuestions['math'];
    }
    if (normalizedId.includes('real') || normalizedId.includes('number') || normalizedId.includes('prime')) {
        return predefinedQuestions['math_real'] || predefinedQuestions['math'];
    }
    if (normalizedId.includes('poly') || normalizedId.includes('quad')) {
        return predefinedQuestions['math_poly'] || predefinedQuestions['math'];
    }
    if (normalizedId.includes('linear') || normalizedId.includes('equation')) {
        return predefinedQuestions['math_linear'] || predefinedQuestions['math'];
    }
    if (normalizedId.includes('ap') || normalizedId.includes('triang') || normalizedId.includes('progres')) {
        return predefinedQuestions['math_ap'] || predefinedQuestions['math'];
    }
    if (normalizedId.includes('coord') || normalizedId.includes('stat') || normalizedId.includes('prob')) {
        return predefinedQuestions['math_coord'] || predefinedQuestions['math'];
    }
    if (normalizedId.includes('light') || normalizedId.includes('optic') || normalizedId.includes('mirror')) {
        return predefinedQuestions['phys_light'] || predefinedQuestions['science'];
    }
    if (normalizedId.includes('electr') || normalizedId.includes('circuit') || normalizedId.includes('ohm')) {
        return predefinedQuestions['phys_electricity'] || predefinedQuestions['science'];
    }
    if (normalizedId.includes('react') || normalizedId.includes('chem')) {
        return predefinedQuestions['chem_reactions'] || predefinedQuestions['science'];
    }
    if (normalizedId.includes('acid') || normalizedId.includes('base') || normalizedId.includes('salt')) {
        return predefinedQuestions['chem_acids'] || predefinedQuestions['science'];
    }
    if (normalizedId.includes('cell') || normalizedId.includes('bio') || normalizedId.includes('gene')) {
        return predefinedQuestions['bio_cell'] || predefinedQuestions['science'];
    }
    if (normalizedId.includes('hist') || normalizedId.includes('empir') || normalizedId.includes('anc')) {
        return predefinedQuestions['hist_ancient'] || predefinedQuestions['science'];
    }
    if (normalizedId.includes('code') || normalizedId.includes('algo') || normalizedId.includes('prog')) {
        return predefinedQuestions['code'];
    }
    // 3. Subject-based fallback
    if (normalizedSub.includes('math')) {
        return predefinedQuestions['math_trig'] || predefinedQuestions['math'];
    }
    if (normalizedSub.includes('phys')) {
        return predefinedQuestions['phys_electricity'] || predefinedQuestions['science'];
    }
    if (normalizedSub.includes('chem')) {
        return predefinedQuestions['chem_reactions'] || predefinedQuestions['science'];
    }
    if (normalizedSub.includes('bio')) {
        return predefinedQuestions['bio_cell'] || predefinedQuestions['science'];
    }
    if (normalizedSub.includes('hist')) {
        return predefinedQuestions['hist_ancient'] || predefinedQuestions['science'];
    }
    if (normalizedSub.includes('comp') || normalizedSub.includes('cs')) {
        return predefinedQuestions['code'];
    }
    // 4. General fallback
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
