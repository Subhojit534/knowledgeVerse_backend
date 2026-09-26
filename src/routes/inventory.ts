import { Router, Request, Response } from 'express';
import { getUserInventory, equipInventoryItem, getProfile, saveProfile } from '../db/operations.js';

export const inventoryRouter = Router();

// Get Player Inventory & Equipped Items
/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Endpoint for inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 inventory:
 *                   type: array
 *                   items:
 *                     type: object
 *                 equipped:
 *                   type: object
 *                 total_slots:
 *                   type: integer
 *                 used_slots:
 *                   type: integer
 *       500:
 *         description: Failed to fetch player inventory
 */
inventoryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'demo-user-123';
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
  } catch (err) {
    console.error('❌ [Inventory Route Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch player inventory' });
  }
});

// Equip Item
/**
 * @swagger
 * /api/inventory/equip:
 *   post:
 *     summary: Endpoint for inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               itemId:
 *                 type: string
 *             required:
 *               - itemId
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 inventory:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: itemId is required to equip
 *       404:
 *         description: Item not found in inventory
 *       500:
 *         description: Failed to equip item
 */
inventoryRouter.post('/equip', async (req: Request, res: Response) => {
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
  } catch (err) {
    console.error('❌ [Equip Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to equip item' });
  }
});

// Consume / Use Potion or Consumable Item
/**
 * @swagger
 * /api/inventory/use:
 *   post:
 *     summary: Endpoint for inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               itemId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 energy:
 *                   type: number
 *                 profile:
 *                   type: object
 *       404:
 *         description: Item not found in backpack
 *       500:
 *         description: Failed to use item
 */
inventoryRouter.post('/use', async (req: Request, res: Response) => {
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
  } catch (err) {
    console.error('❌ [Use Item Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to use item' });
  }
});
