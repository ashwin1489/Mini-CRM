import api from "./api";

export async function fetchContacts({ search = "", page = 1, pageSize = 10 }) {
  const { data } = await api.get(`/contacts`, { params: { search, page, pageSize } });
  return data; // expects { items, total, page, pageSize }
}

export async function createContact(payload) {
  const { data } = await api.post("/contacts", payload);
  return data;
}

export async function updateContact(id, payload) {
  const { data } = await api.put(`/contacts/${id}`, payload);
  return data;
}

export async function deleteContact(id) {
  const { data } = await api.delete(`/contacts/${id}`);
  return data;
}

export async function importContacts(csvData) {
  const { data } = await api.post("/contacts/import", { contacts: csvData });
  return data;
}

export async function exportContacts() {
  const { data } = await api.get("/contacts/export");
  return data;
}
