import { IResponseCreate, Response, IResponse } from "../entities/response-entity";
import { Document } from "mongoose";

const createResponse = async (responseData: IResponseCreate): Promise<Document<IResponse>> => {
  const response = new Response(responseData);
  const document: Document<IResponse> = (await response.save()) as any;
  const responseCopy = document.toObject();
  return responseCopy;
};

const updateResponse = async (id: string, responseData: IResponseCreate): Promise<Document<IResponse> | null> => {
  return await Response.findByIdAndUpdate(id, responseData, { new: true, runValidators: true });
};

const getResponseById = async (id: string): Promise<Document<IResponse> | null> => {
  return await Response.findById(id);
};

const getResponsesBySession = async (idSession: string): Promise<IResponse[]> => {
  return await Response.find({ session: idSession }).populate([
    "question",
    {
      path: "question",
      populate: { path: "category" },
    },
  ]);
};

export const responseOdm = {
  createResponse,
  updateResponse,
  getResponseById,
  getResponsesBySession,
};
