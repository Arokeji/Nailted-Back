/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       required:
 *         - _id
 *         - question
 *         - dateResponded
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la respuesta.
 *         question:
 *           type: string
 *           description: ID de la pregunta relacionada.
 *         text:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               textLong:
 *                 type: string
 *                 description: Texto largo de la respuesta.
 *                 minLength: 5
 *                 maxLength: 200
 *               textShort:
 *                 type: string
 *                 description: Texto corto de la respuesta.
 *                 minLength: 5
 *                 maxLength: 80
 *         dateResponded:
 *           type: string
 *           format: date
 *           description: Fecha de la respuesta.
 *         numeric:
 *           type: number
 *           description: Valor numérico asociado con la respuesta.
 *         optionSelected:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: Puntuación de la opción seleccionada.
 *               optionText:
 *                 type: string
 *                 description: Texto de la opción seleccionada.
 *       example:
 *         _id: 60c84e71ebeb8f001ff60999
 *         question: 60c84e71ebeb8f001ff60998
 *         text: [{ "textLong": "Long Text", "textShort": "Short text" }]
 *         dateResponded: "2023-07-06"
 *         numeric: 10
 *         optionSelected: [{ "score": 5, "optionText": "Option 1" }]
 */

import mongoose, { Document } from "mongoose";
import { Question } from "./question-entity";
import { Session } from "./session-entity";

const Schema = mongoose.Schema;

export interface IResponseCreate {
  question: mongoose.Types.ObjectId;
  session: mongoose.Types.ObjectId;
  text?: {
    textLong: string;
    textShort: string;
  };
  optionSelected?: {
    score: number;
    optionText: string;
  }[];
  dateResponded: Date;
  numeric?: number;
}

const responseSchema = new Schema<IResponseCreate>(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Question,
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Session,
      required: true,
    },
    text: {
      textLong: {
        type: String,
        required: false,
        minLength: [5, "El texto debe tener al menos cinco caracteres"],
        maxLength: [200, "El texto debe tener como máximo 200 caracteres"],
      },
      textShort: {
        type: String,
        required: false,
        minLength: [5, "El texto debe tener al menos cinco caracteres"],
        maxLength: [80, "El texto debe tener como máximo 200 caracteres"],
      },
    },
    optionSelected: [
      {
        _id: { type: String },
        optionText: { type: String },
      },
    ],
    numeric: {
      type: Number,
    },
    dateResponded: {
      type: Date,
    },
  },
  { timestamps: true }
);

export type IResponse = IResponseCreate & Document;
export const Response = mongoose.model<IResponseCreate>("Response", responseSchema);
