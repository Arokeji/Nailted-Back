/**
 * @swagger
 * components:
 *   schemas:
 *     VARIANT:
 *       type: string
 *       enum:
 *         - SINGLE_OPTION
 *         - MULTI_OPTION
 *         - NUMERIC
 *         - TEXT_SHORT
 *         - TEXT_LONG
 *     IQuestionCreate:
 *       type: object
 *       properties:
 *         questionText:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Option"
 *         selectedNumber:
 *           $ref: "#/components/schemas/SelectedNumber"
 *         category:
 *           $ref: "#/components/schemas/ICategory"
 *         variant:
 *           $ref: "#/components/schemas/VARIANT"
 *         version:
 *           type: number
 *       required:
 *         - questionText
 *         - options
 *         - selectedNumber
 *         - category
 *         - variant
 *         - version
 *     Option:
 *       type: object
 *       properties:
 *         optionText:
 *           type: string
 *         score:
 *           type: number
 *       required:
 *         - optionText
 *         - score
 *     SelectedNumber:
 *       type: object
 *       properties:
 *         min:
 *           type: number
 *         max:
 *           type: number
 *         multiplier:
 *           type: number
 *         isInverseScore:
 *           type: boolean
 *       required:
 *         - min
 *         - max
 *         - multiplier
 *         - isInverseScore
 *     ICategory:
 *       type: object
 *       properties:
 *         // Properties of the ICategory object
 *         // ...
 *     IQuestion:
 *       allOf:
 *         - $ref: "#/components/schemas/IQuestionCreate"
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 */

import mongoose, { Document } from "mongoose";
import { ICategory } from "./category-entity";

const Schema = mongoose.Schema;

export enum VARIANT {
  SINGLE_OPTION = "SINGLE_OPTION",
  MULTI_OPTION = "MULTI_OPTION",
  NUMERIC = "NUMERIC",
  TEXT_SHORT = "TEXT_SHORT",
  TEXT_LONG = "TEXT_LONG",
}

export interface IQuestionCreate {
  questionText: string;
  options?: {
    optionText: string;
    score: number;
  }[];
  selectedNumber?: {
    min: number;
    max: number;
    multiplier: number;
    isInverseScore: boolean;
  };
  category: ICategory;
  variant: VARIANT;
  version: number;
}

const questionSchema = new Schema<IQuestionCreate>(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: [
      {
        optionText: {
          type: String,
        },
        score: {
          type: Number,
        },
      },
    ],
    selectedNumber: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      multiplier: {
        type: Number,
      },
      isInverseScore: {
        type: Boolean,
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    variant: {
      type: String,
      enum: VARIANT,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export type IQuestion = IQuestionCreate & Document;
export const Question = mongoose.model<IQuestionCreate>("Question", questionSchema);
