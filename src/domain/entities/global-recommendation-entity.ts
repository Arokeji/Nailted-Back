/**
 * @swagger
 * components:
 *   schemas:
 *     GlobalRecommendation:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la recomendación global.
 *         min:
 *           type: number
 *           description: Valor mínimo de la recomendación global.
 *         max:
 *           type: number
 *           description: Valor máximo de la recomendación global.
 *         tip:
 *           type: string
 *           description: Consejo relacionado con la recomendación global.
 *       required:
 *         - name
 *         - min
 *         - max
 *         - tip
 */

import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IGlobalRecommendationCreate {
  name: string;
  min: number;
  max: number;
  tip: string;
}

const globalRecommendationSchema = new Schema<IGlobalRecommendationCreate>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    tip: {
      type: String,
      trim: true,
      required: true,
    },

  },
  { timestamps: true }
);

export type IGlobalRecommendation = IGlobalRecommendationCreate & Document;
export const GlobalRecommendation = mongoose.model<IGlobalRecommendationCreate>("GlobalRecommendation", globalRecommendationSchema);
