import { SET_TEACHERS_LIST, CLEAR_TEACHERS_LIST } from "./types";

export const setTeachersList = (payload) => ({
  type: SET_TEACHERS_LIST,
  payload: payload,
});
export const clearTeachersList = () => ({
  type: CLEAR_TEACHERS_LIST,
});
