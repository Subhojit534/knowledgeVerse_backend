-- ============================================================================
-- SEED_ALL.SQL
-- KNOWLEDGEVERSE 500 QUESTIONS CURRICULUM SEED RUNNER
-- ============================================================================
-- This master script instructs you how to execute all migration and seed files
-- in sequence for Supabase SQL Editor or psql CLI.
--
-- File Sequence:
-- 1. 01_schema_setup.sql   -> Verifies schema, enums (board, difficulty, question_type),
--                              and tables (subject, topics, subtopics, question, options).
-- 2. 02_seed_class_5_6.sql -> Classes 5 & 6 (Questions 1 to 100)
-- 3. 03_seed_class_7_8.sql -> Classes 7 & 8 (Questions 101 to 220)
-- 4. 04_seed_class_9_10.sql -> Classes 9 & 10 (Questions 221 to 360)
-- 5. 05_seed_class_11_12.sql -> Classes 11 & 12 (Questions 361 to 500)
--
-- If using psql CLI:
--   \i sql/01_schema_setup.sql
--   \i sql/02_seed_class_5_6.sql
--   \i sql/03_seed_class_7_8.sql
--   \i sql/04_seed_class_9_10.sql
--   \i sql/05_seed_class_11_12.sql
--
-- If using Supabase Web SQL Editor:
--   Open each file in the `sql/` directory, copy and paste into the editor,
--   and click 'Run'. Each script uses deterministic UUIDs and 'ON CONFLICT DO NOTHING'
--   making execution 100% idempotent and safe to re-run anytime.
-- ============================================================================
SELECT (SELECT COUNT(*)
        FROM   "class") AS total_classes,
       (SELECT COUNT(*)
        FROM   subject) AS total_subjects,
       (SELECT COUNT(*)
        FROM   topics) AS total_topics,
       (SELECT COUNT(*)
        FROM   subtopics) AS total_subtopics,
       (SELECT COUNT(*)
        FROM   question) AS total_questions,
       (SELECT COUNT(*)
        FROM   options) AS total_options;