import { GlobalRecommendation, IGlobalRecommendation } from "../entities/global-recommendation-entity";

const getGlobalRecommendation = async (): Promise<IGlobalRecommendation[]> => {
  return await GlobalRecommendation.find();
};

export const globalRecommendationOdm = {
  getGlobalRecommendation,
};
