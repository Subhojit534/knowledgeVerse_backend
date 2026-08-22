import { Router } from 'express';
import { getUserInventory, equipInventoryItem, getProfile, saveProfile } from '../db/supabase.js';
export const inventoryRouter = Router();
// Get Player Inventory & Equipped Items
inventoryRouter.get('/', async (req, res) => {
    try {
        const userId = req.query.userId || 'demo-user-123';
        const inventory = await getUserInventory(userId);
        const equipped = {
            weapon: inventory.find((i) => i.slot_type === 'weapon' && i.is_equipped) || null,
            armor: inventory.find((i) => i.slot_type === 'armor' && i.is_equipped) || null,
            accessory: inventory.find((i) => i.slot_type === 'accessory' && i.is_equipped) || null,
            relic: inventory.find((i) => i.slot_type === 'relic' && i.is_equipped) || null,
        };
        res.json({
            success: true,
            inventory,
            equipped,
            total_slots: 24,
            used_slots: inventory.length,
        });
    }
    catch (err) {
        console.error('❌ [Inventory Route Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch player inventory' });
    }
});
// Equip Item
inventoryRouter.post('/equip', async (req, res) => {
    try {
        const { userId, itemId } = req.body || {};
        const uId = userId || 'demo-user-123';
        if (!itemId) {
            return res.status(400).json({ success: false, error: 'itemId is required to equip' });
        }
        const success = await equipInventoryItem(uId, itemId);
        if (!success) {
            return res.status(404).json({ success: false, error: 'Item not found in inventory' });
        }
        const updatedInventory = await getUserInventory(uId);
        res.json({
            success: true,
            message: 'Item equipped successfully',
            inventory: updatedInventory,
        });
    }
    catch (err) {
        console.error('❌ [Equip Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to equip item' });
    }
});
// Consume / Use Potion or Consumable Item
inventoryRouter.post('/use', async (req, res) => {
    try {
        const { userId, itemId } = req.body || {};
        const uId = userId || 'demo-user-123';
        const inventory = await getUserInventory(uId);
        const item = inventory.find((i) => i.id === itemId || i.item_id === itemId);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found in backpack' });
        }
        const profile = await getProfile(uId);
        let message = `Used ${item.item_name}!`;
        // Apply consumable effect
        if (item.item_id.includes('potion') || item.slot_type === 'consumable') {
            profile.energy = Math.min(100, (profile.energy || 50) + 50);
            message = `Consumed ${item.item_name}! Restored 50 Energy.`;
        }
        // Decrement quantity or remove
        item.quantity = (item.quantity || 1) - 1;
        await saveProfile(profile);
        res.json({
            success: true,
            message,
            energy: profile.energy,
            profile,
        });
    }
    catch (err) {
        console.error('❌ [Use Item Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to use item' });
    }
});
