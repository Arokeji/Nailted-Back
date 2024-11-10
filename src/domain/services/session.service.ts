/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Request, Response, NextFunction } from "express";
import { sessionOdm } from "../odm/session-odm";
import { responseOdm } from "../odm/response.odm";
import { sendResultsMail } from "../../utils/sendEmail";
import { IQuestion } from "../entities/question-entity";
import { IResponse } from "../entities/response-entity";
import { ICategory } from "../entities/category-entity";
import { globalRecommendationOdm } from "../odm/global-recommendation.odm";

export const createSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.body.version) {
      res.status(400).json({ error: "Se necesita la version de las preguntas." });
      return;
    }
    const createdSession = await sessionOdm.createSession({ email: "withoutemail@email.com", version: parseInt(req.body.version) });
    res.status(201).json(createdSession);
  } catch (error) {
    next(error);
  }
};

export const getSessionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.body.id;
    const response = await sessionOdm.getSessionById(id);
    if (!response) {
      res.status(404).json({ error: "No existe el session solicitado" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const calculateTotalScore = (questions: IQuestion[]): number => {
  let sum: number = 0;
  questions.forEach((question: IQuestion) => {
    let singleValue: number = 0;
    let multiValue: number = 0;
    let numericValue: number = 0;
    if (question.variant === "SINGLE_OPTION") {
      singleValue = question.options
        ? question.options
            .map((option) => {
              return option.score;
            })
            .reduce((a, b) => (a > b ? a : b))
        : 0;
    }
    if (question.variant === "MULTI_OPTION") {
      const initialValue = 0;
      multiValue = question.options
        ? question.options
            .map((option) => {
              return option.score;
            })
            .reduce((a, b) => a + b, initialValue)
        : 0;
    }
    if (question.variant === "NUMERIC" && question.selectedNumber) {
      numericValue = question.selectedNumber.max * question.selectedNumber.multiplier;
    }
    sum += singleValue + multiValue + numericValue;
  });
  return sum;
};

const scoreEarned = (responses: IResponse[]): number => {
  let score: number = 0;
  responses.forEach((response: IResponse) => {
    if ((response.question as unknown as IQuestion).variant === "SINGLE_OPTION") {
      const option = (response.question as unknown as IQuestion).options?.find((option: any) => option.id === (response.optionSelected?.[0] as unknown as IResponse).id);
      score += option?.score ? option?.score : 0;
    } else if ((response.question as unknown as IQuestion).variant === "MULTI_OPTION") {
      score +=
        response.optionSelected?.reduce((sum, selectedOption) => {
          const option = (response.question as unknown as IQuestion).options?.find((option: any) => option.id === (selectedOption as unknown as IResponse).id);
          return sum + (option?.score ? option?.score : 0);
        }, 0) ?? 0;
    } else if ((response.question as unknown as IQuestion).variant === "NUMERIC") {
      score += response.numeric ? response.numeric : 0;
    }
  });
  return score;
};

const calculateMaxScoreByCategory = (questions: IQuestion[]): { name: string; maxScore: number }[] => {
  const categoryScores: { name: string; maxScore: number }[] = [];

  questions.forEach((question: IQuestion) => {
    let currentScore: number = 0;

    if (question.variant === "SINGLE_OPTION") {
      const singleValue = question.options ? question.options.map((option) => option.score).reduce((a, b) => (a > b ? a : b)) : 0;
      currentScore = singleValue;
    } else if (question.variant === "MULTI_OPTION") {
      const multiValue = question.options ? question.options.map((option) => option.score).reduce((a, b) => a + b, 0) : 0;
      currentScore = multiValue;
    } else if (question.variant === "NUMERIC" && question.selectedNumber) {
      const numericValue = question.selectedNumber.max * question.selectedNumber.multiplier;
      currentScore = numericValue;
    }

    const categoryScoreIndex = categoryScores.findIndex((categoryScore) => categoryScore.name === question.category.name);

    if (categoryScoreIndex !== -1) {
      categoryScores[categoryScoreIndex].maxScore += currentScore;
    } else {
      categoryScores.push({ name: question.category.name, maxScore: currentScore });
    }
  });
  return categoryScores;
};

const getResultsByCategory = (responses: IResponse[], maxCategoryScore: { name: string; maxScore: number }[]): { category: ICategory; score: number }[] => {
  const categorySet = new Set<ICategory>();
  for (const response of responses) {
    const category = (response.question as unknown as IQuestion).category;
    if (!categorySet.has(category)) {
      categorySet.add(category);
    }
  }
  const allCategories = [...categorySet].map((category) => category);
  const scoreCategory: any[] = [];
  responses.forEach((response) => {
    allCategories.forEach((category) => {
      if ((response.question as unknown as IQuestion).category.id === category.id) {
        if ((response.question as unknown as IQuestion).variant === "SINGLE_OPTION") {
          scoreCategory.push({
            category,
            score: (response.question as unknown as IQuestion).options?.find((option: any) => option.id === (response.optionSelected?.[0] as unknown as IResponse).id)?.score,
          });
        } else if ((response.question as unknown as IQuestion).variant === "MULTI_OPTION") {
          const points =
            response.optionSelected?.reduce((sum, selectedOption) => {
              const option = (response.question as unknown as IQuestion).options?.find((option: any) => option.id === (selectedOption as unknown as IResponse).id);
              return sum + (option?.score ? option?.score : 0);
            }, 0) ?? 0;
          scoreCategory.push({
            category,
            score: points,
          });
        } else if ((response.question as unknown as IQuestion).variant === "NUMERIC") {
          scoreCategory.push({
            category,
            score: response.numeric ? response.numeric : 0,
          });
        }
      }
    });
  });

  const results: { category: ICategory; score: number }[] = [];

  scoreCategory.forEach((item: { category: ICategory; score: number }) => {
    const existingItem = results.find((resultsItem) => resultsItem.category.name === item.category.name);

    if (existingItem) {
      existingItem.score += item.score;
    } else {
      results.push({ category: item.category, score: item.score });
    }
  });

  const resultsToSend = results.map((result: { category: ICategory; score: number }, i) => {
    return {
      category: result.category,
      score: result.category.name === maxCategoryScore[i].name ? (result.score * 100) / maxCategoryScore[i].maxScore : 0,
    };
  });
  return resultsToSend;
};

export const calculateResults = async (totalQuestions: IQuestion[], totalResponses: IResponse[], session: any): Promise<void> => {
  const globalScore = (scoreEarned(totalResponses) * 100) / calculateTotalScore(totalQuestions);
  const categoryScore = getResultsByCategory(totalResponses, calculateMaxScoreByCategory(totalQuestions));

  const data = {
    ...session._doc,
    globalScore,
    categoryScore,
  };

  await sessionOdm.updateSession(session.id, data);
};

export const getSessionResults = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Falta id de la session en los params de la url" });
      return;
    }
    const token = req.body.token;
    if (token) {
      const globalRecommendations = await globalRecommendationOdm.getGlobalRecommendation();
      if (!globalRecommendations) {
        res.status(404).json({ error: "No existen las recomendaciones solicitadas" });
        return;
      }
      const results = await sessionOdm.getSessionResults(id);
      if (!results) {
        res.status(404).json({ error: "No existe la session solicitado" });
        return;
      }

      let globalTip: { name: string; tip: string } = { name: "", tip: "" };
      globalRecommendations.forEach((recommendation) => {
        if ((results.globalScore as number) >= recommendation.min && (results.globalScore as number) <= recommendation.max) {
          globalTip = { name: recommendation.name, tip: recommendation.tip };
        }
      });
      const session = await sessionOdm.getSessionById(id);
      if (!session) {
        res.status(404).json({ error: "Session not found" });
      }
      const resultsToSend = {
        ...results,
        globalTip,
        owner: session?.toObject().email,
      };

      res.status(200).json(resultsToSend);
    }
  } catch (error) {
    next(error);
  }
};

export const getSessionByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.params.email;
    const response = await sessionOdm.getSessionByEmail(email);
    if (!response) {
      res.status(404).json({ error: "No existe la respuesta" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updateSessionId = req.params.id;

    const sessionToUpdate = await sessionOdm.getSessionById(updateSessionId);
    if (!sessionToUpdate) {
      res.status(404).json({ error: "No existe la respuesta para actualizar" });
      return;
    }
    const response = req.body.response;
    if (!response) {
      res.status(400).json({ error: "No ha pasado la respuesta para actualizar" });
      return;
    }
    const responseToAdd = await responseOdm.createResponse(response);
    sessionToUpdate.toObject().response?.push(responseToAdd.id);
    const sessionUpdated = await sessionOdm.updateSession(updateSessionId, sessionToUpdate);
    res.json(sessionUpdated);
  } catch (error) {
    next(error);
  }
};

export const sendMail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sessionId = req.params.id;
    const session: any = await sessionOdm.getSessionById(sessionId);
    if (!session) {
      res.status(404).json({ error: "No existe la session" });
      return;
    }
    const { email, dataResults, companyName } = req.body;
    const dataResultsToSend = {
      ...dataResults,
      sessionId: session.id,
      owner: session.email,
    };
    const data: any = { ...session._doc, email, companyName };
    await sessionOdm.updateSession(session.id, data);
    await sendResultsMail(email, dataResultsToSend, companyName);
    res.status(200).json({ owner: dataResultsToSend.owner, message: "Correo electrónico enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el correo electrónico" });
  }
};

export const sessionService = {
  createSession,
  getSessionById,
  updateSession,
  getSessionByEmail,
  getSessionResults,
  sendMail,
  calculateResults,
};
