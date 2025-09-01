import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";

export default function LoginPage() {
  const { login: saveAuth } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      saveAuth(data.token, data.user);
      setToast("Login successful!");
      navigate("/contacts");
    } catch (err) {
      setToast(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Button type="submit">Login</Button>
      </form>
      <Toast message={toast} />
    </div>
  );
}
