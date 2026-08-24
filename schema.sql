-- ============================================================================
-- KNOWLEDGEVERSE - COMPREHENSIVE SUPABASE POSTGRESQL SCHEMA
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    name TEXT UNIQUE NOT NULL DEFAULT 'Wizard',
    password TEXT NOT NULL DEFAULT 'password123',
    grade TEXT DEFAULT 'Class 10',
    curriculum TEXT DEFAULT 'CBSE',
    difficulty TEXT DEFAULT 'Balanced',
    world_theme TEXT DEFAULT 'Green Highlands',
    learning_goal TEXT DEFAULT 'Master all academic domains',
    avatar_index INT DEFAULT 0,
    xp INT DEFAULT 150,
    level INT DEFAULT 1,
    coins INT DEFAULT 500,
    gems INT DEFAULT 25,
    energy INT DEFAULT 100,
    streak_days INT DEFAULT 1,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure columns exist if table was previously created
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password TEXT NOT NULL DEFAULT 'password123';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS streak_days INT DEFAULT 1;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS energy INT DEFAULT 100;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gems INT DEFAULT 25;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS coins INT DEFAULT 500;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_active TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;

-- 2. USER SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS public.user_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    mastery_percentage FLOAT DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, subject_name)
);

-- 3. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    building_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    lessons_completed INT DEFAULT 0,
    quiz_score INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, building_id)
);

-- 4. INVENTORY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    category TEXT DEFAULT 'ARTIFACT',
    rarity TEXT DEFAULT 'COMMON', -- COMMON, RARE, EPIC, LEGENDARY
    slot_type TEXT DEFAULT 'backpack', -- weapon, armor, accessory, relic, consumable, backpack
    icon_name TEXT DEFAULT 'auto_awesome',
    image_path TEXT,
    image_url TEXT,
    description TEXT,
    stats TEXT,
    perk_text TEXT,
    quantity INT DEFAULT 1,
    is_equipped BOOLEAN DEFAULT false,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SHOP CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.shop_catalog (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- FEATURED, GEAR, BOOSTS, VAULT
    rarity TEXT DEFAULT 'COMMON',
    rarity_color TEXT DEFAULT '#82C0A0',
    image_path TEXT,
    image_url TEXT,
    description TEXT NOT NULL,
    perk_text TEXT NOT NULL,
    price INT NOT NULL,
    currency TEXT DEFAULT 'COINS', -- COINS, GEMS
    tag_text TEXT DEFAULT '',
    slot_type TEXT DEFAULT 'backpack',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. GUILDS TABLE
CREATE TABLE IF NOT EXISTS public.guilds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    tag TEXT NOT NULL,
    motto TEXT DEFAULT 'Knowledge is Power',
    level INT DEFAULT 1,
    member_count INT DEFAULT 1,
    max_members INT DEFAULT 20,
    leader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. GUILD MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.guild_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guild_id UUID REFERENCES public.guilds(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'Member', -- Leader, Officer, Member
    weekly_xp INT DEFAULT 0,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(guild_id, user_id)
);

-- 8. GUILD MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.guild_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guild_id UUID REFERENCES public.guilds(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT NOT NULL,
    role TEXT DEFAULT 'Member',
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. FRIENDSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.friendships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    addressee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- pending, accepted, declined
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(requester_id, addressee_id)
);

-- 10. DUEL CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS public.duels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenger_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    challenged_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    building_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    stake_coins INT DEFAULT 50,
    status TEXT DEFAULT 'pending', -- pending, active, completed, declined
    challenger_score INT DEFAULT 0,
    challenged_score INT DEFAULT 0,
    winner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. LEARNING QUESTIONS REPOSITORY
CREATE TABLE IF NOT EXISTS public.learning_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    explanation TEXT NOT NULL,
    questions_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles(xp DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_name ON public.profiles(name);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_building ON public.user_progress(user_id, building_id);
CREATE INDEX IF NOT EXISTS idx_learning_questions_building ON public.learning_questions(building_id, subject);
CREATE INDEX IF NOT EXISTS idx_inventory_user ON public.inventory_items(user_id);
CREATE INDEX IF NOT EXISTS idx_guild_members_guild ON public.guild_members(guild_id);
CREATE INDEX IF NOT EXISTS idx_guild_messages_guild ON public.guild_messages(guild_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_friendships_users ON public.friendships(requester_id, addressee_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR ALL TABLES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public update profiles" ON public.profiles;
CREATE POLICY "Public select profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update profiles" ON public.profiles FOR UPDATE USING (true);

ALTER TABLE public.user_subjects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select user_subjects" ON public.user_subjects;
DROP POLICY IF EXISTS "Public insert user_subjects" ON public.user_subjects;
DROP POLICY IF EXISTS "Public update user_subjects" ON public.user_subjects;
CREATE POLICY "Public select user_subjects" ON public.user_subjects FOR SELECT USING (true);
CREATE POLICY "Public insert user_subjects" ON public.user_subjects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update user_subjects" ON public.user_subjects FOR UPDATE USING (true);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select user_progress" ON public.user_progress;
DROP POLICY IF EXISTS "Public insert user_progress" ON public.user_progress;
DROP POLICY IF EXISTS "Public update user_progress" ON public.user_progress;
CREATE POLICY "Public select user_progress" ON public.user_progress FOR SELECT USING (true);
CREATE POLICY "Public insert user_progress" ON public.user_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update user_progress" ON public.user_progress FOR UPDATE USING (true);

ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select inventory_items" ON public.inventory_items;
DROP POLICY IF EXISTS "Public insert inventory_items" ON public.inventory_items;
DROP POLICY IF EXISTS "Public update inventory_items" ON public.inventory_items;
DROP POLICY IF EXISTS "Public delete inventory_items" ON public.inventory_items;
CREATE POLICY "Public select inventory_items" ON public.inventory_items FOR SELECT USING (true);
CREATE POLICY "Public insert inventory_items" ON public.inventory_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update inventory_items" ON public.inventory_items FOR UPDATE USING (true);
CREATE POLICY "Public delete inventory_items" ON public.inventory_items FOR DELETE USING (true);

ALTER TABLE public.shop_catalog ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select shop_catalog" ON public.shop_catalog;
CREATE POLICY "Public select shop_catalog" ON public.shop_catalog FOR SELECT USING (true);

ALTER TABLE public.guilds ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select guilds" ON public.guilds;
DROP POLICY IF EXISTS "Public insert guilds" ON public.guilds;
DROP POLICY IF EXISTS "Public update guilds" ON public.guilds;
CREATE POLICY "Public select guilds" ON public.guilds FOR SELECT USING (true);
CREATE POLICY "Public insert guilds" ON public.guilds FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update guilds" ON public.guilds FOR UPDATE USING (true);

ALTER TABLE public.guild_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select guild_members" ON public.guild_members;
DROP POLICY IF EXISTS "Public insert guild_members" ON public.guild_members;
DROP POLICY IF EXISTS "Public update guild_members" ON public.guild_members;
DROP POLICY IF EXISTS "Public delete guild_members" ON public.guild_members;
CREATE POLICY "Public select guild_members" ON public.guild_members FOR SELECT USING (true);
CREATE POLICY "Public insert guild_members" ON public.guild_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update guild_members" ON public.guild_members FOR UPDATE USING (true);
CREATE POLICY "Public delete guild_members" ON public.guild_members FOR DELETE USING (true);

ALTER TABLE public.guild_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select guild_messages" ON public.guild_messages;
DROP POLICY IF EXISTS "Public insert guild_messages" ON public.guild_messages;
CREATE POLICY "Public select guild_messages" ON public.guild_messages FOR SELECT USING (true);
CREATE POLICY "Public insert guild_messages" ON public.guild_messages FOR INSERT WITH CHECK (true);

ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select friendships" ON public.friendships;
DROP POLICY IF EXISTS "Public insert friendships" ON public.friendships;
DROP POLICY IF EXISTS "Public update friendships" ON public.friendships;
DROP POLICY IF EXISTS "Public delete friendships" ON public.friendships;
CREATE POLICY "Public select friendships" ON public.friendships FOR SELECT USING (true);
CREATE POLICY "Public insert friendships" ON public.friendships FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update friendships" ON public.friendships FOR UPDATE USING (true);
CREATE POLICY "Public delete friendships" ON public.friendships FOR DELETE USING (true);

ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select duels" ON public.duels;
DROP POLICY IF EXISTS "Public insert duels" ON public.duels;
DROP POLICY IF EXISTS "Public update duels" ON public.duels;
CREATE POLICY "Public select duels" ON public.duels FOR SELECT USING (true);
CREATE POLICY "Public insert duels" ON public.duels FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update duels" ON public.duels FOR UPDATE USING (true);

ALTER TABLE public.learning_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select learning_questions" ON public.learning_questions;
CREATE POLICY "Public select learning_questions" ON public.learning_questions FOR SELECT USING (true);

-- ============================================================================
-- SEED INITIAL SHOP CATALOG
-- ============================================================================
INSERT INTO public.shop_catalog (id, name, category, rarity, rarity_color, image_path, description, perk_text, price, currency, tag_text, slot_type)
VALUES
  ('f_robe', 'Void-Walker Mantle', 'FEATURED', 'LEGENDARY', '#F2CA50', 'assets/images/pixel_robe.jpg', 'Woven from the silk of abyss spiders. Grants temporary invisibility and +30% Focus XP.', '+30% XP & SHADOW CLOAK', 250, 'GEMS', 'HOT DEAL', 'armor'),
  ('f_wand', 'Arcane Code Wand', 'FEATURED', 'LEGENDARY', '#F2CA50', 'assets/images/pixel_wand.jpg', 'Forged in coding towers to cast swift logic algorithms. Emits cyan sparks during quiz trials.', '+15% SPEED ANSWER BONUS', 350, 'GEMS', 'BESTSELLER', 'weapon'),
  ('f_shield', 'Dragon Boss Shield', 'FEATURED', 'LEGENDARY', '#F2CA50', 'assets/images/pixel_shield.jpg', 'Protects your daily streak even if a lesson quest is missed.', 'STREAK SHIELD PROTECTION', 180, 'GEMS', '', 'relic'),
  ('f_scroll', 'Ancient Lore Scroll', 'FEATURED', 'EPIC', '#DEB7FF', 'assets/images/pixel_scroll.jpg', 'Contains forgotten history lore of ancient civilizations. Unlocks extra History Tower trials.', '+25 HISTORY LORE XP', 800, 'COINS', '', 'backpack'),
  ('g_robe', 'Void-Walker Mantle', 'GEAR', 'LEGENDARY', '#F2CA50', 'assets/images/pixel_robe.jpg', 'Woven from the silk of abyss spiders. Grants temporary invisibility in shadowed corridors.', '+30% FOCUS XP', 250, 'GEMS', '', 'armor'),
  ('g_wand', 'Arcane Code Wand', 'GEAR', 'LEGENDARY', '#F2CA50', 'assets/images/pixel_wand.jpg', 'Casts glowing cyan particles whenever you submit quiz answers.', '+10% SPEED ANSWER BONUS', 350, 'GEMS', '', 'weapon'),
  ('b_potion', 'Alchemy Health Potion', 'BOOSTS', 'COMMON', '#82C0A0', 'assets/images/pixel_potion.jpg', 'Instantly restores 50 Explorer Energy points to continue world quests.', '+50 EXPLORER ENERGY', 200, 'COINS', '', 'consumable'),
  ('b_gem', 'Math Sorcerer Gem', 'BOOSTS', 'LEGENDARY', '#F2CA50', 'assets/images/pixel_gem.jpg', 'Amplifies numerical calculations during boss quiz challenges.', '+25% MATH SPEED', 150, 'GEMS', '', 'relic')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  currency = EXCLUDED.currency,
  perk_text = EXCLUDED.perk_text,
  description = EXCLUDED.description;
