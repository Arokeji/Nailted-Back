import { questionList } from "../../data";
import { Question } from "../entities/question-entity";

export const createQuestion = async (): Promise<void> => {
  try {
    await Question.collection.drop();
    const documents = questionList.map((question) => new Question(question));
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      await document.save();
    }
  } catch (error) {
    console.error(error);
  }
};
