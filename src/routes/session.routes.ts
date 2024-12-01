/**
 * @swagger
 * /session:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Create a new session
 *     description: Creates a session object with the provided version.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSessionRequest'
 *     responses:
 *       201:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: Invalid request, version is required
 *
 * components:
 *   schemas:
 *     CreateSessionRequest:
 *       type: object
 *       required:
 *         - version
 *       properties:
 *         version:
 *           type: integer
 *           example: 1
 *     Session:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6474ebae9b1c30f834df26e7"
 *         email:
 *           type: string
 *           example: "withoutemail@email.com"
 *         version:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-30T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-30T12:34:56.789Z"
 *
 * /session/{id}:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get session by ID
 *     description: Retrieve a session by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "6474ebae9b1c30f834df26e7"
 *     responses:
 *       200:
 *         description: Session retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *
 * /session/email/{email}:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get session by email
 *     description: Retrieve a session using the email of the owner.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session retrieved successfully
 *       404:
 *         description: Session not found
 *
* /session/{id}/results:
 *   put:
 *     tags:
 *       - Sessions
 *     summary: Get session results
 *     description: Retrieve results for a session using its ID, including global score, category scores, and recommendations.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: token
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "example-token"
 *     responses:
 *       200:
 *         description: Results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 globalScore:
 *                   type: number
 *                   example: 85
 *                 categoryScores:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CategoryScore'
 *                 globalTip:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Example Recommendation"
 *                     tip:
 *                       type: string
 *                       example: "Take this tip based on your score."
 *                 owner:
 *                   type: string
 *                   example: "withoutemail@email.com"
 *       404:
 *         description: Session or recommendations not found
 *       400:
 *         description: Invalid request, missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falta id de la session en los params de la url"
 *
* /session/{id}/send-email:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Send session results by email
 *     description: Sends the results of a session to the specified email.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session to send results for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - dataResults
 *               - companyName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               dataResults:
 *                 type: object
 *                 description: The results data to be included in the email
 *                 properties:
 *                   globalScore:
 *                     type: number
 *                     example: 85
 *                   categoryScores:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         category:
 *                           type: string
 *                           example: "Math"
 *                         score:
 *                           type: number
 *                           example: 90
 *               companyName:
 *                 type: string
 *                 example: "Company XYZ"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 owner:
 *                   type: string
 *                   example: "user@example.com"
 *                 message:
 *                   type: string
 *                   example: "Correo electrónico enviado correctamente"
 *       404:
 *         description: Session not found
 *       400:
 *         description: Invalid request, missing required parameters
 *       500:
 *         description: Error sending email
 */

import express from "express";
import { sessionService } from "../domain/services/session.service";

export const sessionRouter = express.Router();

sessionRouter.post("/", sessionService.createSession);
sessionRouter.get("/email/:email", sessionService.getSessionByEmail);
sessionRouter.put("/:id/results", sessionService.updateSessionResults);
sessionRouter.get("/:id", sessionService.getSessionById);
sessionRouter.put("/:id/send-results", sessionService.sendMail);
sessionRouter.put("/:id", sessionService.updateSession);
