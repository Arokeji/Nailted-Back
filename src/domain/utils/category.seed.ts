import { mongoConnect, mongoDisconnect } from "../repositories/mongo-repository";
import { createCategory } from "./createCategory";

const seedCategory = async (): Promise<void> => {
  try {
    console.log("                                              ");
    console.log("----------------------------------------------");
    console.log("---------------- SEED QUESTION ----------------");
    console.log("----------------------------------------------");
    console.log("                                              ");
    await mongoConnect();
    await createCategory();
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

void seedCategory();
