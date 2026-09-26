import { Router, Request, Response } from 'express';
import { getClassesByBoard, getAllClasses } from '../db/operations/class.js';

export const classesRouter = Router();

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Fetch classes based on board
 *     tags: [Classes]
 *     parameters:
 *       - in: query
 *         name: board
 *         schema:
 *           type: string
 *         required: false
 *         description: The board to filter classes by (e.g., CBSE, ICSE)
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 classes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "c0000005-0001-0000-0000-000000000000"
 *                       name:
 *                         type: string
 *                         example: "Class 10"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "Standard 10th Class"
 *                       board:
 *                         type: string
 *                         example: "CBSE"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch classes"
 */
classesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { board } = req.query;
    let classes;
    
    if (board && typeof board === 'string') {
      classes = await getClassesByBoard(board.toUpperCase());
    } else {
      classes = await getAllClasses();
    }
    
    res.json({
      success: true,
      classes,
    });
  } catch (err: any) {
    console.error('❌ [Fetch Classes Error]:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch classes',
    });
  }
});
