/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico de la sesión.
 *         globalScore:
 *           type: number
 *           minimum: 1
 *           maximum: 100
 *           description: Puntuación global de la sesión.
 *         categoryScore:
 *           type: array
 *           description: Puntuación por categoría.
 *           items:
 *             type: object
 *             properties:
 *               category:
 *                 $ref: '#/components/schemas/Category'
 *                 description: Categoría de la puntuación.
 *               score:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 100
 *                 description: Puntuación de la categoría.
 *         version:
 *           type: number
 *           description: Versión de la sesión.
 *           required: true
 */

import mongoose, { Document } from "mongoose";
import { Category, ICategory } from "./category-entity";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export interface ISessionCreate {
  email: string;
  globalScore?: number;
  categoryScore?: [
    {
      category?: ICategory;
      score: number;
    }
  ];
  companyName?: string;
  version: number;
}

const sessionSchema = new Schema<ISessionCreate>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    globalScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    categoryScore: [
      {
        category: {
          type: mongoose.Types.ObjectId,
          ref: Category,
        },
        score: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],
    version: {
      type: Number,
      required: true,
    },
    companyName: {
      type: String,
    },
  },
  { timestamps: true }
);

sessionSchema.pre("save", async function (next) {
  try {
    if (this.isModified("email")) {
      const saltRounds = 10;
      const emailEncrypted = await bcrypt.hash(this.email, saltRounds);
      this.email = emailEncrypted;
      next();
    }
  } catch (error) {
    next();
  }
});

export type ISession = ISessionCreate & Document;
export const Session = mongoose.model<ISessionCreate>("Session", sessionSchema);
