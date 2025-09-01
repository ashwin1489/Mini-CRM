import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNotes, addNote } from "../services/notes";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";

export default function NotesPage() {
  const { contactId } = useParams();
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [toast, setToast] = useState("");

  const loadNotes = async () => {
    const res = await getNotes(contactId);
    setNotes(res);
  };

  useEffect(() => { loadNotes(); }, [contactId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNote({ contact: contactId, content });
      setToast("Note added");
      setContent("");
      loadNotes();
    } catch {
      setToast("Error adding note");
    }
  };

  return (
    <div>
      <Card title="Add Note">
        <form onSubmit={handleSubmit}>
          <Input label="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
          <Button type="submit">Add</Button>
        </form>
      </Card>

      <Card title="Notes">
        <ul>
          {notes.map((n) => (
            <li key={n._id}>
              {n.content} <i>({new Date(n.createdAt).toLocaleString()})</i>
            </li>
          ))}
        </ul>
      </Card>
      <Toast message={toast} />
    </div>
  );
}
