import { Router } from 'express';
import { getShopCatalog, purchaseShopItem } from '../db/supabase.js';
export const shopRouter = Router();
// Get Shop Catalog Items
shopRouter.get('/items', async (req, res) => {
    try {
        const category = req.query.category || 'ALL';
        const items = getShopCatalog(category);
        res.json({
            success: true,
            category,
            items,
        });
    }
    catch (err) {
        console.error('❌ [Shop Catalog Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to retrieve shop catalog' });
    }
});
// Purchase Shop Item
shopRouter.post('/purchase', async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ [Purchase Error]:', err);
        res.status(500).json({ success: false, error: 'Failed to complete purchase' });
    }
});
