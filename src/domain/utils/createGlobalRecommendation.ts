import { globalReecommendationList } from "../../data";
import { GlobalRecommendation } from "../entities/global-recommendation-entity";

export const createGlobalRecommendation = async (): Promise<void> => {
  try {
    await GlobalRecommendation.collection.drop();
    const documents = globalReecommendationList.map((recommendation) => new GlobalRecommendation(recommendation));
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      await document.save();
    }
  } catch (error) {
    console.error(error);
  }
};
