import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import * as authService from "../services/auth";
import { useAuthStore } from "../store/authStore";

vi.mock("../services/auth");
vi.mock("../store/authStore");

describe("LoginPage", () => {
  it("logs in successfully", async () => {
    authService.login.mockResolvedValue({ token: "123", user: { email: "test@test.com" } });
    useAuthStore.mockReturnValue({ login: vi.fn() });

    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
    });
  });
});
