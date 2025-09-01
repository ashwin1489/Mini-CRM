import api from "./api";

export async function addNote(payload) {
  const { data } = await api.post("/notes", payload);
  return data;
}

export async function getNotes(contactId) {
  const { data } = await api.get(`/notes/${contactId}`);
  return data;
}
