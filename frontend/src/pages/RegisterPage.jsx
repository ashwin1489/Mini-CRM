import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";
import Toast from "../components/Toast";
import Input from "../components/Input";
import Button from "../components/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      setToast("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setToast(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Button type="submit">Register</Button>
      </form>
      <Toast message={toast} />
    </div>
  );
}
