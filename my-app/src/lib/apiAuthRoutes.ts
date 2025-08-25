import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL;
export const LOGIN_URL = API_URL + "/auth/login";
export const CHAT_GROUP = API_URL + "/all/chat-groups";
export const CHAT_GROUP_SINGLE = API_URL + "/show/chat-group";
export const CHAT_GROUP_CREATE = API_URL + "/create/chat-group";
export const CHAT_GROUP_UPDATE = API_URL + "/update/chat-group";
export const CHAT_GROUP_DELETE = API_URL + "/delete/chat-group";
export const CHAT_GROUP_USERS = API_URL + "/chat-group-users";
export const CHAT_GROUP_ADD_USERS = API_URL + "/chat-group-add-users";
export const CHATS_URL = API_URL + "/chats"; // You need to add this route to backend