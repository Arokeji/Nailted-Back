import { Request, Response, NextFunction } from "express";
import { questionOdm } from "../odm/question.odm";

export const getCurrentQuestions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const currentVersionQuestions = await questionOdm.getCurrentVersionQuestions();
    const questionDto = currentVersionQuestions?.map((question: any) => {
      return {
        _id: question?.id,
        questionText: question?.questionText,
        options: question?.options?.map((option: any) => {
          return {
            optionText: option.optionText,
            _id: option.id,
          };
        }),
        selectedNumber: {
          min: question?.selectedNumber?.min,
          max: question?.selectedNumber?.max,
          isInverseScore: question?.selectedNumber?.isInverseScore,
        },
        category: {
          _id: question.category.id,
          name: question.category.name,
        },
        variant: question?.variant,
        version: question?.version,
      };
    });
    res.status(201).json(questionDto);
  } catch (error) {
    next(error);
  }
};

export const questionService = {
  getCurrentQuestions,
};
