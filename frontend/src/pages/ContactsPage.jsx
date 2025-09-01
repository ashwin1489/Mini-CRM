import { useEffect, useState } from "react";
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
  importContacts,
  exportContacts
} from "../services/contacts";
import Card from "../components/Card";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Input from "../components/Input";
import Button from "../components/Button";
import CsvUploader from "../components/CsvUploader";
import Toast from "../components/Toast";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState("");

  const loadContacts = async () => {
    const res = await fetchContacts({ search, page, pageSize: 5 });
    setContacts(res.items);
    setTotal(res.total);
  };

  useEffect(() => { loadContacts(); }, [search, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateContact(editingId, form);
        setToast("Contact updated");
      } else {
        await createContact(form);
        setToast("Contact created");
      }
      setForm({ name: "", email: "", company: "", phone: "" });
      setEditingId(null);
      loadContacts();
    } catch {
      setToast("Error saving contact");
    }
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setToast("Contact deleted");
    loadContacts();
  };

  const handleImport = async (csvData) => {
    await importContacts(csvData);
    setToast("Contacts imported");
    loadContacts();
  };

  const handleExport = async () => {
    const data = await exportContacts();
    const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
    setToast("Contacts exported");
  };

  return (
    <div>
      <Card title="Add / Edit Contact">
        <form onSubmit={handleSubmit}>
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Button type="submit">{editingId ? "Update" : "Add"}</Button>
        </form>
      </Card>

      <Card title="Contacts"
        actions={<><CsvUploader onImport={handleImport} /> | <Button onClick={handleExport}>Export CSV</Button></>}>
        <Input placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <Table
          columns={[
            { key: "name", title: "Name", dataIndex: "name" },
            { key: "email", title: "Email", dataIndex: "email" },
            { key: "company", title: "Company", dataIndex: "company" },
            { key: "phone", title: "Phone", dataIndex: "phone" }
          ]}
          data={contacts}
          actions={(row) => (
            <>
              <Button variant="outline" onClick={() => { setForm(row); setEditingId(row._id); }}>Edit</Button>{" "}
              <Button onClick={() => handleDelete(row._id)}>Delete</Button>
            </>
          )}
        />
        <Pagination
          page={page}
          setPage={setPage}
          hasPrev={page > 1}
          hasNext={page * 5 < total}
        />
      </Card>
      <Toast message={toast} />
    </div>
  );
}
