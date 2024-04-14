import { atom } from "jotai";

export const responseAtom = atom("");
export const responseStreaming = atom(false);
export const userQuestion = atom("");
export const clientChatItemData = atom([]);
export const streamLoading = atom(false);
export const isRedirectingNewChat = atom(false);
