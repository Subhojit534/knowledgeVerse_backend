-- ============================================================================
-- 02_SEED_CLASS_5_6.SQL
-- KNOWLEDGEVERSE CURRICULUM SEED: CLASS 5 & CLASS 6 (QUESTIONS 1 - 100)
-- Boards: CBSE, ICSE, BSEB, WBBSE, DBSE
-- ============================================================================

-- ----------------------------------------------------------------------------
-- CLASSES (CLASS 5 & 6)
-- ----------------------------------------------------------------------------
INSERT INTO "class" (id, name, board) VALUES
  ('00000005-0001-0000-0000-000000000000', 'Class 5', 'CBSE'),
  ('00000005-0002-0000-0000-000000000000', 'Class 5', 'ICSE'),
  ('00000005-0003-0000-0000-000000000000', 'Class 5', 'BSEB'),
  ('00000005-0004-0000-0000-000000000000', 'Class 5', 'WBBSE'),
  ('00000005-0005-0000-0000-000000000000', 'Class 5', 'DBSE'),
  ('00000006-0001-0000-0000-000000000000', 'Class 6', 'CBSE'),
  ('00000006-0002-0000-0000-000000000000', 'Class 6', 'ICSE'),
  ('00000006-0003-0000-0000-000000000000', 'Class 6', 'BSEB'),
  ('00000006-0004-0000-0000-000000000000', 'Class 6', 'WBBSE'),
  ('00000006-0005-0000-0000-000000000000', 'Class 6', 'DBSE')
ON CONFLICT (name, board) DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBJECTS (CLASS 5 & 6)
-- ----------------------------------------------------------------------------
INSERT INTO subject (id, class_id, name, description) VALUES
  ('a0000005-0001-0000-0000-000000000001', '00000005-0001-0000-0000-000000000000', 'Mathematics', 'Primary arithmetic, fractions, shapes, and measurements'),
  ('a0000005-0002-0000-0000-000000000002', '00000005-0002-0000-0000-000000000000', 'General Science', 'Plant biology, human body systems, forces, and matter'),
  ('a0000005-0003-0000-0000-000000000003', '00000005-0003-0000-0000-000000000000', 'Social Studies', 'Earth geography, continents, Indian heritage, and civic life'),
  ('a0000005-0004-0000-0000-000000000004', '00000005-0004-0000-0000-000000000000', 'English', 'Grammar essentials, vocabulary, tenses, and comprehension'),
  ('a0000006-0001-0000-0000-000000000005', '00000006-0001-0000-0000-000000000000', 'Mathematics', 'Integers, algebraic expressions, ratio & proportion, geometry'),
  ('a0000006-0002-0000-0000-000000000006', '00000006-0002-0000-0000-000000000000', 'Science', 'Food components, electricity, light & shadows, separation methods'),
  ('a0000006-0003-0000-0000-000000000007', '00000006-0005-0000-0000-000000000000', 'Social Science', 'Early civilizations, Earth domains, democracy, and equality'),
  ('a0000006-0004-0000-0000-000000000008', '00000006-0001-0000-0000-000000000000', 'English', 'Advanced parts of speech, voice, clauses, and vocabulary')
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- TOPICS (CLASS 5 & 6)
-- ----------------------------------------------------------------------------
INSERT INTO topic (id, subject_id, name, description, difficulty) VALUES
  ('b0000005-0001-0000-0000-000000000001', 'a0000005-0001-0000-0000-000000000001', 'Numbers & Fractions', 'Place value, large numbers, and fractional operations', 'Easy'),
  ('b0000005-0001-0000-0000-000000000002', 'a0000005-0001-0000-0000-000000000001', 'Shapes, Area & Perimeter', 'Geometric angles, 2D shapes, and perimeter calculation', 'Medium'),
  ('b0000005-0002-0000-0000-000000000003', 'a0000005-0002-0000-0000-000000000002', 'Plant Life & Adaptation', 'Germination, photosynthesis, and habitats', 'Easy'),
  ('b0000005-0002-0000-0000-000000000004', 'a0000005-0002-0000-0000-000000000002', 'Human Organ Systems', 'Digestion, skeletal system, and respiratory functions', 'Medium'),
  ('b0000005-0003-0000-0000-000000000005', 'a0000005-0003-0000-0000-000000000003', 'Globe & Maps', 'Latitudes, longitudes, continents, and oceans', 'Easy'),
  ('b0000005-0003-0000-0000-000000000006', 'a0000005-0003-0000-0000-000000000003', 'Indian Freedom Movement', 'Pivotal national leaders, 1857 revolt, and independence', 'Medium'),
  ('b0000005-0004-0000-0000-000000000007', 'a0000005-0004-0000-0000-000000000004', 'Grammar Foundations', 'Nouns, pronouns, adjectives, and verb agreement', 'Easy'),
  ('b0000005-0004-0000-0000-000000000008', 'a0000005-0004-0000-0000-000000000004', 'Vocabulary & Tenses', 'Present, past, future tenses, and antonyms', 'Medium'),
  ('b0000006-0001-0000-0000-000000000009', 'a0000006-0001-0000-0000-000000000005', 'Integers & Number Line', 'Negative numbers, absolute values, and arithmetic rules', 'Medium'),
  ('b0000006-0001-0000-0000-000000000010', 'a0000006-0001-0000-0000-000000000005', 'Introduction to Algebra & Ratio', 'Variables, linear equations, ratios, and unitary method', 'Hard'),
  ('b0000006-0002-0000-0000-000000000011', 'a0000006-0002-0000-0000-000000000006', 'Components of Food & Separation', 'Nutrients, sedimentation, decantation, and filtration', 'Easy'),
  ('b0000006-0002-0000-0000-000000000012', 'a0000006-0002-0000-0000-000000000006', 'Electricity & Light', 'Circuits, conductors, rectilinear propagation of light', 'Medium'),
  ('b0000006-0003-0000-0000-000000000013', 'a0000006-0003-0000-0000-000000000007', 'Early Civilizations & Ashoka', 'Harappan urbanism, Mauryan Empire, and Ashokan edicts', 'Medium'),
  ('b0000006-0003-0000-0000-000000000014', 'a0000006-0003-0000-0000-000000000007', 'Earth Domains & Diversity', 'Atmosphere, hydrosphere, government, and equality', 'Easy'),
  ('b0000006-0004-0000-0000-000000000015', 'a0000006-0004-0000-0000-000000000008', 'Sentence Structure & Conjunctions', 'Coordinating conjunctions, subordinate clauses, and idioms', 'Medium'),
  ('b0000006-0004-0000-0000-000000000016', 'a0000006-0004-0000-0000-000000000008', 'Voice & Direct Speech', 'Active to passive voice conversions, reporting verbs', 'Hard')
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBTOPICS (CLASS 5 & 6)
-- ----------------------------------------------------------------------------
INSERT INTO subtopic (id, topic_id, name, description, difficulty) VALUES
  ('c0000005-0001-0000-0000-000000000001', 'b0000005-0001-0000-0000-000000000001', 'Place Value & Operations', 'Indian & international place value, rounding off', 'Easy'),
  ('c0000005-0001-0000-0000-000000000002', 'b0000005-0001-0000-0000-000000000001', 'Fraction Operations', 'Like/unlike fractions, addition, mixed numbers', 'Medium'),
  ('c0000005-0001-0000-0000-000000000003', 'b0000005-0001-0000-0000-000000000002', 'Geometric Angles', 'Classification of acute, right, obtuse angles', 'Easy'),
  ('c0000005-0001-0000-0000-000000000004', 'b0000005-0001-0000-0000-000000000002', 'Perimeter & Area', 'Calculations for rectangles and squares', 'Medium'),

  ('c0000005-0002-0000-0000-000000000005', 'b0000005-0002-0000-0000-000000000003', 'Plant Nutrition & Dispersal', 'Photosynthesis, chlorophyll, seed dispersal methods', 'Easy'),
  ('c0000005-0002-0000-0000-000000000006', 'b0000005-0002-0000-0000-000000000003', 'Aquatic & Desert Plants', 'Hydrophytes, xerophytes, and root adaptations', 'Medium'),
  ('c0000005-0002-0000-0000-000000000007', 'b0000005-0002-0000-0000-000000000004', 'Human Digestive Canal', 'Enzymes, stomach, small intestine, absorption', 'Medium'),
  ('c0000005-0002-0000-0000-000000000008', 'b0000005-0002-0000-0000-000000000004', 'Skeletal & Muscular System', 'Joint types, tendons, ligaments, and posture', 'Hard'),

  ('c0000005-0003-0000-0000-000000000009', 'b0000005-0003-0000-0000-000000000005', 'Latitudes & Longitudes', 'Equator, meridians, time zones, hemispheres', 'Easy'),
  ('c0000005-0003-0000-0000-000000000010', 'b0000005-0003-0000-0000-000000000005', 'Continents & Oceans', 'Global landmasses, trenches, ocean currents', 'Easy'),
  ('c0000005-0003-0000-0000-000000000011', 'b0000005-0003-0000-0000-000000000006', '1857 Uprising Leaders', 'Mangal Pandey, Rani Lakshmibai, Nana Sahib', 'Medium'),
  ('c0000005-0003-0000-0000-000000000012', 'b0000005-0003-0000-0000-000000000006', 'National Movement 1920-1947', 'Non-Cooperation, Dandi March, Independence', 'Hard'),

  ('c0000005-0004-0000-0000-000000000013', 'b0000005-0004-0000-0000-000000000007', 'Nouns & Pronouns', 'Collective nouns, abstract nouns, relative pronouns', 'Easy'),
  ('c0000005-0004-0000-0000-000000000014', 'b0000005-0004-0000-0000-000000000007', 'Prepositions & Articles', 'Prepositions of place, definite & indefinite articles', 'Medium'),
  ('c0000005-0004-0000-0000-000000000015', 'b0000005-0004-0000-0000-000000000008', 'Tenses in Application', 'Present continuous, simple past, future forms', 'Medium'),
  ('c0000005-0004-0000-0000-000000000016', 'b0000005-0004-0000-0000-000000000008', 'Antonyms & Word Meanings', 'Lexical opposites, contextual meanings', 'Hard'),

  ('c0000006-0001-0000-0000-000000000017', 'b0000006-0001-0000-0000-000000000009', 'Operations on Integers', 'Addition, subtraction, sign rules', 'Medium'),
  ('c0000006-0001-0000-0000-000000000018', 'b0000006-0001-0000-0000-000000000009', 'Number Line & Ordering', 'Ordering integers, distance between points', 'Easy'),
  ('c0000006-0001-0000-0000-000000000019', 'b0000006-0001-0000-0000-000000000010', 'Algebraic Statements', 'Writing terms, coefficients, constants', 'Medium'),
  ('c0000006-0001-0000-0000-000000000020', 'b0000006-0001-0000-0000-000000000010', 'Ratio & Unitary Method', 'Simplifying ratios, cost per unit calculations', 'Hard'),

  ('c0000006-0002-0000-0000-000000000021', 'b0000006-0002-0000-0000-000000000011', 'Nutritional Deficiencies', 'Vitamins A, B, C, D deficiencies and sources', 'Easy'),
  ('c0000006-0002-0000-0000-000000000022', 'b0000006-0002-0000-0000-000000000011', 'Separation Techniques', 'Sieving, filtration, evaporation, winnowing', 'Medium'),
  ('c0000006-0002-0000-0000-000000000023', 'b0000006-0002-0000-0000-000000000012', 'Electric Circuits & Switches', 'Circuit diagrams, switches, closed path flow', 'Easy'),
  ('c0000006-0002-0000-0000-000000000024', 'b0000006-0002-0000-0000-000000000012', 'Light, Shadows & Reflection', 'Pinhole camera, opaque/transparent bodies, mirrors', 'Medium'),

  ('c0000006-0003-0000-0000-000000000025', 'b0000006-0003-0000-0000-000000000013', 'Harappan Town Architecture', 'Granary, Great Bath, baked bricks, seals', 'Medium'),
  ('c0000006-0003-0000-0000-000000000026', 'b0000006-0003-0000-0000-000000000013', 'Ashoka & Dhamma Policy', 'Kalinga war, rock edicts, Buddhist propagation', 'Hard'),
  ('c0000006-0003-0000-0000-000000000027', 'b0000006-0003-0000-0000-000000000014', 'Atmosphere & Lithosphere', 'Atmospheric zones, plateaus, mountains, plains', 'Easy'),
  ('c0000006-0003-0000-0000-000000000028', 'b0000006-0003-0000-0000-000000000014', 'Democratic Governance', 'Elections, rule of law, addressing discrimination', 'Medium'),

  ('c0000006-0004-0000-0000-000000000029', 'b0000006-0004-0000-0000-000000000015', 'Conjunctions & Compound Clauses', 'Coordinating linkers, compound sentences', 'Easy'),
  ('c0000006-0004-0000-0000-000000000030', 'b0000006-0004-0000-0000-000000000015', 'Complex Sentences & Clauses', 'Relative clauses (who, which, whose)', 'Medium'),
  ('c0000006-0004-0000-0000-000000000031', 'b0000006-0004-0000-0000-000000000016', 'Active & Passive Voice', 'Present, past, and modal auxiliary transformations', 'Medium'),
  ('c0000006-0004-0000-0000-000000000032', 'b0000006-0004-0000-0000-000000000016', 'Direct to Indirect Speech', 'Reporting statements, tense backshift basics', 'Hard')
ON CONFLICT DO NOTHING;




-- ----------------------------------------------------------------------------
-- QUESTIONS 1 - 50 (CLASS 5)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty,question_type) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'What is the place value of the digit 7 in the number 5,74,320?', 'c0000005-0001-0000-0000-000000000001', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000002', 'Which number represents five million twenty-four thousand in standard notation?', 'c0000005-0001-0000-0000-000000000001', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000003', 'Write the successor of 99,999 in numeric digits.', 'c0000005-0001-0000-0000-000000000001', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000004', 'What is the sum of 3/8 and 2/8 in simplest form?', 'c0000005-0001-0000-0000-000000000002', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000005', 'Convert the improper fraction 17/4 into a mixed fraction.', 'c0000005-0001-0000-0000-000000000002', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000006', 'Find the equivalent fraction of 2/3 with denominator 15.', 'c0000005-0001-0000-0000-000000000002', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000007', 'What kind of angle measures exactly 90 degrees?', 'c0000005-0001-0000-0000-000000000003', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000008', 'An angle measuring 135 degrees is classified as:', 'c0000005-0001-0000-0000-000000000003', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000009', 'What is the perimeter of a rectangle with length 12 cm and breadth 8 cm?', 'c0000005-0001-0000-0000-000000000004', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000010', 'Calculate the area of a square playground whose each side is 15 meters long.', 'c0000005-0001-0000-0000-000000000004', 'Hard', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000011', 'Which green pigment in leaves absorbs solar energy for photosynthesis?', 'c0000005-0002-0000-0000-000000000005', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000012', 'What gas is released by green plants as a byproduct of photosynthesis?', 'c0000005-0002-0000-0000-000000000005', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000013', 'Name the tiny microscopic pores on plant leaf surfaces through which gas exchange occurs.', 'c0000005-0002-0000-0000-000000000005', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000014', 'Seeds of dandelion and madar are primarily dispersed by which agent?', 'c0000005-0002-0000-0000-000000000006', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000015', 'How do desert plants like cacti reduce water loss through transpiration?', 'c0000005-0002-0000-0000-000000000006', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000016', 'In the human digestive system, where is bile juice produced?', 'c0000005-0002-0000-0000-000000000007', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000017', 'Which organ in the digestive canal is primarily responsible for absorbing water from undigested food?', 'c0000005-0002-0000-0000-000000000007', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000018', 'Which joint allows circular rotation movement in all directions in the human shoulder?', 'c0000005-0002-0000-0000-000000000008', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000019', 'What strong elastic tissue connects bone to another bone at a joint?', 'c0000005-0002-0000-0000-000000000008', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000020', 'Which imaginary line divides the Earth into the Northern and Southern Hemispheres?', 'c0000005-0003-0000-0000-000000000009', 'Easy', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000021', 'What is the latitude degree value of the Tropic of Cancer?', 'c0000005-0003-0000-0000-000000000009', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000022', 'Which continent is both the largest by land area and the most populated on Earth?', 'c0000005-0003-0000-0000-000000000010', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000023', 'Name the deepest ocean trench in the world, located in the Pacific Ocean.', 'c0000005-0003-0000-0000-000000000010', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000024', 'Who was the Indian sepoy that spearheaded the 1857 revolt at Barrackpore?', 'c0000005-0003-0000-0000-000000000011', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000025', 'In which year was the Quit India Movement launched under Mahatma Gandhi?', 'c0000005-0003-0000-0000-000000000012', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000026', 'Identify the abstract noun in: "Her honesty won her great respect."', 'c0000005-0004-0000-0000-000000000013', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000027', 'What is the correct collective noun for a group of wolves?', 'c0000005-0004-0000-0000-000000000013', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000028', 'Complete with the preposition: "The treasure was buried _____ the old oak tree."', 'c0000005-0004-0000-0000-000000000014', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000029', 'Choose the past continuous tense form: "They _____ when the phone rang."', 'c0000005-0004-0000-0000-000000000015', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000030', 'Give the antonym of the adjective "ancient".', 'c0000005-0004-0000-0000-000000000016', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000031', 'What is the place value of 9 in 492,851?', 'c0000005-0001-0000-0000-000000000001', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000032', 'Round off 4,872 to the nearest hundred.', 'c0000005-0001-0000-0000-000000000001', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000033', 'What is 3/5 + 1/10?', 'c0000005-0001-0000-0000-000000000002', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000034', 'Solve: 5/6 - 1/3 in lowest terms.', 'c0000005-0001-0000-0000-000000000002', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000035', 'How many degrees are there in a straight line angle?', 'c0000005-0001-0000-0000-000000000003', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000036', 'What is an angle greater than 180 degrees but less than 360 degrees called?', 'c0000005-0001-0000-0000-000000000003', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000037', 'Find the perimeter of an equilateral triangle with side length 9 cm.', 'c0000005-0001-0000-0000-000000000004', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000038', 'A garden has length 20 m and width 10 m. What is its total area?', 'c0000005-0001-0000-0000-000000000004', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000039', 'Which part of a flower develops into a fruit after fertilization?', 'c0000005-0002-0000-0000-000000000005', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000040', 'Lotus seeds are dispersed across water bodies primarily through their:', 'c0000005-0002-0000-0000-000000000005', 'Medium', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000041', 'What adaptation allows water hyacinth to float on the water surface?', 'c0000005-0002-0000-0000-000000000006', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000042', 'Which enzyme in human saliva begins the breakdown of carbohydrates?', 'c0000005-0002-0000-0000-000000000007', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000043', 'Where does complete digestion of food and nutrient absorption occur?', 'c0000005-0002-0000-0000-000000000007', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000044', 'How many total bones form the adult human skeleton?', 'c0000005-0002-0000-0000-000000000008', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000045', 'What is the Prime Meridian longitude value?', 'c0000005-0003-0000-0000-000000000009', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000046', 'Which ocean surrounds the continent of Antarctica?', 'c0000005-0003-0000-0000-000000000010', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000047', 'Who led the Indian National Army (Azad Hind Fauj)?', 'c0000005-0003-0000-0000-000000000012', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000048', 'Who is known as the "Father of the Indian Constitution"?', 'c0000005-0003-0000-0000-000000000012', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000049', 'Identify the pronoun in: "He gave me a beautiful gift."', 'c0000005-0004-0000-0000-000000000013', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000050', 'Fill the blank: "Honesty is _____ best policy."', 'c0000005-0004-0000-0000-000000000014', 'Easy', 'SAQ')
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- QUESTIONS 51 - 100 (CLASS 6)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty, question_type) VALUES
  ('d0000000-0000-0000-0000-000000000051', 'What is the value of (-15) + (+23)?', 'c0000006-0001-0000-0000-000000000017', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000052', 'Subtract (-10) from (-4).', 'c0000006-0001-0000-0000-000000000017', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000053', 'What is the additive inverse of -47?', 'c0000006-0001-0000-0000-000000000017', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000054', 'On a horizontal number line, which integer lies 4 units to the left of -2?', 'c0000006-0001-0000-0000-000000000018', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000055', 'Arrange the integers -5, 3, -1, 0, 7 in ascending order.', 'c0000006-0001-0000-0000-000000000018', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000056', 'Express algebraically: "7 added to three times x".', 'c0000006-0001-0000-0000-000000000019', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000057', 'What is the coefficient of x in the term -12x?', 'c0000006-0001-0000-0000-000000000019', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000058', 'Solve the linear equation: 2y - 5 = 11. What is the value of y?', 'c0000006-0001-0000-0000-000000000020', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000059', 'If 6 pens cost ₹72, what is the cost of 10 pens using the unitary method?', 'c0000006-0001-0000-0000-000000000020', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000060', 'Simplify the ratio 25 : 45 to its lowest terms.', 'c0000006-0001-0000-0000-000000000020', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000061', 'A blue-black color test with dilute iodine solution confirms the presence of:', 'c0000006-0002-0000-0000-000000000021', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000062', 'Which disease is caused by prolonged deficiency of Vitamin C?', 'c0000006-0002-0000-0000-000000000021', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000063', 'Deficiency of Vitamin D causes weak and soft bones, a condition called:', 'c0000006-0002-0000-0000-000000000021', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000064', 'Which separation method is used to separate heavier wheat grains from lighter husk using wind?', 'c0000006-0002-0000-0000-000000000022', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000065', 'Name the process of settling down of heavier insoluble solids in liquid.', 'c0000006-0002-0000-0000-000000000022', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000066', 'In an electric cell, chemical energy is converted directly into:', 'c0000006-0002-0000-0000-000000000023', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000067', 'What is an open electric circuit?', 'c0000006-0002-0000-0000-000000000023', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000068', 'Which property of light allows the formation of shadows behind opaque bodies?', 'c0000006-0002-0000-0000-000000000024', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000069', 'What type of image is formed on the screen of a pinhole camera?', 'c0000006-0002-0000-0000-000000000024', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000070', 'Which ancient Indus city is famously known for its sophisticated dockyard?', 'c0000006-0003-0000-0000-000000000025', 'Medium', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000071', 'Which Indus Valley site has revealed fire altars and furrowed agricultural fields?', 'c0000006-0003-0000-0000-000000000025', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000072', 'Which war brought about a deep transformation in Emperor Ashoka mindset towards non-violence?', 'c0000006-0003-0000-0000-000000000026', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000073', 'In what script were most of Ashoka Prakrit inscriptions carved?', 'c0000006-0003-0000-0000-000000000026', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000074', 'Which gas is the most abundant by volume in Earth atmosphere?', 'c0000006-0003-0000-0000-000000000027', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000075', 'What is the narrow contact zone of land, water, and air where life thrives called?', 'c0000006-0003-0000-0000-000000000027', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000076', 'What is universal adult franchise in Indian democracy?', 'c0000006-0003-0000-0000-000000000028', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000077', 'Which article of the Indian Constitution abolished untouchability?', 'c0000006-0003-0000-0000-000000000028', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000078', 'Choose the coordinating conjunction: "He was intelligent _____ hardworking."', 'c0000006-0004-0000-0000-000000000029', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000079', 'Combine into a single sentence using "because": "She stayed home. She was feeling unwell."', 'c0000006-0004-0000-0000-000000000029', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000080', 'Identify the relative pronoun in: "The boy who scored first rank is my cousin."', 'c0000006-0004-0000-0000-000000000030', 'Easy', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000081', 'Convert to Passive Voice: "The mechanic repaired the motorcycle."', 'c0000006-0004-0000-0000-000000000031', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000082', 'Convert to Passive Voice: "The teacher praised the students."', 'c0000006-0004-0000-0000-000000000031', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000083', 'Change to indirect speech: "Ravi said, ''I am writing a story.''"', 'c0000006-0004-0000-0000-000000000032', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000084', 'Change to indirect speech: "She said, ''I like mathematics.''"', 'c0000006-0004-0000-0000-000000000032', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000085', 'What is the sum of -30 and -45?', 'c0000006-0001-0000-0000-000000000017', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000086', 'Which integer is neither positive nor negative?', 'c0000006-0001-0000-0000-000000000018', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000087', 'Evaluate 4a - 3b when a = 5 and b = 2.', 'c0000006-0001-0000-0000-000000000019', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000088', 'Solve: x/5 = 9. Find x.', 'c0000006-0001-0000-0000-000000000020', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000089', 'Which vitamin is synthesized in human skin upon exposure to sunlight?', 'c0000006-0002-0000-0000-000000000021', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000090', 'Name the separation method used to separate pure salt from seawater.', 'c0000006-0002-0000-0000-000000000022', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000091', 'What filament metal is commonly used in traditional incandescent bulbs?', 'c0000006-0002-0000-0000-000000000023', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000092', 'Objects that emit light of their own are called:', 'c0000006-0002-0000-0000-000000000024', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000093', 'What is the reflection of light from a polished flat mirror called?', 'c0000006-0002-0000-0000-000000000024', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000094', 'Which river valley nurtured the earliest urban cities in the Indian subcontinent?', 'c0000006-0003-0000-0000-000000000025', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000095', 'What animal emblem atop the Sarnath pillar was adopted as the National Emblem of India?', 'c0000006-0003-0000-0000-000000000026', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000096', 'Which is the second most abundant gas in the atmosphere supporting animal respiration?', 'c0000006-0003-0000-0000-000000000027', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000097', 'At what age does an Indian citizen attain the constitutional right to vote?', 'c0000006-0003-0000-0000-000000000028', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000098', 'Choose the correct preposition: "The cat jumped _____ the fence."', 'c0000006-0004-0000-0000-000000000029', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000099', 'What is the passive form of: "The boy kicked the football"?', 'c0000006-0004-0000-0000-000000000031', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000100', 'Give the synonym of "courageous".', 'c0000006-0004-0000-0000-000000000032', 'Easy', 'SAQ')
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- OPTIONS FOR QUESTIONS 1 - 100
-- ----------------------------------------------------------------------------
INSERT INTO option (question_id, answer, is_correct) VALUES
  -- Q1
  ('d0000000-0000-0000-0000-000000000001', '70,000', true),
  ('d0000000-0000-0000-0000-000000000001', '7,000', false),
  ('d0000000-0000-0000-0000-000000000001', '700', false),
  ('d0000000-0000-0000-0000-000000000001', '7,00,000', false),
  -- Q2
  ('d0000000-0000-0000-0000-000000000002', '5,024,000', true),
  ('d0000000-0000-0000-0000-000000000002', '5,240,000', false),
  ('d0000000-0000-0000-0000-000000000002', '5,002,400', false),
  ('d0000000-0000-0000-0000-000000000002', '5,204,000', false),
  -- Q3 (SAQ)
  ('d0000000-0000-0000-0000-000000000003', '100,000', true),
  -- Q4
  ('d0000000-0000-0000-0000-000000000004', '5/8', true),
  ('d0000000-0000-0000-0000-000000000004', '6/16', false),
  ('d0000000-0000-0000-0000-000000000004', '1/2', false),
  ('d0000000-0000-0000-0000-000000000004', '7/8', false),
  -- Q5
  ('d0000000-0000-0000-0000-000000000005', '4 1/4', true),
  ('d0000000-0000-0000-0000-000000000005', '3 3/4', false),
  ('d0000000-0000-0000-0000-000000000005', '4 3/4', false),
  ('d0000000-0000-0000-0000-000000000005', '5 1/4', false),
  -- Q6 (SAQ)
  ('d0000000-0000-0000-0000-000000000006', '10/15', true),
  -- Q7
  ('d0000000-0000-0000-0000-000000000007', 'Right angle', true),
  ('d0000000-0000-0000-0000-000000000007', 'Acute angle', false),
  ('d0000000-0000-0000-0000-000000000007', 'Obtuse angle', false),
  ('d0000000-0000-0000-0000-000000000007', 'Reflex angle', false),
  -- Q8
  ('d0000000-0000-0000-0000-000000000008', 'Obtuse angle', true),
  ('d0000000-0000-0000-0000-000000000008', 'Acute angle', false),
  ('d0000000-0000-0000-0000-000000000008', 'Straight angle', false),
  ('d0000000-0000-0000-0000-000000000008', 'Complete angle', false),
  -- Q9
  ('d0000000-0000-0000-0000-000000000009', '40 cm', true),
  ('d0000000-0000-0000-0000-000000000009', '96 cm', false),
  ('d0000000-0000-0000-0000-000000000009', '20 cm', false),
  ('d0000000-0000-0000-0000-000000000009', '48 cm', false),
  -- Q10 (SAQ)
  ('d0000000-0000-0000-0000-000000000010', '225 sq m', true),

  -- Q11
  ('d0000000-0000-0000-0000-000000000011', 'Chlorophyll', true),
  ('d0000000-0000-0000-0000-000000000011', 'Carotene', false),
  ('d0000000-0000-0000-0000-000000000011', 'Hemoglobin', false),
  ('d0000000-0000-0000-0000-000000000011', 'Xanthophyll', false),
  -- Q12
  ('d0000000-0000-0000-0000-000000000012', 'Oxygen', true),
  ('d0000000-0000-0000-0000-000000000012', 'Carbon dioxide', false),
  ('d0000000-0000-0000-0000-000000000012', 'Nitrogen', false),
  ('d0000000-0000-0000-0000-000000000012', 'Hydrogen', false),
  -- Q13 (SAQ)
  ('d0000000-0000-0000-0000-000000000013', 'Stomata', true),
  -- Q14
  ('d0000000-0000-0000-0000-000000000014', 'Wind', true),
  ('d0000000-0000-0000-0000-000000000014', 'Water currents', false),
  ('d0000000-0000-0000-0000-000000000014', 'Insects', false),
  ('d0000000-0000-0000-0000-000000000014', 'Explosion', false),
  -- Q15
  ('d0000000-0000-0000-0000-000000000015', 'Leaves modified into sharp spines', true),
  ('d0000000-0000-0000-0000-000000000015', 'Growing very large broad leaves', false),
  ('d0000000-0000-0000-0000-000000000015', 'Having thin porous stems', false),
  ('d0000000-0000-0000-0000-000000000015', 'Shedding roots during winter', false),
  -- Q16
  ('d0000000-0000-0000-0000-000000000016', 'Liver', true),
  ('d0000000-0000-0000-0000-000000000016', 'Stomach', false),
  ('d0000000-0000-0000-0000-000000000016', 'Pancreas', false),
  ('d0000000-0000-0000-0000-000000000016', 'Large intestine', false),
  -- Q17 (SAQ)
  ('d0000000-0000-0000-0000-000000000017', 'Large intestine', true),
  -- Q18
  ('d0000000-0000-0000-0000-000000000018', 'Ball-and-socket joint', true),
  ('d0000000-0000-0000-0000-000000000018', 'Hinge joint', false),
  ('d0000000-0000-0000-0000-000000000018', 'Pivot joint', false),
  ('d0000000-0000-0000-0000-000000000018', 'Fixed joint', false),
  -- Q19 (SAQ)
  ('d0000000-0000-0000-0000-000000000019', 'Ligament', true),
  -- Q20
  ('d0000000-0000-0000-0000-000000000020', 'Equator', true),
  ('d0000000-0000-0000-0000-000000000020', 'Prime Meridian', false),
  ('d0000000-0000-0000-0000-000000000020', 'Tropic of Cancer', false),
  ('d0000000-0000-0000-0000-000000000020', 'Arctic Circle', false),

  -- Q21
  ('d0000000-0000-0000-0000-000000000021', '23.5 degrees North', true),
  ('d0000000-0000-0000-0000-000000000021', '23.5 degrees South', false),
  ('d0000000-0000-0000-0000-000000000021', '66.5 degrees North', false),
  ('d0000000-0000-0000-0000-000000000021', '0 degrees', false),
  -- Q22
  ('d0000000-0000-0000-0000-000000000022', 'Asia', true),
  ('d0000000-0000-0000-0000-000000000022', 'Africa', false),
  ('d0000000-0000-0000-0000-000000000022', 'Europe', false),
  ('d0000000-0000-0000-0000-000000000022', 'North America', false),
  -- Q23 (SAQ)
  ('d0000000-0000-0000-0000-000000000023', 'Mariana Trench', true),
  -- Q24
  ('d0000000-0000-0000-0000-000000000024', 'Mangal Pandey', true),
  ('d0000000-0000-0000-0000-000000000024', 'Bhagat Singh', false),
  ('d0000000-0000-0000-0000-000000000024', 'Tantia Tope', false),
  ('d0000000-0000-0000-0000-000000000024', 'Kunwar Singh', false),
  -- Q25 (SAQ)
  ('d0000000-0000-0000-0000-000000000025', '1942', true),
  -- Q26
  ('d0000000-0000-0000-0000-000000000026', 'Honesty', true),
  ('d0000000-0000-0000-0000-000000000026', 'Won', false),
  ('d0000000-0000-0000-0000-000000000026', 'Her', false),
  ('d0000000-0000-0000-0000-000000000026', 'Great', false),
  -- Q27
  ('d0000000-0000-0000-0000-000000000027', 'Pack', true),
  ('d0000000-0000-0000-0000-000000000027', 'Herd', false),
  ('d0000000-0000-0000-0000-000000000027', 'Flock', false),
  ('d0000000-0000-0000-0000-000000000027', 'Pride', false),
  -- Q28
  ('d0000000-0000-0000-0000-000000000028', 'under', true),
  ('d0000000-0000-0000-0000-000000000028', 'between', false),
  ('d0000000-0000-0000-0000-000000000028', 'along', false),
  ('d0000000-0000-0000-0000-000000000028', 'among', false),
  -- Q29
  ('d0000000-0000-0000-0000-000000000029', 'were sleeping', true),
  ('d0000000-0000-0000-0000-000000000029', 'slept', false),
  ('d0000000-0000-0000-0000-000000000029', 'are sleeping', false),
  ('d0000000-0000-0000-0000-000000000029', 'had sleep', false),
  -- Q30 (SAQ)
  ('d0000000-0000-0000-0000-000000000030', 'Modern', true),

  -- Q31
  ('d0000000-0000-0000-0000-000000000031', '90,000', true),
  ('d0000000-0000-0000-0000-000000000031', '9,000', false),
  ('d0000000-0000-0000-0000-000000000031', '900', false),
  ('d0000000-0000-0000-0000-000000000031', '9,00,000', false),
  -- Q32
  ('d0000000-0000-0000-0000-000000000032', '4,900', true),
  ('d0000000-0000-0000-0000-000000000032', '4,800', false),
  ('d0000000-0000-0000-0000-000000000032', '5,000', false),
  ('d0000000-0000-0000-0000-000000000032', '4,870', false),
  -- Q33
  ('d0000000-0000-0000-0000-000000000033', '7/10', true),
  ('d0000000-0000-0000-0000-000000000033', '4/15', false),
  ('d0000000-0000-0000-0000-000000000033', '3/10', false),
  ('d0000000-0000-0000-0000-000000000033', '4/10', false),
  -- Q34 (SAQ)
  ('d0000000-0000-0000-0000-000000000034', '1/2', true),
  -- Q35
  ('d0000000-0000-0000-0000-000000000035', '180 degrees', true),
  ('d0000000-0000-0000-0000-000000000035', '90 degrees', false),
  ('d0000000-0000-0000-0000-000000000035', '360 degrees', false),
  ('d0000000-0000-0000-0000-000000000035', '270 degrees', false),
  -- Q36
  ('d0000000-0000-0000-0000-000000000036', 'Reflex angle', true),
  ('d0000000-0000-0000-0000-000000000036', 'Obtuse angle', false),
  ('d0000000-0000-0000-0000-000000000036', 'Complete angle', false),
  ('d0000000-0000-0000-0000-000000000036', 'Acute angle', false),
  -- Q37
  ('d0000000-0000-0000-0000-000000000037', '27 cm', true),
  ('d0000000-0000-0000-0000-000000000037', '18 cm', false),
  ('d0000000-0000-0000-0000-000000000037', '81 cm', false),
  ('d0000000-0000-0000-0000-000000000037', '36 cm', false),
  -- Q38 (SAQ)
  ('d0000000-0000-0000-0000-000000000038', '200 sq m', true),
  -- Q39
  ('d0000000-0000-0000-0000-000000000039', 'Ovary', true),
  ('d0000000-0000-0000-0000-000000000039', 'Petal', false),
  ('d0000000-0000-0000-0000-000000000039', 'Sepal', false),
  ('d0000000-0000-0000-0000-000000000039', 'Stamen', false),
  -- Q40
  ('d0000000-0000-0000-0000-000000000040', 'Spongy fruit that floats on water', true),
  ('d0000000-0000-0000-0000-000000000040', 'Winged seed pods blown by wind', false),
  ('d0000000-0000-0000-0000-000000000040', 'Spines attaching to birds', false),
  ('d0000000-0000-0000-0000-000000000040', 'Explosive bursting of pods', false),

  -- Q41
  ('d0000000-0000-0000-0000-000000000041', 'Spongy air-filled swollen petioles', true),
  ('d0000000-0000-0000-0000-000000000041', 'Deep taproots anchored in seabed', false),
  ('d0000000-0000-0000-0000-000000000041', 'Thorny leaves for defense', false),
  ('d0000000-0000-0000-0000-000000000041', 'Woody waterproof bark', false),
  -- Q42 (SAQ)
  ('d0000000-0000-0000-0000-000000000042', 'Salivary amylase', true),
  -- Q43
  ('d0000000-0000-0000-0000-000000000043', 'Small intestine', true),
  ('d0000000-0000-0000-0000-000000000043', 'Stomach', false),
  ('d0000000-0000-0000-0000-000000000043', 'Esophagus', false),
  ('d0000000-0000-0000-0000-000000000043', 'Liver', false),
  -- Q44
  ('d0000000-0000-0000-0000-000000000044', '206', true),
  ('d0000000-0000-0000-0000-000000000044', '300', false),
  ('d0000000-0000-0000-0000-000000000044', '180', false),
  ('d0000000-0000-0000-0000-000000000044', '250', false),
  -- Q45
  ('d0000000-0000-0000-0000-000000000045', '0 degrees longitude', true),
  ('d0000000-0000-0000-0000-000000000045', '90 degrees East', false),
  ('d0000000-0000-0000-0000-000000000045', '180 degrees', false),
  ('d0000000-0000-0000-0000-000000000045', '23.5 degrees West', false),
  -- Q46
  ('d0000000-0000-0000-0000-000000000046', 'Southern Ocean', true),
  ('d0000000-0000-0000-0000-000000000046', 'Arctic Ocean', false),
  ('d0000000-0000-0000-0000-000000000046', 'Indian Ocean', false),
  ('d0000000-0000-0000-0000-000000000046', 'Atlantic Ocean', false),
  -- Q47
  ('d0000000-0000-0000-0000-000000000047', 'Subhas Chandra Bose', true),
  ('d0000000-0000-0000-0000-000000000047', 'Jawaharlal Nehru', false),
  ('d0000000-0000-0000-0000-000000000047', 'Sardar Vallabhbhai Patel', false),
  ('d0000000-0000-0000-0000-000000000047', 'Lal Bahadur Shastri', false),
  -- Q48 (SAQ)
  ('d0000000-0000-0000-0000-000000000048', 'Dr. B. R. Ambedkar', true),
  -- Q49
  ('d0000000-0000-0000-0000-000000000049', 'He', true),
  ('d0000000-0000-0000-0000-000000000049', 'Gave', false),
  ('d0000000-0000-0000-0000-000000000049', 'Beautiful', false),
  ('d0000000-0000-0000-0000-000000000049', 'Gift', false),
  -- Q50 (SAQ)
  ('d0000000-0000-0000-0000-000000000050', 'the', true),

  -- Q51
  ('d0000000-0000-0000-0000-000000000051', '8', true),
  ('d0000000-0000-0000-0000-000000000051', '-8', false),
  ('d0000000-0000-0000-0000-000000000051', '38', false),
  ('d0000000-0000-0000-0000-000000000051', '-38', false),
  -- Q52
  ('d0000000-0000-0000-0000-000000000052', '6', true),
  ('d0000000-0000-0000-0000-000000000052', '-14', false),
  ('d0000000-0000-0000-0000-000000000052', '-6', false),
  ('d0000000-0000-0000-0000-000000000052', '14', false),
  -- Q53 (SAQ)
  ('d0000000-0000-0000-0000-000000000053', '47', true),
  -- Q54
  ('d0000000-0000-0000-0000-000000000054', '-6', true),
  ('d0000000-0000-0000-0000-000000000054', '2', false),
  ('d0000000-0000-0000-0000-000000000054', '-2', false),
  ('d0000000-0000-0000-0000-000000000054', '6', false),
  -- Q55 (SAQ)
  ('d0000000-0000-0000-0000-000000000055', '-5, -1, 0, 3, 7', true),
  -- Q56
  ('d0000000-0000-0000-0000-000000000056', '3x + 7', true),
  ('d0000000-0000-0000-0000-000000000056', '7x + 3', false),
  ('d0000000-0000-0000-0000-000000000056', '21x', false),
  ('d0000000-0000-0000-0000-000000000056', 'x/3 + 7', false),
  -- Q57 (SAQ)
  ('d0000000-0000-0000-0000-000000000057', '-12', true),
  -- Q58
  ('d0000000-0000-0000-0000-000000000058', '8', true),
  ('d0000000-0000-0000-0000-000000000058', '6', false),
  ('d0000000-0000-0000-0000-000000000058', '3', false),
  ('d0000000-0000-0000-0000-000000000058', '16', false),
  -- Q59
  ('d0000000-0000-0000-0000-000000000059', '₹120', true),
  ('d0000000-0000-0000-0000-000000000059', '₹100', false),
  ('d0000000-0000-0000-0000-000000000059', '₹140', false),
  ('d0000000-0000-0000-0000-000000000059', '₹90', false),
  -- Q60 (SAQ)
  ('d0000000-0000-0000-0000-000000000060', '5 : 9', true),

  -- Q61
  ('d0000000-0000-0000-0000-000000000061', 'Starch', true),
  ('d0000000-0000-0000-0000-000000000061', 'Fats', false),
  ('d0000000-0000-0000-0000-000000000061', 'Proteins', false),
  ('d0000000-0000-0000-0000-000000000061', 'Vitamin C', false),
  -- Q62
  ('d0000000-0000-0000-0000-000000000062', 'Scurvy', true),
  ('d0000000-0000-0000-0000-000000000062', 'Rickets', false),
  ('d0000000-0000-0000-0000-000000000062', 'Beriberi', false),
  ('d0000000-0000-0000-0000-000000000062', 'Goitre', false),
  -- Q63
  ('d0000000-0000-0000-0000-000000000063', 'Rickets', true),
  ('d0000000-0000-0000-0000-000000000063', 'Night blindness', false),
  ('d0000000-0000-0000-0000-000000000063', 'Scurvy', false),
  ('d0000000-0000-0000-0000-000000000063', 'Marasmus', false),
  -- Q64
  ('d0000000-0000-0000-0000-000000000064', 'Winnowing', true),
  ('d0000000-0000-0000-0000-000000000064', 'Threshing', false),
  ('d0000000-0000-0000-0000-000000000064', 'Filtration', false),
  ('d0000000-0000-0000-0000-000000000064', 'Handpicking', false),
  -- Q65 (SAQ)
  ('d0000000-0000-0000-0000-000000000065', 'Sedimentation', true),
  -- Q66
  ('d0000000-0000-0000-0000-000000000066', 'Electrical energy', true),
  ('d0000000-0000-0000-0000-000000000066', 'Light energy only', false),
  ('d0000000-0000-0000-0000-000000000066', 'Magnetic energy', false),
  ('d0000000-0000-0000-0000-000000000066', 'Thermal radiation only', false),
  -- Q67
  ('d0000000-0000-0000-0000-000000000067', 'A circuit with an incomplete path where no current flows', true),
  ('d0000000-0000-0000-0000-000000000067', 'A circuit with excessive electric current', false),
  ('d0000000-0000-0000-0000-000000000067', 'A circuit with no battery connected', false),
  ('d0000000-0000-0000-0000-000000000067', 'A complete circuit powering several appliances', false),
  -- Q68
  ('d0000000-0000-0000-0000-000000000068', 'Light travels in a straight line (rectilinear propagation)', true),
  ('d0000000-0000-0000-0000-000000000068', 'Light bends around sharp corners', false),
  ('d0000000-0000-0000-0000-000000000068', 'Light accelerates through dense media', false),
  ('d0000000-0000-0000-0000-000000000068', 'Light scatters in all directions equally', false),
  -- Q69 (SAQ)
  ('d0000000-0000-0000-0000-000000000069', 'Real and inverted', true),
  -- Q70
  ('d0000000-0000-0000-0000-000000000070', 'Lothal', true),
  ('d0000000-0000-0000-0000-000000000070', 'Harappa', false),
  ('d0000000-0000-0000-0000-000000000070', 'Kalibangan', false),
  ('d0000000-0000-0000-0000-000000000070', 'Rakhigarhi', false),

  -- Q71
  ('d0000000-0000-0000-0000-000000000071', 'Kalibangan', true),
  ('d0000000-0000-0000-0000-000000000071', 'Dholavira', false),
  ('d0000000-0000-0000-0000-000000000071', 'Mohenjo-daro', false),
  ('d0000000-0000-0000-0000-000000000071', 'Banawali', false),
  -- Q72
  ('d0000000-0000-0000-0000-000000000072', 'Kalinga War', true),
  ('d0000000-0000-0000-0000-000000000072', 'Battle of Hydaspes', false),
  ('d0000000-0000-0000-0000-000000000072', 'Battle of Magadha', false),
  ('d0000000-0000-0000-0000-000000000072', 'Carnatic War', false),
  -- Q73 (SAQ)
  ('d0000000-0000-0000-0000-000000000073', 'Brahmi script', true),
  -- Q74
  ('d0000000-0000-0000-0000-000000000074', 'Nitrogen (approx 78%)', true),
  ('d0000000-0000-0000-0000-000000000074', 'Oxygen (approx 21%)', false),
  ('d0000000-0000-0000-0000-000000000074', 'Carbon dioxide', false),
  ('d0000000-0000-0000-0000-000000000074', 'Argon', false),
  -- Q75 (SAQ)
  ('d0000000-0000-0000-0000-000000000075', 'Biosphere', true),
  -- Q76
  ('d0000000-0000-0000-0000-000000000076', 'The right of all adult citizens to vote irrespective of gender, caste, or wealth', true),
  ('d0000000-0000-0000-0000-000000000076', 'Voting rights reserved strictly for property taxpayers', false),
  ('d0000000-0000-0000-0000-000000000076', 'Nomination of representatives exclusively by political parties', false),
  ('d0000000-0000-0000-0000-000000000076', 'Special voting privileges for university graduates', false),
  -- Q77 (SAQ)
  ('d0000000-0000-0000-0000-000000000077', 'Article 17', true),
  -- Q78
  ('d0000000-0000-0000-0000-000000000078', 'and', true),
  ('d0000000-0000-0000-0000-000000000078', 'but', false),
  ('d0000000-0000-0000-0000-000000000078', 'unless', false),
  ('d0000000-0000-0000-0000-000000000078', 'although', false),
  -- Q79 (SAQ)
  ('d0000000-0000-0000-0000-000000000079', 'She stayed home because she was feeling unwell.', true),
  -- Q80
  ('d0000000-0000-0000-0000-000000000080', 'who', true),
  ('d0000000-0000-0000-0000-000000000080', 'boy', false),
  ('d0000000-0000-0000-0000-000000000080', 'first', false),
  ('d0000000-0000-0000-0000-000000000080', 'cousin', false),

  -- Q81
  ('d0000000-0000-0000-0000-000000000081', 'The motorcycle was repaired by the mechanic.', true),
  ('d0000000-0000-0000-0000-000000000081', 'The motorcycle is repaired by the mechanic.', false),
  ('d0000000-0000-0000-0000-000000000081', 'The motorcycle was repairing by the mechanic.', false),
  ('d0000000-0000-0000-0000-000000000081', 'The mechanic was repaired by the motorcycle.', false),
  -- Q82 (SAQ)
  ('d0000000-0000-0000-0000-000000000082', 'The students were praised by the teacher.', true),
  -- Q83
  ('d0000000-0000-0000-0000-000000000083', 'Ravi said that he was writing a story.', true),
  ('d0000000-0000-0000-0000-000000000083', 'Ravi said that I am writing a story.', false),
  ('d0000000-0000-0000-0000-000000000083', 'Ravi said that he has been writing a story.', false),
  ('d0000000-0000-0000-0000-000000000083', 'Ravi says that he writes a story.', false),
  -- Q84 (SAQ)
  ('d0000000-0000-0000-0000-000000000084', 'She said that she liked mathematics.', true),
  -- Q85
  ('d0000000-0000-0000-0000-000000000085', '-75', true),
  ('d0000000-0000-0000-0000-000000000085', '15', false),
  ('d0000000-0000-0000-0000-000000000085', '-15', false),
  ('d0000000-0000-0000-0000-000000000085', '75', false),
  -- Q86 (SAQ)
  ('d0000000-0000-0000-0000-000000000086', '0', true),
  -- Q87
  ('d0000000-0000-0000-0000-000000000087', '14', true),
  ('d0000000-0000-0000-0000-000000000087', '26', false),
  ('d0000000-0000-0000-0000-000000000087', '10', false),
  ('d0000000-0000-0000-0000-000000000087', '18', false),
  -- Q88 (SAQ)
  ('d0000000-0000-0000-0000-000000000088', '45', true),
  -- Q89
  ('d0000000-0000-0000-0000-000000000089', 'Vitamin D', true),
  ('d0000000-0000-0000-0000-000000000089', 'Vitamin A', false),
  ('d0000000-0000-0000-0000-000000000089', 'Vitamin B12', false),
  ('d0000000-0000-0000-0000-000000000089', 'Vitamin K', false),
  -- Q90 (SAQ)
  ('d0000000-0000-0000-0000-000000000090', 'Evaporation', true),

  -- Q91
  ('d0000000-0000-0000-0000-000000000091', 'Tungsten', true),
  ('d0000000-0000-0000-0000-000000000091', 'Copper', false),
  ('d0000000-0000-0000-0000-000000000091', 'Aluminum', false),
  ('d0000000-0000-0000-0000-000000000091', 'Silver', false),
  -- Q92
  ('d0000000-0000-0000-0000-000000000092', 'Luminous objects', true),
  ('d0000000-0000-0000-0000-000000000092', 'Non-luminous objects', false),
  ('d0000000-0000-0000-0000-000000000092', 'Transparent objects', false),
  ('d0000000-0000-0000-0000-000000000092', 'Opaque objects', false),
  -- Q93 (SAQ)
  ('d0000000-0000-0000-0000-000000000093', 'Regular reflection', true),
  -- Q94
  ('d0000000-0000-0000-0000-000000000094', 'Indus River Valley', true),
  ('d0000000-0000-0000-0000-000000000094', 'Ganga River Valley', false),
  ('d0000000-0000-0000-0000-000000000094', 'Yamuna River Valley', false),
  ('d0000000-0000-0000-0000-000000000094', 'Narmada Valley', false),
  -- Q95 (SAQ)
  ('d0000000-0000-0000-0000-000000000095', 'Lion Capital of Ashoka', true),
  -- Q96
  ('d0000000-0000-0000-0000-000000000096', 'Oxygen', true),
  ('d0000000-0000-0000-0000-000000000096', 'Carbon dioxide', false),
  ('d0000000-0000-0000-0000-000000000096', 'Argon', false),
  ('d0000000-0000-0000-0000-000000000096', 'Hydrogen', false),
  -- Q97 (SAQ)
  ('d0000000-0000-0000-0000-000000000097', '18 years', true),
  -- Q98
  ('d0000000-0000-0000-0000-000000000098', 'over', true),
  ('d0000000-0000-0000-0000-000000000098', 'underneath', false),
  ('d0000000-0000-0000-0000-000000000098', 'between', false),
  ('d0000000-0000-0000-0000-000000000098', 'amidst', false),
  -- Q99
  ('d0000000-0000-0000-0000-000000000099', 'The football was kicked by the boy.', true),
  ('d0000000-0000-0000-0000-000000000099', 'The football is kicked by the boy.', false),
  ('d0000000-0000-0000-0000-000000000099', 'The football has been kicking by the boy.', false),
  ('d0000000-0000-0000-0000-000000000099', 'The boy was kicked by the football.', false),
  -- Q100 (SAQ)
  ('d0000000-0000-0000-0000-000000000100', 'Brave', true)
ON CONFLICT (question_id, answer) DO NOTHING;

