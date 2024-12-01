import { ISessionCreate, Session, ISession } from "../entities/session-entity";
import { Document } from "mongoose";
import bcrypt from "bcrypt";

const createSession = async (sessionData: ISessionCreate): Promise<Document<ISession>> => {
  const session = new Session(sessionData);
  const document: Document<ISession> = (await session.save()) as any;
  const sessionCopy = document.toObject();
  return sessionCopy;
};

const updateSession = async (id: string, sessionData: any): Promise<Document<ISession> | null> => {
  const sessionToUpdate: ISession | null = await Session.findById(id);

  if (!sessionToUpdate) {
    return null;
  }

  sessionToUpdate.email = sessionData.email || sessionToUpdate.email;
  sessionToUpdate.globalScore = sessionData.globalScore >= 0 ? sessionData.globalScore : sessionToUpdate.globalScore;
  sessionToUpdate.categoryScore = sessionData.categoryScore || sessionToUpdate.categoryScore;

  if (sessionData.email && sessionData.email !== sessionToUpdate.email) {
    const saltRounds = 10;
    const emailEncrypted = await bcrypt.hash(sessionData.email, saltRounds);
    sessionToUpdate.email = emailEncrypted;
  }
  await sessionToUpdate.save();

  return sessionToUpdate;
};

const getSessionById = async (id: string): Promise<Document<ISession> | null> => {
  return await Session.findById(id).populate(["categoryScore.category"]);
};

const getSessionResults = async (id: string): Promise<{ globalScore: number | undefined; categoryScore: ISession["categoryScore"] }> => {
  const session = await Session.findById(id).populate(["categoryScore.category"]);
  return {
    globalScore: session?.toObject().globalScore,
    categoryScore: session?.toObject().categoryScore,
  };
};

const getSessionByEmail = async (email: string): Promise<Document<ISession> | null> => {
  const allSessions = await Session.find();
  for (const session of allSessions) {
    const isMatch = await bcrypt.compare(email, session.email);
    if (isMatch) {
      return await session.populate(["categoryScore.category"]);
    }
  }
  return null;
};

export const sessionOdm = {
  createSession,
  updateSession,
  getSessionById,
  getSessionResults,
  getSessionByEmail,
};
