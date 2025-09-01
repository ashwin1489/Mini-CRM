import { useEffect, useState } from "react";
import { fetchDeals, createDeal, updateDeal, deleteDeal } from "../services/deals";
import { fetchContacts } from "../services/contacts";
import Card from "../components/Card";
import Table from "../components/Table";
import Input from "../components/Input";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", stage: "new", contact: "" });
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState("");

  const loadDeals = async () => {
    const res = await fetchDeals({ page, pageSize: 5 });
    setDeals(res.items);
    setTotal(res.total);
  };

  useEffect(() => {
    loadDeals();
    fetchContacts({ pageSize: 100 }).then((res) => setContacts(res.items));
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDeal(editingId, form);
        setToast("Deal updated");
      } else {
        await createDeal(form);
        setToast("Deal created");
      }
      setForm({ title: "", amount: "", stage: "new", contact: "" });
      setEditingId(null);
      loadDeals();
    } catch {
      setToast("Error saving deal");
    }
  };

  const handleDelete = async (id) => {
    await deleteDeal(id);
    setToast("Deal deleted");
    loadDeals();
  };

  return (
    <div>
      <Card title="Add / Edit Deal">
        <form onSubmit={handleSubmit}>
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          <label><b>Stage</b></label>
          <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <label><b>Contact</b></label>
          <select value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })}>
            <option value="">Select Contact</option>
            {contacts.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <Button type="submit">{editingId ? "Update" : "Add"}</Button>
        </form>
      </Card>

      <Card title="Deals">
        <Table
          columns={[
            { key: "title", title: "Title", dataIndex: "title" },
            { key: "amount", title: "Amount", dataIndex: "amount" },
            { key: "stage", title: "Stage", dataIndex: "stage" }
          ]}
          data={deals}
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
