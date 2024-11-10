/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre de la categoría.
 *         mark:
 *           type: array
 *           description: Lista de calificaciones.
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Calificacion del consejo(mal, regular, bien o excelente).
 *               min:
 *                 type: number
 *                 description: Valor mínimo.
 *               max:
 *                 type: number
 *                 description: Valor máximo.
 *               tip:
 *                 type: string
 *                 description: Describe el consejo.
 */

import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface ICategoryDto {
  name: string;
  mark: [
    {
      name: string;
      tip: string;
    }
  ];
  score: number;
}

export interface ICategoryCreate {
  name: string;
  mark: [
    {
      name: string;
      min: number;
      max: number;
      tip: string;
    }
  ];
}

const categorySchema = new Schema<ICategoryCreate>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    mark: {
      type: [
        {
          name: {
            type: String,
            trim: true,
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
      ],
    },
  },
  { timestamps: true }
);

export type ICategory = ICategoryCreate & Document;
export const Category = mongoose.model<ICategoryCreate>("Category", categorySchema);
