import { db } from './shared.js';
import { shop } from '../../data/model/shop.js';
import { user } from '../../data/model/user.js';
import { eq } from 'drizzle-orm';

export async function getShopCatalog(category?: string): Promise<any[]> {
    let query = db.select().from(shop);
    if (category && category !== 'ALL') {
      query = query.where(eq(shop.category, category)) as any;
    }
    return await query;
}

export async function purchaseShopItem(userId: string, itemId: string): Promise<any> {
    const [targetItem] = await db.select().from(shop).where(eq(shop.id, itemId)).limit(1);
    if (!targetItem) throw new Error('Item not found');

    const [buyer] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
    if (!buyer) throw new Error('User not found');

    if (targetItem.currency_type === 'COINS' && buyer.coins < targetItem.price) {
      throw new Error('Not enough coins');
    }
    if (targetItem.currency_type === 'GEMS' && buyer.gems < targetItem.price) {
      throw new Error('Not enough gems');
    }

    const updatedUser = { ...buyer };
    if (targetItem.currency_type === 'COINS') updatedUser.coins -= targetItem.price;
    if (targetItem.currency_type === 'GEMS') updatedUser.gems -= targetItem.price;

    const [updatedProfile] = await db.update(user)
      .set({ coins: updatedUser.coins, gems: updatedUser.gems })
      .where(eq(user.id, buyer.id))
      .returning();

    return { item: targetItem, profile: updatedProfile };
}
