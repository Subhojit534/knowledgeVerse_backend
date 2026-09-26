import { Router, Request, Response } from 'express';
import { getShopCatalog, purchaseShopItem, getProfile } from '../db/operations.js';

export const shopRouter = Router();

// Get Shop Catalog Items
/**
 * @swagger
 * /api/shop/items:
 *   get:
 *     summary: Get shop catalog items
 *     tags: [Shop]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Category of items to retrieve
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
 *                 category:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
shopRouter.get('/items', async (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string) || 'ALL';
    const items = getShopCatalog(category);

    res.json({
      success: true,
      category,
      items,
    });
  } catch (err) {
    console.error('❌ [Shop Catalog Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve shop catalog' });
  }
});

// Purchase Shop Item
/**
 * @swagger
 * /api/shop/purchase:
 *   post:
 *     summary: Purchase a shop item
 *     tags: [Shop]
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
 *               shopItemId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully purchased item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 purchasedItem:
 *                   type: object
 *                 newCoins:
 *                   type: number
 *                 newGems:
 *                   type: number
 *                 profile:
 *                   type: object
 *       400:
 *         description: Bad request or purchase failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
shopRouter.post('/purchase', async (req: Request, res: Response) => {
  try {
    const { userId, itemId, shopItemId } = req.body || {};
    const uId = userId || 'demo-user-123';
    const targetItemId = shopItemId || itemId;

    if (!targetItemId) {
      return res.status(400).json({ success: false, error: 'Item ID is required for purchase.' });
    }

    const result = await purchaseShopItem(uId, targetItemId);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error || 'Failed to purchase item',
      });
    }

    res.json({
      success: true,
      message: `Successfully purchased item!`,
      purchasedItem: result.purchasedItem,
      newCoins: result.updatedProfile?.coins,
      newGems: result.updatedProfile?.gems,
      profile: result.updatedProfile,
    });
  } catch (err) {
    console.error('❌ [Purchase Error]:', err);
    res.status(500).json({ success: false, error: 'Failed to complete purchase' });
  }
});
