-- ============================================================================
-- 04_SEED_CLASS_9_10.SQL
-- KNOWLEDGEVERSE CURRICULUM SEED: CLASS 9 & CLASS 10 (QUESTIONS 221 - 360)
-- Boards: CBSE, ICSE, BSEB, WBBSE, DBSE
-- ============================================================================

-- ----------------------------------------------------------------------------
-- CLASSES (CLASS 9 & 10)
-- ----------------------------------------------------------------------------
INSERT INTO "class" (id, name, board) VALUES
  ('00000009-0001-0000-0000-000000000000', 'Class 9', 'CBSE'),
  ('00000009-0002-0000-0000-000000000000', 'Class 9', 'ICSE'),
  ('00000009-0003-0000-0000-000000000000', 'Class 9', 'BSEB'),
  ('00000009-0004-0000-0000-000000000000', 'Class 9', 'WBBSE'),
  ('00000009-0005-0000-0000-000000000000', 'Class 9', 'DBSE'),
  ('00000010-0001-0000-0000-000000000000', 'Class 10', 'CBSE'),
  ('00000010-0002-0000-0000-000000000000', 'Class 10', 'ICSE'),
  ('00000010-0003-0000-0000-000000000000', 'Class 10', 'BSEB'),
  ('00000010-0004-0000-0000-000000000000', 'Class 10', 'WBBSE'),
  ('00000010-0005-0000-0000-000000000000', 'Class 10', 'DBSE')
ON CONFLICT (name, board) DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBJECTS (CLASS 9 & 10)
-- ----------------------------------------------------------------------------
INSERT INTO subject (id, class_id, name, description) VALUES
  ('a0000009-0001-0000-0000-000000000017', '00000009-0001-0000-0000-000000000000', 'Mathematics', 'Number systems, polynomials, coordinate geometry, lines, triangles, statistics'),
  ('a0000009-0002-0000-0000-000000000018', '00000009-0002-0000-0000-000000000000', 'Science', 'Atoms and molecules, cell biology, tissues, motion, gravitation, work and energy'),
  ('a0000009-0003-0000-0000-000000000019', '00000009-0004-0000-0000-000000000000', 'Social Science', 'French revolution, physical features of India, democracy, electoral politics'),
  ('a0000009-0004-0000-0000-000000000020', '00000009-0003-0000-0000-000000000000', 'English Language', 'Advanced reported speech, clauses, conditionals, formal idioms'),
  ('a0000010-0001-0000-0000-000000000021', '00000010-0001-0000-0000-000000000000', 'Mathematics', 'Real numbers, quadratic equations, arithmetic progressions, trigonometry, statistics'),
  ('a0000010-0002-0000-0000-000000000022', '00000010-0002-0000-0000-000000000000', 'Science', 'Chemical reactions, life processes, light optics, electricity, magnetic effects'),
  ('a0000010-0003-0000-0000-000000000023', '00000010-0003-0000-0000-000000000000', 'Social Science', 'Nationalism in India, federalism, money and credit, resources development'),
  ('a0000010-0004-0000-0000-000000000024', '00000010-0005-0000-0000-000000000000', 'Computer Applications', 'Networking, cyber ethics, HTML/CSS web design, python scripting')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- TOPICS (CLASS 9 & 10)
-- ----------------------------------------------------------------------------
INSERT INTO topics (id, subject_id, name, description, difficulty) VALUES
  ('b0000009-0001-0000-0000-000000000033', 'a0000009-0001-0000-0000-000000000017', 'Number Systems & Polynomials', 'Irrational numbers, real numbers, remainder theorem, factor theorem', 'Medium'),
  ('b0000009-0001-0000-0000-000000000034', 'a0000009-0001-0000-0000-000000000017', 'Coordinate Geometry & Triangles', 'Cartesian plane, congruency criteria (SAS, ASA, SSS, RHS)', 'Hard'),
  ('b0000009-0002-0000-0000-000000000035', 'a0000009-0002-0000-0000-000000000018', 'Matter, Atoms & Molecules', 'States of matter, Dalton atomic theory, mole concept, valency', 'Medium'),
  ('b0000009-0002-0000-0000-000000000036', 'a0000009-0002-0000-0000-000000000018', 'Motion, Force & Gravitation', 'Equations of motion, Newton laws, universal law of gravitation', 'Hard'),
  ('b0000009-0003-0000-0000-000000000037', 'a0000009-0003-0000-0000-000000000019', 'French Revolution & Russian Socialism', 'Storming of Bastille, Jacobins, Bolshevik revolution under Lenin', 'Medium'),
  ('b0000009-0003-0000-0000-000000000038', 'a0000009-0003-0000-0000-000000000019', 'Physiography of India & Democracy', 'Himalayas, Northern plains, Election Commission, democratic features', 'Easy'),
  ('b0000009-0004-0000-0000-000000000039', 'a0000009-0004-0000-0000-000000000020', 'Complex Grammar & Conditionals', 'Zero, first, second, third conditional structures', 'Medium'),
  ('b0000009-0004-0000-0000-000000000040', 'a0000009-0004-0000-0000-000000000020', 'Reported Speech & Vocabulary', 'Commands, reporting dialogue, advanced lexical terms', 'Hard'),

  ('b0000010-0001-0000-0000-000000000041', 'a0000010-0001-0000-0000-000000000021', 'Real Numbers & Quadratic Equations', 'Fundamental Theorem of Arithmetic, quadratic formula, discriminant', 'Medium'),
  ('b0000010-0001-0000-0000-000000000042', 'a0000010-0001-0000-0000-000000000021', 'Trigonometry & Arithmetic Progression', 'Trigonometric ratios, identities, nth term and sum of AP', 'Hard'),
  ('b0000010-0002-0000-0000-000000000043', 'a0000010-0002-0000-0000-000000000022', 'Chemical Reactions & Carbon Compounds', 'Redox reactions, homologous series, functional groups, saponification', 'Hard'),
  ('b0000010-0002-0000-0000-000000000044', 'a0000010-0002-0000-0000-000000000022', 'Optics & Electric Current', 'Snell law, lens formula, Ohm law, Joule heating, electromagnetic induction', 'Hard'),
  ('b0000010-0003-0000-0000-000000000045', 'a0000010-0003-0000-0000-000000000023', 'Nationalism in India & Federalism', 'Non-Cooperation, Civil Disobedience, Union and State lists', 'Medium'),
  ('b0000010-0003-0000-0000-000000000046', 'a0000010-0003-0000-0000-000000000023', 'Money, Credit & Globalization', 'Formal/informal loans, RBI role, MNCs and trade liberalization', 'Easy'),
  ('b0000010-0004-0000-0000-000000000047', 'a0000010-0004-0000-0000-000000000024', 'Computer Networking & Cyber Ethics', 'LAN/WAN, IP addresses, phishing, digital footprint, firewall', 'Medium'),
  ('b0000010-0004-0000-0000-000000000048', 'a0000010-0004-0000-0000-000000000024', 'HTML, CSS & Python Scripting', 'Semantic HTML, CSS selectors, loops, lists, and functions in Python', 'Medium')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBTOPICS (CLASS 9 & 10)
-- ----------------------------------------------------------------------------
INSERT INTO subtopics (id, topic_id, name, description, difficulty) VALUES
  ('c0000009-0001-0000-0000-000000000065', 'b0000009-0001-0000-0000-000000000033', 'Irrational Numbers & Real Lines', 'Proving irrationality, rationalizing denominators', 'Medium'),
  ('c0000009-0001-0000-0000-000000000066', 'b0000009-0001-0000-0000-000000000033', 'Factorization of Polynomials', 'Splitting middle term, algebraic identities', 'Hard'),
  ('c0000009-0001-0000-0000-000000000067', 'b0000009-0001-0000-0000-000000000034', 'Cartesian Coordinates & Quadrants', 'Abscissa, ordinate, plotting points on plane', 'Easy'),
  ('c0000009-0001-0000-0000-000000000068', 'b0000009-0001-0000-0000-000000000034', 'Congruence Criteria of Triangles', 'SAS, ASA, AAS, SSS, RHS congruence proofs', 'Hard'),

  ('c0000009-0002-0000-0000-000000000069', 'b0000009-0002-0000-0000-000000000035', 'Atomic Mass & Mole Concept', 'Avogadro number, molar mass calculation', 'Hard'),
  ('c0000009-0002-0000-0000-000000000070', 'b0000009-0002-0000-0000-000000000035', 'Structure of the Atom', 'Electrons, protons, neutrons, Bohr model, valency', 'Medium'),
  ('c0000009-0002-0000-0000-000000000071', 'b0000009-0002-0000-0000-000000000036', 'Equations of Motion', 'v = u + at, s = ut + 0.5at^2, v^2 = u^2 + 2as', 'Medium'),
  ('c0000009-0002-0000-0000-000000000072', 'b0000009-0002-0000-0000-000000000036', 'Universal Law of Gravitation & Free Fall', 'Gravitational constant G, acceleration due to gravity g', 'Hard'),

  ('c0000009-0003-0000-0000-000000000073', 'b0000009-0003-0000-0000-000000000037', 'Outbreak of French Revolution', 'Estate system, National Assembly, Tennis Court Oath', 'Medium'),
  ('c0000009-0003-0000-0000-000000000074', 'b0000009-0003-0000-0000-000000000037', 'Russian Revolution 1917', 'Tsar Nicholas II, Bolsheviks, Vladimir Lenin April Theses', 'Hard'),
  ('c0000009-0003-0000-0000-000000000075', 'b0000009-0003-0000-0000-000000000038', 'Major Physiographic Divisions of India', 'Himalayan ranges, peninsular plateau, coastal plains', 'Easy'),
  ('c0000009-0003-0000-0000-000000000076', 'b0000009-0003-0000-0000-000000000038', 'Electoral Politics & Election Commission', 'Voter lists, constituencies, code of conduct', 'Medium'),

  ('c0000009-0004-0000-0000-000000000077', 'b0000009-0004-0000-0000-000000000039', 'Conditional Sentences', 'Type 1, Type 2, and Type 3 conditional clauses', 'Medium'),
  ('c0000009-0004-0000-0000-000000000078', 'b0000009-0004-0000-0000-000000000039', 'Inversion and Subjunctive Mood', 'Inversion with negative adverbs, unreal conditions', 'Hard'),
  ('c0000009-0004-0000-0000-000000000079', 'b0000009-0004-0000-0000-000000000040', 'Reported Speech for Exclamations', 'Conversion of exclamations and wishes', 'Hard'),
  ('c0000009-0004-0000-0000-000000000080', 'b0000009-0004-0000-0000-000000000040', 'Advanced Lexical Synonyms', 'High-register vocabulary replacements', 'Medium'),

  -- Class 10
  ('c0000010-0001-0000-0000-000000000081', 'b0000010-0001-0000-0000-000000000041', 'Fundamental Theorem of Arithmetic', 'Unique prime factorization, HCF and LCM relationship', 'Easy'),
  ('c0000010-0001-0000-0000-000000000082', 'b0000010-0001-0000-0000-000000000041', 'Nature of Roots & Discriminant', 'D = b^2 - 4ac, real, equal, and distinct roots', 'Medium'),
  ('c0000010-0001-0000-0000-000000000083', 'b0000010-0001-0000-0000-000000000042', 'Trigonometric Identities & Values', 'sin^2 + cos^2 = 1, values of 30, 45, 60 degrees', 'Hard'),
  ('c0000010-0001-0000-0000-000000000084', 'b0000010-0001-0000-0000-000000000042', 'Arithmetic Progression nth Term and Sum', 'an = a + (n-1)d, Sn = n/2[2a + (n-1)d]', 'Medium'),

  ('c0000010-0002-0000-0000-000000000085', 'b0000010-0002-0000-0000-000000000043', 'Types of Chemical Reactions', 'Combination, decomposition, displacement, redox', 'Medium'),
  ('c0000010-0002-0000-0000-000000000086', 'b0000010-0002-0000-0000-000000000043', 'Carbon Covalent Bonding & Allotropes', 'Tetravalency, catenation, diamond, graphite, fullerenes', 'Hard'),
  ('c0000010-0002-0000-0000-000000000087', 'b0000010-0002-0000-0000-000000000044', 'Spherical Mirrors & Refraction', 'Mirror formula, magnification, Snell law, refractive index', 'Hard'),
  ('c0000010-0002-0000-0000-000000000088', 'b0000010-0002-0000-0000-000000000044', 'Ohm Law & Electric Power', 'V = IR, equivalent resistance in series and parallel, P = VI', 'Hard'),

  ('c0000010-0003-0000-0000-000000000089', 'b0000010-0003-0000-0000-000000000045', 'Gandhian Movements in India', 'Rowlatt Satyagraha, Jallianwala Bagh, Dandi Salt March', 'Medium'),
  ('c0000010-0003-0000-0000-000000000090', 'b0000010-0003-0000-0000-000000000045', 'Federal System & Power Sharing', 'Union, State, Concurrent lists, linguistic states', 'Easy'),
  ('c0000010-0003-0000-0000-000000000091', 'b0000010-0003-0000-0000-000000000046', 'Money as Medium of Exchange & Credit', 'Barter system difficulties, currency, collateral security', 'Easy'),
  ('c0000010-0003-0000-0000-000000000092', 'b0000010-0003-0000-0000-000000000046', 'Globalization & WTO', 'Multinational corporations, trade barriers, World Trade Organization', 'Medium'),

  ('c0000010-0004-0000-0000-000000000093', 'b0000010-0004-0000-0000-000000000047', 'Computer Networks & Topology', 'Star, bus, ring topologies, routers, TCP/IP protocol', 'Medium'),
  ('c0000010-0004-0000-0000-000000000094', 'b0000010-0004-0000-0000-000000000047', 'Cyber Security & IT Act', 'Phishing, malware, SSL certificates, Indian IT Act 2000', 'Hard'),
  ('c0000010-0004-0000-0000-000000000095', 'b0000010-0004-0000-0000-000000000048', 'HTML5 Forms & CSS Styling', 'Form inputs, tables, CSS box model, external stylesheets', 'Medium'),
  ('c0000010-0004-0000-0000-000000000096', 'b0000010-0004-0000-0000-000000000048', 'Python Fundamentals', 'Conditional branching, for/while loops, lists, functions', 'Hard')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- QUESTIONS (QUESTIONS 221 - 290: CLASS 9)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty, question_type) VALUES
  ('d0000000-0000-0000-0000-000000000221', 'Which of the following numbers is an irrational number?', 'c0000009-0001-0000-0000-000000000065', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000222', 'Rationalize the denominator of 1 / (sqrt(5) + sqrt(2)).', 'c0000009-0001-0000-0000-000000000065', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000223', 'Find the remainder when p(x) = x^3 - 3x^2 + 4x + 50 is divided by (x - 3).', 'c0000009-0001-0000-0000-000000000066', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000224', 'Factorize: 6x^2 + 17x + 5 by splitting the middle term.', 'c0000009-0001-0000-0000-000000000066', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000225', 'In which quadrant does the Cartesian coordinate point (-4, 3) lie?', 'c0000009-0001-0000-0000-000000000067', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000226', 'What is the ordinate of any point lying on the x-axis?', 'c0000009-0001-0000-0000-000000000067', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000227', 'Which of the following is NOT a valid congruence criterion for triangles?', 'c0000009-0001-0000-0000-000000000068', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000228', 'In triangle ABC, AB = AC. If angle B = 50 degrees, find angle A.', 'c0000009-0001-0000-0000-000000000068', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000229', 'What is the numerical value of Avogadro constant?', 'c0000009-0002-0000-0000-000000000069', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000230', 'Calculate the molar mass of water (H2O) in g/mol (H=1, O=16).', 'c0000009-0002-0000-0000-000000000069', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000231', 'Who discovered the neutron in the atomic nucleus in 1932?', 'c0000009-0002-0000-0000-000000000070', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000232', 'What is the maximum number of electrons that can be accommodated in the M-shell (n=3)?', 'c0000009-0002-0000-0000-000000000070', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000233', 'A car starting from rest accelerates uniformly at 2 m/s^2. What is its velocity after 5 seconds?', 'c0000009-0002-0000-0000-000000000071', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000234', 'State the second equation of motion for displacement s in terms of initial velocity u, time t, and acceleration a.', 'c0000009-0002-0000-0000-000000000071', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000235', 'What is the SI unit of universal gravitational constant G?', 'c0000009-0002-0000-0000-000000000072', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000236', 'What is the standard acceleration due to gravity g near the surface of Earth in m/s^2?', 'c0000009-0002-0000-0000-000000000072', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000237', 'On which date in 1789 did the revolutionary storming of the Bastille prison take place in Paris?', 'c0000009-0003-0000-0000-000000000073', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000238', 'Who was the radical Jacobin leader who presided over the "Reign of Terror" in France?', 'c0000009-0003-0000-0000-000000000073', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000239', 'What were the three key demands of Lenin April Theses presented in 1917?', 'c0000009-0003-0000-0000-000000000074', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000240', 'What was the Russian Parliament called, created by Tsar Nicholas II following the 1905 revolution?', 'c0000009-0003-0000-0000-000000000074', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000241', 'Which is the oldest landmass of India, formed of ancient crystalline, igneous, and metamorphic rocks?', 'c0000009-0003-0000-0000-000000000075', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000242', 'Name the highest mountain peak in India, situated in Sikkim.', 'c0000009-0003-0000-0000-000000000075', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000243', 'Who appoints the Chief Election Commissioner of India?', 'c0000009-0003-0000-0000-000000000076', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000244', 'What is the minimum age required to contest election to the Lok Sabha in India?', 'c0000009-0003-0000-0000-000000000076', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000245', 'Complete conditional: "If it rains tomorrow, we _____ the cricket match."', 'c0000009-0004-0000-0000-000000000077', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000246', 'Complete type 3 conditional: "If he had trained harder, he _____ the championship."', 'c0000009-0004-0000-0000-000000000077', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000247', 'Choose the correct inverted sentence: "Scarcely _____ the station when the train departed."', 'c0000009-0004-0000-0000-000000000078', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000248', 'Change to indirect: "He said, ''Alas! I am undone.''"', 'c0000009-0004-0000-0000-000000000079', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000249', 'Convert: "She said, ''How delightful this garden is!''"', 'c0000009-0004-0000-0000-000000000079', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000250', 'Provide a high-register synonym for "ubiquitous".', 'c0000009-0004-0000-0000-000000000080', 'Hard', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000251', 'Express 0.333... (recurring decimal) as a rational number p/q in simplest form.', 'c0000009-0001-0000-0000-000000000065', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000252', 'If (x - 1) is a factor of kx^2 - 3x + k, find the value of k.', 'c0000009-0001-0000-0000-000000000066', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000253', 'The point of intersection of the coordinate axes is called the:', 'c0000009-0001-0000-0000-000000000067', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000254', 'In two right triangles, if the hypotenuse and one side are equal, they are congruent by:', 'c0000009-0001-0000-0000-000000000068', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000255', 'How many moles are present in 44 grams of carbon dioxide (CO2)? (C=12, O=16)', 'c0000009-0002-0000-0000-000000000069', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000256', 'What is the electronic configuration of Sodium (Na, Z=11)?', 'c0000009-0002-0000-0000-000000000070', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000257', 'What physical quantity does the area under a velocity-time graph represent?', 'c0000009-0002-0000-0000-000000000071', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000258', 'What is the weight in Newtons of a 10 kg mass on Earth where g = 9.8 m/s^2?', 'c0000009-0002-0000-0000-000000000072', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000259', 'What title was assumed by Napoleon Bonaparte when he crowned himself in 1804?', 'c0000009-0003-0000-0000-000000000073', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000260', 'What were the wealthy Russian peasants who resisted Stalin collectivization called?', 'c0000009-0003-0000-0000-000000000074', 'Hard', 'SAQ'),

  -- Class 9 Extended (Q261 - Q290)
  ('d0000000-0000-0000-0000-000000000261', 'What is the value of (sqrt(3) + 1)(sqrt(3) - 1)?', 'c0000009-0001-0000-0000-000000000065', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000262', 'What is the degree of a non-zero constant polynomial?', 'c0000009-0001-0000-0000-000000000066', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000263', 'If the coordinates of point P are (0, -7), where does it lie?', 'c0000009-0001-0000-0000-000000000067', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000264', 'In an isosceles triangle, angles opposite to equal sides are:', 'c0000009-0001-0000-0000-000000000068', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000265', 'What is the ratio of hydrogen to oxygen by mass in water?', 'c0000009-0002-0000-0000-000000000069', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000266', 'Who proposed the plum pudding model of the atom?', 'c0000009-0002-0000-0000-000000000070', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000267', 'What is the acceleration of a vehicle moving with uniform velocity?', 'c0000009-0002-0000-0000-000000000071', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000268', 'What is the value of gravitational acceleration g at the center of the Earth?', 'c0000009-0002-0000-0000-000000000072', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000269', 'Which fortress prison in Paris was attacked by citizens on July 14, 1789?', 'c0000009-0003-0000-0000-000000000073', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000270', 'Who was the last Tsar of Russia overthrown in 1917?', 'c0000009-0003-0000-0000-000000000074', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000271', 'Which is the southernmost point of the Indian Union territory (submerged in 2004 tsunami)?', 'c0000009-0003-0000-0000-000000000075', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000272', 'What is an electoral constituency reserved for scheduled castes or tribes called?', 'c0000009-0003-0000-0000-000000000076', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000273', 'If she studies regularly, she _____ pass the exams.', 'c0000009-0004-0000-0000-000000000077', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000274', 'Complete: "Never _____ such an incredible spectacle."', 'c0000009-0004-0000-0000-000000000078', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000275', 'Convert: "He said, ''Hurrah! We won.''"', 'c0000009-0004-0000-0000-000000000079', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000276', 'What is the synonym of "ephemeral"?', 'c0000009-0004-0000-0000-000000000080', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000277', 'Is the number pi rational or irrational?', 'c0000009-0001-0000-0000-000000000065', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000278', 'What is the zero of the polynomial p(x) = 2x + 5?', 'c0000009-0001-0000-0000-000000000066', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000279', 'What is the abscissa of the point (-5, 8)?', 'c0000009-0001-0000-0000-000000000067', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000280', 'What is the sum of angles of a quadrilateral in degrees?', 'c0000009-0001-0000-0000-000000000068', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000281', 'What is the mass of 1 mole of oxygen atoms (O)?', 'c0000009-0002-0000-0000-000000000069', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000282', 'What is the valency of Carbon (Z=6)?', 'c0000009-0002-0000-0000-000000000070', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000283', 'Newton first law of motion gives the qualitative definition of which property?', 'c0000009-0002-0000-0000-000000000071', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000284', 'What is the relation between weight W, mass m, and acceleration due to gravity g?', 'c0000009-0002-0000-0000-000000000072', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000285', 'Who wrote the influential tract "What is the Third Estate?" during the French Revolution?', 'c0000009-0003-0000-0000-000000000073', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000286', 'Which international body was formed by socialists in 1889 to coordinate their efforts?', 'c0000009-0003-0000-0000-000000000074', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000287', 'Which longitudinal valley lying between lesser Himalaya and the Shiwaliks is called?', 'c0000009-0003-0000-0000-000000000075', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000288', 'What is the official document containing voter names in a constituency called?', 'c0000009-0003-0000-0000-000000000076', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000289', 'If I _____ a bird, I would fly around the globe.', 'c0000009-0004-0000-0000-000000000077', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000290', 'Give the antonym of "gregarious".', 'c0000009-0004-0000-0000-000000000080', 'Hard', 'SAQ')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- QUESTIONS (QUESTIONS 291 - 360: CLASS 10)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty, question_type) VALUES
  ('d0000000-0000-0000-0000-000000000291', 'If HCF(306, 657) = 9, what is LCM(306, 657)?', 'c0000010-0001-0000-0000-000000000081', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000292', 'State the Fundamental Theorem of Arithmetic.', 'c0000010-0001-0000-0000-000000000081', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000293', 'For what condition of the discriminant D does a quadratic equation ax^2 + bx + c = 0 have real and equal roots?', 'c0000010-0001-0000-0000-000000000082', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000294', 'Find the discriminant of the quadratic equation 2x^2 - 4x + 3 = 0.', 'c0000010-0001-0000-0000-000000000082', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000295', 'Evaluate: sin^2(30 deg) + cos^2(30 deg).', 'c0000010-0001-0000-0000-000000000083', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000296', 'If tan(theta) = 4/3, find the value of sin(theta).', 'c0000010-0001-0000-0000-000000000083', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000297', 'What is the 10th term of the Arithmetic Progression 2, 7, 12, ...?', 'c0000010-0001-0000-0000-000000000084', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000298', 'Find the sum of the first 20 positive integers.', 'c0000010-0001-0000-0000-000000000084', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000299', 'What type of chemical reaction is: 2Mg + O2 -> 2MgO + Heat?', 'c0000010-0002-0000-0000-000000000085', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000300', 'Identify the reducing agent in the reaction: CuO + H2 -> Cu + H2O.', 'c0000010-0002-0000-0000-000000000085', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000301', 'Which unique property allows carbon atoms to link together to form long chains and rings?', 'c0000010-0002-0000-0000-000000000086', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000302', 'What is the functional group present in ethanoic acid (acetic acid)?', 'c0000010-0002-0000-0000-000000000086', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000303', 'An object is placed at the center of curvature (C) of a concave mirror. Where is the image formed?', 'c0000010-0002-0000-0000-000000000087', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000304', 'State Snell law of refraction mathematically.', 'c0000010-0002-0000-0000-000000000087', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000305', 'According to Ohm law, if electric potential difference V is tripled while resistance R is unchanged, what happens to current I?', 'c0000010-0002-0000-0000-000000000088', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000306', 'What is the equivalent resistance of two resistors of 6 ohms and 3 ohms connected in parallel?', 'c0000010-0002-0000-0000-000000000088', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000307', 'At which tragic venue in Amritsar did General Dyer open fire on unarmed civilians on 13 April 1919?', 'c0000010-0003-0000-0000-000000000089', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000308', 'In which coastal village did Mahatma Gandhi break the salt law to inaugurate the Civil Disobedience Movement?', 'c0000010-0003-0000-0000-000000000089', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000309', 'Subjects like Defense, Foreign Affairs, and Currency fall under which legislative list in the Indian Constitution?', 'c0000010-0003-0000-0000-000000000090', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000310', 'Which tier of local government was constitutionally recognized through the 73rd Constitutional Amendment Act?', 'c0000010-0003-0000-0000-000000000090', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000311', 'Which statutory institution issues currency notes in India on behalf of the Central Government?', 'c0000010-0003-0000-0000-000000000091', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000312', 'What is an asset that the borrower owns and uses as a guarantee to a lender until the loan is repaid?', 'c0000010-0003-0000-0000-000000000091', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000313', 'Removing barrier restrictions set by the government on foreign trade and investment is known as:', 'c0000010-0003-0000-0000-000000000092', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000314', 'Where are the headquarters of the World Trade Organization (WTO) located?', 'c0000010-0003-0000-0000-000000000092', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000315', 'Which network topology connects each node directly to a central hub or switch?', 'c0000010-0004-0000-0000-000000000093', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000316', 'What is the standard length of an IPv4 address in bits?', 'c0000010-0004-0000-0000-000000000093', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000317', 'What fraudulent technique attempts to steal confidential data by masquerading as a trustworthy entity in email?', 'c0000010-0004-0000-0000-000000000094', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000318', 'In which year was the Information Technology Act enacted in India?', 'c0000010-0004-0000-0000-000000000094', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000319', 'Which HTML5 tag is used to specify an input field for multi-line text?', 'c0000010-0004-0000-0000-000000000095', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000320', 'What is the output of the Python expression: len([10, 20, 30, 40])?', 'c0000010-0004-0000-0000-000000000096', 'Easy', 'SAQ'),

  -- Extended Class 10 (Q321 - Q360)
  ('d0000000-0000-0000-0000-000000000321', 'What is the HCF of two consecutive natural numbers?', 'c0000010-0001-0000-0000-000000000081', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000322', 'Find the roots of x^2 - 9 = 0.', 'c0000010-0001-0000-0000-000000000082', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000323', 'What is 1 + tan^2(theta) equal to in trigonometry?', 'c0000010-0001-0000-0000-000000000083', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000324', 'What is the common difference of the AP: 10, 7, 4, 1, ...?', 'c0000010-0001-0000-0000-000000000084', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000325', 'What is the chemical formula of Plaster of Paris?', 'c0000010-0002-0000-0000-000000000085', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000326', 'What is the IUPAC name of CH3-CH2-OH?', 'c0000010-0002-0000-0000-000000000086', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000327', 'The power of a lens with focal length 0.5 meter is:', 'c0000010-0002-0000-0000-000000000087', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000328', 'What is the commercial electrical unit 1 kWh equal to in Joules?', 'c0000010-0002-0000-0000-000000000088', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000329', 'In which year did the historic Chauri Chaura incident take place, leading to the withdrawal of Non-Cooperation?', 'c0000010-0003-0000-0000-000000000089', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000330', 'Which country shares power effectively between Dutch and French linguistic communities?', 'c0000010-0003-0000-0000-000000000090', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000331', 'What percentage of deposits do commercial banks in India roughly hold as cash reserve?', 'c0000010-0003-0000-0000-000000000091', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000332', 'What is the full form of MNC in global trade?', 'c0000010-0003-0000-0000-000000000092', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000333', 'Which communication protocol ensures secure encrypted data transmission over the World Wide Web?', 'c0000010-0004-0000-0000-000000000093', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000334', 'What is the legal right of a creator over their original intellectual creation called?', 'c0000010-0004-0000-0000-000000000094', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000335', 'Which CSS property is used to change the background color of an element?', 'c0000010-0004-0000-0000-000000000095', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000336', 'What keyword is used to define a function in Python?', 'c0000010-0004-0000-0000-000000000096', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000337', 'Can two positive integers have 18 as their HCF and 380 as their LCM?', 'c0000010-0001-0000-0000-000000000081', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000338', 'If one root of quadratic equation 2x^2 + kx - 6 = 0 is 2, find the value of k.', 'c0000010-0001-0000-0000-000000000082', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000339', 'What is the value of cos(90 - theta)?', 'c0000010-0001-0000-0000-000000000083', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000340', 'If an = 3n + 2, what is the first term a1 of the AP?', 'c0000010-0001-0000-0000-000000000084', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000341', 'What is the chemical name of bleaching powder used for disinfecting drinking water?', 'c0000010-0002-0000-0000-000000000085', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000342', 'What gas is evolved when sodium hydrogen carbonate reacts with hydrochloric acid?', 'c0000010-0002-0000-0000-000000000085', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000343', 'What is the general formula for the alkane series of hydrocarbons?', 'c0000010-0002-0000-0000-000000000086', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000344', 'Name the allotrope of carbon consisting of 60 carbon atoms shaped like a football.', 'c0000010-0002-0000-0000-000000000086', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000345', 'Which type of mirror is utilized as a rear-view safety mirror in automobiles?', 'c0000010-0002-0000-0000-000000000087', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000346', 'What is the refractive index of vacuum?', 'c0000010-0002-0000-0000-000000000087', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000347', 'Which device protects electrical domestic circuits from current overloading?', 'c0000010-0002-0000-0000-000000000088', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000348', 'State Joule law of heating for heat H produced in resistance R by current I for time t.', 'c0000010-0002-0000-0000-000000000088', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000349', 'Who was the author of the book "Hind Swaraj" published in 1909?', 'c0000010-0003-0000-0000-000000000089', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000350', 'How many languages are officially recognized in the Eighth Schedule of the Indian Constitution?', 'c0000010-0003-0000-0000-000000000090', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000351', 'What are Self-Help Groups (SHGs) typical membership size?', 'c0000010-0003-0000-0000-000000000091', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000352', 'What is tax on imports an example of in international economics?', 'c0000010-0003-0000-0000-000000000092', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000353', 'Which device converts analog electrical signals from telephone lines to digital computer signals?', 'c0000010-0004-0000-0000-000000000093', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000354', 'What is the full form of URL?', 'c0000010-0004-0000-0000-000000000093', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000355', 'Which security software inspects and filters incoming/outgoing network packets based on rules?', 'c0000010-0004-0000-0000-000000000094', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000356', 'What is the trail of data you leave behind while browsing the Internet called?', 'c0000010-0004-0000-0000-000000000094', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000357', 'Which HTML element is used to insert an image into a web page?', 'c0000010-0004-0000-0000-000000000095', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000358', 'In CSS, what is the space between the content boundary and its border called?', 'c0000010-0004-0000-0000-000000000095', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000359', 'What is the output of the Python expression: 17 // 3?', 'c0000010-0004-0000-0000-000000000096', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000360', 'Which Python built-in data type stores ordered, mutable elements in square brackets?', 'c0000010-0004-0000-0000-000000000096', 'Easy', 'SAQ')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- OPTIONS FOR QUESTIONS 261 - 360
-- ----------------------------------------------------------------------------
INSERT INTO options (question_id, answer, is_correct) VALUES
  -- Q261
  ('d0000000-0000-0000-0000-000000000261', '22,338', true),
  ('d0000000-0000-0000-0000-000000000261', '18,520', false),
  ('d0000000-0000-0000-0000-000000000261', '34,228', false),
  ('d0000000-0000-0000-0000-000000000261', '12,450', false),
  -- Q262 (SAQ)
  ('d0000000-0000-0000-0000-000000000262', 'Every composite number can be expressed uniquely as a product of prime factors', true),
  -- Q263
  ('d0000000-0000-0000-0000-000000000263', 'D = 0', true),
  ('d0000000-0000-0000-0000-000000000263', 'D > 0', false),
  ('d0000000-0000-0000-0000-000000000263', 'D < 0', false),
  ('d0000000-0000-0000-0000-000000000263', 'D is negative', false),
  -- Q264 (SAQ)
  ('d0000000-0000-0000-0000-000000000264', '-8', true),
  -- Q265
  ('d0000000-0000-0000-0000-000000000265', '1', true),
  ('d0000000-0000-0000-0000-000000000265', '0', false),
  ('d0000000-0000-0000-0000-000000000265', '1/2', false),
  ('d0000000-0000-0000-0000-000000000265', '2', false),
  -- Q266 (SAQ)
  ('d0000000-0000-0000-0000-000000000266', '4/5', true),
  -- Q267
  ('d0000000-0000-0000-0000-000000000267', '47', true),
  ('d0000000-0000-0000-0000-000000000267', '52', false),
  ('d0000000-0000-0000-0000-000000000267', '45', false),
  ('d0000000-0000-0000-0000-000000000267', '50', false),
  -- Q268 (SAQ)
  ('d0000000-0000-0000-0000-000000000268', '210', true),
  -- Q269
  ('d0000000-0000-0000-0000-000000000269', 'Combination and Exothermic reaction', true),
  ('d0000000-0000-0000-0000-000000000269', 'Decomposition reaction', false),
  ('d0000000-0000-0000-0000-000000000269', 'Displacement reaction', false),
  ('d0000000-0000-0000-0000-000000000269', 'Precipitation reaction', false),
  -- Q270 (SAQ)
  ('d0000000-0000-0000-0000-000000000270', 'H2 (Hydrogen gas)', true),

  -- Q271
  ('d0000000-0000-0000-0000-000000000271', 'Catenation', true),
  ('d0000000-0000-0000-0000-000000000271', 'Sublimation', false),
  ('d0000000-0000-0000-0000-000000000271', 'Electronegativity', false),
  ('d0000000-0000-0000-0000-000000000271', 'Isomerism only', false),
  -- Q272 (SAQ)
  ('d0000000-0000-0000-0000-000000000272', 'Carboxylic acid (-COOH)', true),
  -- Q273
  ('d0000000-0000-0000-0000-000000000273', 'At the center of curvature C, real and inverted', true),
  ('d0000000-0000-0000-0000-000000000273', 'At focus F, virtual and erect', false),
  ('d0000000-0000-0000-0000-000000000273', 'Between focus and pole', false),
  ('d0000000-0000-0000-0000-000000000273', 'At infinity', false),
  -- Q274 (SAQ)
  ('d0000000-0000-0000-0000-000000000274', 'sin(i) / sin(r) = constant (refractive index n)', true),
  -- Q275
  ('d0000000-0000-0000-0000-000000000275', 'Current I is tripled', true),
  ('d0000000-0000-0000-0000-000000000275', 'Current I is reduced to one-third', false),
  ('d0000000-0000-0000-0000-000000000275', 'Current I remains identical', false),
  ('d0000000-0000-0000-0000-000000000275', 'Current drops to zero', false),
  -- Q276 (SAQ)
  ('d0000000-0000-0000-0000-000000000276', '2 ohms', true),
  -- Q277
  ('d0000000-0000-0000-0000-000000000277', 'Jallianwala Bagh', true),
  ('d0000000-0000-0000-0000-000000000277', 'Chandni Chowk', false),
  ('d0000000-0000-0000-0000-000000000277', 'Sabarmati', false),
  ('d0000000-0000-0000-0000-000000000277', 'Champaran', false),
  -- Q278 (SAQ)
  ('d0000000-0000-0000-0000-000000000278', 'Dandi', true),
  -- Q279
  ('d0000000-0000-0000-0000-000000000279', 'Union List', true),
  ('d0000000-0000-0000-0000-000000000279', 'State List', false),
  ('d0000000-0000-0000-0000-000000000279', 'Concurrent List', false),
  ('d0000000-0000-0000-0000-000000000279', 'Residuary List', false),
  -- Q280 (SAQ)
  ('d0000000-0000-0000-0000-000000000280', 'Panchayati Raj (Rural local self-government)', true),

  -- Q281
  ('d0000000-0000-0000-0000-000000000281', 'Reserve Bank of India (RBI)', true),
  ('d0000000-0000-0000-0000-000000000281', 'State Bank of India', false),
  ('d0000000-0000-0000-0000-000000000281', 'Ministry of Commerce', false),
  ('d0000000-0000-0000-0000-000000000281', 'NITI Aayog', false),
  -- Q282 (SAQ)
  ('d0000000-0000-0000-0000-000000000282', 'Collateral', true),
  -- Q283
  ('d0000000-0000-0000-0000-000000000283', 'Trade Liberalization', true),
  ('d0000000-0000-0000-0000-000000000283', 'Nationalization', false),
  ('d0000000-0000-0000-0000-000000000283', 'Protective tariffing', false),
  ('d0000000-0000-0000-0000-000000000283', 'Disinvestment', false),
  -- Q284 (SAQ)
  ('d0000000-0000-0000-0000-000000000284', 'Geneva, Switzerland', true),
  -- Q285
  ('d0000000-0000-0000-0000-000000000285', 'Star Topology', true),
  ('d0000000-0000-0000-0000-000000000285', 'Ring Topology', false),
  ('d0000000-0000-0000-0000-000000000285', 'Bus Topology', false),
  ('d0000000-0000-0000-0000-000000000285', 'Mesh Topology', false),
  -- Q286 (SAQ)
  ('d0000000-0000-0000-0000-000000000286', '32 bits', true),
  -- Q287
  ('d0000000-0000-0000-0000-000000000287', 'Phishing attack', true),
  ('d0000000-0000-0000-0000-000000000287', 'DDoS attack', false),
  ('d0000000-0000-0000-0000-000000000287', 'SQL Injection', false),
  ('d0000000-0000-0000-0000-000000000287', 'Cross-site scripting', false),
  -- Q288 (SAQ)
  ('d0000000-0000-0000-0000-000000000288', '2000', true),
  -- Q289
  ('d0000000-0000-0000-0000-000000000289', '<textarea>', true),
  ('d0000000-0000-0000-0000-000000000289', '<input type="text">', false),
  ('d0000000-0000-0000-0000-000000000289', '<textbox>', false),
  ('d0000000-0000-0000-0000-000000000289', '<multitext>', false),
  -- Q290 (SAQ)
  ('d0000000-0000-0000-0000-000000000290', '4', true),

  -- Q321
  ('d0000000-0000-0000-0000-000000000321', '1', true),
  ('d0000000-0000-0000-0000-000000000321', '2', false),
  ('d0000000-0000-0000-0000-000000000321', '0', false),
  ('d0000000-0000-0000-0000-000000000321', 'None', false),
  -- Q322 (SAQ)
  ('d0000000-0000-0000-0000-000000000322', 'x = 3, -3', true),
  -- Q323
  ('d0000000-0000-0000-0000-000000000323', 'sec^2(theta)', true),
  ('d0000000-0000-0000-0000-000000000323', 'cosec^2(theta)', false),
  ('d0000000-0000-0000-0000-000000000323', 'sin^2(theta)', false),
  ('d0000000-0000-0000-0000-000000000323', 'cos^2(theta)', false),
  -- Q324 (SAQ)
  ('d0000000-0000-0000-0000-000000000324', '-3', true),
  -- Q325
  ('d0000000-0000-0000-0000-000000000325', 'CaSO4 . 1/2 H2O', true),
  ('d0000000-0000-0000-0000-000000000325', 'CaSO4 . 2 H2O', false),
  ('d0000000-0000-0000-0000-000000000325', 'CaSO4 . 5 H2O', false),
  ('d0000000-0000-0000-0000-000000000325', 'CaCO3', false),
  -- Q326 (SAQ)
  ('d0000000-0000-0000-0000-000000000326', 'Ethanol', true),
  -- Q327
  ('d0000000-0000-0000-0000-000000000327', '+2 Diopters (+2 D)', true),
  ('d0000000-0000-0000-0000-000000000327', '+0.5 D', false),
  ('d0000000-0000-0000-0000-000000000327', '+5 D', false),
  ('d0000000-0000-0000-0000-000000000327', '-2 D', false),
  -- Q328 (SAQ)
  ('d0000000-0000-0000-0000-000000000328', '3.6 * 10^6 Joules', true),
  -- Q329
  ('d0000000-0000-0000-0000-000000000329', '1922', true),
  ('d0000000-0000-0000-0000-000000000329', '1919', false),
  ('d0000000-0000-0000-0000-000000000329', '1930', false),
  ('d0000000-0000-0000-0000-000000000329', '1942', false),
  -- Q330 (SAQ)
  ('d0000000-0000-0000-0000-000000000330', 'Belgium', true),

  -- Q331
  ('d0000000-0000-0000-0000-000000000331', 'Around 15%', true),
  ('d0000000-0000-0000-0000-000000000331', 'Around 50%', false),
  ('d0000000-0000-0000-0000-000000000331', 'Around 5%', false),
  ('d0000000-0000-0000-0000-000000000331', 'Around 80%', false),
  -- Q332 (SAQ)
  ('d0000000-0000-0000-0000-000000000332', 'Multinational Corporation', true),
  -- Q333
  ('d0000000-0000-0000-0000-000000000333', 'HTTPS', true),
  ('d0000000-0000-0000-0000-000000000333', 'HTTP', false),
  ('d0000000-0000-0000-0000-000000000333', 'FTP', false),
  ('d0000000-0000-0000-0000-000000000333', 'SMTP', false),
  -- Q334 (SAQ)
  ('d0000000-0000-0000-0000-000000000334', 'Copyright', true),
  -- Q335
  ('d0000000-0000-0000-0000-000000000335', 'background-color', true),
  ('d0000000-0000-0000-0000-000000000335', 'bgcolor', false),
  ('d0000000-0000-0000-0000-000000000335', 'color-background', false),
  ('d0000000-0000-0000-0000-000000000335', 'fill-color', false),
  -- Q336 (SAQ)
  ('d0000000-0000-0000-0000-000000000336', 'def', true),
  -- Q337
  ('d0000000-0000-0000-0000-000000000337', 'No, because HCF must strictly divide LCM', true),
  ('d0000000-0000-0000-0000-000000000337', 'Yes, any two integers can have arbitrary HCF and LCM', false),
  ('d0000000-0000-0000-0000-000000000337', 'Yes, since 380 is even', false),
  ('d0000000-0000-0000-0000-000000000337', 'Only for negative integers', false),
  -- Q338 (SAQ)
  ('d0000000-0000-0000-0000-000000000338', 'k = -1', true),
  -- Q339
  ('d0000000-0000-0000-0000-000000000339', 'sin(theta)', true),
  ('d0000000-0000-0000-0000-000000000339', 'tan(theta)', false),
  ('d0000000-0000-0000-0000-000000000339', '-sin(theta)', false),
  ('d0000000-0000-0000-0000-000000000339', 'sec(theta)', false),
  -- Q340 (SAQ)
  ('d0000000-0000-0000-0000-000000000340', '5', true),

  -- Q341
  ('d0000000-0000-0000-0000-000000000341', 'Calcium oxychloride (CaOCl2)', true),
  ('d0000000-0000-0000-0000-000000000341', 'Calcium carbonate', false),
  ('d0000000-0000-0000-0000-000000000341', 'Calcium hydroxide', false),
  ('d0000000-0000-0000-0000-000000000341', 'Sodium hypochlorite', false),
  -- Q342 (SAQ)
  ('d0000000-0000-0000-0000-000000000342', 'Carbon dioxide (CO2)', true),
  -- Q343
  ('d0000000-0000-0000-0000-000000000343', 'CnH2n+2', true),
  ('d0000000-0000-0000-0000-000000000343', 'CnH2n', false),
  ('d0000000-0000-0000-0000-000000000343', 'CnH2n-2', false),
  ('d0000000-0000-0000-0000-000000000343', 'CnHn', false),
  -- Q344 (SAQ)
  ('d0000000-0000-0000-0000-000000000344', 'Buckminsterfullerene (C60)', true),
  -- Q345
  ('d0000000-0000-0000-0000-000000000345', 'Convex mirror', true),
  ('d0000000-0000-0000-0000-000000000345', 'Concave mirror', false),
  ('d0000000-0000-0000-0000-000000000345', 'Plane mirror', false),
  ('d0000000-0000-0000-0000-000000000345', 'Cylindrical mirror', false),
  -- Q346 (SAQ)
  ('d0000000-0000-0000-0000-000000000346', '1', true),
  -- Q347
  ('d0000000-0000-0000-0000-000000000347', 'Electric fuse / MCB', true),
  ('d0000000-0000-0000-0000-000000000347', 'Rheostat', false),
  ('d0000000-0000-0000-0000-000000000347', 'Voltmeter', false),
  ('d0000000-0000-0000-0000-000000000347', 'Galvanometer', false),
  -- Q348 (SAQ)
  ('d0000000-0000-0000-0000-000000000348', 'H = I^2 * R * t', true),
  -- Q349
  ('d0000000-0000-0000-0000-000000000349', 'Mahatma Gandhi', true),
  ('d0000000-0000-0000-0000-000000000349', 'Bal Gangadhar Tilak', false),
  ('d0000000-0000-0000-0000-000000000349', 'Gopal Krishna Gokhale', false),
  ('d0000000-0000-0000-0000-000000000349', 'Jawaharlal Nehru', false),
  -- Q350 (SAQ)
  ('d0000000-0000-0000-0000-000000000350', '22 languages', true),

  -- Q351
  ('d0000000-0000-0000-0000-000000000351', '15 to 20 members', true),
  ('d0000000-0000-0000-0000-000000000351', '100 to 200 members', false),
  ('d0000000-0000-0000-0000-000000000351', '2 to 5 members', false),
  ('d0000000-0000-0000-0000-000000000351', '50 to 80 members', false),
  -- Q352 (SAQ)
  ('d0000000-0000-0000-0000-000000000352', 'Trade barrier (Tariff)', true),
  -- Q353
  ('d0000000-0000-0000-0000-000000000353', 'Modem', true),
  ('d0000000-0000-0000-0000-000000000353', 'Repeater', false),
  ('d0000000-0000-0000-0000-000000000353', 'Switch', false),
  ('d0000000-0000-0000-0000-000000000353', 'Bridge', false),
  -- Q354 (SAQ)
  ('d0000000-0000-0000-0000-000000000354', 'Uniform Resource Locator', true),
  -- Q355
  ('d0000000-0000-0000-0000-000000000355', 'Firewall', true),
  ('d0000000-0000-0000-0000-000000000356', 'Spyware', false),
  ('d0000000-0000-0000-0000-000000000357', 'Trojan', false),
  ('d0000000-0000-0000-0000-000000000358', 'Cookie', false),
  -- Q356 (SAQ)
  ('d0000000-0000-0000-0000-000000000356', 'Digital footprint', true),
  -- Q357
  ('d0000000-0000-0000-0000-000000000357', '<img>', true),
  ('d0000000-0000-0000-0000-000000000357', '<picture-box>', false),
  ('d0000000-0000-0000-0000-000000000357', '<image>', false),
  ('d0000000-0000-0000-0000-000000000357', '<src>', false),
  -- Q358 (SAQ)
  ('d0000000-0000-0000-0000-000000000358', 'Padding', true),
  -- Q359
  ('d0000000-0000-0000-0000-000000000359', '5', true),
  ('d0000000-0000-0000-0000-000000000359', '5.66', false),
  ('d0000000-0000-0000-0000-000000000359', '2', false),
  ('d0000000-0000-0000-0000-000000000359', '6', false),
  -- Q360 (SAQ)
  ('d0000000-0000-0000-0000-000000000360', 'List', true)
ON CONFLICT (question_id, answer) DO NOTHING;

