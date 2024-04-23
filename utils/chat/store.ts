import { atom } from "jotai";

export type ChatHistoryPrompt = {
  role: string;
  content: string;
};

export const responseAtom = atom("");
export const responseStreaming = atom(false);
export const userQuestion = atom("");
export const clientChatItemData = atom([]);
export const streamLoading = atom(false);
export const isRedirectingNewChat = atom(false);
export const chatHistoryPrompt = atom<ChatHistoryPrompt[]>([]);
