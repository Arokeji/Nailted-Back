import { mongoConnect, mongoDisconnect } from "../repositories/mongo-repository";
import { createQuestion } from "./createQuestion";

const seedQuestion = async (): Promise<void> => {
  try {
    console.log("                                              ");
    console.log("----------------------------------------------");
    console.log("---------------- SEED QUESTION ----------------");
    console.log("----------------------------------------------");
    console.log("                                              ");
    await mongoConnect();
    await createQuestion();
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

void seedQuestion();
