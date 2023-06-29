import express from "express";
import { post, get, getById } from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", post);


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", get);
router.get("/:id", getById);

export default router;
