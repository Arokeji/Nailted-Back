/**
 * @swagger
 * /quizz/current-version:
 *   get:
 *     tags:
 *       - Quizz
 *     summary: Obtener preguntas actuales.
 *     description: Obtiene las preguntas actuales del cuestionario.
 *     responses:
 *       201:
 *         description: Preguntas actuales obtenidas correctamente.
 *       500:
 *         description: Error al obtener las preguntas actuales.
 */

import express from "express";
import { questionService } from "../domain/services/question.service";

export const quizzRouter = express.Router();

quizzRouter.get("/current-version", questionService.getCurrentQuestions);
