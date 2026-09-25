import { db } from './shared.js';
import { user_inventory } from '../../data/model/inventory.js';
import { shop } from '../../data/model/shop.js';
import { eq, and } from 'drizzle-orm';

export async function getUserInventory(userId: string): Promise<any[]> {
    return await db.select({
      id: user_inventory.id,
      item_id: shop.id,
      item_name: shop.slot_type,
      slot_type: shop.slot_type,
      quantity: user_inventory.quantity,
      is_equipped: user_inventory.is_equipped,
      asset_url: shop.asset_url,
      rarity: shop.rarity,
    })
    .from(user_inventory)
    .innerJoin(shop, eq(user_inventory.item_id, shop.id))
    .where(eq(user_inventory.user_id, userId));
}

export async function equipInventoryItem(userId: string, itemId: string): Promise<boolean> {
    const [inventoryItem] = await db.select({
      id: user_inventory.id,
      slot_type: shop.slot_type,
    })
    .from(user_inventory)
    .innerJoin(shop, eq(user_inventory.item_id, shop.id))
    .where(and(eq(user_inventory.user_id, userId), eq(user_inventory.id, itemId)))
    .limit(1);

    if (!inventoryItem) return false;

    if (inventoryItem.slot_type) {
      await db.update(user_inventory)
        .set({ is_equipped: false })
        .where(and(eq(user_inventory.user_id, userId), eq(user_inventory.is_equipped, true)));
    }

    await db.update(user_inventory)
      .set({ is_equipped: true })
      .where(eq(user_inventory.id, inventoryItem.id));

    return true;
}
