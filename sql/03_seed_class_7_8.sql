-- ============================================================================
-- 03_SEED_CLASS_7_8.SQL
-- KNOWLEDGEVERSE CURRICULUM SEED: CLASS 7 & CLASS 8 (QUESTIONS 101 - 220)
-- Boards: CBSE, ICSE, BSEB, WBBSE, DBSE
-- ============================================================================

-- ----------------------------------------------------------------------------
-- CLASSES (CLASS 7 & 8)
-- ----------------------------------------------------------------------------
INSERT INTO "class" (id, name, board) VALUES
  ('00000007-0001-0000-0000-000000000000', 'Class 7', 'CBSE'),
  ('00000007-0002-0000-0000-000000000000', 'Class 7', 'ICSE'),
  ('00000007-0003-0000-0000-000000000000', 'Class 7', 'BSEB'),
  ('00000007-0004-0000-0000-000000000000', 'Class 7', 'WBBSE'),
  ('00000007-0005-0000-0000-000000000000', 'Class 7', 'DBSE'),
  ('00000008-0001-0000-0000-000000000000', 'Class 8', 'CBSE'),
  ('00000008-0002-0000-0000-000000000000', 'Class 8', 'ICSE'),
  ('00000008-0003-0000-0000-000000000000', 'Class 8', 'BSEB'),
  ('00000008-0004-0000-0000-000000000000', 'Class 8', 'WBBSE'),
  ('00000008-0005-0000-0000-000000000000', 'Class 8', 'DBSE')
ON CONFLICT (name, board) DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBJECTS (CLASS 7 & 8)
-- ----------------------------------------------------------------------------
INSERT INTO subject (id, class_id, name, description) VALUES
  ('a0000007-0001-0000-0000-000000000009', '00000007-0001-0000-0000-000000000000', 'Mathematics', 'Rational numbers, algebraic expressions, triangles, exponents'),
  ('a0000007-0002-0000-0000-000000000010', '00000007-0002-0000-0000-000000000000', 'Science', 'Nutrition, acids and bases, heat transfer, circulation, respiration'),
  ('a0000007-0003-0000-0000-000000000011', '00000007-0003-0000-0000-000000000000', 'Social Science', 'Medieval Indian history, Delhi Sultanate, climate, local government'),
  ('a0000007-0004-0000-0000-000000000012', '00000007-0004-0000-0000-000000000000', 'English', 'Reported speech, active passive, modals, vocabulary'),
  ('a0000008-0001-0000-0000-000000000013', '00000008-0001-0000-0000-000000000000', 'Mathematics', 'Linear equations, quadrilaterals, mensuration, factorisation'),
  ('a0000008-0002-0000-0000-000000000014', '00000008-0002-0000-0000-000000000000', 'Science', 'Crop production, microorganisms, force and pressure, sound, combustion'),
  ('a0000008-0003-0000-0000-000000000015', '00000008-0005-0000-0000-000000000000', 'Social Science', 'Indian Constitution, secularism, judiciary, resources and industries'),
  ('a0000008-0004-0000-0000-000000000016', '00000008-0001-0000-0000-000000000000', 'English', 'Clauses, subject-verb agreement, idioms, formal writing rules')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- TOPICS (CLASS 7 & 8)
-- ----------------------------------------------------------------------------
INSERT INTO topics (id, subject_id, name, description, difficulty) VALUES
  -- Class 7 Maths
  ('b0000007-0001-0000-0000-000000000017', 'a0000007-0001-0000-0000-000000000009', 'Rational Numbers & Exponents', 'Properties of rational numbers, laws of indices', 'Medium'),
  ('b0000007-0001-0000-0000-000000000018', 'a0000007-0001-0000-0000-000000000009', 'Triangles & Algebraic Expressions', 'Pythagoras theorem, exterior angles, algebraic terms', 'Hard'),
  -- Class 7 Science
  ('b0000007-0002-0000-0000-000000000019', 'a0000007-0002-0000-0000-000000000010', 'Nutrition & Chemical Changes', 'Autotrophic/heterotrophic nutrition, neutralization', 'Easy'),
  ('b0000007-0002-0000-0000-000000000020', 'a0000007-0002-0000-0000-000000000010', 'Heat Transfer & Circulatory System', 'Conduction, convection, radiation, heart and blood', 'Medium'),
  -- Class 7 Social Science
  ('b0000007-0003-0000-0000-000000000021', 'a0000007-0003-0000-0000-000000000011', 'Delhi Sultanate & Mughals', 'Raziya Sultan, Alauddin Khalji, Akbar administrative reforms', 'Medium'),
  ('b0000007-0003-0000-0000-000000000022', 'a0000007-0003-0000-0000-000000000011', 'Atmosphere & Water Circulation', 'Hydrological cycle, ocean tides, atmospheric pressure', 'Easy'),
  -- Class 7 English
  ('b0000007-0004-0000-0000-000000000023', 'a0000007-0004-0000-0000-000000000012', 'Modals & Active-Passive', 'Can, could, must, should, passive voice transformations', 'Medium'),
  ('b0000007-0004-0000-0000-000000000024', 'a0000007-0004-0000-0000-000000000012', 'Direct and Indirect Speech', 'Reporting commands, interrogatives, statement conversion', 'Hard'),

  -- Class 8 Maths
  ('b0000008-0001-0000-0000-000000000025', 'a0000008-0001-0000-0000-000000000013', 'Linear Equations & Quadrilaterals', 'Transposition, angle sum property, parallelogram rules', 'Medium'),
  ('b0000008-0001-0000-0000-000000000026', 'a0000008-0001-0000-0000-000000000013', 'Mensuration & Algebraic Identities', 'Cylinder, cone, surface area, (a+b)^2, factorisation', 'Hard'),
  -- Class 8 Science
  ('b0000008-0002-0000-0000-000000000027', 'a0000008-0002-0000-0000-000000000014', 'Microorganisms & Crop Management', 'Bacteria, fungi, vaccines, drip irrigation, fertilizers', 'Easy'),
  ('b0000008-0002-0000-0000-000000000028', 'a0000008-0002-0000-0000-000000000014', 'Forces, Pressure & Sound', 'Atmospheric pressure, friction reduction, sound frequency', 'Medium'),
  -- Class 8 Social Science
  ('b0000008-0003-0000-0000-000000000029', 'a0000008-0003-0000-0000-000000000015', 'Indian Constitution & Secularism', 'Fundamental Rights, separation of powers, judicial review', 'Easy'),
  ('b0000008-0003-0000-0000-000000000030', 'a0000008-0003-0000-0000-000000000015', 'Mineral & Power Resources', 'Metallic/non-metallic minerals, thermal and solar power', 'Medium'),
  -- Class 8 English
  ('b0000008-0004-0000-0000-000000000031', 'a0000008-0004-0000-0000-000000000016', 'Subject-Verb Concord & Clauses', 'Compound subjects, either/neither rules, noun clauses', 'Medium'),
  ('b0000008-0004-0000-0000-000000000032', 'a0000008-0004-0000-0000-000000000016', 'Phrasal Verbs & Vocabulary', 'Common idioms, phrasal combinations, context clues', 'Hard')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBTOPICS (CLASS 7 & 8)
-- ----------------------------------------------------------------------------
INSERT INTO subtopics (id, topic_id, name, description, difficulty) VALUES
  ('c0000007-0001-0000-0000-000000000033', 'b0000007-0001-0000-0000-000000000017', 'Rational Number Arithmetic', 'Standard form, addition, multiplication of rationals', 'Medium'),
  ('c0000007-0001-0000-0000-000000000034', 'b0000007-0001-0000-0000-000000000017', 'Laws of Exponents', 'Power of a product, zero exponent, negative powers', 'Easy'),
  ('c0000007-0001-0000-0000-000000000035', 'b0000007-0001-0000-0000-000000000018', 'Properties of Triangles', 'Angle sum property, exterior angle theorem, Pythagoras', 'Medium'),
  ('c0000007-0001-0000-0000-000000000036', 'b0000007-0001-0000-0000-000000000018', 'Operations on Algebraic Expressions', 'Adding polynomials, finding values of expressions', 'Hard'),

  ('c0000007-0002-0000-0000-000000000037', 'b0000007-0002-0000-0000-000000000019', 'Photosynthesis & Insectivorous Plants', 'Pitcher plant, saprotrophs, symbiotic fungi', 'Easy'),
  ('c0000007-0002-0000-0000-000000000038', 'b0000007-0002-0000-0000-000000000019', 'Acids, Bases and Indicators', 'Litmus paper, phenolphthalein, neutralization reaction', 'Medium'),
  ('c0000007-0002-0000-0000-000000000039', 'b0000007-0002-0000-0000-000000000020', 'Modes of Heat Transfer', 'Conduction in solids, convection in fluids, radiation', 'Easy'),
  ('c0000007-0002-0000-0000-000000000040', 'b0000007-0002-0000-0000-000000000020', 'Human Blood & Heart Function', 'RBCs, WBCs, platelets, chambers of heart, pulse rate', 'Hard'),

  ('c0000007-0003-0000-0000-000000000041', 'b0000007-0003-0000-0000-000000000021', 'Rulers of Delhi Sultanate', 'Mamluk, Khalji, Tughlaq dynasties and administration', 'Medium'),
  ('c0000007-0003-0000-0000-000000000042', 'b0000007-0003-0000-0000-000000000021', 'Akbar Administrative System', 'Mansabdari system, Sulh-i Kul, revenue administration', 'Hard'),
  ('c0000007-0003-0000-0000-000000000043', 'b0000007-0003-0000-0000-000000000022', 'Composition of Air & Winds', 'Atmospheric pressure, planetary winds, cyclone basics', 'Easy'),
  ('c0000007-0003-0000-0000-000000000044', 'b0000007-0003-0000-0000-000000000022', 'Ocean Currents & Tides', 'Spring tides, neap tides, warm and cold ocean streams', 'Medium'),

  ('c0000007-0004-0000-0000-000000000045', 'b0000007-0004-0000-0000-000000000023', 'Modal Auxiliaries', 'Expressing obligation, possibility, ability with modals', 'Easy'),
  ('c0000007-0004-0000-0000-000000000046', 'b0000007-0004-0000-0000-000000000023', 'Passive with Continuous Tenses', 'Transforming present/past continuous into passive', 'Medium'),
  ('c0000007-0004-0000-0000-000000000047', 'b0000007-0004-0000-0000-000000000024', 'Indirect Speech for Questions', 'Conversion of Wh-questions and Yes/No questions', 'Hard'),
  ('c0000007-0004-0000-0000-000000000048', 'b0000007-0004-0000-0000-000000000024', 'Indirect Speech for Imperatives', 'Reporting commands, requests, and warnings', 'Hard'),

  ('c0000008-0001-0000-0000-000000000049', 'b0000008-0001-0000-0000-000000000025', 'Linear Equations with Variables on Both Sides', 'Solving equations, cross multiplication', 'Medium'),
  ('c0000008-0001-0000-0000-000000000050', 'b0000008-0001-0000-0000-000000000025', 'Types of Quadrilaterals & Angles', 'Trapezium, rhombus, rectangle, diagonal properties', 'Medium'),
  ('c0000008-0001-0000-0000-000000000051', 'b0000008-0001-0000-0000-000000000026', 'Standard Algebraic Identities', '(a+b)^2, (a-b)^2, and (a^2-b^2) expansions', 'Hard'),
  ('c0000008-0001-0000-0000-000000000052', 'b0000008-0001-0000-0000-000000000026', 'Solid Figures & Mensuration', 'Surface area and volume of cuboids and cylinders', 'Hard'),

  ('c0000008-0002-0000-0000-000000000053', 'b0000008-0002-0000-0000-000000000027', 'Agricultural Implements & Irrigation', 'Sowing, seed drill, drip system, sprinkler system', 'Easy'),
  ('c0000008-0002-0000-0000-000000000054', 'b0000008-0002-0000-0000-000000000027', 'Beneficial & Harmful Microbes', 'Lactobacillus, penicillin, fermentation, pathogens', 'Medium'),
  ('c0000008-0002-0000-0000-000000000055', 'b0000008-0002-0000-0000-000000000028', 'Contact and Non-Contact Forces', 'Gravitation, electrostatic force, normal reaction', 'Easy'),
  ('c0000008-0002-0000-0000-000000000056', 'b0000008-0002-0000-0000-000000000028', 'Sound Waves & Human Hearing', 'Frequency, pitch, amplitude, loudness in decibels', 'Hard'),

  ('c0000008-0003-0000-0000-000000000057', 'b0000008-0003-0000-0000-000000000029', 'Key Features of Constitution', 'Federalism, parliamentary form, separation of powers', 'Easy'),
  ('c0000008-0003-0000-0000-000000000058', 'b0000008-0003-0000-0000-000000000029', 'Role of the Independent Judiciary', 'Supreme Court, High Courts, PIL, judicial independence', 'Medium'),
  ('c0000008-0003-0000-0000-000000000059', 'b0000008-0003-0000-0000-000000000030', 'Types of Natural Resources', 'Renewable vs non-renewable, conservation methods', 'Easy'),
  ('c0000008-0003-0000-0000-000000000060', 'b0000008-0003-0000-0000-000000000030', 'Classification of Industries', 'Agro-based, mineral-based, cottage, public/private sector', 'Medium'),

  ('c0000008-0004-0000-0000-000000000061', 'b0000008-0004-0000-0000-000000000031', 'Rules of Subject-Verb Agreement', 'Compound subjects, collective nouns, neither-nor rules', 'Medium'),
  ('c0000008-0004-0000-0000-000000000062', 'b0000008-0004-0000-0000-000000000031', 'Noun and Adverbial Clauses', 'Identification and synthesis of complex clauses', 'Hard'),
  ('c0000008-0004-0000-0000-000000000063', 'b0000008-0004-0000-0000-000000000032', 'Common Phrasal Verbs', 'Look after, bring up, give in, put off usages', 'Medium'),
  ('c0000008-0004-0000-0000-000000000064', 'b0000008-0004-0000-0000-000000000032', 'Idiomatic Expressions', 'Contextual usage of literary and spoken idioms', 'Hard')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- QUESTIONS (QUESTIONS 101 - 160: CLASS 7)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty, question_type) VALUES
  ('d0000000-0000-0000-0000-000000000101', 'What is the additive identity for rational numbers?', 'c0000007-0001-0000-0000-000000000033', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000102', 'Find the reciprocal (multiplicative inverse) of -7/11.', 'c0000007-0001-0000-0000-000000000033', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000103', 'According to exponent laws, what is (a^m) * (a^n) equal to?', 'c0000007-0001-0000-0000-000000000034', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000104', 'What is the numeric value of any non-zero number raised to power 0?', 'c0000007-0001-0000-0000-000000000034', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000105', 'In a right-angled triangle, if the legs measure 6 cm and 8 cm, what is the hypotenuse?', 'c0000007-0001-0000-0000-000000000035', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000106', 'What is the sum of interior angles in any Euclidean triangle?', 'c0000007-0001-0000-0000-000000000035', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000107', 'Simplify: (3x^2 + 5x - 4) + (2x^2 - 3x + 7).', 'c0000007-0001-0000-0000-000000000036', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000108', 'Evaluate 5a^2 - 2a + 3 when a = 2.', 'c0000007-0001-0000-0000-000000000036', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000109', 'Which of the following is an insectivorous carnivorous plant?', 'c0000007-0002-0000-0000-000000000037', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000110', 'Which organism represents a symbiotic association of algae and fungi?', 'c0000007-0002-0000-0000-000000000037', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000111', 'What color change occurs when blue litmus paper is dipped in lemon juice?', 'c0000007-0002-0000-0000-000000000038', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000112', 'What are the products of a neutralization reaction between an acid and a base?', 'c0000007-0002-0000-0000-000000000038', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000113', 'Name the natural acid present in an ant sting.', 'c0000007-0002-0000-0000-000000000038', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000114', 'By which method does heat transfer through a solid steel rod when one end is heated?', 'c0000007-0002-0000-0000-000000000039', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000115', 'How does heat energy travel from the Sun to Earth across empty space?', 'c0000007-0002-0000-0000-000000000039', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000116', 'Which blood component contains the iron-rich protein hemoglobin to carry oxygen?', 'c0000007-0002-0000-0000-000000000040', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000117', 'Which blood cells help in clotting and prevent excessive bleeding from wounds?', 'c0000007-0002-0000-0000-000000000040', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000118', 'Who was the first and only woman sultan to rule the Delhi Sultanate?', 'c0000007-0003-0000-0000-000000000041', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000119', 'Which Delhi Sultan introduced market control regulations and fixed commodity prices?', 'c0000007-0003-0000-0000-000000000041', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000120', 'What was the central religious tolerance principle "Sulh-i Kul" promulgated by Akbar?', 'c0000007-0003-0000-0000-000000000042', 'Medium', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000121', 'What instrument is used to measure atmospheric pressure?', 'c0000007-0003-0000-0000-000000000043', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000122', 'Which ocean current is famously known as a warm current flowing across the North Atlantic?', 'c0000007-0003-0000-0000-000000000044', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000123', 'Choose the modal indicating strict moral duty: "You _____ respect your elders."', 'c0000007-0004-0000-0000-000000000045', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000124', 'Change to Passive: "The gardener is watering the flowering plants."', 'c0000007-0004-0000-0000-000000000046', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000125', 'Convert to indirect speech: "She asked, ''Where do you live?''"', 'c0000007-0004-0000-0000-000000000047', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000126', 'Convert to indirect: "The doctor said to him, ''Take this medicine twice a day.''"', 'c0000007-0004-0000-0000-000000000048', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000127', 'What is the sum of -5/9 and 7/9?', 'c0000007-0001-0000-0000-000000000033', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000128', 'Express 2^3 * 2^4 as a single power of 2.', 'c0000007-0001-0000-0000-000000000034', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000129', 'An exterior angle of a triangle is 110 degrees and one interior opposite angle is 40 degrees. Find the other.', 'c0000007-0001-0000-0000-000000000035', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000130', 'Add the terms: 7xy, -3xy, and 4xy.', 'c0000007-0001-0000-0000-000000000036', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000131', 'What is the primary mode of nutrition in Cuscuta (Amarbel)?', 'c0000007-0002-0000-0000-000000000037', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000132', 'Which chemical indicator turns bright pink in a basic alkaline solution?', 'c0000007-0002-0000-0000-000000000038', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000133', 'What is normal human body temperature in degrees Celsius?', 'c0000007-0002-0000-0000-000000000039', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000134', 'Which blood vessels carry oxygenated blood away from the heart to body organs?', 'c0000007-0002-0000-0000-000000000040', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000135', 'Who built the Qutub Minar in Delhi, which was later completed by Iltutmish?', 'c0000007-0003-0000-0000-000000000041', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000136', 'What was the land revenue assessment system developed by Akbar finance minister Raja Todar Mal?', 'c0000007-0003-0000-0000-000000000042', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000137', 'Which atmospheric gas protects life on Earth from harmful ultraviolet radiation?', 'c0000007-0003-0000-0000-000000000043', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000138', 'What causes the periodic rise and fall of ocean water known as tides?', 'c0000007-0003-0000-0000-000000000044', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000139', 'Choose the correct modal: "It _____ rain this evening, as the sky is clouded."', 'c0000007-0004-0000-0000-000000000045', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000140', 'Convert to Passive: "They were painting the boundary wall."', 'c0000007-0004-0000-0000-000000000046', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000141', 'Convert to indirect: "Mother asked me, ''Have you done your homework?''"', 'c0000007-0004-0000-0000-000000000047', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000142', 'Multiply (-3/5) by (15/9).', 'c0000007-0001-0000-0000-000000000033', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000143', 'What is the value of 5^3 / 5^1?', 'c0000007-0001-0000-0000-000000000034', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000144', 'Can a triangle have side lengths 3 cm, 4 cm, and 8 cm?', 'c0000007-0001-0000-0000-000000000035', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000145', 'Subtract 2x - 3y from 5x + 4y.', 'c0000007-0001-0000-0000-000000000036', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000146', 'Which fungi are used in bakeries for fermenting bread dough?', 'c0000007-0002-0000-0000-000000000037', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000147', 'What is the chemical name of common table salt formed in neutralization?', 'c0000007-0002-0000-0000-000000000038', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000148', 'Why are the bottoms of cooking utensils often painted black or dark?', 'c0000007-0002-0000-0000-000000000039', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000149', 'What is the average resting heart rate (pulse) of an adult human?', 'c0000007-0002-0000-0000-000000000040', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000150', 'Which traveler from Morocco visited India during Muhammad bin Tughlaq reign?', 'c0000007-0003-0000-0000-000000000041', 'Medium', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000151', 'Who authored the renowned historical chronicle "Ain-i-Akbari"?', 'c0000007-0003-0000-0000-000000000042', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000152', 'In which atmospheric layer are most communications satellites positioned?', 'c0000007-0003-0000-0000-000000000043', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000153', 'Cold ocean currents generally originate near which geographical zone?', 'c0000007-0003-0000-0000-000000000044', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000154', 'Fill in the blank: "Candidates _____ submit their answer sheets before the buzzer."', 'c0000007-0004-0000-0000-000000000045', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000155', 'Change to Passive: "The poet wrote a moving sonnet."', 'c0000007-0004-0000-0000-000000000046', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000156', 'Convert: "The captain commanded the soldiers to march forward."', 'c0000007-0004-0000-0000-000000000048', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000157', 'What is (-2/3) + (-4/5)?', 'c0000007-0001-0000-0000-000000000033', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000158', 'Simplify: (3^2)^3.', 'c0000007-0001-0000-0000-000000000034', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000159', 'In an isosceles right triangle, what are the two acute angles?', 'c0000007-0001-0000-0000-000000000035', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000160', 'If x = 1, y = -1, find the value of x^2 + y^2.', 'c0000007-0001-0000-0000-000000000036', 'Easy', 'SAQ')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- QUESTIONS (QUESTIONS 161 - 220: CLASS 8)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty, question_type) VALUES
  ('d0000000-0000-0000-0000-000000000161', 'Solve the linear equation: 5x + 9 = 2x + 24. What is the value of x?', 'c0000008-0001-0000-0000-000000000049', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000162', 'Solve: 8x - 3 = 3x + 17.', 'c0000008-0001-0000-0000-000000000049', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000163', 'What is the sum of all interior angles of any convex quadrilateral?', 'c0000008-0001-0000-0000-000000000050', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000164', 'A quadrilateral whose diagonals bisect each other at right angles (90 deg) and all sides are equal is a:', 'c0000008-0001-0000-0000-000000000050', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000165', 'According to algebraic identities, what is (a + b)^2 equal to?', 'c0000008-0001-0000-0000-000000000051', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000166', 'Expand (2x + 3y)(2x - 3y).', 'c0000008-0001-0000-0000-000000000051', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000167', 'What is the formula for the total surface area of a closed cylinder with radius r and height h?', 'c0000008-0001-0000-0000-000000000052', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000168', 'Find the volume of a cube having side edge length 6 cm.', 'c0000008-0001-0000-0000-000000000052', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000169', 'Which modern irrigation technique delivers water drop by drop directly near plant roots?', 'c0000008-0002-0000-0000-000000000053', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000170', 'Which nitrogen-fixing bacterium lives in the root nodules of leguminous plants?', 'c0000008-0002-0000-0000-000000000053', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000171', 'Who discovered the antibiotic Penicillin in 1928?', 'c0000008-0002-0000-0000-000000000054', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000172', 'Which single-celled protozoan causes malaria and is transmitted by female Anopheles mosquitoes?', 'c0000008-0002-0000-0000-000000000054', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000173', 'Which of the following is a non-contact force acting over distance without physical touch?', 'c0000008-0002-0000-0000-000000000055', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000174', 'What is the SI unit of pressure defined as force per unit area?', 'c0000008-0002-0000-0000-000000000055', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000175', 'What determines the pitch or shrillness of a sound wave?', 'c0000008-0002-0000-0000-000000000056', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000176', 'What is the audible frequency range of human hearing?', 'c0000008-0002-0000-0000-000000000056', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000177', 'Which Fundamental Right in the Indian Constitution is termed the "Heart and Soul" of the Constitution?', 'c0000008-0003-0000-0000-000000000057', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000178', 'What is the constitutional meaning of Indian Secularism?', 'c0000008-0003-0000-0000-000000000057', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000179', 'What legal mechanism allows any individual or organization to file court cases on behalf of public interest?', 'c0000008-0003-0000-0000-000000000058', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000180', 'Who presides over the Supreme Court of India?', 'c0000008-0003-0000-0000-000000000058', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000181', 'Which of the following is an exhaustible, non-renewable fossil fuel resource?', 'c0000008-0003-0000-0000-000000000059', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000182', 'What is the term for development that meets present needs without compromising future generations?', 'c0000008-0003-0000-0000-000000000059', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000183', 'Which Indian city is famously nicknamed the "Manchester of India" for its cotton textile industry?', 'c0000008-0003-0000-0000-000000000060', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000184', 'Which region in the USA is renowned globally as the hub of information technology?', 'c0000008-0003-0000-0000-000000000060', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000185', 'Fill in: "Neither the teacher nor the students _____ present in the laboratory."', 'c0000008-0004-0000-0000-000000000061', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000186', 'Complete concord: "Bread and butter _____ his favorite breakfast."', 'c0000008-0004-0000-0000-000000000061', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000187', 'Identify the type of underlined clause: "I believe *that honesty always triumphs*."', 'c0000008-0004-0000-0000-000000000062', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000188', 'What is the meaning of the phrasal verb "to call off"?', 'c0000008-0004-0000-0000-000000000063', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000189', 'What does the idiom "burn the midnight oil" mean?', 'c0000008-0004-0000-0000-000000000064', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000190', 'Solve: 3(x - 5) = 2(x + 4). Find x.', 'c0000008-0001-0000-0000-000000000049', 'Medium', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000191', 'What is the number of sides in a regular polygon whose interior angle sum is 540 degrees?', 'c0000008-0001-0000-0000-000000000050', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000192', 'Factorize: 4x^2 - 9y^2.', 'c0000008-0001-0000-0000-000000000051', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000193', 'Find the curved surface area of a cylinder with radius 7 cm and height 10 cm (use pi = 22/7).', 'c0000008-0001-0000-0000-000000000052', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000194', 'Which chemical substance is commonly sprayed on fields to destroy unwanted weeds?', 'c0000008-0002-0000-0000-000000000053', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000195', 'Which microorganism is responsible for curdling milk into curd?', 'c0000008-0002-0000-0000-000000000054', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000196', 'Why do heavy load trucks have wide double tires at the rear axle?', 'c0000008-0002-0000-0000-000000000055', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000197', 'Can sound waves propagate through a complete vacuum?', 'c0000008-0002-0000-0000-000000000056', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000198', 'Which article of the Indian Constitution grants the Right to Equality?', 'c0000008-0003-0000-0000-000000000057', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000199', 'What is the full form of PIL in Indian constitutional law?', 'c0000008-0003-0000-0000-000000000058', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000200', 'Which metallic mineral is mined as the primary ore for manufacturing aluminium?', 'c0000008-0003-0000-0000-000000000059', 'Easy', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000201', 'Tata Iron and Steel Company (TISCO) was established at Jamshedpur near the confluence of which rivers?', 'c0000008-0003-0000-0000-000000000060', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000202', 'Choose the correct form: "Mathematics _____ an analytical subject."', 'c0000008-0004-0000-0000-000000000061', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000203', 'Complete: "He talked as if he _____ everything."', 'c0000008-0004-0000-0000-000000000062', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000204', 'What is the meaning of "look forward to"?', 'c0000008-0004-0000-0000-000000000063', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000205', 'Explain idiom: "A piece of cake".', 'c0000008-0004-0000-0000-000000000064', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000206', 'Solve: 7x - 5 = 2x + 10.', 'c0000008-0001-0000-0000-000000000049', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000207', 'How many diagonals does a regular hexagon possess?', 'c0000008-0001-0000-0000-000000000050', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000208', 'Factorize completely: x^2 + 5x + 6.', 'c0000008-0001-0000-0000-000000000051', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000209', 'What is the volume of a cylinder with base area 50 sq cm and height 8 cm?', 'c0000008-0001-0000-0000-000000000052', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000210', 'Which gas is released during anaerobic digestion in a biogas plant?', 'c0000008-0002-0000-0000-000000000053', 'Easy', 'MCQ'),

  ('d0000000-0000-0000-0000-000000000211', 'Which vaccine provides immunization against Tuberculosis (TB)?', 'c0000008-0002-0000-0000-000000000054', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000212', 'Frictional force always acts in which direction relative to the moving object?', 'c0000008-0002-0000-0000-000000000055', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000213', 'What is the unit of sound frequency defined as cycles per second?', 'c0000008-0002-0000-0000-000000000056', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000214', 'Who was the permanent President of the Constituent Assembly of India?', 'c0000008-0003-0000-0000-000000000057', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000215', 'What is the highest judicial court of appeal in India?', 'c0000008-0003-0000-0000-000000000058', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000216', 'Which non-conventional energy resource harnesses subterranean heat from the Earth crust?', 'c0000008-0003-0000-0000-000000000059', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000217', 'Which Indian metropolis is renowned as the "Silicon Valley of India"?', 'c0000008-0003-0000-0000-000000000060', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000218', 'Fill in: "Each of the participants _____ received a certificate."', 'c0000008-0004-0000-0000-000000000061', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000219', 'What does the phrasal verb "break down" mean regarding machines?', 'c0000008-0004-0000-0000-000000000063', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000220', 'Explain idiom: "Bite the bullet".', 'c0000008-0004-0000-0000-000000000064', 'Hard', 'SAQ')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- OPTIONS FOR QUESTIONS 101 - 220
-- ----------------------------------------------------------------------------
INSERT INTO options (question_id, answer, is_correct) VALUES
  -- Q101
  ('d0000000-0000-0000-0000-000000000101', '0', true),
  ('d0000000-0000-0000-0000-000000000101', '1', false),
  ('d0000000-0000-0000-0000-000000000101', '-1', false),
  ('d0000000-0000-0000-0000-000000000101', 'None', false),
  -- Q102 (SAQ)
  ('d0000000-0000-0000-0000-000000000102', '-11/7', true),
  -- Q103
  ('d0000000-0000-0000-0000-000000000103', 'a^(m+n)', true),
  ('d0000000-0000-0000-0000-000000000103', 'a^(m-n)', false),
  ('d0000000-0000-0000-0000-000000000103', 'a^(m*n)', false),
  ('d0000000-0000-0000-0000-000000000103', 'a^(m/n)', false),
  -- Q104 (SAQ)
  ('d0000000-0000-0000-0000-000000000104', '1', true),
  -- Q105
  ('d0000000-0000-0000-0000-000000000105', '10 cm', true),
  ('d0000000-0000-0000-0000-000000000105', '14 cm', false),
  ('d0000000-0000-0000-0000-000000000105', '12 cm', false),
  ('d0000000-0000-0000-0000-000000000105', '9 cm', false),
  -- Q106 (SAQ)
  ('d0000000-0000-0000-0000-000000000106', '180 degrees', true),
  -- Q107
  ('d0000000-0000-0000-0000-000000000107', '5x^2 + 2x + 3', true),
  ('d0000000-0000-0000-0000-000000000107', '5x^2 + 8x + 3', false),
  ('d0000000-0000-0000-0000-000000000107', '6x^2 + 2x - 3', false),
  ('d0000000-0000-0000-0000-000000000107', '5x^2 - 2x + 11', false),
  -- Q108 (SAQ)
  ('d0000000-0000-0000-0000-000000000108', '19', true),
  -- Q109
  ('d0000000-0000-0000-0000-000000000109', 'Pitcher plant (Nepenthes)', true),
  ('d0000000-0000-0000-0000-000000000109', 'Cuscuta', false),
  ('d0000000-0000-0000-0000-000000000109', 'Mushroom', false),
  ('d0000000-0000-0000-0000-000000000109', 'Hydrilla', false),
  -- Q110 (SAQ)
  ('d0000000-0000-0000-0000-000000000110', 'Lichen', true),

  -- Q111
  ('d0000000-0000-0000-0000-000000000111', 'Turns red', true),
  ('d0000000-0000-0000-0000-000000000111', 'Turns yellow', false),
  ('d0000000-0000-0000-0000-000000000111', 'Remains unchanged', false),
  ('d0000000-0000-0000-0000-000000000111', 'Turns black', false),
  -- Q112
  ('d0000000-0000-0000-0000-000000000112', 'Salt and water', true),
  ('d0000000-0000-0000-0000-000000000112', 'Gas and acid', false),
  ('d0000000-0000-0000-0000-000000000112', 'Hydrogen and base', false),
  ('d0000000-0000-0000-0000-000000000112', 'Oxide only', false),
  -- Q113 (SAQ)
  ('d0000000-0000-0000-0000-000000000113', 'Formic acid (Methanoic acid)', true),
  -- Q114
  ('d0000000-0000-0000-0000-000000000114', 'Conduction', true),
  ('d0000000-0000-0000-0000-000000000114', 'Convection', false),
  ('d0000000-0000-0000-0000-000000000114', 'Radiation', false),
  ('d0000000-0000-0000-0000-000000000114', 'Advection', false),
  -- Q115 (SAQ)
  ('d0000000-0000-0000-0000-000000000115', 'Radiation', true),
  -- Q116
  ('d0000000-0000-0000-0000-000000000116', 'Red Blood Cells (RBCs)', true),
  ('d0000000-0000-0000-0000-000000000116', 'White Blood Cells (WBCs)', false),
  ('d0000000-0000-0000-0000-000000000116', 'Platelets', false),
  ('d0000000-0000-0000-0000-000000000116', 'Plasma', false),
  -- Q117 (SAQ)
  ('d0000000-0000-0000-0000-000000000117', 'Platelets (Thrombocytes)', true),
  -- Q118
  ('d0000000-0000-0000-0000-000000000118', 'Raziya Sultan', true),
  ('d0000000-0000-0000-0000-000000000118', 'Nur Jahan', false),
  ('d0000000-0000-0000-0000-000000000118', 'Chand Bibi', false),
  ('d0000000-0000-0000-0000-000000000118', 'Mumtaz Mahal', false),
  -- Q119 (SAQ)
  ('d0000000-0000-0000-0000-000000000119', 'Alauddin Khalji', true),
  -- Q120
  ('d0000000-0000-0000-0000-000000000120', 'Universal peace and harmony among all faiths', true),
  ('d0000000-0000-0000-0000-000000000120', 'Forced conversion to state religion', false),
  ('d0000000-0000-0000-0000-000000000120', 'Levying special pilgrimage taxes', false),
  ('d0000000-0000-0000-0000-000000000120', 'Banning non-Islamic literature', false),

  -- Q121
  ('d0000000-0000-0000-0000-000000000121', 'Barometer', true),
  ('d0000000-0000-0000-0000-000000000121', 'Anemometer', false),
  ('d0000000-0000-0000-0000-000000000121', 'Thermometer', false),
  ('d0000000-0000-0000-0000-000000000121', 'Hygrometer', false),
  -- Q122 (SAQ)
  ('d0000000-0000-0000-0000-000000000122', 'Gulf Stream', true),
  -- Q123
  ('d0000000-0000-0000-0000-000000000123', 'ought to', true),
  ('d0000000-0000-0000-0000-000000000123', 'might', false),
  ('d0000000-0000-0000-0000-000000000123', 'can', false),
  ('d0000000-0000-0000-0000-000000000123', 'could', false),
  -- Q124
  ('d0000000-0000-0000-0000-000000000124', 'The flowering plants are being watered by the gardener.', true),
  ('d0000000-0000-0000-0000-000000000124', 'The flowering plants were watered by the gardener.', false),
  ('d0000000-0000-0000-0000-000000000124', 'The flowering plants have watered by the gardener.', false),
  ('d0000000-0000-0000-0000-000000000124', 'The gardener is watered by the plants.', false),
  -- Q125
  ('d0000000-0000-0000-0000-000000000125', 'She asked where I lived.', true),
  ('d0000000-0000-0000-0000-000000000125', 'She asked that where I lived.', false),
  ('d0000000-0000-0000-0000-000000000125', 'She asked where do I live.', false),
  ('d0000000-0000-0000-0000-000000000125', 'She asked where did you lived.', false),
  -- Q126 (SAQ)
  ('d0000000-0000-0000-0000-000000000126', 'The doctor advised him to take that medicine twice a day.', true),
  -- Q127
  ('d0000000-0000-0000-0000-000000000127', '2/9', true),
  ('d0000000-0000-0000-0000-000000000127', '-2/9', false),
  ('d0000000-0000-0000-0000-000000000127', '12/9', false),
  ('d0000000-0000-0000-0000-000000000127', '-12/18', false),
  -- Q128 (SAQ)
  ('d0000000-0000-0000-0000-000000000128', '2^7', true),
  -- Q129
  ('d0000000-0000-0000-0000-000000000129', '70 degrees', true),
  ('d0000000-0000-0000-0000-000000000129', '60 degrees', false),
  ('d0000000-0000-0000-0000-000000000129', '150 degrees', false),
  ('d0000000-0000-0000-0000-000000000129', '80 degrees', false),
  -- Q130 (SAQ)
  ('d0000000-0000-0000-0000-000000000130', '8xy', true),

  -- Q131
  ('d0000000-0000-0000-0000-000000000131', 'Parasitic nutrition', true),
  ('d0000000-0000-0000-0000-000000000131', 'Autotrophic', false),
  ('d0000000-0000-0000-0000-000000000131', 'Saprotrophic', false),
  ('d0000000-0000-0000-0000-000000000131', 'Symbiotic', false),
  -- Q132
  ('d0000000-0000-0000-0000-000000000132', 'Phenolphthalein', true),
  ('d0000000-0000-0000-0000-000000000132', 'Methyl orange', false),
  ('d0000000-0000-0000-0000-000000000132', 'Turmeric paper', false),
  ('d0000000-0000-0000-0000-000000000132', 'Litmus', false),
  -- Q133 (SAQ)
  ('d0000000-0000-0000-0000-000000000133', '37 °C', true),
  -- Q134
  ('d0000000-0000-0000-0000-000000000134', 'Arteries', true),
  ('d0000000-0000-0000-0000-000000000134', 'Veins', false),
  ('d0000000-0000-0000-0000-000000000134', 'Capillaries', false),
  ('d0000000-0000-0000-0000-000000000134', 'Vena Cava', false),
  -- Q135 (SAQ)
  ('d0000000-0000-0000-0000-000000000135', 'Qutb-ud-din Aibak', true),
  -- Q136
  ('d0000000-0000-0000-0000-000000000136', 'Zabt system (Dahsala)', true),
  ('d0000000-0000-0000-0000-000000000136', 'Ryotwari system', false),
  ('d0000000-0000-0000-0000-000000000136', 'Mahalwari system', false),
  ('d0000000-0000-0000-0000-000000000136', 'Jagirdari system', false),
  -- Q137
  ('d0000000-0000-0000-0000-000000000137', 'Ozone (O3)', true),
  ('d0000000-0000-0000-0000-000000000137', 'Carbon monoxide', false),
  ('d0000000-0000-0000-0000-000000000137', 'Methane', false),
  ('d0000000-0000-0000-0000-000000000137', 'Argon', false),
  -- Q138 (SAQ)
  ('d0000000-0000-0000-0000-000000000138', 'Gravitational pull of the Moon and the Sun', true),
  -- Q139
  ('d0000000-0000-0000-0000-000000000139', 'may', true),
  ('d0000000-0000-0000-0000-000000000139', 'can', false),
  ('d0000000-0000-0000-0000-000000000139', 'ought', false),
  ('d0000000-0000-0000-0000-000000000139', 'shall', false),
  -- Q140 (SAQ)
  ('d0000000-0000-0000-0000-000000000140', 'The boundary wall was being painted by them.', true),

  -- Q141
  ('d0000000-0000-0000-0000-000000000141', 'Mother asked me if I had done my homework.', true),
  ('d0000000-0000-0000-0000-000000000141', 'Mother asked me that had I done my homework.', false),
  ('d0000000-0000-0000-0000-000000000141', 'Mother asked me whether have you done your homework.', false),
  ('d0000000-0000-0000-0000-000000000141', 'Mother asked me if I did done homework.', false),
  -- Q142 (SAQ)
  ('d0000000-0000-0000-0000-000000000142', '-1', true),
  -- Q143
  ('d0000000-0000-0000-0000-000000000143', '25', true),
  ('d0000000-0000-0000-0000-000000000143', '5', false),
  ('d0000000-0000-0000-0000-000000000143', '125', false),
  ('d0000000-0000-0000-0000-000000000143', '1', false),
  -- Q144
  ('d0000000-0000-0000-0000-000000000144', 'No, sum of any two sides must exceed the third side', true),
  ('d0000000-0000-0000-0000-000000000144', 'Yes, any three sides can form a triangle', false),
  ('d0000000-0000-0000-0000-000000000144', 'Yes, because 3 + 4 + 8 is odd', false),
  ('d0000000-0000-0000-0000-000000000144', 'Only if it is a right triangle', false),
  -- Q145 (SAQ)
  ('d0000000-0000-0000-0000-000000000145', '3x + 7y', true),
  -- Q146
  ('d0000000-0000-0000-0000-000000000146', 'Yeast', true),
  ('d0000000-0000-0000-0000-000000000146', 'Rhizopus', false),
  ('d0000000-0000-0000-0000-000000000146', 'Penicillium', false),
  ('d0000000-0000-0000-0000-000000000146', 'Agaricus', false),
  -- Q147 (SAQ)
  ('d0000000-0000-0000-0000-000000000147', 'Sodium chloride (NaCl)', true),
  -- Q148
  ('d0000000-0000-0000-0000-000000000148', 'Dark surfaces absorb more heat radiation quickly', true),
  ('d0000000-0000-0000-0000-000000000148', 'Dark surfaces reflect thermal rays completely', false),
  ('d0000000-0000-0000-0000-000000000148', 'To make utensils rust-proof', false),
  ('d0000000-0000-0000-0000-000000000148', 'To insulate the cooking food from fire', false),
  -- Q149 (SAQ)
  ('d0000000-0000-0000-0000-000000000149', '72 beats per minute', true),
  -- Q150
  ('d0000000-0000-0000-0000-000000000150', 'Ibn Battuta', true),
  ('d0000000-0000-0000-0000-000000000150', 'Marco Polo', false),
  ('d0000000-0000-0000-0000-000000000150', 'Al-Biruni', false),
  ('d0000000-0000-0000-0000-000000000150', 'Francois Bernier', false),

  -- Q151 (SAQ)
  ('d0000000-0000-0000-0000-000000000151', 'Abul Fazl', true),
  -- Q152
  ('d0000000-0000-0000-0000-000000000152', 'Exosphere / Thermosphere', true),
  ('d0000000-0000-0000-0000-000000000152', 'Troposphere', false),
  ('d0000000-0000-0000-0000-000000000152', 'Stratosphere', false),
  ('d0000000-0000-0000-0000-000000000152', 'Mesosphere', false),
  -- Q153
  ('d0000000-0000-0000-0000-000000000153', 'Polar regions', true),
  ('d0000000-0000-0000-0000-000000000153', 'Equator', false),
  ('d0000000-0000-0000-0000-000000000153', 'Tropical zones', false),
  ('d0000000-0000-0000-0000-000000000153', 'Subtropical deserts', false),
  -- Q154 (SAQ)
  ('d0000000-0000-0000-0000-000000000154', 'must', true),
  -- Q155
  ('d0000000-0000-0000-0000-000000000155', 'A moving sonnet was written by the poet.', true),
  ('d0000000-0000-0000-0000-000000000155', 'A moving sonnet is written by the poet.', false),
  ('d0000000-0000-0000-0000-000000000155', 'A moving sonnet has written by the poet.', false),
  ('d0000000-0000-0000-0000-000000000155', 'The poet was written by a moving sonnet.', false),
  -- Q156
  ('d0000000-0000-0000-0000-000000000156', 'The captain ordered the soldiers to march forward.', true),
  ('d0000000-0000-0000-0000-000000000156', 'The captain said that soldiers should march forward.', false),
  ('d0000000-0000-0000-0000-000000000156', 'The captain told the soldiers march forward.', false),
  ('d0000000-0000-0000-0000-000000000156', 'The captain asked if soldiers march forward.', false),
  -- Q157 (SAQ)
  ('d0000000-0000-0000-0000-000000000157', '-22/15', true),
  -- Q158
  ('d0000000-0000-0000-0000-000000000158', '3^6', true),
  ('d0000000-0000-0000-0000-000000000158', '3^5', false),
  ('d0000000-0000-0000-0000-000000000158', '3^8', false),
  ('d0000000-0000-0000-0000-000000000158', '9^3', false),
  -- Q159 (SAQ)
  ('d0000000-0000-0000-0000-000000000159', '45 degrees each', true),
  -- Q160 (SAQ)
  ('d0000000-0000-0000-0000-000000000160', '2', true),

  -- Q161
  ('d0000000-0000-0000-0000-000000000161', '5', true),
  ('d0000000-0000-0000-0000-000000000161', '7', false),
  ('d0000000-0000-0000-0000-000000000161', '3', false),
  ('d0000000-0000-0000-0000-000000000161', '11', false),
  -- Q162 (SAQ)
  ('d0000000-0000-0000-0000-000000000162', '4', true),
  -- Q163
  ('d0000000-0000-0000-0000-000000000163', '360 degrees', true),
  ('d0000000-0000-0000-0000-000000000163', '180 degrees', false),
  ('d0000000-0000-0000-0000-000000000163', '540 degrees', false),
  ('d0000000-0000-0000-0000-000000000163', '720 degrees', false),
  -- Q164 (SAQ)
  ('d0000000-0000-0000-0000-000000000164', 'Rhombus', true),
  -- Q165
  ('d0000000-0000-0000-0000-000000000165', 'a^2 + 2ab + b^2', true),
  ('d0000000-0000-0000-0000-000000000165', 'a^2 - 2ab + b^2', false),
  ('d0000000-0000-0000-0000-000000000165', 'a^2 + b^2', false),
  ('d0000000-0000-0000-0000-000000000165', 'a^2 - b^2', false),
  -- Q166 (SAQ)
  ('d0000000-0000-0000-0000-000000000166', '4x^2 - 9y^2', true),
  -- Q167
  ('d0000000-0000-0000-0000-000000000167', '2*pi*r(r + h)', true),
  ('d0000000-0000-0000-0000-000000000167', '2*pi*r*h', false),
  ('d0000000-0000-0000-0000-000000000167', 'pi*r^2*h', false),
  ('d0000000-0000-0000-0000-000000000167', '4*pi*r^2', false),
  -- Q168 (SAQ)
  ('d0000000-0000-0000-0000-000000000168', '216 cm^3', true),
  -- Q169
  ('d0000000-0000-0000-0000-000000000169', 'Drip irrigation system', true),
  ('d0000000-0000-0000-0000-000000000169', 'Flood irrigation', false),
  ('d0000000-0000-0000-0000-000000000169', 'Furrow irrigation', false),
  ('d0000000-0000-0000-0000-000000000169', 'Chain pump system', false),
  -- Q170 (SAQ)
  ('d0000000-0000-0000-0000-000000000170', 'Rhizobium', true),

  -- Q171
  ('d0000000-0000-0000-0000-000000000171', 'Alexander Fleming', true),
  ('d0000000-0000-0000-0000-000000000171', 'Louis Pasteur', false),
  ('d0000000-0000-0000-0000-000000000171', 'Edward Jenner', false),
  ('d0000000-0000-0000-0000-000000000171', 'Robert Koch', false),
  -- Q172 (SAQ)
  ('d0000000-0000-0000-0000-000000000172', 'Plasmodium', true),
  -- Q173
  ('d0000000-0000-0000-0000-000000000173', 'Gravitational force', true),
  ('d0000000-0000-0000-0000-000000000173', 'Frictional force', false),
  ('d0000000-0000-0000-0000-000000000173', 'Muscular force', false),
  ('d0000000-0000-0000-0000-000000000173', 'Tension force', false),
  -- Q174 (SAQ)
  ('d0000000-0000-0000-0000-000000000174', 'Pascal (N/m^2)', true),
  -- Q175
  ('d0000000-0000-0000-0000-000000000175', 'Frequency of vibration', true),
  ('d0000000-0000-0000-0000-000000000175', 'Amplitude of vibration', false),
  ('d0000000-0000-0000-0000-000000000175', 'Speed of propagation', false),
  ('d0000000-0000-0000-0000-000000000175', 'Density of medium', false),
  -- Q176 (SAQ)
  ('d0000000-0000-0000-0000-000000000176', '20 Hz to 20,000 Hz', true),
  -- Q177
  ('d0000000-0000-0000-0000-000000000177', 'Right to Constitutional Remedies (Article 32)', true),
  ('d0000000-0000-0000-0000-000000000177', 'Right to Equality', false),
  ('d0000000-0000-0000-0000-000000000177', 'Right to Freedom of Speech', false),
  ('d0000000-0000-0000-0000-000000000177', 'Right against Exploitation', false),
  -- Q178 (SAQ)
  ('d0000000-0000-0000-0000-000000000178', 'The state maintains principled distance and does not promote any single religion', true),
  -- Q179
  ('d0000000-0000-0000-0000-000000000179', 'Public Interest Litigation (PIL)', true),
  ('d0000000-0000-0000-0000-000000000179', 'First Information Report (FIR)', false),
  ('d0000000-0000-0000-0000-000000000179', 'Habeas Corpus Petition only', false),
  ('d0000000-0000-0000-0000-000000000179', 'Special Leave Petition', false),
  -- Q180 (SAQ)
  ('d0000000-0000-0000-0000-000000000180', 'Chief Justice of India (CJI)', true),

  -- Q181
  ('d0000000-0000-0000-0000-000000000181', 'Petroleum', true),
  ('d0000000-0000-0000-0000-000000000181', 'Solar radiation', false),
  ('d0000000-0000-0000-0000-000000000181', 'Wind power', false),
  ('d0000000-0000-0000-0000-000000000181', 'Tidal energy', false),
  -- Q182 (SAQ)
  ('d0000000-0000-0000-0000-000000000182', 'Sustainable Development', true),
  -- Q183
  ('d0000000-0000-0000-0000-000000000183', 'Ahmedabad', true),
  ('d0000000-0000-0000-0000-000000000183', 'Kolkata', false),
  ('d0000000-0000-0000-0000-000000000183', 'Kanpur', false),
  ('d0000000-0000-0000-0000-000000000183', 'Varanasi', false),
  -- Q184 (SAQ)
  ('d0000000-0000-0000-0000-000000000184', 'Silicon Valley, California', true),
  -- Q185
  ('d0000000-0000-0000-0000-000000000185', 'were', true),
  ('d0000000-0000-0000-0000-000000000185', 'was', false),
  ('d0000000-0000-0000-0000-000000000185', 'is', false),
  ('d0000000-0000-0000-0000-000000000185', 'has been', false),
  -- Q186 (SAQ)
  ('d0000000-0000-0000-0000-000000000186', 'is', true),
  -- Q187
  ('d0000000-0000-0000-0000-000000000187', 'Noun clause acting as object of the verb', true),
  ('d0000000-0000-0000-0000-000000000187', 'Adverb clause of condition', false),
  ('d0000000-0000-0000-0000-000000000187', 'Relative adjective clause', false),
  ('d0000000-0000-0000-0000-000000000187', 'Coordinating principal clause', false),
  -- Q188
  ('d0000000-0000-0000-0000-000000000188', 'To cancel an arranged event', true),
  ('d0000000-0000-0000-0000-000000000188', 'To postpone to next week', false),
  ('d0000000-0000-0000-0000-000000000188', 'To invite loudly', false),
  ('d0000000-0000-0000-0000-000000000188', 'To celebrate joyously', false),
  -- Q189 (SAQ)
  ('d0000000-0000-0000-0000-000000000189', 'To work or study late into the night', true),
  -- Q190
  ('d0000000-0000-0000-0000-000000000190', '23', true),
  ('d0000000-0000-0000-0000-000000000190', '19', false),
  ('d0000000-0000-0000-0000-000000000190', '14', false),
  ('d0000000-0000-0000-0000-000000000190', '27', false),

  -- Q191 (SAQ)
  ('d0000000-0000-0000-0000-000000000191', '5 sides (Pentagon)', true),
  -- Q192
  ('d0000000-0000-0000-0000-000000000192', '(2x + 3y)(2x - 3y)', true),
  ('d0000000-0000-0000-0000-000000000192', '(4x + 9y)(x - y)', false),
  ('d0000000-0000-0000-0000-000000000192', '(2x - 3y)^2', false),
  ('d0000000-0000-0000-0000-000000000192', '(2x + 9y)(2x - y)', false),
  -- Q193 (SAQ)
  ('d0000000-0000-0000-0000-000000000193', '440 cm^2', true),
  -- Q194
  ('d0000000-0000-0000-0000-000000000194', 'Weedicide (e.g. 2,4-D)', true),
  ('d0000000-0000-0000-0000-000000000194', 'Insecticide', false),
  ('d0000000-0000-0000-0000-000000000194', 'Fungicide', false),
  ('d0000000-0000-0000-0000-000000000194', 'Rodenticide', false),
  -- Q195 (SAQ)
  ('d0000000-0000-0000-0000-000000000195', 'Lactobacillus', true),
  -- Q196
  ('d0000000-0000-0000-0000-000000000196', 'To increase surface contact area and reduce pressure on the road', true),
  ('d0000000-0000-0000-0000-000000000196', 'To increase vehicle top acceleration speed', false),
  ('d0000000-0000-0000-0000-000000000196', 'To reduce total brake friction', false),
  ('d0000000-0000-0000-0000-000000000196', 'To save tire rubber wear', false),
  -- Q197 (SAQ)
  ('d0000000-0000-0000-0000-000000000197', 'No, sound requires a material medium to propagate', true),
  -- Q198
  ('d0000000-0000-0000-0000-000000000198', 'Articles 14 to 18', true),
  ('d0000000-0000-0000-0000-000000000198', 'Articles 19 to 22', false),
  ('d0000000-0000-0000-0000-000000000198', 'Articles 25 to 28', false),
  ('d0000000-0000-0000-0000-000000000198', 'Articles 29 to 30', false),
  -- Q199 (SAQ)
  ('d0000000-0000-0000-0000-000000000199', 'Public Interest Litigation', true),
  -- Q200
  ('d0000000-0000-0000-0000-000000000200', 'Bauxite', true),
  ('d0000000-0000-0000-0000-000000000200', 'Hematite', false),
  ('d0000000-0000-0000-0000-000000000200', 'Chalcopyrite', false),
  ('d0000000-0000-0000-0000-000000000200', 'Galena', false),

  -- Q201 (SAQ)
  ('d0000000-0000-0000-0000-000000000201', 'Subarnarekha and Kharkai rivers', true),
  -- Q202
  ('d0000000-0000-0000-0000-000000000202', 'is', true),
  ('d0000000-0000-0000-0000-000000000202', 'are', false),
  ('d0000000-0000-0000-0000-000000000202', 'were', false),
  ('d0000000-0000-0000-0000-000000000202', 'have been', false),
  -- Q203 (SAQ)
  ('d0000000-0000-0000-0000-000000000203', 'knew', true),
  -- Q204
  ('d0000000-0000-0000-0000-000000000204', 'To anticipate future events with pleasure and excitement', true),
  ('d0000000-0000-0000-0000-000000000204', 'To look straight ahead while walking', false),
  ('d0000000-0000-0000-0000-000000000204', 'To ignore past mistakes', false),
  ('d0000000-0000-0000-0000-000000000204', 'To seek directions on a map', false),
  -- Q205 (SAQ)
  ('d0000000-0000-0000-0000-000000000205', 'Something very easy and straightforward to accomplish', true),
  -- Q206
  ('d0000000-0000-0000-0000-000000000206', '3', true),
  ('d0000000-0000-0000-0000-000000000206', '5', false),
  ('d0000000-0000-0000-0000-000000000206', '2', false),
  ('d0000000-0000-0000-0000-000000000206', '4', false),
  -- Q207 (SAQ)
  ('d0000000-0000-0000-0000-000000000207', '9 diagonals', true),
  -- Q208
  ('d0000000-0000-0000-0000-000000000208', '(x + 2)(x + 3)', true),
  ('d0000000-0000-0000-0000-000000000208', '(x + 1)(x + 6)', false),
  ('d0000000-0000-0000-0000-000000000208', '(x - 2)(x - 3)', false),
  ('d0000000-0000-0000-0000-000000000208', '(x + 5)(x + 1)', false),
  -- Q209 (SAQ)
  ('d0000000-0000-0000-0000-000000000209', '400 cm^3', true),
  -- Q210
  ('d0000000-0000-0000-0000-000000000210', 'Methane (CH4)', true),
  ('d0000000-0000-0000-0000-000000000210', 'Oxygen', false),
  ('d0000000-0000-0000-0000-000000000210', 'Nitrogen dioxide', false),
  ('d0000000-0000-0000-0000-000000000210', 'Chlorine', false),

  -- Q211 (SAQ)
  ('d0000000-0000-0000-0000-000000000211', 'BCG vaccine (Bacillus Calmette-Guerin)', true),
  -- Q212
  ('d0000000-0000-0000-0000-000000000212', 'Opposite to the direction of motion', true),
  ('d0000000-0000-0000-0000-000000000212', 'In the exact direction of motion', false),
  ('d0000000-0000-0000-0000-000000000212', 'Perpendicular to motion upwards', false),
  ('d0000000-0000-0000-0000-000000000212', 'Downward towards center of Earth', false),
  -- Q213 (SAQ)
  ('d0000000-0000-0000-0000-000000000213', 'Hertz (Hz)', true),
  -- Q214
  ('d0000000-0000-0000-0000-000000000214', 'Dr. Rajendra Prasad', true),
  ('d0000000-0000-0000-0000-000000000214', 'Dr. B. R. Ambedkar', false),
  ('d0000000-0000-0000-0000-000000000214', 'Pandit Jawaharlal Nehru', false),
  ('d0000000-0000-0000-0000-000000000214', 'Sardar Patel', false),
  -- Q215 (SAQ)
  ('d0000000-0000-0000-0000-000000000215', 'Supreme Court of India', true),
  -- Q216
  ('d0000000-0000-0000-0000-000000000216', 'Geothermal energy', true),
  ('d0000000-0000-0000-0000-000000000216', 'Hydroelectric energy', false),
  ('d0000000-0000-0000-0000-000000000216', 'Biomass energy', false),
  ('d0000000-0000-0000-0000-000000000216', 'Nuclear fission energy', false),
  -- Q217 (SAQ)
  ('d0000000-0000-0000-0000-000000000217', 'Bengaluru (Bangalore)', true),
  -- Q218
  ('d0000000-0000-0000-0000-000000000218', 'has', true),
  ('d0000000-0000-0000-0000-000000000218', 'have', false),
  ('d0000000-0000-0000-0000-000000000218', 'are', false),
  ('d0000000-0000-0000-0000-000000000218', 'were', false),
  -- Q219 (SAQ)
  ('d0000000-0000-0000-0000-000000000219', 'To stop functioning or operating due to a fault', true),
  -- Q220 (SAQ)
  ('d0000000-0000-0000-0000-000000000220', 'To endure a painful or grim situation with courage', true)
ON CONFLICT (question_id, answer) DO NOTHING;

