import { render, screen, waitFor } from "@testing-library/react";
import ContactsPage from "../pages/ContactsPage";
import * as contactService from "../services/contacts";

vi.mock("../services/contacts");

describe("ContactsPage", () => {
  it("shows contacts table", async () => {
    contactService.fetchContacts.mockResolvedValue({
      items: [{ _id: "1", name: "John Doe", email: "john@test.com", company: "ACME", phone: "123456" }],
      total: 1,
      page: 1,
      pageSize: 5
    });

    render(<ContactsPage />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/john@test.com/i)).toBeInTheDocument();
    });
  });
});
