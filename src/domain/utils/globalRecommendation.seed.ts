import { mongoConnect, mongoDisconnect } from "../repositories/mongo-repository";
import { createGlobalRecommendation } from "./createGlobalRecommendation";

const seedGlobalRecommendation = async (): Promise<void> => {
  try {
    console.log("                                              ");
    console.log("----------------------------------------------");
    console.log("------------ DELETE RECOMENDATION ------------");
    console.log("----------------------------------------------");
    console.log("                                              ");
    await mongoConnect();
    await createGlobalRecommendation();
  } catch (error) {
    console.error(error);
  } finally {
    await mongoDisconnect();
    console.log("                                              ");
    console.log("----------------------------------------------");
    console.log("-------------- PROCESO TERMINADO -------------");
    console.log("----------------------------------------------");
    console.log("                                              ");
  }
};

void seedGlobalRecommendation();
