export interface PlayerProfileData {
  id?: string;
  name: string;
  password?: string;
  email?: string;
  grade: string;
  curriculum: string;
  subjects: string[];
  difficulty: string;
  world_theme: string;
  learning_goal: string;
  avatar_index: number;
  xp?: number;
  level?: number;
  coins?: number;
  gems?: number;
  energy?: number;
  streak_days?: number;
  last_active?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MCQuestion {
  id: number;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface LearningContentPayload {
  building_id: string;
  building_name: string;
  subject: string;
  topic: string;
  explanation: string;
  questions: MCQuestion[];
  explanation_audio_url?: string | null;
  audio_available: boolean;
  source: string;
  cache_key: string;
}

export interface LearningRequest {
  building_id: string;
  building_name: string;
  subject: string;
  difficulty?: string;
  student_level?: number;
  topic?: string;
  grade?: string;
  curriculum?: string;
}

export interface QuizSubmissionRequest {
  user_id?: string;
  building_id: string;
  subject: string;
  correct_answers: number;
  total_questions: number;
  time_spent_seconds?: number;
}

export interface InventoryItemData {
  id?: string;
  user_id?: string;
  item_id: string;
  item_name: string;
  category: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  slot_type: 'weapon' | 'armor' | 'accessory' | 'relic' | 'consumable' | 'backpack';
  icon_name?: string;
  image_path?: string;
  image_url?: string;
  description: string;
  stats: string;
  perk_text?: string;
  quantity: number;
  is_equipped: boolean;
  purchased_at?: string;
}

export interface ShopCatalogItem {
  id: string;
  name: string;
  category: 'FEATURED' | 'GEAR' | 'BOOSTS' | 'VAULT';
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  rarity_color: string;
  image_path?: string;
  image_url?: string;
  description: string;
  perk_text: string;
  price: number;
  currency: 'COINS' | 'GEMS';
  tag_text?: string;
  slot_type: 'weapon' | 'armor' | 'accessory' | 'relic' | 'consumable' | 'backpack';
}

export interface GuildData {
  id: string;
  name: string;
  tag: string;
  motto: string;
  level: number;
  member_count: number;
  max_members: number;
  leader_id?: string;
  created_at?: string;
}

export interface GuildMemberData {
  id?: string;
  guild_id: string;
  user_id: string;
  name: string;
  role: 'Leader' | 'Officer' | 'Member';
  level: number;
  weekly_xp: number;
  is_online?: boolean;
  joined_at?: string;
}

export interface GuildMessageData {
  id?: string;
  guild_id: string;
  sender_id: string;
  sender_name: string;
  role: string;
  text: string;
  created_at?: string;
}

export interface FriendshipData {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at?: string;
}

export interface DuelChallengeData {
  id: string;
  challenger_id: string;
  challenged_id: string;
  building_id: string;
  subject: string;
  stake_coins: number;
  status: 'pending' | 'active' | 'completed' | 'declined';
  challenger_score?: number;
  challenged_score?: number;
  winner_id?: string;
  created_at?: string;
}

export interface LeaderboardEntryData {
  rank: number;
  id: string;
  name: string;
  title: string;
  level: number;
  score: number;
  coins: number;
  guildTag: string;
  streakDays: number;
  crownColor: string;
  avatarInitial: string;
  avatarColor: string;
  domainMastery: string;
}
