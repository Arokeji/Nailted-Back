import { categoryList } from "../../data";
import { Category } from "../entities/category-entity";

export const createCategory = async (): Promise<void> => {
  try {
    await Category.collection.drop();
    const documents = categoryList.map((category) => new Category(category));
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      await document.save();
    }
  } catch (error) {
    console.error(error);
  }
};
