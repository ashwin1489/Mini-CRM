import { useState } from "react";

let listeners = [];
let state = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user") || "null")
};

function setState(newState) {
  state = { ...state, ...newState };
  localStorage.setItem("token", state.token || "");
  localStorage.setItem("user", JSON.stringify(state.user));
  listeners.forEach((l) => l(state));
}

export function useAuthStore() {
  const [s, setS] = useState(state);

  function subscribe(newState) {
    setS(newState);
  }

  if (!listeners.includes(subscribe)) {
    listeners.push(subscribe);
  }

  return {
    ...s,
    login: (token, user) => setState({ token, user }),
    logout: () => setState({ token: null, user: null })
  };
}
