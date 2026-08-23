import { createClient, SupabaseClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { env } from '../config/env.js';
import {
  PlayerProfileData,
  InventoryItemData,
  ShopCatalogItem,
  GuildData,
  GuildMemberData,
  GuildMessageData,
  FriendshipData,
  DuelChallengeData,
  PvPSession,
  PvPCombatant,
  PvPRoundSubmission,
  PvPStats,
  PvPTier,
  MCQuestion,
} from '../types/index.js';


export let supabaseClient: SupabaseClient | null = null;

if (
  env.SUPABASE_URL &&
  env.SUPABASE_URL.startsWith('https://') &&
  !env.SUPABASE_URL.includes('your-project')
) {
  try {
    supabaseClient = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY
    );
    console.log('✅ [Supabase]: Successfully initialized Supabase Cloud Client');
  } catch (err) {
    console.warn('⚠️ [Supabase Warning]: Failed to connect to Supabase Cloud:', err);
  }
} else {
  console.log('💡 [Supabase Notice]: Using high-performance in-memory state until Supabase credentials are provided in .env');
}

/**
 * Ensures any string ID is converted into a valid v4 UUID format for PostgreSQL UUID primary keys.
 */
export function ensureUuid(str?: string): string {
  if (str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)) {
    return str;
  }
  if (!str) return crypto.randomUUID();
  const h = crypto.createHash('md5').update(str).digest('hex');
  return `${h.substring(0, 8)}-${h.substring(8, 12)}-4${h.substring(13, 16)}-a${h.substring(17, 20)}-${h.substring(20, 32)}`;
}

// ============================================================================
// IN-MEMORY FALLBACK STORES (For seamless offline / local development)
// ============================================================================

const memoryProfiles: Map<string, PlayerProfileData> = new Map();
const memoryProgress: Map<string, any> = new Map();
const memoryInventory: Map<string, InventoryItemData[]> = new Map();
const memoryShopCatalog: Map<string, ShopCatalogItem> = new Map();
const memoryGuilds: Map<string, GuildData> = new Map();
const memoryGuildMembers: Map<string, GuildMemberData[]> = new Map();
const memoryGuildMessages: Map<string, GuildMessageData[]> = new Map();
const memoryFriendships: Map<string, FriendshipData> = new Map();
const memoryDuels: Map<string, DuelChallengeData> = new Map();
const memoryPvPSessions: Map<string, PvPSession> = new Map();
const memoryPvPStats: Map<string, PvPStats> = new Map();
const memoryMatchmakingQueue: Array<{
  userId: string;
  subject: string;
  stakeCoins: number;
  isRanked: boolean;
  queuedAt: number;
  profile: PlayerProfileData;
  userStats: PvPStats;
  questions: MCQuestion[];
}> = [];
const memoryActiveSessionsByUser: Map<string, { session: PvPSession; matchedAt: number }> = new Map();

/**
 * Helper to check if an active PvP session was recently created for this user
 */
function getActiveSessionForUser(userId: string, validId: string): PvPSession | null {
  const now = Date.now();
  const entry = memoryActiveSessionsByUser.get(validId) || memoryActiveSessionsByUser.get(userId);
  if (entry && now - entry.matchedAt < 60000 && entry.session.status === 'in_progress') {
    return entry.session;
  }
  for (const session of memoryPvPSessions.values()) {
    if (session.status === 'in_progress' && (session.combatants[validId] || session.combatants[userId])) {
      const createdAt = new Date(session.created_at).getTime();
      if (now - createdAt < 60000) {
        return session;
      }
    }
  }
  return null;
}


// In-memory profiles (populated dynamically from user logins / DB)


const demo1Uuid = ensureUuid('demo-user-123');

// Seed initial Shop Catalog
const initialShopItems: ShopCatalogItem[] = [
  {
    id: 'f_robe',
    name: 'Void-Walker Mantle',
    category: 'FEATURED',
    rarity: 'LEGENDARY',
    rarity_color: '#F2CA50',
    image_path: 'assets/images/pixel_robe.jpg',
    description: 'Woven from the silk of abyss spiders. Grants temporary invisibility and +30% Focus XP.',
    perk_text: '+30% XP & SHADOW CLOAK',
    price: 250,
    currency: 'GEMS',
    tag_text: 'HOT DEAL',
    slot_type: 'armor',
  },
  {
    id: 'f_wand',
    name: 'Arcane Code Wand',
    category: 'FEATURED',
    rarity: 'LEGENDARY',
    rarity_color: '#F2CA50',
    image_path: 'assets/images/pixel_wand.jpg',
    description: 'Forged in coding towers to cast swift logic algorithms. Emits cyan sparks during quiz trials.',
    perk_text: '+15% SPEED ANSWER BONUS',
    price: 350,
    currency: 'GEMS',
    tag_text: 'BESTSELLER',
    slot_type: 'weapon',
  },
  {
    id: 'f_shield',
    name: 'Dragon Boss Shield',
    category: 'FEATURED',
    rarity: 'LEGENDARY',
    rarity_color: '#F2CA50',
    image_path: 'assets/images/pixel_shield.jpg',
    description: 'Protects your daily streak even if a lesson quest is missed.',
    perk_text: 'STREAK SHIELD PROTECTION',
    price: 180,
    currency: 'GEMS',
    slot_type: 'relic',
  },
  {
    id: 'f_scroll',
    name: 'Ancient Lore Scroll',
    category: 'FEATURED',
    rarity: 'EPIC',
    rarity_color: '#DEB7FF',
    image_path: 'assets/images/pixel_scroll.jpg',
    description: 'Contains forgotten history lore of ancient civilizations. Unlocks extra History Tower trials.',
    perk_text: '+25 HISTORY LORE XP',
    price: 800,
    currency: 'COINS',
    slot_type: 'backpack',
  },
  {
    id: 'g_robe',
    name: 'Void-Walker Mantle',
    category: 'GEAR',
    rarity: 'LEGENDARY',
    rarity_color: '#F2CA50',
    image_path: 'assets/images/pixel_robe.jpg',
    description: 'Woven from the silk of abyss spiders. Grants temporary invisibility in shadowed corridors.',
    perk_text: '+30% FOCUS XP',
    price: 250,
    currency: 'GEMS',
    slot_type: 'armor',
  },
  {
    id: 'g_wand',
    name: 'Arcane Code Wand',
    category: 'GEAR',
    rarity: 'LEGENDARY',
    rarity_color: '#F2CA50',
    image_path: 'assets/images/pixel_wand.jpg',
    description: 'Casts glowing cyan particles whenever you submit quiz answers.',
    perk_text: '+10% SPEED ANSWER BONUS',
    price: 350,
    currency: 'GEMS',
    slot_type: 'weapon',
  },
  {
    id: 'b_potion',
    name: 'Alchemy Health Potion',
    category: 'BOOSTS',
    rarity: 'COMMON',
    rarity_color: '#82C0A0',
    image_path: 'assets/images/pixel_potion.jpg',
    description: 'Instantly restores 50 Explorer Energy points to continue world quests.',
    perk_text: '+50 EXPLORER ENERGY',
    price: 200,
    currency: 'COINS',
    slot_type: 'consumable',
  },
  {
    id: 'b_gem',
    name: 'Math Sorcerer Gem',
    category: 'BOOSTS',
    rarity: 'LEGENDARY',
    rarity_color: '#F2CA50',
    image_path: 'assets/images/pixel_gem.jpg',
    description: 'Amplifies numerical calculations during boss quiz challenges.',
    perk_text: '+25% MATH SPEED',
    price: 150,
    currency: 'GEMS',
    slot_type: 'relic',
  },
];

for (const item of initialShopItems) {
  memoryShopCatalog.set(item.id, item);
}

// Seed initial Inventory for demo user
const initialInventoryDemo: InventoryItemData[] = [
  {
    id: crypto.randomUUID(),
    user_id: demo1Uuid,
    item_id: 'scroll',
    item_name: 'Ancient History Scroll',
    category: 'LORE ARTIFACT',
    rarity: 'EPIC',
    slot_type: 'backpack',
    image_path: 'assets/images/pixel_scroll.jpg',
    description: 'Contains forgotten history lore of ancient civilizations.',
    stats: '+15 History Lore XP',
    quantity: 1,
    is_equipped: false,
  },
  {
    id: crypto.randomUUID(),
    user_id: demo1Uuid,
    item_id: 'gem',
    item_name: 'Math Sorcerer Gem',
    category: 'CATALYST',
    rarity: 'LEGENDARY',
    slot_type: 'relic',
    image_path: 'assets/images/pixel_gem.jpg',
    description: 'Amplifies numerical calculations during boss challenges.',
    stats: '+25% Math Speed',
    quantity: 1,
    is_equipped: true,
  },
  {
    id: crypto.randomUUID(),
    user_id: demo1Uuid,
    item_id: 'potion',
    item_name: 'Alchemy Health Potion',
    category: 'CONSUMABLE',
    rarity: 'COMMON',
    slot_type: 'consumable',
    image_path: 'assets/images/pixel_potion.jpg',
    description: 'Instantly restores 50 Explorer Energy.',
    stats: '+50 Energy',
    quantity: 3,
    is_equipped: false,
  },
  {
    id: crypto.randomUUID(),
    user_id: demo1Uuid,
    item_id: 'shield',
    item_name: 'Dragon Boss Shield',
    category: 'RELIC',
    rarity: 'LEGENDARY',
    slot_type: 'armor',
    image_path: 'assets/images/pixel_shield.jpg',
    description: 'Protects your daily streak even if a quest is missed.',
    stats: 'Streak Shield x1',
    quantity: 1,
    is_equipped: true,
  },
  {
    id: crypto.randomUUID(),
    user_id: demo1Uuid,
    item_id: 'wand',
    item_name: 'Arcane Code Wand',
    category: 'WEAPON',
    rarity: 'LEGENDARY',
    slot_type: 'weapon',
    image_path: 'assets/images/pixel_wand.jpg',
    description: 'Forged in coding towers to cast swift logic algorithms.',
    stats: '+30% Code Speed',
    quantity: 1,
    is_equipped: true,
  },
];
memoryInventory.set(demo1Uuid, initialInventoryDemo);

// Seed initial Guilds
const g1Uuid = ensureUuid('guild-arc');
const g2Uuid = ensureUuid('guild-cyb');
const g3Uuid = ensureUuid('guild-qtm');

const guild1: GuildData = {
  id: g1Uuid,
  name: 'Order of Arcanists',
  tag: 'ARC',
  motto: 'Knowledge is the Ultimate Spell',
  member_count: 14,
  max_members: 20,
  level: 5,
  leader_id: ensureUuid('guild-leader-arc'),
};

const guild2: GuildData = {
  id: g2Uuid,
  name: 'Cyber Wizards',
  tag: 'CYB',
  motto: 'Coding the Future of Hexafalls',
  member_count: 18,
  max_members: 20,
  level: 8,
};

const guild3: GuildData = {
  id: g3Uuid,
  name: 'Quantum Scholars',
  tag: 'QTM',
  motto: 'Mastering Physics & Cosmos',
  member_count: 9,
  max_members: 15,
  level: 3,
};

memoryGuilds.set(g1Uuid, guild1);
memoryGuilds.set(g2Uuid, guild2);
memoryGuilds.set(g3Uuid, guild3);

memoryGuildMessages.set(g1Uuid, [
  {
    id: crypto.randomUUID(),
    guild_id: g1Uuid,
    sender_id: ensureUuid('guild-leader-arc'),
    sender_name: 'Elena Vance',
    role: 'Leader',
    text: 'Welcome all new scholars to the Order of Arcanists! Prepare for the weekly quiz raid.',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    guild_id: g1Uuid,
    sender_id: ensureUuid('guild-member-vic'),
    sender_name: 'Victoria Prime',
    role: 'Officer',
    text: 'History and Math towers are ready for study sessions today!',
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
]);

// ============================================================================
// AUTH & PROFILE DB OPERATIONS
// ============================================================================

export async function isUsernameTaken(username: string, excludeUserId?: string): Promise<boolean> {
  const cleanName = username.trim().toLowerCase();

  for (const [id, p] of memoryProfiles.entries()) {
    if (id !== excludeUserId && p.name.trim().toLowerCase() === cleanName) {
      return true;
    }
  }

  if (supabaseClient) {
    try {
      let query = supabaseClient.from('profiles').select('id, name').ilike('name', cleanName);
      if (excludeUserId) {
        query = query.neq('id', ensureUuid(excludeUserId));
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return true;
      }
    } catch (err) {
      console.error('❌ [Supabase Check Error]: Username check failed:', err);
    }
  }

  return false;
}

export async function authenticateUser(name: string, password: string): Promise<PlayerProfileData | null> {
  const cleanName = name.trim();

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .ilike('name', cleanName)
        .eq('password', password)
        .maybeSingle();

      if (!error && data) {
        const { data: subData } = await supabaseClient
          .from('user_subjects')
          .select('subject_name')
          .eq('user_id', data.id);

        const subjects = subData ? subData.map((s: any) => s.subject_name) : [];
        const fullProfile: PlayerProfileData = {
          ...data,
          password,
          subjects,
        };
        memoryProfiles.set(data.id, fullProfile);
        return fullProfile;
      }
    } catch (e) {
      console.error('❌ [Supabase Auth Error]:', e);
    }
  }

  for (const p of memoryProfiles.values()) {
    if (p.name.trim().toLowerCase() === cleanName.toLowerCase() && p.password === password) {
      return p;
    }
  }

  return null;
}

export async function saveProfile(profile: PlayerProfileData): Promise<PlayerProfileData> {
  let validProfileId: string;

  if (profile.id && profile.id !== 'demo-user-123' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(profile.id)) {
    validProfileId = profile.id;
  } else {
    let foundId: string | undefined;
    for (const [id, p] of memoryProfiles.entries()) {
      if (p.name.trim().toLowerCase() === profile.name.trim().toLowerCase()) {
        foundId = id;
        break;
      }
    }

    if (!foundId && supabaseClient) {
      try {
        const { data } = await supabaseClient
          .from('profiles')
          .select('id')
          .ilike('name', profile.name.trim())
          .maybeSingle();
        if (data && data.id) {
          foundId = data.id;
        }
      } catch (_) {}
    }

    validProfileId = foundId || crypto.randomUUID();
  }

  const existing = memoryProfiles.get(validProfileId);

  const updated: PlayerProfileData = {
    ...profile,
    id: validProfileId,
    password: profile.password || existing?.password || 'password123',
    xp: profile.xp ?? existing?.xp ?? 150,
    level: profile.level ?? existing?.level ?? 1,
    coins: profile.coins ?? existing?.coins ?? 500,
    gems: profile.gems ?? existing?.gems ?? 25,
    energy: profile.energy ?? existing?.energy ?? 100,
    streak_days: profile.streak_days ?? existing?.streak_days ?? 1,
    last_active: new Date().toISOString(),
  };

  memoryProfiles.set(validProfileId, updated);

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .upsert({
          id: validProfileId,
          name: updated.name,
          password: updated.password,
          grade: updated.grade,
          curriculum: updated.curriculum,
          difficulty: updated.difficulty,
          world_theme: updated.world_theme,
          learning_goal: updated.learning_goal,
          avatar_index: updated.avatar_index,
          xp: updated.xp,
          level: updated.level,
          coins: updated.coins,
          gems: updated.gems,
          energy: updated.energy,
          streak_days: updated.streak_days,
          last_active: updated.last_active,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [Supabase Upsert Profile Error]:', error);
      } else if (data) {
        console.log(`✅ [Supabase Cloud]: Successfully saved profile "${updated.name}" (${validProfileId})`);
        
        if (updated.subjects && updated.subjects.length > 0) {
          try {
            await supabaseClient.from('user_subjects').delete().eq('user_id', validProfileId);
            const subjectRows = updated.subjects.map((s) => ({
              user_id: validProfileId,
              subject_name: s,
            }));
            await supabaseClient.from('user_subjects').insert(subjectRows);
          } catch (subErr) {
            console.error('⚠️ [Supabase Warning]: Failed to insert user_subjects:', subErr);
          }
        }

        return { ...updated, ...data, subjects: updated.subjects };
      }
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Upsert profile failed:', err);
    }
  }

  return updated;
}

export async function getProfile(userId?: string): Promise<PlayerProfileData> {
  const cleanId = userId ? userId.trim() : '';

  // 1. Check in-memory by exact ID or by Name
  if (cleanId) {
    if (memoryProfiles.has(cleanId)) {
      return memoryProfiles.get(cleanId)!;
    }
    const cleanLower = cleanId.toLowerCase();
    for (const p of memoryProfiles.values()) {
      if (p.id?.toLowerCase() === cleanLower || p.name?.toLowerCase() === cleanLower) {
        return p;
      }
    }
  }

  // 2. Check Supabase Cloud
  if (supabaseClient && cleanId) {
    try {
      const validUuid = ensureUuid(cleanId);
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .or(`id.eq.${validUuid},name.ilike.${cleanId}`)
        .maybeSingle();

      if (!error && data) {
        const { data: subData } = await supabaseClient
          .from('user_subjects')
          .select('subject_name')
          .eq('user_id', data.id);

        const subjects = subData ? subData.map((s: any) => s.subject_name) : [];
        const full = { ...(data as PlayerProfileData), subjects };
        memoryProfiles.set(data.id, full);
        return full;
      }
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Fetch profile failed:', err);
    }
  }

  // 3. If no userId provided, or not found, check if there is any user-created profile
  // 3. If no userId provided, return the first available profile
  for (const p of Array.from(memoryProfiles.values()).reverse()) {
    return p;
  }

  return {
    id: ensureUuid('default-user'),
    name: 'Explorer',
    grade: 'Class 10',
    curriculum: 'CBSE',
    subjects: ['Mathematics', 'Computer Science'],
    difficulty: 'Balanced',
    world_theme: 'Green Highlands',
    learning_goal: 'Master all academic domains',
    avatar_index: 0,
    xp: 0,
    level: 1,
    coins: 500,
    gems: 25,
    energy: 100,
    streak_days: 1,
    last_active: new Date().toISOString(),
  };
}

export async function getAllProfiles(): Promise<PlayerProfileData[]> {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .order('xp', { ascending: false });

      if (!error && data) {
        return data as PlayerProfileData[];
      }
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Fetch all profiles failed:', err);
    }
  }

  return Array.from(memoryProfiles.values()).sort((a, b) => (b.xp || 0) - (a.xp || 0));
}

// ============================================================================
// LEARNING & PROGRESSION DB OPERATIONS
// ============================================================================

export function computeLevel(totalXp: number): number {
  if (totalXp < 0) return 1;
  let currentLvl = 1;
  let remainingXp = totalXp;
  while (true) {
    const needed = currentLvl <= 1 ? 1000 : 1000 + (currentLvl * 1000);
    if (remainingXp >= needed) {
      remainingXp -= needed;
      currentLvl++;
    } else {
      break;
    }
  }
  return currentLvl;
}

export async function updateProgressAndStats(
  userId: string,
  buildingId: string,
  subject: string,
  correctCount: number,
  totalQuestions: number
): Promise<{ xpEarned: number; coinsEarned: number; newProfile: PlayerProfileData }> {
  const currentProfile = await getProfile(userId);
  const validId = currentProfile.id || ensureUuid(userId);

  const xpEarned = correctCount * 50;
  const coinsEarned = correctCount * 10;
  const isPerfect = correctCount === totalQuestions && totalQuestions > 0;
  const gemsEarned = isPerfect ? 5 : 0;
  const wrongCount = Math.max(0, totalQuestions - correctCount);

  const newXp = (currentProfile.xp || 0) + xpEarned;
  const newLevel = computeLevel(newXp);
  const newCoins = (currentProfile.coins || 0) + coinsEarned;
  const newGems = (currentProfile.gems || 0) + gemsEarned;
  const newEnergy = Math.max(0, (currentProfile.energy || 100) - wrongCount);

  const updatedProfile: PlayerProfileData = {
    ...currentProfile,
    id: validId,
    xp: newXp,
    level: newLevel,
    coins: newCoins,
    gems: newGems,
    energy: newEnergy,
  };

  await saveProfile(updatedProfile);

  const progressKey = `${validId}_${buildingId}`;
  const existingProg = memoryProgress.get(progressKey) || {
    lessons_completed: 0,
    total_stars: 0,
  };

  const starsEarned = correctCount >= 4 ? 3 : correctCount >= 2 ? 2 : 1;

  memoryProgress.set(progressKey, {
    building_id: buildingId,
    subject: subject,
    lessons_completed: existingProg.lessons_completed + 1,
    quiz_score: correctCount,
    total_stars: existingProg.total_stars + starsEarned,
  });

  if (supabaseClient) {
    try {
      await supabaseClient.from('user_progress').upsert({
        user_id: validId,
        building_id: buildingId,
        subject: subject,
        lessons_completed: existingProg.lessons_completed + 1,
        quiz_score: correctCount,
        total_stars: existingProg.total_stars + starsEarned,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Update user_progress failed:', err);
    }
  }

  return { xpEarned, coinsEarned, newProfile: updatedProfile };
}

// ============================================================================
// INVENTORY & SHOP DB OPERATIONS
// ============================================================================

export async function getUserInventory(userId: string): Promise<InventoryItemData[]> {
  const validId = ensureUuid(userId);

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('inventory_items')
        .select('*')
        .eq('user_id', validId);

      if (!error && data && data.length > 0) {
        return data as InventoryItemData[];
      }
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Fetch inventory failed:', err);
    }
  }

  return memoryInventory.get(validId) || initialInventoryDemo;
}

export async function equipInventoryItem(userId: string, itemId: string): Promise<boolean> {
  const validId = ensureUuid(userId);
  const items = await getUserInventory(validId);
  const target = items.find((i) => i.id === itemId || i.item_id === itemId);
  if (!target) return false;

  const slot = target.slot_type;

  for (const item of items) {
    if (item.slot_type === slot) {
      item.is_equipped = item.id === target.id || item.item_id === target.item_id;
    }
  }
  memoryInventory.set(validId, items);

  if (supabaseClient) {
    try {
      await supabaseClient
        .from('inventory_items')
        .update({ is_equipped: false })
        .eq('user_id', validId)
        .eq('slot_type', slot);

      await supabaseClient
        .from('inventory_items')
        .update({ is_equipped: true })
        .eq('user_id', validId)
        .eq('item_id', target.item_id);
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Equip item failed:', err);
    }
  }

  return true;
}

export async function purchaseShopItem(
  userId: string,
  shopItemId: string
): Promise<{ success: boolean; error?: string; updatedProfile?: PlayerProfileData; purchasedItem?: InventoryItemData }> {
  const validId = ensureUuid(userId);
  const profile = await getProfile(validId);
  const shopItem = memoryShopCatalog.get(shopItemId);

  if (!shopItem) {
    return { success: false, error: 'Shop item not found in catalog.' };
  }

  const cost = shopItem.price;
  const isCoins = shopItem.currency === 'COINS';

  if (isCoins) {
    if ((profile.coins || 0) < cost) {
      return { success: false, error: `Insufficient Coins! Need ${cost} Coins.` };
    }
    profile.coins = (profile.coins || 0) - cost;
  } else {
    if ((profile.gems || 0) < cost) {
      return { success: false, error: `Insufficient Gems! Need ${cost} Gems.` };
    }
    profile.gems = (profile.gems || 0) - cost;
  }

  const newItem: InventoryItemData = {
    id: crypto.randomUUID(),
    user_id: validId,
    item_id: shopItem.id,
    item_name: shopItem.name,
    category: shopItem.category,
    rarity: shopItem.rarity,
    slot_type: shopItem.slot_type,
    image_path: shopItem.image_path,
    image_url: shopItem.image_url,
    description: shopItem.description,
    stats: shopItem.perk_text,
    quantity: 1,
    is_equipped: false,
    purchased_at: new Date().toISOString(),
  };

  const userItems = memoryInventory.get(validId) || [];
  userItems.push(newItem);
  memoryInventory.set(validId, userItems);

  const updatedProfile = await saveProfile(profile);

  if (supabaseClient) {
    try {
      await supabaseClient.from('inventory_items').insert({
        id: newItem.id,
        user_id: validId,
        item_id: newItem.item_id,
        item_name: newItem.item_name,
        category: newItem.category,
        rarity: newItem.rarity,
        slot_type: newItem.slot_type,
        image_path: newItem.image_path,
        image_url: newItem.image_url,
        description: newItem.description,
        stats: newItem.stats,
        quantity: 1,
        is_equipped: false,
        purchased_at: newItem.purchased_at,
      });
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Insert inventory item failed:', err);
    }
  }

  return {
    success: true,
    updatedProfile,
    purchasedItem: newItem,
  };
}

export function getShopCatalog(category?: string): ShopCatalogItem[] {
  const items = Array.from(memoryShopCatalog.values());
  if (!category || category.toUpperCase() === 'ALL') {
    return items;
  }
  return items.filter((i) => i.category.toUpperCase() === category.toUpperCase());
}

// ============================================================================
// GUILDS & SOCIAL DB OPERATIONS
// ============================================================================

export async function getPublicGuilds(): Promise<GuildData[]> {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('guilds')
        .select('*')
        .order('level', { ascending: false });
      if (!error && data && data.length > 0) {
        for (const g of data) {
          memoryGuilds.set(g.id, g as GuildData);
        }
        return data as GuildData[];
      }
    } catch (err) {
      console.error('❌ [Supabase getPublicGuilds Error]:', err);
    }
  }
  return Array.from(memoryGuilds.values());
}

export async function getUserGuild(userId: string): Promise<{
  guild: GuildData | null;
  members: GuildMemberData[];
  messages: GuildMessageData[];
}> {
  const profile = await getProfile(userId);
  const candidateIds = Array.from(
    new Set([profile.id, ensureUuid(userId), userId].filter(Boolean))
  ) as string[];

  let userGuild: GuildData | null = null;
  let guildId: string | null = null;

  // 1. Check Supabase Cloud
  if (supabaseClient) {
    try {
      // Find guild membership
      for (const uId of candidateIds) {
        const { data: memberRows } = await supabaseClient
          .from('guild_members')
          .select('guild_id')
          .eq('user_id', uId)
          .order('joined_at', { ascending: false })
          .limit(1);

        if (memberRows && memberRows.length > 0 && memberRows[0].guild_id) {
          guildId = memberRows[0].guild_id;
          break;
        }
      }

      // Fallback: Check if user is the leader of a guild directly in `guilds` table
      if (!guildId) {
        for (const uId of candidateIds) {
          const { data: leaderGuilds } = await supabaseClient
            .from('guilds')
            .select('id')
            .eq('leader_id', uId)
            .limit(1);

          if (leaderGuilds && leaderGuilds.length > 0 && leaderGuilds[0].id) {
            guildId = leaderGuilds[0].id;
            // Auto-repair membership record in Supabase
            try {
              await supabaseClient.from('guild_members').upsert(
                {
                  guild_id: guildId,
                  user_id: uId,
                  role: 'Leader',
                  weekly_xp: 0,
                  joined_at: new Date().toISOString(),
                },
                { onConflict: 'guild_id,user_id' }
              );
            } catch (_) {}
            break;
          }
        }
      }

      if (guildId) {
        const { data: gData } = await supabaseClient
          .from('guilds')
          .select('*')
          .eq('id', guildId)
          .maybeSingle();

        if (gData) {
          userGuild = gData as GuildData;
          memoryGuilds.set(guildId, userGuild);

          // Fetch members with profiles joined
          const { data: mList } = await supabaseClient
            .from('guild_members')
            .select(
              'id, guild_id, user_id, role, weekly_xp, joined_at, profiles:user_id(id, name, level)'
            )
            .eq('guild_id', guildId);

          const { data: msgList } = await supabaseClient
            .from('guild_messages')
            .select('*')
            .eq('guild_id', guildId)
            .order('created_at', { ascending: true });

          const formattedMembers: GuildMemberData[] = (mList || []).map(
            (m: any) => ({
              id: m.id || m.user_id,
              guild_id: m.guild_id,
              user_id: m.user_id,
              name: m.profiles?.name || m.name || 'Scholar',
              role: m.role || 'Member',
              level: m.profiles?.level || m.level || 1,
              weekly_xp: m.weekly_xp || 0,
              is_online: true,
              joined_at: m.joined_at,
            })
          );

          return {
            guild: userGuild,
            members: formattedMembers,
            messages: (msgList as GuildMessageData[]) || [],
          };
        }
      }
    } catch (err) {
      console.error('❌ [Supabase getUserGuild Error]:', err);
    }
  }

  // 2. Check in-memory store
  for (const uId of candidateIds) {
    for (const [gId, members] of memoryGuildMembers.entries()) {
      if (
        members.some(
          (m) =>
            m.user_id === uId ||
            (profile.name &&
              m.name.toLowerCase() === profile.name.toLowerCase())
        )
      ) {
        guildId = gId;
        userGuild = memoryGuilds.get(gId) || null;
        break;
      }
    }
    if (userGuild) break;
  }

  if (!userGuild || !guildId) {
    return { guild: null, members: [], messages: [] };
  }

  const members = memoryGuildMembers.get(guildId) || [];
  const messages = memoryGuildMessages.get(guildId) || [];

  return { guild: userGuild, members, messages };
}

export async function createGuild(
  leaderId: string,
  name: string,
  tag: string,
  motto: string
): Promise<GuildData> {
  const profile = await getProfile(leaderId);
  const validLeaderId = profile.id || ensureUuid(leaderId);
  const newGuildId = crypto.randomUUID();

  const newGuild: GuildData = {
    id: newGuildId,
    name: name.trim(),
    tag: tag.trim().toUpperCase(),
    motto: motto.trim(),
    level: 1,
    member_count: 1,
    max_members: 20,
    leader_id: validLeaderId,
    created_at: new Date().toISOString(),
  };

  memoryGuilds.set(newGuildId, newGuild);

  const initialMember: GuildMemberData = {
    guild_id: newGuildId,
    user_id: validLeaderId,
    name: profile.name,
    role: 'Leader',
    level: profile.level || 1,
    weekly_xp: 0,
    is_online: true,
    joined_at: new Date().toISOString(),
  };

  memoryGuildMembers.set(newGuildId, [initialMember]);
  memoryGuildMessages.set(newGuildId, []);

  if (supabaseClient) {
    try {
      await supabaseClient.from('guilds').insert({
        id: newGuild.id,
        name: newGuild.name,
        tag: newGuild.tag,
        motto: newGuild.motto,
        level: newGuild.level,
        member_count: 1,
        max_members: newGuild.max_members,
        leader_id: validLeaderId,
        created_at: newGuild.created_at,
      });

      // Insert clean schema columns to avoid Postgres column error
      await supabaseClient.from('guild_members').upsert(
        {
          guild_id: newGuildId,
          user_id: validLeaderId,
          role: 'Leader',
          weekly_xp: 0,
          joined_at: initialMember.joined_at,
        },
        { onConflict: 'guild_id,user_id' }
      );

      console.log(
        `✅ [Supabase Cloud]: Successfully created Guild "${newGuild.name}" (${newGuildId})`
      );
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Create guild failed:', err);
    }
  }

  return newGuild;
}

export async function joinGuild(
  userId: string,
  guildId: string
): Promise<boolean> {
  const profile = await getProfile(userId);
  const validUserId = profile.id || ensureUuid(userId);

  // Fetch or find the guild
  let guild = memoryGuilds.get(guildId);
  if (!guild && supabaseClient) {
    try {
      const { data: gData } = await supabaseClient
        .from('guilds')
        .select('*')
        .eq('id', guildId)
        .maybeSingle();
      if (gData) {
        guild = gData as GuildData;
        memoryGuilds.set(guildId, guild);
      }
    } catch (err) {
      console.error('❌ [Supabase Fetch Guild Error]:', err);
    }
  }

  if (!guild) return false;

  const currentMembers = memoryGuildMembers.get(guildId) || [];
  if (!currentMembers.some((m) => m.user_id === validUserId)) {
    const newMember: GuildMemberData = {
      guild_id: guildId,
      user_id: validUserId,
      name: profile.name,
      role: 'Member',
      level: profile.level || 1,
      weekly_xp: 0,
      is_online: true,
      joined_at: new Date().toISOString(),
    };
    currentMembers.push(newMember);
    memoryGuildMembers.set(guildId, currentMembers);
    guild.member_count = currentMembers.length;
  }

  if (supabaseClient) {
    try {
      // Remove user from previous guilds
      await supabaseClient
        .from('guild_members')
        .delete()
        .eq('user_id', validUserId);

      // Insert clean row into guild_members
      await supabaseClient.from('guild_members').upsert(
        {
          guild_id: guildId,
          user_id: validUserId,
          role: 'Member',
          weekly_xp: 0,
          joined_at: new Date().toISOString(),
        },
        { onConflict: 'guild_id,user_id' }
      );

      // Update actual member count in guilds table
      const { count } = await supabaseClient
        .from('guild_members')
        .select('*', { count: 'exact', head: true })
        .eq('guild_id', guildId);

      if (count !== null) {
        guild.member_count = count;
        await supabaseClient
          .from('guilds')
          .update({ member_count: count })
          .eq('id', guildId);
      }
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Join guild failed:', err);
    }
  }

  return true;
}

export async function leaveGuild(
  userId: string,
  guildId: string
): Promise<boolean> {
  const profile = await getProfile(userId);
  const validUserId = profile.id || ensureUuid(userId);

  const currentMembers = memoryGuildMembers.get(guildId) || [];
  const updatedMembers = currentMembers.filter(
    (m) => m.user_id !== validUserId
  );
  memoryGuildMembers.set(guildId, updatedMembers);

  const guild = memoryGuilds.get(guildId);
  if (guild) {
    guild.member_count = updatedMembers.length;
  }

  if (supabaseClient) {
    try {
      await supabaseClient
        .from('guild_members')
        .delete()
        .eq('guild_id', guildId)
        .eq('user_id', validUserId);

      const { count } = await supabaseClient
        .from('guild_members')
        .select('*', { count: 'exact', head: true })
        .eq('guild_id', guildId);

      if (count !== null) {
        if (guild) guild.member_count = count;
        await supabaseClient
          .from('guilds')
          .update({ member_count: count })
          .eq('id', guildId);
      }
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Leave guild failed:', err);
    }
  }

  return true;
}

export async function sendGuildMessage(
  guildId: string,
  senderId: string,
  text: string
): Promise<GuildMessageData> {
  const profile = await getProfile(senderId);
  const validSenderId = profile.id || ensureUuid(senderId);

  const message: GuildMessageData = {
    id: crypto.randomUUID(),
    guild_id: guildId,
    sender_id: validSenderId,
    sender_name: profile.name,
    role: 'Member',
    text: text.trim(),
    created_at: new Date().toISOString(),
  };

  const messages = memoryGuildMessages.get(guildId) || [];
  messages.push(message);
  memoryGuildMessages.set(guildId, messages);

  if (supabaseClient) {
    try {
      await supabaseClient.from('guild_messages').insert({
        id: message.id,
        guild_id: message.guild_id,
        sender_id: validSenderId,
        sender_name: message.sender_name,
        role: message.role,
        text: message.text,
        created_at: message.created_at,
      });
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Send guild message failed:', err);
    }
  }

  return message;
}

export async function getGuildMessages(guildId: string): Promise<GuildMessageData[]> {
  if (supabaseClient) {
    try {
      const { data: msgList } = await supabaseClient
        .from('guild_messages')
        .select('*')
        .eq('guild_id', guildId)
        .order('created_at', { ascending: true })
        .limit(50);
      if (msgList && msgList.length > 0) {
        return msgList as GuildMessageData[];
      }
    } catch (_) {}
  }
  return memoryGuildMessages.get(guildId) || [];
}

export async function sendFriendRequest(requesterId: string, addresseeId: string): Promise<FriendshipData> {
  const reqId = ensureUuid(requesterId);
  const addId = ensureUuid(addresseeId);

  // Check if friendship already exists
  for (const f of memoryFriendships.values()) {
    if (
      (f.requester_id === reqId && f.addressee_id === addId) ||
      (f.requester_id === addId && f.addressee_id === reqId)
    ) {
      return f;
    }
  }

  const friendshipId = crypto.randomUUID();
  const record: FriendshipData = {
    id: friendshipId,
    requester_id: reqId,
    addressee_id: addId,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  memoryFriendships.set(friendshipId, record);

  if (supabaseClient) {
    try {
      await supabaseClient.from('friendships').upsert(record);
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Send friend request failed:', err);
    }
  }

  return record;
}

export async function respondFriendRequest(friendshipId: string, accept: boolean): Promise<boolean> {
  let record: FriendshipData | undefined = memoryFriendships.get(friendshipId);

  if (!record) {
    for (const f of memoryFriendships.values()) {
      if (f.id === friendshipId || f.requester_id === friendshipId || f.addressee_id === friendshipId) {
        record = f;
        break;
      }
    }
  }

  if (record) {
    record.status = accept ? 'accepted' : 'declined';
    memoryFriendships.set(record.id, record);
  }

  if (supabaseClient) {
    try {
      await supabaseClient
        .from('friendships')
        .update({ status: accept ? 'accepted' : 'declined', updated_at: new Date().toISOString() })
        .eq('id', friendshipId);
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Respond friend request failed:', err);
    }
  }

  return true;
}

export async function getFriendsData(userId: string): Promise<{
  friends: any[];
  pendingReceived: any[];
  pendingSent: any[];
  availableExplorers: any[];
}> {
  const validId = ensureUuid(userId);
  const current = await getProfile(validId);
  const allProfiles = await getAllProfiles();

  const colors = ['#DEB7FF', '#60A5FA', '#F2CA50', '#82C0A0'];

  const otherProfiles = allProfiles
    .filter((p) => p.name.toLowerCase() !== current.name.toLowerCase() && p.id !== validId)
    .map((p, idx) => ({
      id: p.id,
      name: p.name,
      title: p.learning_goal || 'Civilization Architect',
      level: p.level || 1,
      xp: p.xp || 100,
      avatarInitial: p.name ? p.name.charAt(0).toUpperCase() : 'E',
      avatarColor: colors[idx % colors.length],
      district: p.subjects && p.subjects.length > 0 ? p.subjects[0] : 'Academy District',
      isOnline: true,
      lastActive: 'Active Now',
      streakDays: p.streak_days || 7,
      guildName: 'Academy District',
      subjectProgress: { Math: 0.85, CS: 0.90, Physics: 0.75 },
    }));

  const acceptedFriendIds: string[] = [];
  const pendingReceivedList: { friendshipId: string; user: any }[] = [];
  const pendingSentIds: string[] = [];

  // Check Supabase Cloud
  if (supabaseClient) {
    try {
      const { data: reqs } = await supabaseClient
        .from('friendships')
        .select('*')
        .or(`requester_id.eq.${validId},addressee_id.eq.${validId}`);

      if (reqs) {
        for (const r of reqs) {
          if (r.status === 'accepted') {
            const friendId = r.requester_id === validId ? r.addressee_id : r.requester_id;
            if (!acceptedFriendIds.includes(friendId)) acceptedFriendIds.push(friendId);
          } else if (r.status === 'pending') {
            if (r.addressee_id === validId) {
              const sender = otherProfiles.find((p) => p.id === r.requester_id);
              if (sender && !pendingReceivedList.some((p) => p.friendshipId === r.id)) {
                pendingReceivedList.push({ friendshipId: r.id, user: sender });
              }
            } else if (r.requester_id === validId) {
              if (!pendingSentIds.includes(r.addressee_id)) pendingSentIds.push(r.addressee_id);
            }
          }
        }
      }
    } catch (_) {}
  }

  // Check in-memory store
  for (const f of memoryFriendships.values()) {
    if (f.status === 'accepted') {
      if (f.requester_id === validId && !acceptedFriendIds.includes(f.addressee_id)) {
        acceptedFriendIds.push(f.addressee_id);
      }
      if (f.addressee_id === validId && !acceptedFriendIds.includes(f.requester_id)) {
        acceptedFriendIds.push(f.requester_id);
      }
    } else if (f.status === 'pending') {
      if (f.addressee_id === validId) {
        const sender = otherProfiles.find((p) => p.id === f.requester_id);
        if (sender && !pendingReceivedList.some((p) => p.friendshipId === f.id)) {
          pendingReceivedList.push({ friendshipId: f.id, user: sender });
        }
      } else if (f.requester_id === validId) {
        if (!pendingSentIds.includes(f.addressee_id)) {
          pendingSentIds.push(f.addressee_id);
        }
      }
    }
  }

  const friends = otherProfiles.filter((p) => Boolean(p.id && acceptedFriendIds.includes(p.id)));

  return {
    friends,
    pendingReceived: pendingReceivedList,
    pendingSent: pendingSentIds,
    availableExplorers: otherProfiles,
  };
}

export async function createDuelChallenge(
  challengerId: string,
  challengedId: string,
  buildingId: string,
  subject: string,
  stakeCoins: number = 50
): Promise<DuelChallengeData> {
  const cId = ensureUuid(challengerId);
  const tId = ensureUuid(challengedId);
  const duelId = crypto.randomUUID();

  const duel: DuelChallengeData = {
    id: duelId,
    challenger_id: cId,
    challenged_id: tId,
    building_id: buildingId,
    subject: subject,
    stake_coins: stakeCoins,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  memoryDuels.set(duelId, duel);

  if (supabaseClient) {
    try {
      await supabaseClient.from('duels').insert(duel);
    } catch (err) {
      console.error('❌ [Supabase DB Error]: Insert duel failed:', err);
    }
  }

  return duel;
}

// ============================================================================
// PVP DUEL ARENA ENGINE & PERSISTENCE
// ============================================================================

export function calculatePvPTier(rating: number): PvPTier {
  if (rating >= 1900) return 'Grand Archmage';
  if (rating >= 1700) return 'Diamond Arcanist';
  if (rating >= 1500) return 'Platinum Sorcerer';
  if (rating >= 1300) return 'Gold Mage';
  if (rating >= 1100) return 'Silver Adept';
  return 'Bronze Scholar';
}

export async function getUserPvPStats(userId: string): Promise<PvPStats> {
  const validId = ensureUuid(userId);
  const profile = await getProfile(validId);

  // 1. Check in-memory store
  let stats = memoryPvPStats.get(validId);
  if (stats) return stats;

  // 2. Check Supabase
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('pvp_stats')
        .select('*')
        .eq('user_id', validId)
        .maybeSingle();

      if (!error && data) {
        stats = {
          user_id: data.user_id,
          name: data.name || profile.name,
          rating: data.rating || 1200,
          tier: calculatePvPTier(data.rating || 1200),
          wins: data.wins || 0,
          losses: data.losses || 0,
          draws: data.draws || 0,
          total_matches: data.total_matches || 0,
          win_rate: data.win_rate || 0,
          current_streak: data.current_streak || 0,
          best_streak: data.best_streak || 0,
          total_coins_won: data.total_coins_won || 0,
          favorite_subject: data.favorite_subject || (profile.subjects?.[0] || 'Computer Science'),
        };
        memoryPvPStats.set(validId, stats);
        return stats;
      }
    } catch (_) {}
  }

  // Default initial PvP stats
  const initialStats: PvPStats = {
    user_id: validId,
    name: profile.name || 'Scholar Duelist',
    rating: 1200,
    tier: 'Silver Adept',
    wins: 0,
    losses: 0,
    draws: 0,
    total_matches: 0,
    win_rate: 0.0,
    current_streak: 0,
    best_streak: 0,
    total_coins_won: 0,
    favorite_subject: profile.subjects?.[0] || 'Mathematics',
  };

  memoryPvPStats.set(validId, initialStats);
  return initialStats;
}

export async function saveUserPvPStats(stats: PvPStats): Promise<PvPStats> {
  stats.tier = calculatePvPTier(stats.rating);
  stats.total_matches = stats.wins + stats.losses + stats.draws;
  stats.win_rate = stats.total_matches > 0 ? Number(((stats.wins / stats.total_matches) * 100).toFixed(1)) : 0;

  memoryPvPStats.set(stats.user_id, stats);

  if (supabaseClient) {
    try {
      await supabaseClient.from('pvp_stats').upsert({
        user_id: stats.user_id,
        name: stats.name,
        rating: stats.rating,
        tier: stats.tier,
        wins: stats.wins,
        losses: stats.losses,
        draws: stats.draws,
        total_matches: stats.total_matches,
        win_rate: stats.win_rate,
        current_streak: stats.current_streak,
        best_streak: stats.best_streak,
        total_coins_won: stats.total_coins_won,
        favorite_subject: stats.favorite_subject,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('⚠️ [Supabase Save PvP Stats Error]:', err);
    }
  }

  return stats;
}

const AI_SCHOLAR_POOL = [
  { name: 'Archmage Ada', title: 'Algorithm Prodigy', color: '#60A5FA', initial: 'A' },
  { name: 'Pythagoras AI', title: 'Geometric Warden', color: '#F2CA50', initial: 'P' },
  { name: 'Scholar Newton', title: 'Kinetic Chancellor', color: '#82C0A0', initial: 'N' },
  { name: 'Alchemist Curie', title: 'Radiant Synthesizer', color: '#DEB7FF', initial: 'C' },
  { name: 'Sentinel Turing', title: 'Logic Cryptographer', color: '#F38BA8', initial: 'T' },
  { name: 'Archivist Aristotle', title: 'Omniscient Chronicler', color: '#FAB387', initial: 'K' },
];

export function createAiOpponent(subject: string, playerRating: number): PvPCombatant {
  const template = AI_SCHOLAR_POOL[Math.floor(Math.random() * AI_SCHOLAR_POOL.length)];
  const ratingDelta = Math.floor(Math.random() * 80) - 40;
  const rating = Math.max(900, playerRating + ratingDelta);

  return {
    id: `ai-bot-${crypto.randomUUID().substring(0, 8)}`,
    name: template.name,
    title: template.title,
    avatar_initial: template.initial,
    avatar_color: template.color,
    avatar_index: Math.floor(Math.random() * 8),
    level: Math.max(1, Math.floor(rating / 300)),
    rating: rating,
    tier: calculatePvPTier(rating),
    is_bot: true,
    hp: 1000,
    score: 0,
    correct_count: 0,
    avg_time_ms: 3800,
    answers: [],
  };
}

export async function matchmakePvP(
  userId: string,
  subject: string,
  stakeCoins: number = 50,
  isRanked: boolean = true,
  questions: MCQuestion[] = [],
  playerName?: string
): Promise<{ session: PvPSession | null; matchedWithAI: boolean; waiting?: boolean }> {
  const cleanUserId = String(userId || 'duelist_unknown').trim();
  const validId = ensureUuid(cleanUserId);
  const profile = await getProfile(validId);
  const userStats = await getUserPvPStats(validId);
  const userParts = cleanUserId.split('_');
  const userSuffix = userParts.length > 1 ? userParts[userParts.length - 1] : 'Player';
  const effectiveName = (playerName && playerName.trim().length > 0)
    ? playerName.trim()
    : (profile.name && profile.name.trim().length > 0 ? profile.name.trim() : `Duelist_${userSuffix}`);





  // Check if player has sufficient coins for stake
  if (stakeCoins > 0 && (profile.coins || 0) < stakeCoins) {
    throw new Error(`Insufficient coins to enter duel! You need ${stakeCoins} coins.`);
  }

  // ─── 1. PRACTICE MODE (isRanked === false): INSTANT AI SCHOLAR BOT ─────
  if (!isRanked) {
    console.log(`🤖 [PvP Practice Mode]: Spawning instant AI Scholar for ${effectiveName} (${cleanUserId})`);
    const opponentCombatant = createAiOpponent(subject, userStats.rating);

    const playerCombatant: PvPCombatant = {
      id: cleanUserId,
      name: effectiveName,
      title: profile.learning_goal || 'Academy Duelist',
      avatar_initial: effectiveName.charAt(0).toUpperCase(),
      avatar_color: '#F2CA50',
      avatar_index: profile.avatar_index || 0,
      level: profile.level || 1,
      rating: userStats.rating,
      tier: userStats.tier,
      is_bot: false,
      hp: 1000,
      score: 0,
      correct_count: 0,
      avg_time_ms: 0,
      answers: [],
    };

    const sessionId = crypto.randomUUID();
    const session: PvPSession = {
      id: sessionId,
      subject: subject,
      building_id: 'arena',
      stake_coins: 0,
      is_ranked: false,
      total_rounds: questions.length || 5,
      current_round: 0,
      status: 'in_progress',
      combatants: {
        [playerCombatant.id]: playerCombatant,
        [opponentCombatant.id]: opponentCombatant,
      },
      questions: questions,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    memoryPvPSessions.set(sessionId, session);
    return { session, matchedWithAI: true };
  }

  // ─── 2. REAL DUEL MODE (isRanked === true): REAL HUMAN PLAYERS ONLY ────
  // Clean up stale queue entries older than 30s
  const now = Date.now();
  for (let i = memoryMatchmakingQueue.length - 1; i >= 0; i--) {
    if (now - memoryMatchmakingQueue[i].queuedAt > 30000) {
      memoryMatchmakingQueue.splice(i, 1);
    }
  }

  // 2a. Check if this player was already matched into an active session
  const activeExistingSession = getActiveSessionForUser(cleanUserId, validId);
  if (activeExistingSession) {
    console.log(`⚔️ [PvP Matchmake]: Player ${effectiveName} (${cleanUserId}) retrieved shared real session (${activeExistingSession.id})`);
    return { session: activeExistingSession, matchedWithAI: false };
  }

  // 2b. Check if ANOTHER human player is currently queued waiting for a match (NEVER match self)
  const queueIdx = memoryMatchmakingQueue.findIndex(
    (q) =>
      q.userId !== cleanUserId &&
      q.userId !== validId &&
      q.profile.name.trim().toLowerCase() !== effectiveName.toLowerCase() &&
      (q.subject === 'Omni-Duel' || subject === 'Omni-Duel' || q.subject.toLowerCase() === subject.toLowerCase())
  );

  if (queueIdx >= 0) {
    const queuedOpponent = memoryMatchmakingQueue.splice(queueIdx, 1)[0];
    const opponentStats = queuedOpponent.userStats || (await getUserPvPStats(queuedOpponent.userId));
    const opponentName = queuedOpponent.profile.name || 'Academy Duelist';

    const opponentCombatant: PvPCombatant = {
      id: queuedOpponent.userId,
      name: opponentName,
      title: queuedOpponent.profile.learning_goal || 'Academy Duelist',
      avatar_initial: opponentName.charAt(0).toUpperCase(),
      avatar_color: '#DEB7FF',
      avatar_index: queuedOpponent.profile.avatar_index || 0,
      level: queuedOpponent.profile.level || 1,
      rating: opponentStats.rating,
      tier: opponentStats.tier,
      is_bot: false,
      hp: 1000,
      score: 0,
      correct_count: 0,
      avg_time_ms: 0,
      answers: [],
    };

    const playerCombatant: PvPCombatant = {
      id: cleanUserId,
      name: effectiveName,
      title: profile.learning_goal || 'Master Scholar',
      avatar_initial: effectiveName.charAt(0).toUpperCase(),
      avatar_color: '#F2CA50',
      avatar_index: profile.avatar_index || 0,
      level: profile.level || 1,
      rating: userStats.rating,
      tier: userStats.tier,
      is_bot: false,
      hp: 1000,
      score: 0,
      correct_count: 0,
      avg_time_ms: 0,
      answers: [],
    };

    const sharedQuestions = (questions && questions.length >= 4)
      ? questions
      : (queuedOpponent.questions && queuedOpponent.questions.length >= 4 ? queuedOpponent.questions : questions);

    const sessionId = crypto.randomUUID();
    const session: PvPSession = {
      id: sessionId,
      subject: subject,
      building_id: 'arena',
      stake_coins: stakeCoins,
      is_ranked: true,
      total_rounds: sharedQuestions.length || 5,
      current_round: 0,
      status: 'in_progress',
      combatants: {
        [playerCombatant.id]: playerCombatant,
        [opponentCombatant.id]: opponentCombatant,
      },
      questions: sharedQuestions,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    memoryPvPSessions.set(sessionId, session);
    // Store in active sessions map for both players (persists for 60s)
    memoryActiveSessionsByUser.set(cleanUserId, { session, matchedAt: Date.now() });
    memoryActiveSessionsByUser.set(validId, { session, matchedAt: Date.now() });
    memoryActiveSessionsByUser.set(queuedOpponent.userId, { session, matchedAt: Date.now() });

    console.log(`⚔️ [PvP Live Matchmaking]: PAIRED 2 REAL HUMAN DUELISTS! (${playerCombatant.name} vs ${opponentCombatant.name}) in session ${sessionId}`);
    return { session, matchedWithAI: false };
  }

  // 2c. Add to queue if not already present; if present, refresh timestamp
  let existingEntry = memoryMatchmakingQueue.find((q) => q.userId === cleanUserId || q.userId === validId);
  if (!existingEntry) {
    existingEntry = {
      userId: cleanUserId,
      subject: subject,
      stakeCoins: stakeCoins,
      isRanked: true,
      queuedAt: Date.now(),
      profile: { ...profile, name: effectiveName },
      userStats: userStats,
      questions: questions,
    };
    memoryMatchmakingQueue.push(existingEntry);
    console.log(`⏳ [PvP Matchmaking]: Player ${effectiveName} (${cleanUserId}) queued for ${subject}. Waiting for real human opponent...`);
  } else {
    existingEntry.queuedAt = Date.now();
  }

  // Short wait loop: Poll every 150ms for up to 1000ms
  const maxWaitMs = 1000;
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitMs) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const matched = getActiveSessionForUser(cleanUserId, validId);
    if (matched) {
      const idx = memoryMatchmakingQueue.findIndex((q) => q.userId === cleanUserId || q.userId === validId);
      if (idx >= 0) memoryMatchmakingQueue.splice(idx, 1);
      console.log(`⚡ [PvP Live Matchmaking]: Player ${effectiveName} retrieved paired session (${matched.id})`);
      return { session: matched, matchedWithAI: false };
    }
  }

  // Still waiting in queue for real opponent (keep in queue for subsequent polls)
  return { session: null, matchedWithAI: false, waiting: true };
}


export function cancelMatchmaking(userId: string): void {
  const validId = ensureUuid(userId);
  const idx = memoryMatchmakingQueue.findIndex((q) => q.userId === validId || q.userId === userId);
  if (idx >= 0) {
    memoryMatchmakingQueue.splice(idx, 1);
    console.log(`🛑 [PvP Matchmaking]: User ${validId} cancelled queue`);
  }
  memoryActiveSessionsByUser.delete(validId);
  memoryActiveSessionsByUser.delete(userId);
}



export function getPvPSession(sessionId: string): PvPSession | null {
  return memoryPvPSessions.get(sessionId) || null;
}

export async function submitPvPRound(submission: PvPRoundSubmission): Promise<{
  session: PvPSession;
  roundResult: {
    round: number;
    user_id: string;
    is_correct: boolean;
    damage_dealt: number;
    score_awarded: number;
    opponent_damage_dealt: number;
    opponent_is_correct: boolean;
    opponent_score_awarded: number;
  };
}> {
  const session = memoryPvPSessions.get(submission.session_id);
  if (!session) {
    throw new Error('PvP Session not found');
  }

  const combatant = session.combatants[submission.user_id];
  if (!combatant) {
    throw new Error('Combatant not found in session');
  }

  const opponentId = Object.keys(session.combatants).find((k) => k !== submission.user_id);
  const opponent = opponentId ? session.combatants[opponentId] : null;

  const currentQ = session.questions[submission.round_index] || session.questions[0];
  const isCorrect = submission.selected_index === currentQ.correct_index;

  // Calculate score and damage based on speed
  // Max score per question = 300, min = 100 for correct answer
  const speedBonus = Math.max(0, 200 - Math.floor(submission.time_taken_ms / 60));
  const scoreAwarded = isCorrect ? 100 + speedBonus : 0;
  const damageDealt = isCorrect ? 180 + Math.floor(speedBonus * 0.4) : 0;

  combatant.score += scoreAwarded;
  if (isCorrect) combatant.correct_count += 1;
  combatant.answers.push({
    round: submission.round_index,
    selected_index: submission.selected_index,
    correct: isCorrect,
    time_ms: submission.time_taken_ms,
  });

  // Apply damage to opponent
  if (opponent && damageDealt > 0) {
    opponent.hp = Math.max(0, opponent.hp - damageDealt);
  }

  // If opponent is an AI bot, simulate their answer
  let oppDamage = 0;
  let oppScore = 0;
  let oppCorrect = false;

  if (opponent && opponent.is_bot) {
    // 78% accuracy for bot
    oppCorrect = Math.random() < 0.78;
    const botTime = Math.floor(Math.random() * 3500) + 2200;
    const botSpeedBonus = Math.max(0, 200 - Math.floor(botTime / 60));
    oppScore = oppCorrect ? 100 + botSpeedBonus : 0;
    oppDamage = oppCorrect ? 180 + Math.floor(botSpeedBonus * 0.4) : 0;

    opponent.score += oppScore;
    if (oppCorrect) opponent.correct_count += 1;
    opponent.answers.push({
      round: submission.round_index,
      selected_index: oppCorrect ? currentQ.correct_index : (currentQ.correct_index + 1) % 4,
      correct: oppCorrect,
      time_ms: botTime,
    });

    if (oppDamage > 0) {
      combatant.hp = Math.max(0, combatant.hp - oppDamage);
    }
  } else if (opponent && !opponent.is_bot) {
    // Check if real human opponent already submitted this round
    const oppAns = opponent.answers.find((a) => a.round === submission.round_index);
    if (oppAns) {
      oppCorrect = oppAns.correct;
      const oppSpeedBonus = Math.max(0, 200 - Math.floor(oppAns.time_ms / 60));
      oppScore = oppCorrect ? 100 + oppSpeedBonus : 0;
      oppDamage = oppCorrect ? 180 + Math.floor(oppSpeedBonus * 0.4) : 0;
    }
  }

  session.current_round = submission.round_index + 1;
  session.updated_at = new Date().toISOString();

  return {
    session,
    roundResult: {
      round: submission.round_index,
      user_id: submission.user_id,
      is_correct: isCorrect,
      damage_dealt: damageDealt,
      score_awarded: scoreAwarded,
      opponent_damage_dealt: oppDamage,
      opponent_is_correct: oppCorrect,
      opponent_score_awarded: oppScore,
    },
  };
}


export async function finishPvPSession(sessionId: string): Promise<{
  session: PvPSession;
  winnerId: string | null;
  isDraw: boolean;
  rewards: { [userId: string]: { coinsDelta: number; xpEarned: number; ratingDelta: number; newRating: number; newCoins: number; newXp: number } };
}> {
  const session = memoryPvPSessions.get(sessionId);
  if (!session) {
    throw new Error('PvP Session not found');
  }

  const combatantIds = Object.keys(session.combatants);
  if (combatantIds.length < 2) {
    throw new Error('Session must have 2 combatants');
  }

  const p1 = session.combatants[combatantIds[0]];
  const p2 = session.combatants[combatantIds[1]];

  let winnerId: string | null = null;
  let isDraw = false;

  // Determine winner: 1. By Knockout (HP == 0), 2. By higher HP, 3. By higher Score
  if (p1.hp > 0 && p2.hp === 0) {
    winnerId = p1.id;
  } else if (p2.hp > 0 && p1.hp === 0) {
    winnerId = p2.id;
  } else if (p1.hp !== p2.hp) {
    winnerId = p1.hp > p2.hp ? p1.id : p2.id;
  } else if (p1.score !== p2.score) {
    winnerId = p1.score > p2.score ? p1.id : p2.id;
  } else {
    isDraw = true;
  }

  session.status = 'completed';
  session.winner_id = winnerId;
  session.is_draw = isDraw;
  session.updated_at = new Date().toISOString();

  const rewards: any = {};
  const stake = session.stake_coins;

  for (const cId of combatantIds) {
    const c = session.combatants[cId];
    if (c.is_bot) continue;

    const isWinner = winnerId === cId;
    const isLoser = winnerId !== null && winnerId !== cId;

    const coinsDelta = isWinner ? stake : isLoser ? -stake : 0;
    const ratingDelta = isWinner ? (Math.floor(Math.random() * 8) + 28) : isLoser ? -(Math.floor(Math.random() * 6) + 16) : 5;
    const xpEarned = isWinner ? 120 : isLoser ? 45 : 75;

    // Update Player Profile
    const profile = await getProfile(cId);
    profile.coins = Math.max(0, (profile.coins || 0) + coinsDelta);
    profile.xp = (profile.xp || 0) + xpEarned;
    profile.level = Math.floor((profile.xp || 0) / 300) + 1;
    await saveProfile(profile);

    // Update PvP Stats
    const stats = await getUserPvPStats(cId);
    if (isWinner) {
      stats.wins += 1;
      stats.current_streak += 1;
      if (stats.current_streak > stats.best_streak) stats.best_streak = stats.current_streak;
      stats.total_coins_won += stake;
    } else if (isLoser) {
      stats.losses += 1;
      stats.current_streak = 0;
    } else {
      stats.draws += 1;
    }
    stats.rating = Math.max(400, stats.rating + ratingDelta);
    stats.favorite_subject = session.subject;
    await saveUserPvPStats(stats);

    rewards[cId] = {
      coinsDelta,
      xpEarned,
      ratingDelta,
      newRating: stats.rating,
      newCoins: profile.coins,
      newXp: profile.xp,
    };
  }

  return {
    session,
    winnerId,
    isDraw,
    rewards,
  };
}

export async function getPvPLeaderboard(): Promise<PvPStats[]> {
  // Merge in-memory stats with any demo/all profiles
  const allProfiles = await getAllProfiles();
  for (const p of allProfiles) {
    const pId = p.id || ensureUuid(p.name);
    if (!memoryPvPStats.has(pId)) {
      const baseRating = 1100 + (p.level || 1) * 65;
      memoryPvPStats.set(pId, {
        user_id: pId,
        name: p.name,
        rating: baseRating,
        tier: calculatePvPTier(baseRating),
        wins: Math.floor((p.xp || 100) / 120),
        losses: Math.floor((p.xp || 100) / 350),
        draws: 1,
        total_matches: Math.floor((p.xp || 100) / 100),
        win_rate: 72.5,
        current_streak: p.streak_days || 3,
        best_streak: (p.streak_days || 3) + 2,
        total_coins_won: (p.coins || 500),
        favorite_subject: p.subjects?.[0] || 'Mathematics',
      });
    }
  }

  const list = Array.from(memoryPvPStats.values());
  list.sort((a, b) => b.rating - a.rating);
  return list.slice(0, 30);
}

export async function getPendingPvPChallenges(userId: string): Promise<{ received: any[]; sent: any[] }> {
  const validId = ensureUuid(userId);
  const received: any[] = [];
  const sent: any[] = [];

  for (const d of memoryDuels.values()) {
    if (d.status === 'pending') {
      if (d.challenged_id === validId) {
        const challenger = await getProfile(d.challenger_id);
        received.push({
          id: d.id,
          challengerId: d.challenger_id,
          challengerName: challenger.name,
          subject: d.subject,
          stakeCoins: d.stake_coins,
          createdAt: d.created_at,
        });
      } else if (d.challenger_id === validId) {
        const challenged = await getProfile(d.challenged_id);
        sent.push({
          id: d.id,
          challengedId: d.challenged_id,
          challengedName: challenged.name,
          subject: d.subject,
          stakeCoins: d.stake_coins,
          createdAt: d.created_at,
        });
      }
    }
  }

  return { received, sent };
}

export async function respondToPvPChallenge(
  challengeId: string,
  accept: boolean,
  questions: MCQuestion[] = []
): Promise<{ success: boolean; session?: PvPSession }> {
  const duel = memoryDuels.get(challengeId);
  if (!duel) {
    return { success: false };
  }

  duel.status = accept ? 'active' : 'declined';

  if (!accept) {
    return { success: true };
  }

  // Create match session between the two human players
  const challenger = await getProfile(duel.challenger_id);
  const challenged = await getProfile(duel.challenged_id);
  const cStats = await getUserPvPStats(duel.challenger_id);
  const tStats = await getUserPvPStats(duel.challenged_id);

  const p1Id = challenger.id || ensureUuid(duel.challenger_id);
  const p2Id = challenged.id || ensureUuid(duel.challenged_id);

  const p1: PvPCombatant = {
    id: p1Id,
    name: challenger.name,
    title: challenger.learning_goal || 'Challenger Scholar',
    avatar_initial: challenger.name ? challenger.name.charAt(0).toUpperCase() : 'C',
    avatar_color: '#60A5FA',
    avatar_index: challenger.avatar_index || 0,
    level: challenger.level || 1,
    rating: cStats.rating,
    tier: cStats.tier,
    is_bot: false,
    hp: 1000,
    score: 0,
    correct_count: 0,
    avg_time_ms: 0,
    answers: [],
  };

  const p2: PvPCombatant = {
    id: p2Id,
    name: challenged.name,
    title: challenged.learning_goal || 'Defender Scholar',
    avatar_initial: challenged.name ? challenged.name.charAt(0).toUpperCase() : 'D',
    avatar_color: '#F2CA50',
    avatar_index: challenged.avatar_index || 0,
    level: challenged.level || 1,
    rating: tStats.rating,
    tier: tStats.tier,
    is_bot: false,
    hp: 1000,
    score: 0,
    correct_count: 0,

    avg_time_ms: 0,
    answers: [],
  };

  const sessionId = crypto.randomUUID();
  const session: PvPSession = {
    id: sessionId,
    subject: duel.subject,
    building_id: duel.building_id || 'arena',
    stake_coins: duel.stake_coins,
    is_ranked: true,
    total_rounds: questions.length || 5,
    current_round: 0,
    status: 'in_progress',
    combatants: {
      [p1.id]: p1,
      [p2.id]: p2,
    },
    questions,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  memoryPvPSessions.set(sessionId, session);
  return { success: true, session };
}

