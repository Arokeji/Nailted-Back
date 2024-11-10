// /**
//  * @swagger
//  * /session:
//  *   post:
//  *     tags:
//  *       - Sessions
//  *     description: Creates a new session
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: session
//  *         description: Session object
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/Session'
//  *     responses:
//  *       201:
//  *         description: Successfully created
//  *
//  * /session/{id}:
//  *   put:
//  *     tags:
//  *       - Sessions
//  *     description: Update an existing session
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: id
//  *         description: Session ID
//  *         in: path
//  *         required: true
//  *         type: string
//  *       - name: session
//  *         description: Session object that needs to be updated
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/Session'
//  *     responses:
//  *       200:
//  *         description: Successfully updated
//  *       404:
//  *         description: No session found to update
//  *
//  * /session/email/{email}:
//  *   get:
//  *     tags:
//  *       - Sessions
//  *     description: Get session by email
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: email
//  *         description: Email of the session
//  *         in: path
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved
//  *       404:
//  *         description: No session found with the provided email
//  * /session/{id}/results/{token}:
//  *   get:
//  *     tags:
//  *       - Sessions
//  *     description: Get session results
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: id
//  *         description: Session ID
//  *         in: path
//  *         required: true
//  *         type: string
//  *       - name: token
//  *         description: Token for accessing results
//  *         in: path
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved
//  *       403:
//  *         description: Unauthorized access to results
//  *       404:
//  *         description: No session found with the provided ID
//  *
//  * /session/{id}:
//  *   get:
//  *     tags:
//  *       - Sessions
//  *     description: Get session by ID
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: id
//  *
//  * /session/send-results:
//  *   post:
//  *     tags:
//  *       - Sessions
//  *     description: Send session results via email
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: session
//  *         description: Session object
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/Session'
//  *     responses:
//  *       200:
//  *         description: Successfully sent
//  */

import express from "express";
import { sessionService } from "../domain/services/session.service";

export const sessionRouter = express.Router();

sessionRouter.post("/", sessionService.createSession);
sessionRouter.get("/email/:email", sessionService.getSessionByEmail);
sessionRouter.put("/:id/results", sessionService.getSessionResults);
sessionRouter.get("/:id", sessionService.getSessionById);
sessionRouter.put("/:id/send-results", sessionService.sendMail);
sessionRouter.put("/:id", sessionService.updateSession);
