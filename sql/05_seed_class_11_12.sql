-- ============================================================================
-- 05_SEED_CLASS_11_12.SQL
-- KNOWLEDGEVERSE CURRICULUM SEED: CLASS 11 & CLASS 12 (QUESTIONS 361 - 500)
-- Boards: CBSE, ICSE, BSEB, WBBSE, DBSE
-- ============================================================================

-- ----------------------------------------------------------------------------
-- CLASSES (CLASS 11 & 12)
-- ----------------------------------------------------------------------------
INSERT INTO "class" (id, name, board) VALUES
  ('00000011-0001-0000-0000-000000000000', 'Class 11', 'CBSE'),
  ('00000011-0002-0000-0000-000000000000', 'Class 11', 'ICSE'),
  ('00000011-0003-0000-0000-000000000000', 'Class 11', 'BSEB'),
  ('00000011-0004-0000-0000-000000000000', 'Class 11', 'WBBSE'),
  ('00000011-0005-0000-0000-000000000000', 'Class 11', 'DBSE'),
  ('00000012-0001-0000-0000-000000000000', 'Class 12', 'CBSE'),
  ('00000012-0002-0000-0000-000000000000', 'Class 12', 'ICSE'),
  ('00000012-0003-0000-0000-000000000000', 'Class 12', 'BSEB'),
  ('00000012-0004-0000-0000-000000000000', 'Class 12', 'WBBSE'),
  ('00000012-0005-0000-0000-000000000000', 'Class 12', 'DBSE')
ON CONFLICT (name, board) DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBJECTS (CLASS 11 & 12)
-- ----------------------------------------------------------------------------
INSERT INTO subject (id, class_id, name, description) VALUES
  ('a0000011-0001-0000-0000-000000000025', '00000011-0001-0000-0000-000000000000', 'Physics', 'Kinematics, laws of motion, thermodynamics, oscillations, gravitation'),
  ('a0000011-0002-0000-0000-000000000026', '00000011-0002-0000-0000-000000000000', 'Chemistry', 'Atomic structure, chemical bonding, thermodynamics, equilibrium, organic chemistry'),
  ('a0000011-0003-0000-0000-000000000027', '00000011-0003-0000-0000-000000000000', 'Mathematics', 'Sets, trigonometry, permutations & combinations, calculus limits & derivatives'),
  ('a0000011-0004-0000-0000-000000000028', '00000011-0004-0000-0000-000000000000', 'Biology', 'Cell division, plant physiology, photosynthesis, human neural & endocrine systems'),
  ('a0000011-0005-0000-0000-000000000029', '00000011-0005-0000-0000-000000000000', 'Computer Science', 'Python data structures, algorithms, sorting, boolean logic'),
  ('a0000012-0001-0000-0000-000000000030', '00000012-0001-0000-0000-000000000000', 'Physics', 'Electrostatics, current electricity, optics, electromagnetic induction, semiconductors'),
  ('a0000012-0002-0000-0000-000000000031', '00000012-0002-0000-0000-000000000000', 'Chemistry', 'Solutions, electrochemistry, kinetics, coordination compounds, organic reactions'),
  ('a0000012-0003-0000-0000-000000000032', '00000012-0001-0000-0000-000000000000', 'Mathematics', 'Matrices, calculus, differential equations, vectors, 3D geometry, probability'),
  ('a0000012-0004-0000-0000-000000000033', '00000012-0003-0000-0000-000000000000', 'Biology', 'Genetics, molecular biology, biotechnology, human reproduction, ecology'),
  ('a0000012-0005-0000-0000-000000000034', '00000012-0005-0000-0000-000000000000', 'Computer Science', 'Data structures (stacks, queues), file handling, SQL database management')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- TOPICS (CLASS 11 & 12)
-- ----------------------------------------------------------------------------
INSERT INTO topics (id, subject_id, name, description, difficulty) VALUES
  -- Class 11 Topics
  ('b0000011-0001-0000-0000-000000000049', 'a0000011-0001-0000-0000-000000000025', 'Mechanics & Thermodynamics', 'Vectors, projectile motion, Newton laws, First & Second law of thermodynamics', 'Hard'),
  ('b0000011-0002-0000-0000-000000000050', 'a0000011-0002-0000-0000-000000000026', 'Chemical Bonding & Equilibrium', 'Hybridization, molecular orbital theory, Le Chatelier principle, pH buffer', 'Hard'),
  ('b0000011-0003-0000-0000-000000000051', 'a0000011-0003-0000-0000-000000000027', 'Calculus & Combinatorics', 'Limits, derivatives, permutations, combinations, binomial theorem', 'Hard'),
  ('b0000011-0004-0000-0000-000000000052', 'a0000011-0004-0000-0000-000000000028', 'Cell Biology & Physiology', 'Mitosis, meiosis, Calvin cycle, Krebs cycle, action potential', 'Medium'),
  ('b0000011-0005-0000-0000-000000000053', 'a0000011-0005-0000-0000-000000000029', 'Python Algorithms & Logic', 'Dictionary mappings, tuples, bubble sort, insertion sort', 'Medium'),

  -- Class 12 Topics
  ('b0000012-0001-0000-0000-000000000054', 'a0000012-0001-0000-0000-000000000030', 'Electrodynamics & Optics', 'Gauss law, capacitors, Kirchhoff laws, wave optics, photoelectric effect', 'Hard'),
  ('b0000012-0002-0000-0000-000000000055', 'a0000012-0002-0000-0000-000000000031', 'Physical & Organic Chemistry', 'Nernst equation, rate laws, Aldol, Cannizzaro, coordination isomers', 'Hard'),
  ('b0000012-0003-0000-0000-000000000056', 'a0000012-0003-0000-0000-000000000032', 'Advanced Calculus & Vectors', 'Definite integrals, differential equations, dot and cross products, Bayes theorem', 'Hard'),
  ('b0000012-0004-0000-0000-000000000057', 'a0000012-0004-0000-0000-000000000033', 'Genetics & Biotechnology', 'DNA replication, transcription, operon model, recombinant DNA, PCR', 'Hard'),
  ('b0000012-0005-0000-0000-000000000058', 'a0000012-0005-0000-0000-000000000034', 'Data Structures & SQL', 'Stack push/pop, queue enqueue/dequeue, relational SQL joins, aggregation', 'Medium')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- SUBTOPICS (CLASS 11 & 12)
-- ----------------------------------------------------------------------------
INSERT INTO subtopics (id, topic_id, name, description, difficulty) VALUES
  ('c0000011-0001-0000-0000-000000000097', 'b0000011-0001-0000-0000-000000000049', 'Projectile Motion & Work-Energy', 'Range, maximum height, work-energy theorem', 'Hard'),
  ('c0000011-0001-0000-0000-000000000098', 'b0000011-0001-0000-0000-000000000049', 'Laws of Thermodynamics & Heat Engines', 'Carnot cycle, efficiency, entropy change', 'Hard'),
  ('c0000011-0002-0000-0000-000000000099', 'b0000011-0002-0000-0000-000000000050', 'Hybridization & Molecular Geometry', 'sp, sp2, sp3 hybridization, VSEPR shapes', 'Medium'),
  ('c0000011-0002-0000-0000-000000000100', 'b0000011-0002-0000-0000-000000000050', 'Chemical Equilibrium & pH', 'Equilibrium constant Kc/Kp, Henderson equation', 'Hard'),
  ('c0000011-0003-0000-0000-000000000101', 'b0000011-0003-0000-0000-000000000051', 'Limits and Standard Derivatives', 'Evaluation of limits, derivative of trig functions', 'Hard'),
  ('c0000011-0003-0000-0000-000000000102', 'b0000011-0003-0000-0000-000000000051', 'Permutations & Combinations', 'nPr, nCr, circular arrangements', 'Medium'),
  ('c0000011-0004-0000-0000-000000000103', 'b0000011-0004-0000-0000-000000000052', 'Photosynthesis (C3 & C4 Pathways)', 'RuBisCO, light reaction, ATP synthesis', 'Medium'),
  ('c0000011-0004-0000-0000-000000000104', 'b0000011-0004-0000-0000-000000000052', 'Cell Division (Mitosis & Meiosis)', 'Phases of mitosis, crossing over in pachynema', 'Hard'),
  ('c0000011-0005-0000-0000-000000000105', 'b0000011-0005-0000-0000-000000000053', 'Python Dictionaries & Sorting', 'Key-value pairs, bubble sort time complexity', 'Medium'),

  ('c0000012-0001-0000-0000-000000000106', 'b0000012-0001-0000-0000-000000000054', 'Electrostatic Potential & Capacitance', 'Parallel plate capacitor, dielectric constant, energy stored', 'Hard'),
  ('c0000012-0001-0000-0000-000000000107', 'b0000012-0001-0000-0000-000000000054', 'Electromagnetic Induction & Alternating Current', 'Faraday law, Lenz law, AC impedance, resonance', 'Hard'),
  ('c0000012-0001-0000-0000-000000000108', 'b0000012-0001-0000-0000-000000000054', 'Wave Optics & Modern Physics', 'Interference, fringe width, de Broglie wavelength', 'Hard'),
  ('c0000012-0002-0000-0000-000000000109', 'b0000012-0002-0000-0000-000000000055', 'Electrochemistry & Chemical Kinetics', 'EMF, Nernst equation, first-order rate constant, half-life', 'Hard'),
  ('c0000012-0002-0000-0000-000000000110', 'b0000012-0002-0000-0000-000000000055', 'Coordination Compounds & Named Reactions', 'Werner theory, crystal field splitting, Aldol, Cannizzaro', 'Hard'),
  ('c0000012-0003-0000-0000-000000000111', 'b0000012-0003-0000-0000-000000000056', 'Definite Integrals & Differential Equations', 'Fundamental theorem of calculus, integrating factor', 'Hard'),
  ('c0000012-0003-0000-0000-000000000112', 'b0000012-0003-0000-0000-000000000056', 'Vector Algebra & 3D Lines', 'Direction cosines, shortest distance between skew lines', 'Hard'),
  ('c0000012-0004-0000-0000-000000000113', 'b0000012-0004-0000-0000-000000000057', 'Molecular Basis of Inheritance', 'DNA double helix, transcription, translation, genetic code', 'Hard'),
  ('c0000012-0004-0000-0000-000000000114', 'b0000012-0004-0000-0000-000000000057', 'Biotechnology Principles & Processes', 'Restriction endonucleases, plasmid vectors, PCR, agarose gel', 'Hard'),
  ('c0000012-0005-0000-0000-000000000115', 'b0000012-0005-0000-0000-000000000058', 'Linear Data Structures (Stack & Queue)', 'LIFO, FIFO, push, pop, enqueue, dequeue implementation', 'Medium'),
  ('c0000012-0005-0000-0000-000000000116', 'b0000012-0005-0000-0000-000000000058', 'Relational Database Queries & Joins', 'INNER JOIN, LEFT JOIN, GROUP BY, HAVING, subqueries', 'Hard')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- QUESTIONS (QUESTIONS 361 - 430: CLASS 11)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty, question_type) VALUES
  ('d0000000-0000-0000-0000-000000000361', 'At what projection angle theta with the horizontal is the range of a projectile maximum?', 'c0000011-0001-0000-0000-000000000097', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000362', 'What is the work done by a centripetal force on an object moving along a circular path?', 'c0000011-0001-0000-0000-000000000097', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000363', 'What is the theoretical thermal efficiency of a reversible Carnot engine operating between temperatures T1 (source) and T2 (sink)?', 'c0000011-0001-0000-0000-000000000098', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000364', 'State the First Law of Thermodynamics mathematically.', 'c0000011-0001-0000-0000-000000000098', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000365', 'What is the hybridization and geometric shape of the methane (CH4) molecule?', 'c0000011-0002-0000-0000-000000000099', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000366', 'What is the bond order of the oxygen molecule (O2) according to Molecular Orbital Theory?', 'c0000011-0002-0000-0000-000000000099', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000367', 'According to Le Chatelier principle, increasing pressure on the Haber ammonia synthesis favors which direction?', 'c0000011-0002-0000-0000-000000000100', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000368', 'What is the pH of an aqueous solution whose hydronium ion concentration [H3O+] is 10^-5 M?', 'c0000011-0002-0000-0000-000000000100', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000369', 'Evaluate the limit: lim (x -> 0) [sin(x) / x].', 'c0000011-0003-0000-0000-000000000101', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000370', 'What is the derivative of f(x) = tan(x) with respect to x?', 'c0000011-0003-0000-0000-000000000101', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000371', 'In how many different ways can 5 books be arranged on a shelf?', 'c0000011-0003-0000-0000-000000000102', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000372', 'What is the value of 10C3?', 'c0000011-0003-0000-0000-000000000102', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000373', 'What is the primary CO2 acceptor molecule in the mesophyll cells of C4 plants?', 'c0000011-0004-0000-0000-000000000103', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000374', 'Which enzyme catalyzes carbon fixation in the Calvin C3 cycle?', 'c0000011-0004-0000-0000-000000000103', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000375', 'In which sub-stage of Prophase-I of meiosis does genetic crossing over take place?', 'c0000011-0004-0000-0000-000000000104', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000376', 'What structure holds two sister chromatids together before anaphase separation?', 'c0000011-0004-0000-0000-000000000104', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000377', 'What is the worst-case time complexity of the Bubble Sort algorithm for an array of n items?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000378', 'Are dictionary keys in Python mutable or immutable?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000379', 'What is the escape velocity from the surface of the Earth approximately equal to?', 'c0000011-0001-0000-0000-000000000097', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000380', 'In an isothermal thermodynamic expansion of an ideal gas, what is the change in internal energy delta U?', 'c0000011-0001-0000-0000-000000000098', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000381', 'What is the geometric shape of phosphorus pentachloride (PCl5) in gas phase?', 'c0000011-0002-0000-0000-000000000099', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000382', 'What is the conjugate base of sulfuric acid (H2SO4)?', 'c0000011-0002-0000-0000-000000000100', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000383', 'What is the derivative of e^(3x) with respect to x?', 'c0000011-0003-0000-0000-000000000101', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000384', 'In how many ways can a committee of 3 be chosen from 7 people?', 'c0000011-0003-0000-0000-000000000102', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000385', 'How many molecules of ATP are generated net in glycolysis from one glucose molecule?', 'c0000011-0004-0000-0000-000000000103', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000386', 'Which stage of cell division is characterized by chromosomes aligning along the equatorial plane?', 'c0000011-0004-0000-0000-000000000104', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000387', 'Which Python built-in method adds a key-value pair or updates an existing key in a dictionary?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000388', 'What is the time complexity of binary search on a sorted list of length n?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000389', 'What is the dimensional formula of universal gravitational constant G?', 'c0000011-0001-0000-0000-000000000097', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000390', 'In adiabatic process, what is the relation between pressure P and volume V for an ideal gas?', 'c0000011-0001-0000-0000-000000000098', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000391', 'Which of the following molecules has zero dipole moment due to symmetric geometry?', 'c0000011-0002-0000-0000-000000000099', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000392', 'State the Henderson-Hasselbalch equation for an acidic buffer solution.', 'c0000011-0002-0000-0000-000000000100', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000393', 'What is the derivative of ln(x) for x > 0?', 'c0000011-0003-0000-0000-000000000101', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000394', 'How many terms are there in the binomial expansion of (x + a)^n?', 'c0000011-0003-0000-0000-000000000102', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000395', 'In C4 plants, Kranz anatomy is prominently exhibited in which anatomical structure?', 'c0000011-0004-0000-0000-000000000103', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000396', 'During which phase of cell division do homologous chromosomes separate towards opposite poles?', 'c0000011-0004-0000-0000-000000000104', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000397', 'Which boolean logic gate outputs True only when all of its inputs are True?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000398', 'What is the outcome of bool([]), testing an empty Python list in a condition?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000399', 'What is the period T of a simple pendulum of length L in terms of gravity g?', 'c0000011-0001-0000-0000-000000000097', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000400', 'State the Zeroth Law of Thermodynamics regarding thermal equilibrium.', 'c0000011-0001-0000-0000-000000000098', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000401', 'What is the bond angle in a water (H2O) molecule according to VSEPR theory?', 'c0000011-0002-0000-0000-000000000099', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000402', 'What is the expression for ionic product of water Kw at 25 degrees Celsius?', 'c0000011-0002-0000-0000-000000000100', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000403', 'What is the derivative of cos(2x)?', 'c0000011-0003-0000-0000-000000000101', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000404', 'What is the value of 0! (zero factorial)?', 'c0000011-0003-0000-0000-000000000102', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000405', 'Where does the Krebs tricarboxylic acid (TCA) cycle take place in eukaryotic cells?', 'c0000011-0004-0000-0000-000000000103', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000406', 'What enzyme initiates synthesis of DNA during the S-phase of the cell cycle?', 'c0000011-0004-0000-0000-000000000104', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000407', 'What data type is returned by the Python expression: (1, 2, 3)?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000408', 'Which sorting algorithm repeatedly steps through the list, compares adjacent elements and swaps them?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000409', 'What happens to the gravitational force between two masses if the distance between them is doubled?', 'c0000011-0001-0000-0000-000000000097', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000410', 'What is the entropy of a perfectly crystalline substance at absolute zero temperature (0 K)?', 'c0000011-0001-0000-0000-000000000098', 'Medium', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000411', 'Which orbital overlaps form a sigma bond?', 'c0000011-0002-0000-0000-000000000099', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000412', 'What is the conjugate acid of NH3?', 'c0000011-0002-0000-0000-000000000100', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000413', 'Evaluate: d/dx (x^4 + 3x^2 - 7).', 'c0000011-0003-0000-0000-000000000101', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000414', 'In how many ways can 4 students sit in a row?', 'c0000011-0003-0000-0000-000000000102', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000415', 'What is the net ATP yield from complete aerobic respiration of one glucose molecule?', 'c0000011-0004-0000-0000-000000000103', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000416', 'What stage of meiosis exhibits the formation of synaptonemal complex between homologs?', 'c0000011-0004-0000-0000-000000000104', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000417', 'Which function converts an integer to its binary string representation in Python?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000418', 'What is the output of 5 ^ 3 in Python bitwise XOR?', 'c0000011-0005-0000-0000-000000000105', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000419', 'What is the stress-strain ratio within the elastic limit defined as?', 'c0000011-0001-0000-0000-000000000097', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000420', 'What is the work done in an isochoric thermodynamic process where volume is constant?', 'c0000011-0001-0000-0000-000000000098', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000421', 'What is the hybridization of carbon in ethyne (acetylene, C2H2)?', 'c0000011-0002-0000-0000-000000000099', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000422', 'What is the relationship between Kp and Kc for a reaction with delta n moles of gas?', 'c0000011-0002-0000-0000-000000000100', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000423', 'What is the derivative of e^x at x = 0?', 'c0000011-0003-0000-0000-000000000101', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000424', 'What is nC0 equal to for any positive integer n?', 'c0000011-0003-0000-0000-000000000102', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000425', 'What is the terminal electron acceptor in the mitochondrial electron transport chain (ETC)?', 'c0000011-0004-0000-0000-000000000103', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000426', 'What cell organelle organizes the spindle apparatus during animal cell division?', 'c0000011-0004-0000-0000-000000000104', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000427', 'Which operator tests object identity (memory address) in Python?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000428', 'What is the result of 1 << 3 in Python bitwise left shift?', 'c0000011-0005-0000-0000-000000000105', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000429', 'What is the SI unit of viscosity coefficient?', 'c0000011-0001-0000-0000-000000000097', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000430', 'What is the value of molar gas constant R in J/(mol K)?', 'c0000011-0001-0000-0000-000000000098', 'Easy', 'SAQ')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- QUESTIONS (QUESTIONS 431 - 500: CLASS 12)
-- ----------------------------------------------------------------------------
INSERT INTO question (id, question, subtopic_id, difficulty, question_type) VALUES
  ('d0000000-0000-0000-0000-000000000431', 'What is the capacitance of a parallel plate capacitor filled with dielectric slab of constant K?', 'c0000012-0001-0000-0000-000000000106', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000432', 'What is the electric field inside a hollow charged conducting sphere in electrostatics?', 'c0000012-0001-0000-0000-000000000106', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000433', 'According to Lenz Law, the induced EMF polarity opposes which physical cause?', 'c0000012-0001-0000-0000-000000000107', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000434', 'What is the resonant angular frequency omega_0 of a series LCR alternating current circuit?', 'c0000012-0001-0000-0000-000000000107', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000435', 'In Young double-slit experiment, fringe width beta is given by which formula?', 'c0000012-0001-0000-0000-000000000108', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000436', 'State the de Broglie wavelength lambda formula for a particle of mass m moving with velocity v.', 'c0000012-0001-0000-0000-000000000108', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000437', 'What is the half-life t_1/2 of a first-order chemical reaction with rate constant k?', 'c0000012-0002-0000-0000-000000000109', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000438', 'Write the Nernst equation for electrode potential at 298 K.', 'c0000012-0002-0000-0000-000000000109', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000439', 'Which organic reaction transforms benzaldehyde into benzyl alcohol and sodium benzoate using concentrated NaOH?', 'c0000012-0002-0000-0000-000000000110', 'Hard', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000440', 'What is the coordination number of cobalt in [Co(NH3)6]Cl3?', 'c0000012-0002-0000-0000-000000000110', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000441', 'Evaluate the definite integral: int (0 to pi/2) [sin(x) dx].', 'c0000012-0003-0000-0000-000000000111', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000442', 'What is the integrating factor (IF) for the linear differential equation dy/dx + P(x)y = Q(x)?', 'c0000012-0003-0000-0000-000000000111', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000443', 'What is the dot product of two mutually perpendicular non-zero vectors a and b?', 'c0000012-0003-0000-0000-000000000112', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000444', 'If a line makes angles 90, 60, and 30 degrees with coordinate axes, verify cos^2(alpha) + cos^2(beta) + cos^2(gamma).', 'c0000012-0003-0000-0000-000000000112', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000445', 'Who elucidated the double helix structure of DNA in 1953?', 'c0000012-0004-0000-0000-000000000113', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000446', 'What is the universal start codon that initiates protein translation?', 'c0000012-0004-0000-0000-000000000113', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000447', 'Which bacterial enzyme acts as molecular scissors to cleave foreign viral DNA at specific palindromic recognition sequences?', 'c0000012-0004-0000-0000-000000000114', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000448', 'Who invented the Polymerase Chain Reaction (PCR) technique in 1983?', 'c0000012-0004-0000-0000-000000000114', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000449', 'Which data structure strictly operates on Last In First Out (LIFO) order?', 'c0000012-0005-0000-0000-000000000115', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000450', 'What is the condition called when one attempts to pop an item from an empty stack?', 'c0000012-0005-0000-0000-000000000115', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000451', 'Which SQL clause is used to filter records resulting from a GROUP BY aggregation?', 'c0000012-0005-0000-0000-000000000116', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000452', 'Write the SQL command to delete all rows from a table without logging individual row deletions.', 'c0000012-0005-0000-0000-000000000116', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000453', 'What is the energy U stored in a capacitor of capacitance C charged to potential V?', 'c0000012-0001-0000-0000-000000000106', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000454', 'What is the power factor of a purely resistive alternating current circuit?', 'c0000012-0001-0000-0000-000000000107', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000455', 'Einstein photoelectric equation relates maximum kinetic energy of emitted photoelectrons to which factor?', 'c0000012-0001-0000-0000-000000000108', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000456', 'What is the SI unit of molar conductivity?', 'c0000012-0002-0000-0000-000000000109', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000457', 'What is the oxidation state of nickel in nickel tetracarbonyl [Ni(CO)4]?', 'c0000012-0002-0000-0000-000000000110', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000458', 'Evaluate: int [1 / (1 + x^2) dx].', 'c0000012-0003-0000-0000-000000000111', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000459', 'What is the magnitude of the cross product a x b if vectors a and b are parallel?', 'c0000012-0003-0000-0000-000000000112', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000460', 'How many hydrogen bonds connect Guanine and Cytosine in DNA base pairing?', 'c0000012-0004-0000-0000-000000000113', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000461', 'What thermostable DNA polymerase is employed in PCR amplification?', 'c0000012-0004-0000-0000-000000000114', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000462', 'What matrix is standardly used for resolving DNA fragments in gel electrophoresis?', 'c0000012-0004-0000-0000-000000000114', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000463', 'Which data structure implements First In First Out (FIFO) order?', 'c0000012-0005-0000-0000-000000000115', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000464', 'Which SQL join returns all matched rows plus unmatched rows from both tables?', 'c0000012-0005-0000-0000-000000000116', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000465', 'What is the capacitance of an isolated spherical conductor of radius R in vacuum?', 'c0000012-0001-0000-0000-000000000106', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000466', 'What is the power consumed in a purely inductive AC circuit?', 'c0000012-0001-0000-0000-000000000107', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000467', 'What is the shape of the interference fringes formed in Young double-slit experiment on a flat screen?', 'c0000012-0001-0000-0000-000000000108', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000468', 'What is the unit of rate constant k for a second-order reaction?', 'c0000012-0002-0000-0000-000000000109', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000469', 'Which reagent converts primary alcohols into aldehydes without over-oxidizing to carboxylic acids?', 'c0000012-0002-0000-0000-000000000110', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000470', 'Evaluate the integral of sec^2(x) dx.', 'c0000012-0003-0000-0000-000000000111', 'Easy', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000471', 'If vectors a and b are orthogonal, what is their dot product a . b?', 'c0000012-0003-0000-0000-000000000112', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000472', 'In transcription, which RNA polymerase enzyme synthesizes precursor mRNA in eukaryotic nuclei?', 'c0000012-0004-0000-0000-000000000113', 'Hard', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000473', 'Which plasmid vector was the first widely used artificial cloning vector engineered by Bolivar and Rodriguez?', 'c0000012-0004-0000-0000-000000000114', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000474', 'What operation pushes an element onto a stack?', 'c0000012-0005-0000-0000-000000000115', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000475', 'Which SQL aggregate function counts the total number of non-null records in a column?', 'c0000012-0005-0000-0000-000000000116', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000476', 'What is the net electric flux through any closed Gaussian surface enclosing a net charge Q?', 'c0000012-0001-0000-0000-000000000106', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000477', 'In an alternating current circuit, what is the impedance Z of a series resistor R and inductor L?', 'c0000012-0001-0000-0000-000000000107', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000478', 'What is the threshold frequency nu_0 in photoelectric effect?', 'c0000012-0001-0000-0000-000000000108', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000479', 'What is the order of reaction for the radioactive decay of unstable nuclides?', 'c0000012-0002-0000-0000-000000000109', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000480', 'What is the IUPAC name of the complex K4[Fe(CN)6]?', 'c0000012-0002-0000-0000-000000000110', 'Hard', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000481', 'What is the order and degree of the differential equation d^2y/dx^2 + (dy/dx)^3 = 0?', 'c0000012-0003-0000-0000-000000000111', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000482', 'What is the magnitude of the unit vector i + j + k divided by sqrt(3)?', 'c0000012-0003-0000-0000-000000000112', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000483', 'Which DNA replication model was experimentally confirmed by Meselson and Stahl using 15N isotope?', 'c0000012-0004-0000-0000-000000000113', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000484', 'What is the full form of PCR in molecular biology?', 'c0000012-0004-0000-0000-000000000114', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000485', 'Which Python list method removes and returns the last element of the list?', 'c0000012-0005-0000-0000-000000000115', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000486', 'What keyword in SQL is used to eliminate duplicate values from a query result?', 'c0000012-0005-0000-0000-000000000116', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000487', 'What is the work done in moving a test charge over an equipotential surface?', 'c0000012-0001-0000-0000-000000000106', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000488', 'What is the SI unit of magnetic flux?', 'c0000012-0001-0000-0000-000000000107', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000489', 'Which phenomenon demonstrates the transverse wave nature of light?', 'c0000012-0001-0000-0000-000000000108', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000490', 'What is the Arrhenius equation relating rate constant k and activation energy Ea?', 'c0000012-0002-0000-0000-000000000109', 'Hard', 'SAQ'),

  ('d0000000-0000-0000-0000-000000000491', 'What type of isomerism is shown by [Co(NH3)5Br]SO4 and [Co(NH3)5SO4]Br?', 'c0000012-0002-0000-0000-000000000110', 'Medium', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000492', 'Evaluate: int (1/x) dx for x > 0.', 'c0000012-0003-0000-0000-000000000111', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000493', 'What is the vector product i x j in Cartesian coordinates?', 'c0000012-0003-0000-0000-000000000112', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000494', 'Which enzyme unzips the DNA double helix during replication?', 'c0000012-0004-0000-0000-000000000113', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000495', 'Which genetically modified crop was approved for commercial cultivation in India in 2002?', 'c0000012-0004-0000-0000-000000000114', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000496', 'In circular queue with max size N, what formula computes the next rear index after enqueue?', 'c0000012-0005-0000-0000-000000000115', 'Medium', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000497', 'Which SQL constraint uniquely identifies each record in a database table and disallows NULL?', 'c0000012-0005-0000-0000-000000000116', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000498', 'What is the SI unit of capacitance?', 'c0000012-0001-0000-0000-000000000106', 'Easy', 'SAQ'),
  ('d0000000-0000-0000-0000-000000000499', 'What is the energy of a photon of frequency nu according to Planck hypothesis?', 'c0000012-0001-0000-0000-000000000108', 'Easy', 'MCQ'),
  ('d0000000-0000-0000-0000-000000000500', 'What is the value of P(A|B) according to Bayes Theorem?', 'c0000012-0003-0000-0000-000000000112', 'Hard', 'SAQ')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- OPTIONS FOR QUESTIONS 361 - 500
-- ----------------------------------------------------------------------------
INSERT INTO options (question_id, answer, is_correct) VALUES
  -- Q361
  ('d0000000-0000-0000-0000-000000000361', '45 degrees', true),
  ('d0000000-0000-0000-0000-000000000361', '90 degrees', false),
  ('d0000000-0000-0000-0000-000000000361', '30 degrees', false),
  ('d0000000-0000-0000-0000-000000000361', '60 degrees', false),
  -- Q362 (SAQ)
  ('d0000000-0000-0000-0000-000000000362', 'Zero (0 Joules)', true),
  -- Q363
  ('d0000000-0000-0000-0000-000000000363', 'eta = 1 - (T2 / T1)', true),
  ('d0000000-0000-0000-0000-000000000363', 'eta = 1 - (T1 / T2)', false),
  ('d0000000-0000-0000-0000-000000000363', 'eta = T2 / T1', false),
  ('d0000000-0000-0000-0000-000000000363', 'eta = 1 + (T2 / T1)', false),
  -- Q364 (SAQ)
  ('d0000000-0000-0000-0000-000000000364', 'delta Q = delta U + W', true),
  -- Q365
  ('d0000000-0000-0000-0000-000000000365', 'sp3 hybridization, Regular Tetrahedral', true),
  ('d0000000-0000-0000-0000-000000000365', 'sp2 hybridization, Trigonal planar', false),
  ('d0000000-0000-0000-0000-000000000365', 'sp hybridization, Linear', false),
  ('d0000000-0000-0000-0000-000000000365', 'dsp2 hybridization, Square planar', false),
  -- Q366 (SAQ)
  ('d0000000-0000-0000-0000-000000000366', '2', true),
  -- Q367
  ('d0000000-0000-0000-0000-000000000367', 'Forward direction (formation of ammonia)', true),
  ('d0000000-0000-0000-0000-000000000367', 'Backward direction (dissociation into N2 and H2)', false),
  ('d0000000-0000-0000-0000-000000000367', 'No effect on equilibrium', false),
  ('d0000000-0000-0000-0000-000000000367', 'Stops reaction completely', false),
  -- Q368 (SAQ)
  ('d0000000-0000-0000-0000-000000000368', 'pH = 5', true),
  -- Q369
  ('d0000000-0000-0000-0000-000000000369', '1', true),
  ('d0000000-0000-0000-0000-000000000369', '0', false),
  ('d0000000-0000-0000-0000-000000000369', 'Infinity', false),
  ('d0000000-0000-0000-0000-000000000369', '-1', false),
  -- Q370 (SAQ)
  ('d0000000-0000-0000-0000-000000000370', 'sec^2(x)', true),

  -- Q371
  ('d0000000-0000-0000-0000-000000000371', '120 ways (5!)', true),
  ('d0000000-0000-0000-0000-000000000371', '25 ways', false),
  ('d0000000-0000-0000-0000-000000000371', '60 ways', false),
  ('d0000000-0000-0000-0000-000000000371', '720 ways', false),
  -- Q372 (SAQ)
  ('d0000000-0000-0000-0000-000000000372', '120', true),
  -- Q373
  ('d0000000-0000-0000-0000-000000000373', 'Phosphoenolpyruvate (PEP)', true),
  ('d0000000-0000-0000-0000-000000000373', 'Ribulose 1,5-bisphosphate (RuBP)', false),
  ('d0000000-0000-0000-0000-000000000373', 'Oxaloacetic acid', false),
  ('d0000000-0000-0000-0000-000000000373', 'Malic acid', false),
  -- Q374 (SAQ)
  ('d0000000-0000-0000-0000-000000000374', 'RuBisCO', true),
  -- Q375
  ('d0000000-0000-0000-0000-000000000375', 'Pachytene', true),
  ('d0000000-0000-0000-0000-000000000375', 'Leptotene', false),
  ('d0000000-0000-0000-0000-000000000375', 'Zygotene', false),
  ('d0000000-0000-0000-0000-000000000375', 'Diplotene', false),
  -- Q376 (SAQ)
  ('d0000000-0000-0000-0000-000000000376', 'Centromere', true),
  -- Q377
  ('d0000000-0000-0000-0000-000000000377', 'O(n^2)', true),
  ('d0000000-0000-0000-0000-000000000377', 'O(n log n)', false),
  ('d0000000-0000-0000-0000-000000000377', 'O(n)', false),
  ('d0000000-0000-0000-0000-000000000377', 'O(1)', false),
  -- Q378 (SAQ)
  ('d0000000-0000-0000-0000-000000000378', 'Immutable (hashable types only)', true),
  -- Q379
  ('d0000000-0000-0000-0000-000000000379', '11.2 km/s', true),
  ('d0000000-0000-0000-0000-000000000379', '9.8 km/s', false),
  ('d0000000-0000-0000-0000-000000000379', '25.0 km/s', false),
  ('d0000000-0000-0000-0000-000000000379', '7.9 km/s', false),
  -- Q380 (SAQ)
  ('d0000000-0000-0000-0000-000000000380', 'delta U = 0', true),

  -- Q381
  ('d0000000-0000-0000-0000-000000000381', 'Trigonal bipyramidal (sp3d)', true),
  ('d0000000-0000-0000-0000-000000000381', 'Square planar', false),
  ('d0000000-0000-0000-0000-000000000381', 'Octahedral', false),
  ('d0000000-0000-0000-0000-000000000381', 'Tetrahedral', false),
  -- Q382 (SAQ)
  ('d0000000-0000-0000-0000-000000000382', 'HSO4^- (Hydrogen sulfate ion)', true),
  -- Q383
  ('d0000000-0000-0000-0000-000000000383', '3 * e^(3x)', true),
  ('d0000000-0000-0000-0000-000000000383', 'e^(3x)', false),
  ('d0000000-0000-0000-0000-000000000383', '(1/3) * e^(3x)', false),
  ('d0000000-0000-0000-0000-000000000383', '3x * e^(3x-1)', false),
  -- Q384 (SAQ)
  ('d0000000-0000-0000-0000-000000000384', '35 ways (7C3)', true),
  -- Q385
  ('d0000000-0000-0000-0000-000000000385', '2 ATP', true),
  ('d0000000-0000-0000-0000-000000000385', '4 ATP', false),
  ('d0000000-0000-0000-0000-000000000385', '36 ATP', false),
  ('d0000000-0000-0000-0000-000000000385', '8 ATP', false),
  -- Q386 (SAQ)
  ('d0000000-0000-0000-0000-000000000386', 'Metaphase', true),
  -- Q387
  ('d0000000-0000-0000-0000-000000000387', 'dict.update()', true),
  ('d0000000-0000-0000-0000-000000000387', 'dict.append()', false),
  ('d0000000-0000-0000-0000-000000000387', 'dict.insert()', false),
  ('d0000000-0000-0000-0000-000000000387', 'dict.push()', false),
  -- Q388 (SAQ)
  ('d0000000-0000-0000-0000-000000000388', 'O(log n)', true),
  -- Q389
  ('d0000000-0000-0000-0000-000000000389', '[M^-1 L^3 T^-2]', true),
  ('d0000000-0000-0000-0000-000000000389', '[M L T^-2]', false),
  ('d0000000-0000-0000-0000-000000000389', '[M L^2 T^-2]', false),
  ('d0000000-0000-0000-0000-000000000389', '[M^-2 L^2 T^-1]', false),
  -- Q390 (SAQ)
  ('d0000000-0000-0000-0000-000000000390', 'P * V^gamma = constant', true),

  -- Q391
  ('d0000000-0000-0000-0000-000000000391', 'Carbon dioxide (CO2)', true),
  ('d0000000-0000-0000-0000-000000000391', 'Water (H2O)', false),
  ('d0000000-0000-0000-0000-000000000391', 'Ammonia (NH3)', false),
  ('d0000000-0000-0000-0000-000000000391', 'Sulfur dioxide (SO2)', false),
  -- Q392 (SAQ)
  ('d0000000-0000-0000-0000-000000000392', 'pH = pKa + log([Salt] / [Acid])', true),
  -- Q393
  ('d0000000-0000-0000-0000-000000000393', '1 / x', true),
  ('d0000000-0000-0000-0000-000000000393', 'x', false),
  ('d0000000-0000-0000-0000-000000000393', '1 / x^2', false),
  ('d0000000-0000-0000-0000-000000000393', 'e^x', false),
  -- Q394 (SAQ)
  ('d0000000-0000-0000-0000-000000000394', 'n + 1 terms', true),
  -- Q395
  ('d0000000-0000-0000-0000-000000000395', 'Bundle sheath cells around vascular bundles', true),
  ('d0000000-0000-0000-0000-000000000395', 'Epidermal guard cells only', false),
  ('d0000000-0000-0000-0000-000000000395', 'Spongy mesophyll exclusively', false),
  ('d0000000-0000-0000-0000-000000000395', 'Root cortex parenchymal layers', false),
  -- Q396 (SAQ)
  ('d0000000-0000-0000-0000-000000000396', 'Anaphase-I', true),
  -- Q397
  ('d0000000-0000-0000-0000-000000000397', 'AND gate', true),
  ('d0000000-0000-0000-0000-000000000397', 'OR gate', false),
  ('d0000000-0000-0000-0000-000000000397', 'NOT gate', false),
  ('d0000000-0000-0000-0000-000000000397', 'XOR gate', false),
  -- Q398 (SAQ)
  ('d0000000-0000-0000-0000-000000000398', 'False', true),
  -- Q399
  ('d0000000-0000-0000-0000-000000000399', 'T = 2*pi * sqrt(L / g)', true),
  ('d0000000-0000-0000-0000-000000000399', 'T = 2*pi * sqrt(g / L)', false),
  ('d0000000-0000-0000-0000-000000000399', 'T = 4*pi^2 * (L / g)', false),
  ('d0000000-0000-0000-0000-000000000399', 'T = pi * (L / g)', false),
  -- Q400 (SAQ)
  ('d0000000-0000-0000-0000-000000000400', 'If bodies A and B are in thermal equilibrium with C, then A and B are in thermal equilibrium with each other', true),

  -- Q401
  ('d0000000-0000-0000-0000-000000000401', '104.5 degrees', true),
  ('d0000000-0000-0000-0000-000000000401', '109.5 degrees', false),
  ('d0000000-0000-0000-0000-000000000401', '120 degrees', false),
  ('d0000000-0000-0000-0000-000000000401', '180 degrees', false),
  -- Q402 (SAQ)
  ('d0000000-0000-0000-0000-000000000402', 'Kw = 1.0 * 10^-14 mol^2/L^2', true),
  -- Q403
  ('d0000000-0000-0000-0000-000000000403', '-2 * sin(2x)', true),
  ('d0000000-0000-0000-0000-000000000403', '2 * sin(2x)', false),
  ('d0000000-0000-0000-0000-000000000403', '-sin(2x)', false),
  ('d0000000-0000-0000-0000-000000000403', 'cos(2x)', false),
  -- Q404 (SAQ)
  ('d0000000-0000-0000-0000-000000000404', '1', true),
  -- Q405
  ('d0000000-0000-0000-0000-000000000405', 'Mitochondrial matrix', true),
  ('d0000000-0000-0000-0000-000000000405', 'Cytoplasm cytosol', false),
  ('d0000000-0000-0000-0000-000000000405', 'Inner mitochondrial membrane', false),
  ('d0000000-0000-0000-0000-000000000405', 'Nucleoplasm', false),
  -- Q406 (SAQ)
  ('d0000000-0000-0000-0000-000000000406', 'DNA Polymerase', true),
  -- Q407
  ('d0000000-0000-0000-0000-000000000407', 'tuple', true),
  ('d0000000-0000-0000-0000-000000000407', 'list', false),
  ('d0000000-0000-0000-0000-000000000407', 'set', false),
  ('d0000000-0000-0000-0000-000000000407', 'dict', false),
  -- Q408 (SAQ)
  ('d0000000-0000-0000-0000-000000000408', 'Bubble Sort', true),
  -- Q409
  ('d0000000-0000-0000-0000-000000000409', 'Decreases to one-fourth (1/4)', true),
  ('d0000000-0000-0000-0000-000000000409', 'Decreases to half', false),
  ('d0000000-0000-0000-0000-000000000409', 'Doubles', false),
  ('d0000000-0000-0000-0000-000000000409', 'Quadruples', false),
  -- Q410 (SAQ)
  ('d0000000-0000-0000-0000-000000000410', '0 (Third Law of Thermodynamics)', true),

  -- Q411
  ('d0000000-0000-0000-0000-000000000411', 'End-to-end (axial) overlap along internuclear axis', true),
  ('d0000000-0000-0000-0000-000000000411', 'Sideways (lateral) overlap of parallel p orbitals', false),
  ('d0000000-0000-0000-0000-000000000411', 'Non-overlapping interaction only', false),
  ('d0000000-0000-0000-0000-000000000411', 'Dative electron pair transfer exclusively', false),
  -- Q412 (SAQ)
  ('d0000000-0000-0000-0000-000000000412', 'NH4^+ (Ammonium ion)', true),
  -- Q413
  ('d0000000-0000-0000-0000-000000000413', '4x^3 + 6x', true),
  ('d0000000-0000-0000-0000-000000000413', '4x^3 + 3x', false),
  ('d0000000-0000-0000-0000-000000000413', 'x^4 + 6x', false),
  ('d0000000-0000-0000-0000-000000000413', '4x^3 + 6x - 7', false),
  -- Q414 (SAQ)
  ('d0000000-0000-0000-0000-000000000414', '24 ways (4!)', true),
  -- Q415
  ('d0000000-0000-0000-0000-000000000415', '30 to 32 ATP', true),
  ('d0000000-0000-0000-0000-000000000415', '2 ATP', false),
  ('d0000000-0000-0000-0000-000000000415', '100 ATP', false),
  ('d0000000-0000-0000-0000-000000000415', '12 ATP', false),
  -- Q416 (SAQ)
  ('d0000000-0000-0000-0000-000000000416', 'Zygotene', true),
  -- Q417
  ('d0000000-0000-0000-0000-000000000417', 'bin()', true),
  ('d0000000-0000-0000-0000-000000000417', 'toBinary()', false),
  ('d0000000-0000-0000-0000-000000000417', 'binary()', false),
  ('d0000000-0000-0000-0000-000000000417', 'format_bin()', false),
  -- Q418 (SAQ)
  ('d0000000-0000-0000-0000-000000000418', '6', true),
  -- Q419
  ('d0000000-0000-0000-0000-000000000419', 'Modulus of Elasticity (Hooke Law)', true),
  ('d0000000-0000-0000-0000-000000000419', 'Poisson ratio', false),
  ('d0000000-0000-0000-0000-000000000419', 'Compressibility factor', false),
  ('d0000000-0000-0000-0000-000000000419', 'Surface tension coefficient', false),
  -- Q420 (SAQ)
  ('d0000000-0000-0000-0000-000000000420', '0 (zero, since dV = 0)', true),

  -- Q421
  ('d0000000-0000-0000-0000-000000000421', 'sp hybridization (linear geometry, 180 deg)', true),
  ('d0000000-0000-0000-0000-000000000421', 'sp2 hybridization', false),
  ('d0000000-0000-0000-0000-000000000421', 'sp3 hybridization', false),
  ('d0000000-0000-0000-0000-000000000421', 'dsp2 hybridization', false),
  -- Q422 (SAQ)
  ('d0000000-0000-0000-0000-000000000422', 'Kp = Kc * (RT)^delta_n', true),
  -- Q423
  ('d0000000-0000-0000-0000-000000000423', '1', true),
  ('d0000000-0000-0000-0000-000000000423', '0', false),
  ('d0000000-0000-0000-0000-000000000423', 'e', false),
  ('d0000000-0000-0000-0000-000000000423', 'Infinity', false),
  -- Q424 (SAQ)
  ('d0000000-0000-0000-0000-000000000424', '1', true),
  -- Q425
  ('d0000000-0000-0000-0000-000000000425', 'Molecular Oxygen (O2)', true),
  ('d0000000-0000-0000-0000-000000000425', 'Cytochrome c', false),
  ('d0000000-0000-0000-0000-000000000425', 'NAD+', false),
  ('d0000000-0000-0000-0000-000000000425', 'Ubiquinone', false),
  -- Q426 (SAQ)
  ('d0000000-0000-0000-0000-000000000426', 'Centrosome (Centrioles)', true),
  -- Q427
  ('d0000000-0000-0000-0000-000000000427', 'is', true),
  ('d0000000-0000-0000-0000-000000000427', '==', false),
  ('d0000000-0000-0000-0000-000000000427', 'in', false),
  ('d0000000-0000-0000-0000-000000000427', 'equals()', false),
  -- Q428 (SAQ)
  ('d0000000-0000-0000-0000-000000000428', '8', true),
  -- Q429
  ('d0000000-0000-0000-0000-000000000429', 'Poiseuille (Pa s or N s / m^2)', true),
  ('d0000000-0000-0000-0000-000000000429', 'Newton per meter', false),
  ('d0000000-0000-0000-0000-000000000429', 'Joule per second', false),
  ('d0000000-0000-0000-0000-000000000429', 'Pascal per meter', false),
  -- Q430 (SAQ)
  ('d0000000-0000-0000-0000-000000000430', '8.314 J / (mol K)', true),

  -- Q431
  ('d0000000-0000-0000-0000-000000000431', 'C = (K * epsilon_0 * A) / d', true),
  ('d0000000-0000-0000-0000-000000000431', 'C = (epsilon_0 * A) / (K * d)', false),
  ('d0000000-0000-0000-0000-000000000431', 'C = (K * d) / (epsilon_0 * A)', false),
  ('d0000000-0000-0000-0000-000000000431', 'C = K * epsilon_0 * A * d', false),
  -- Q432 (SAQ)
  ('d0000000-0000-0000-0000-000000000432', 'Zero (E = 0)', true),
  -- Q433
  ('d0000000-0000-0000-0000-000000000433', 'The change in magnetic flux producing it', true),
  ('d0000000-0000-0000-0000-000000000433', 'The total circuit resistance', false),
  ('d0000000-0000-0000-0000-000000000433', 'The velocity of electron conduction only', false),
  ('d0000000-0000-0000-0000-000000000433', 'The temperature of the wire', false),
  -- Q434 (SAQ)
  ('d0000000-0000-0000-0000-000000000434', 'omega_0 = 1 / sqrt(L * C)', true),
  -- Q435
  ('d0000000-0000-0000-0000-000000000435', 'beta = (lambda * D) / d', true),
  ('d0000000-0000-0000-0000-000000000435', 'beta = (lambda * d) / D', false),
  ('d0000000-0000-0000-0000-000000000435', 'beta = (D * d) / lambda', false),
  ('d0000000-0000-0000-0000-000000000435', 'beta = lambda * D * d', false),
  -- Q436 (SAQ)
  ('d0000000-0000-0000-0000-000000000436', 'lambda = h / (m * v)', true),
  -- Q437
  ('d0000000-0000-0000-0000-000000000437', 't_1/2 = 0.693 / k', true),
  ('d0000000-0000-0000-0000-000000000437', 't_1/2 = k / 0.693', false),
  ('d0000000-0000-0000-0000-000000000437', 't_1/2 = 1 / (k * [A]_0)', false),
  ('d0000000-0000-0000-0000-000000000437', 't_1/2 = [A]_0 / (2 * k)', false),
  -- Q438 (SAQ)
  ('d0000000-0000-0000-0000-000000000438', 'E = E0 - (0.0591 / n) * log(Q)', true),
  -- Q439
  ('d0000000-0000-0000-0000-000000000439', 'Cannizzaro Reaction', true),
  ('d0000000-0000-0000-0000-000000000439', 'Aldol Condensation', false),
  ('d0000000-0000-0000-0000-000000000439', 'Friedel-Crafts Acylation', false),
  ('d0000000-0000-0000-0000-000000000439', 'Clemmensen Reduction', false),
  -- Q440 (SAQ)
  ('d0000000-0000-0000-0000-000000000440', '6', true),

  -- Q441
  ('d0000000-0000-0000-0000-000000000441', '1', true),
  ('d0000000-0000-0000-0000-000000000441', '0', false),
  ('d0000000-0000-0000-0000-000000000441', '-1', false),
  ('d0000000-0000-0000-0000-000000000441', 'pi / 2', false),
  -- Q442 (SAQ)
  ('d0000000-0000-0000-0000-000000000442', 'IF = e^(int P(x) dx)', true),
  -- Q443
  ('d0000000-0000-0000-0000-000000000443', '0', true),
  ('d0000000-0000-0000-0000-000000000443', '1', false),
  ('d0000000-0000-0000-0000-000000000443', '-1', false),
  ('d0000000-0000-0000-0000-000000000443', '|a| * |b|', false),
  -- Q444 (SAQ)
  ('d0000000-0000-0000-0000-000000000444', '1 (cos^2(alpha) + cos^2(beta) + cos^2(gamma) = 1)', true),
  -- Q445
  ('d0000000-0000-0000-0000-000000000445', 'James Watson and Francis Crick', true),
  ('d0000000-0000-0000-0000-000000000445', 'Gregor Mendel and Thomas Morgan', false),
  ('d0000000-0000-0000-0000-000000000445', 'Frederick Griffith and Oswald Avery', false),
  ('d0000000-0000-0000-0000-000000000445', 'Rosalind Franklin and Linus Pauling', false),
  -- Q446 (SAQ)
  ('d0000000-0000-0000-0000-000000000446', 'AUG (codes for Methionine)', true),
  -- Q447
  ('d0000000-0000-0000-0000-000000000447', 'Restriction endonuclease', true),
  ('d0000000-0000-0000-0000-000000000447', 'DNA Ligase', false),
  ('d0000000-0000-0000-0000-000000000447', 'Exonuclease', false),
  ('d0000000-0000-0000-0000-000000000447', 'DNA Helicase', false),
  -- Q448 (SAQ)
  ('d0000000-0000-0000-0000-000000000448', 'Kary Mullis', true),
  -- Q449
  ('d0000000-0000-0000-0000-000000000449', 'Stack', true),
  ('d0000000-0000-0000-0000-000000000449', 'Queue', false),
  ('d0000000-0000-0000-0000-000000000449', 'Binary Tree', false),
  ('d0000000-0000-0000-0000-000000000449', 'Graph', false),
  -- Q450 (SAQ)
  ('d0000000-0000-0000-0000-000000000450', 'Stack Underflow', true),

  -- Q451
  ('d0000000-0000-0000-0000-000000000451', 'HAVING clause', true),
  ('d0000000-0000-0000-0000-000000000451', 'WHERE clause', false),
  ('d0000000-0000-0000-0000-000000000451', 'ORDER BY clause', false),
  ('d0000000-0000-0000-0000-000000000451', 'LIMIT clause', false),
  -- Q452 (SAQ)
  ('d0000000-0000-0000-0000-000000000452', 'TRUNCATE TABLE table_name;', true),
  -- Q453
  ('d0000000-0000-0000-0000-000000000453', 'U = (1/2) * C * V^2', true),
  ('d0000000-0000-0000-0000-000000000453', 'U = C * V^2', false),
  ('d0000000-0000-0000-0000-000000000453', 'U = (1/2) * C^2 * V', false),
  ('d0000000-0000-0000-0000-000000000453', 'U = (1/2) * (C / V)', false),
  -- Q454 (SAQ)
  ('d0000000-0000-0000-0000-000000000454', '1 (unity, since phase angle phi = 0)', true),
  -- Q455
  ('d0000000-0000-0000-0000-000000000455', 'K_max = h * nu - phi_0 (work function)', true),
  ('d0000000-0000-0000-0000-000000000455', 'K_max = h * nu + phi_0', false),
  ('d0000000-0000-0000-0000-000000000455', 'K_max = phi_0 / (h * nu)', false),
  ('d0000000-0000-0000-0000-000000000455', 'K_max = (1/2) * h * nu^2', false),
  -- Q456 (SAQ)
  ('d0000000-0000-0000-0000-000000000456', 'S cm^2 mol^-1 (Siemens cm^2 / mol)', true),
  -- Q457
  ('d0000000-0000-0000-0000-000000000457', '0 (Zero)', true),
  ('d0000000-0000-0000-0000-000000000457', '+2', false),
  ('d0000000-0000-0000-0000-000000000457', '+4', false),
  ('d0000000-0000-0000-0000-000000000457', '-2', false),
  -- Q458 (SAQ)
  ('d0000000-0000-0000-0000-000000000458', 'arctan(x) + C (tan^-1(x) + C)', true),
  -- Q459
  ('d0000000-0000-0000-0000-000000000459', '0 (null vector)', true),
  ('d0000000-0000-0000-0000-000000000459', '|a| * |b|', false),
  ('d0000000-0000-0000-0000-000000000459', '1', false),
  ('d0000000-0000-0000-0000-000000000459', '-1', false),
  -- Q460 (SAQ)
  ('d0000000-0000-0000-0000-000000000460', '3 hydrogen bonds', true),

  -- Q461
  ('d0000000-0000-0000-0000-000000000461', 'Taq polymerase (Thermus aquaticus)', true),
  ('d0000000-0000-0000-0000-000000000461', 'RNA polymerase II', false),
  ('d0000000-0000-0000-0000-000000000461', 'DNA polymerase I', false),
  ('d0000000-0000-0000-0000-000000000461', 'Reverse transcriptase', false),
  -- Q462 (SAQ)
  ('d0000000-0000-0000-0000-000000000462', 'Agarose gel', true),
  -- Q463
  ('d0000000-0000-0000-0000-000000000463', 'Queue', true),
  ('d0000000-0000-0000-0000-000000000463', 'Stack', false),
  ('d0000000-0000-0000-0000-000000000463', 'Binary Search Tree', false),
  ('d0000000-0000-0000-0000-000000000463', 'Set', false),
  -- Q464 (SAQ)
  ('d0000000-0000-0000-0000-000000000464', 'FULL OUTER JOIN', true),
  -- Q465
  ('d0000000-0000-0000-0000-000000000465', '4 * pi * epsilon_0 * R', true),
  ('d0000000-0000-0000-0000-000000000465', '2 * pi * epsilon_0 * R', false),
  ('d0000000-0000-0000-0000-000000000465', '(4 * pi * epsilon_0) / R', false),
  ('d0000000-0000-0000-0000-000000000465', 'epsilon_0 * R^2', false),
  -- Q466 (SAQ)
  ('d0000000-0000-0000-0000-000000000466', 'Zero (wattless current)', true),
  -- Q467
  ('d0000000-0000-0000-0000-000000000467', 'Hyperbolas (approximated as straight parallel fringes near center)', true),
  ('d0000000-0000-0000-0000-000000000467', 'Concentric circles', false),
  ('d0000000-0000-0000-0000-000000000467', 'Ellipses', false),
  ('d0000000-0000-0000-0000-000000000467', 'Radial lines', false),
  -- Q468 (SAQ)
  ('d0000000-0000-0000-0000-000000000468', 'L mol^-1 s^-1 (or mol^-1 L s^-1)', true),
  -- Q469
  ('d0000000-0000-0000-0000-000000000469', 'Pyridinium Chlorochromate (PCC)', true),
  ('d0000000-0000-0000-0000-000000000469', 'Acidified KMnO4', false),
  ('d0000000-0000-0000-0000-000000000469', 'K2Cr2O7 in H2SO4', false),
  ('d0000000-0000-0000-0000-000000000469', 'Concentrated HNO3', false),
  -- Q470 (SAQ)
  ('d0000000-0000-0000-0000-000000000470', 'tan(x) + C', true),

  -- Q471
  ('d0000000-0000-0000-0000-000000000471', '0', true),
  ('d0000000-0000-0000-0000-000000000471', '1', false),
  ('d0000000-0000-0000-0000-000000000471', '-1', false),
  ('d0000000-0000-0000-0000-000000000471', '|a| + |b|', false),
  -- Q472 (SAQ)
  ('d0000000-0000-0000-0000-000000000472', 'RNA Polymerase II', true),
  -- Q473
  ('d0000000-0000-0000-0000-000000000473', 'pBR322', true),
  ('d0000000-0000-0000-0000-000000000473', 'pUC19', false),
  ('d0000000-0000-0000-0000-000000000473', 'Ti Plasmid', false),
  ('d0000000-0000-0000-0000-000000000473', 'Lambda phage', false),
  -- Q474 (SAQ)
  ('d0000000-0000-0000-0000-000000000474', 'Push operation', true),
  -- Q475
  ('d0000000-0000-0000-0000-000000000475', 'COUNT()', true),
  ('d0000000-0000-0000-0000-000000000475', 'SUM()', false),
  ('d0000000-0000-0000-0000-000000000475', 'AVG()', false),
  ('d0000000-0000-0000-0000-000000000475', 'TOTAL()', false),
  -- Q476 (SAQ)
  ('d0000000-0000-0000-0000-000000000476', 'Phi = Q / epsilon_0 (Gauss Law)', true),
  -- Q477
  ('d0000000-0000-0000-0000-000000000477', 'Z = sqrt(R^2 + (omega * L)^2)', true),
  ('d0000000-0000-0000-0000-000000000477', 'Z = R + omega * L', false),
  ('d0000000-0000-0000-0000-000000000477', 'Z = sqrt(R^2 - (omega * L)^2)', false),
  ('d0000000-0000-0000-0000-000000000477', 'Z = R / (omega * L)', false),
  -- Q478 (SAQ)
  ('d0000000-0000-0000-0000-000000000478', 'Minimum incident light frequency required to emit photoelectrons from a metal surface', true),
  -- Q479
  ('d0000000-0000-0000-0000-000000000479', 'First-order kinetics', true),
  ('d0000000-0000-0000-0000-000000000479', 'Zero-order kinetics', false),
  ('d0000000-0000-0000-0000-000000000479', 'Second-order kinetics', false),
  ('d0000000-0000-0000-0000-000000000479', 'Third-order kinetics', false),
  -- Q480 (SAQ)
  ('d0000000-0000-0000-0000-000000000480', 'Potassium hexacyanidoferrate(II)', true),

  -- Q481
  ('d0000000-0000-0000-0000-000000000481', 'Order = 2, Degree = 1', true),
  ('d0000000-0000-0000-0000-000000000481', 'Order = 1, Degree = 3', false),
  ('d0000000-0000-0000-0000-000000000481', 'Order = 2, Degree = 3', false),
  ('d0000000-0000-0000-0000-000000000481', 'Order = 3, Degree = 2', false),
  -- Q482 (SAQ)
  ('d0000000-0000-0000-0000-000000000482', '1 (unit vector)', true),
  -- Q483
  ('d0000000-0000-0000-0000-000000000483', 'Semi-conservative replication model', true),
  ('d0000000-0000-0000-0000-000000000483', 'Conservative model', false),
  ('d0000000-0000-0000-0000-000000000483', 'Dispersive model', false),
  ('d0000000-0000-0000-0000-000000000483', 'Non-overlapping model', false),
  -- Q484 (SAQ)
  ('d0000000-0000-0000-0000-000000000484', 'Polymerase Chain Reaction', true),
  -- Q485
  ('d0000000-0000-0000-0000-000000000485', 'pop()', true),
  ('d0000000-0000-0000-0000-000000000485', 'remove()', false),
  ('d0000000-0000-0000-0000-000000000485', 'delete()', false),
  ('d0000000-0000-0000-0000-000000000485', 'discard()', false),
  -- Q486 (SAQ)
  ('d0000000-0000-0000-0000-000000000486', 'DISTINCT', true),
  -- Q487
  ('d0000000-0000-0000-0000-000000000487', 'Zero (0 Joules)', true),
  ('d0000000-0000-0000-0000-000000000487', 'q * V', false),
  ('d0000000-0000-0000-0000-000000000487', '(1/2) * q * V', false),
  ('d0000000-0000-0000-0000-000000000487', 'Infinite', false),
  -- Q488 (SAQ)
  ('d0000000-0000-0000-0000-000000000488', 'Weber (Wb or Tesla m^2)', true),
  -- Q489
  ('d0000000-0000-0000-0000-000000000489', 'Polarization', true),
  ('d0000000-0000-0000-0000-000000000489', 'Diffraction', false),
  ('d0000000-0000-0000-0000-000000000489', 'Interference', false),
  ('d0000000-0000-0000-0000-000000000489', 'Refraction', false),
  -- Q490 (SAQ)
  ('d0000000-0000-0000-0000-000000000490', 'k = A * e^(-Ea / (R * T))', true),

  -- Q491
  ('d0000000-0000-0000-0000-000000000491', 'Ionization Isomerism', true),
  ('d0000000-0000-0000-0000-000000000491', 'Linkage Isomerism', false),
  ('d0000000-0000-0000-0000-000000000491', 'Coordination Isomerism', false),
  ('d0000000-0000-0000-0000-000000000491', 'Hydrate Isomerism', false),
  -- Q492 (SAQ)
  ('d0000000-0000-0000-0000-000000000492', 'ln(x) + C', true),
  -- Q493
  ('d0000000-0000-0000-0000-000000000493', 'k (unit vector along z-axis)', true),
  ('d0000000-0000-0000-0000-000000000493', '-k', false),
  ('d0000000-0000-0000-0000-000000000493', '0', false),
  ('d0000000-0000-0000-0000-000000000493', '1', false),
  -- Q494 (SAQ)
  ('d0000000-0000-0000-0000-000000000494', 'DNA Helicase', true),
  -- Q495
  ('d0000000-0000-0000-0000-000000000495', 'Bt Cotton', true),
  ('d0000000-0000-0000-0000-000000000495', 'Golden Rice', false),
  ('d0000000-0000-0000-0000-000000000495', 'Flavr Savr Tomato', false),
  ('d0000000-0000-0000-0000-000000000495', 'Bt Brinjal', false),
  -- Q496 (SAQ)
  ('d0000000-0000-0000-0000-000000000496', '(rear + 1) % N', true),
  -- Q497
  ('d0000000-0000-0000-0000-000000000497', 'PRIMARY KEY constraint', true),
  ('d0000000-0000-0000-0000-000000000497', 'FOREIGN KEY constraint', false),
  ('d0000000-0000-0000-0000-000000000497', 'CHECK constraint', false),
  ('d0000000-0000-0000-0000-000000000497', 'DEFAULT constraint', false),
  -- Q498 (SAQ)
  ('d0000000-0000-0000-0000-000000000498', 'Farad (F)', true),
  -- Q499
  ('d0000000-0000-0000-0000-000000000499', 'E = h * nu', true),
  ('d0000000-0000-0000-0000-000000000499', 'E = h / nu', false),
  ('d0000000-0000-0000-0000-000000000499', 'E = (1/2) * h * nu^2', false),
  ('d0000000-0000-0000-0000-000000000499', 'E = h * c * nu', false),
  -- Q500 (SAQ)
  ('d0000000-0000-0000-0000-000000000500', '[P(B|A) * P(A)] / P(B)', true)
ON CONFLICT (question_id, answer) DO NOTHING;

