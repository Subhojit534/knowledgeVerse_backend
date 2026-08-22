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

// Seed initial default profiles
const demo1Uuid = ensureUuid('demo-user-123');
const demo2Uuid = ensureUuid('demo-user-456');
const demo3Uuid = ensureUuid('demo-user-789');

const demoProfile1: PlayerProfileData = {
  id: demo1Uuid,
  name: 'Archmage Student',
  password: 'password123',
  grade: 'Class 10',
  curriculum: 'CBSE',
  subjects: ['Computer Science', 'Mathematics', 'Physics', 'History'],
  difficulty: 'Balanced',
  world_theme: 'Green Highlands',
  learning_goal: 'Master all academic domains',
  avatar_index: 0,
  xp: 1450,
  level: 4,
  coins: 1240,
  gems: 24,
  energy: 100,
  streak_days: 42,
  last_active: new Date().toISOString(),
};

const demoProfile2: PlayerProfileData = {
  id: demo2Uuid,
  name: 'Elena Vance',
  password: 'password123',
  grade: 'Class 12',
  curriculum: 'ICSE',
  subjects: ['Mathematics', 'Physics'],
  difficulty: 'Challenging',
  world_theme: 'Mystic Spire',
  learning_goal: 'Quantum Physics & Geometry',
  avatar_index: 1,
  xp: 42150,
  level: 22,
  coins: 4800,
  gems: 120,
  energy: 100,
  streak_days: 38,
  last_active: new Date().toISOString(),
};

const demoProfile3: PlayerProfileData = {
  id: demo3Uuid,
  name: 'Victoria Prime',
  password: 'password123',
  grade: 'Class 11',
  curriculum: 'CBSE',
  subjects: ['Mathematics', 'Computer Science'],
  difficulty: 'Challenging',
  world_theme: 'Arcane Citadel',
  learning_goal: 'Grand Archon Mastery',
  avatar_index: 2,
  xp: 48920,
  level: 25,
  coins: 8900,
  gems: 250,
  energy: 100,
  streak_days: 45,
  last_active: new Date().toISOString(),
};

memoryProfiles.set(demo1Uuid, demoProfile1);
memoryProfiles.set(demo2Uuid, demoProfile2);
memoryProfiles.set(demo3Uuid, demoProfile3);

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
  leader_id: demo2Uuid,
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
    sender_id: demo2Uuid,
    sender_name: 'Elena Vance',
    role: 'Leader',
    text: 'Welcome all new scholars to the Order of Arcanists! Prepare for the weekly quiz raid.',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    guild_id: g1Uuid,
    sender_id: demo3Uuid,
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
  for (const p of Array.from(memoryProfiles.values()).reverse()) {
    if (p.id !== demo1Uuid && p.id !== demo2Uuid && p.id !== demo3Uuid) {
      return p;
    }
  }

  return memoryProfiles.get(demo1Uuid) || demoProfile1;
}

export async function getAllProfiles(): Promise<PlayerProfileData[]> {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .order('xp', { ascending: false });

      if (!error && data && data.length > 0) {
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

export async function updateProgressAndStats(
  userId: string = 'demo-user-123',
  buildingId: string,
  subject: string,
  correctCount: number,
  totalQuestions: number
): Promise<{ xpEarned: number; coinsEarned: number; newProfile: PlayerProfileData }> {
  const validId = ensureUuid(userId);
  const currentProfile = await getProfile(validId);

  const xpEarned = correctCount * 25 + 10;
  const coinsEarned = correctCount * 15;

  const newXp = (currentProfile.xp || 0) + xpEarned;
  const newLevel = Math.floor(newXp / 100) + 1;
  const newCoins = (currentProfile.coins || 0) + coinsEarned;

  const updatedProfile: PlayerProfileData = {
    ...currentProfile,
    id: validId,
    xp: newXp,
    level: newLevel,
    coins: newCoins,
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
