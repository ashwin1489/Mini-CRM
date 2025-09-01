import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

vi.mock("../store/authStore");

describe("Navbar", () => {
  it("renders links when logged out", () => {
    useAuthStore.mockReturnValue({ token: null, logout: vi.fn() });
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it("renders contacts link when logged in", () => {
    useAuthStore.mockReturnValue({ token: "fake", logout: vi.fn() });
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
  });
});
