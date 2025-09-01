import api from "./api";

export async function fetchDeals({ stage = "", page = 1, pageSize = 10 }) {
  const { data } = await api.get(`/deals`, { params: { stage, page, pageSize } });
  return data;
}

export async function createDeal(payload) {
  const { data } = await api.post("/deals", payload);
  return data;
}

export async function updateDeal(id, payload) {
  const { data } = await api.put(`/deals/${id}`, payload);
  return data;
}

export async function deleteDeal(id) {
  const { data } = await api.delete(`/deals/${id}`);
  return data;
}
