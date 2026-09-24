-- ============================================================================
-- 01_SCHEMA_SETUP.SQL
-- KNOWLEDGEVERSE DATABASE INITIALIZATION & SCHEMA VERIFICATION
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Enums if they do not exist
DO $$ BEGIN
    CREATE TYPE board AS ENUM('ICSE', 'CBSE', 'BSEB', 'WBBSE', 'DBSE');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE difficulty AS ENUM('Easy', 'Medium', 'Hard');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE question_type AS ENUM('MCQ', 'SAQ');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. Classes Table
CREATE TABLE IF NOT EXISTS classes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL
);

-- 3. Subject Table (with class_id referencing classes)
CREATE TABLE IF NOT EXISTS subject (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
    name text NOT NULL,
    board board NOT NULL DEFAULT 'CBSE',
    description text
);
ALTER TABLE subject ADD COLUMN IF NOT EXISTS class_id uuid REFERENCES classes(id) ON DELETE CASCADE;
ALTER TABLE subject ADD COLUMN IF NOT EXISTS board board DEFAULT 'CBSE';
ALTER TABLE subject ADD COLUMN IF NOT EXISTS description text;

-- 4. Topics Table
CREATE TABLE IF NOT EXISTS topics (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id uuid REFERENCES subject(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    image_url text,
    difficulty difficulty NOT NULL DEFAULT 'Easy',
    CONSTRAINT subject_id_name_unique UNIQUE (subject_id, name)
);

-- 5. Subtopics Table
CREATE TABLE IF NOT EXISTS subtopics (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
    image_urls text[],
    name text NOT NULL,
    description text,
    difficulty difficulty NOT NULL DEFAULT 'Easy',
    CONSTRAINT topic_id_subtopic_name_unique UNIQUE (topic_id, name)
);

-- 6. Question Table
CREATE TABLE IF NOT EXISTS question (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    question text NOT NULL,
    subtopic_id uuid REFERENCES subtopics(id) ON DELETE CASCADE,
    difficulty difficulty NOT NULL DEFAULT 'Medium',
    question_type question_type DEFAULT 'MCQ'
);

-- 7. Options Table
CREATE TABLE IF NOT EXISTS options (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id uuid REFERENCES question(id) ON DELETE CASCADE,
    answer text NOT NULL,
    is_correct boolean DEFAULT false,
    CONSTRAINT question_id_answer_unique UNIQUE (question_id, answer)
);

-- 8. Performance Indexes
CREATE INDEX IF NOT EXISTS subtopics_id_idx ON question(subtopic_id);
CREATE INDEX IF NOT EXISTS options_question_id ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_topics_subject ON topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_subtopics_topic ON subtopics(topic_id);
CREATE INDEX IF NOT EXISTS idx_subject_class ON subject(class_id);

-- 9. Seed Core Classes (Classes 5 to 12)
INSERT INTO classes (id, name) VALUES
  ('00000005-0000-0000-0000-000000000005', 'Class 5'),
  ('00000006-0000-0000-0000-000000000006', 'Class 6'),
  ('00000007-0000-0000-0000-000000000007', 'Class 7'),
  ('00000008-0000-0000-0000-000000000008', 'Class 8'),
  ('00000009-0000-0000-0000-000000000009', 'Class 9'),
  ('00000010-0000-0000-0000-000000000010', 'Class 10'),
  ('00000011-0000-0000-0000-000000000011', 'Class 11'),
  ('00000012-0000-0000-0000-000000000012', 'Class 12')
ON CONFLICT (id) DO NOTHING;
