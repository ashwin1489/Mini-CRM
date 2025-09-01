import api from "./api";

export async function getAnalytics() {
  const { data } = await api.get("/analytics");
  return data;
}

export async function recalcAnalytics() {
  const { data } = await api.post("/analytics/recalc");
  return data;
}
