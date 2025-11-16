import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { Note } from "./HomePage";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import axios from "axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState<Note | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`notes/${id}`);
        setNote(res.data);
      } catch (err) {
        console.log("Error in fetching note", err);
        toast.error("Failed to fetch the note");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (err) {
      console.log("Error deleting note", err);
      if (axios.isAxiosError(err) && err.response?.status !== 200) {
        toast.error("Failed to delete note");
      }
    }
  };

  const handleSave = async () => {
    if (!note?.title.trim() || !note.content?.trim()) {
      toast.error("All fields are required");
      return;
    }
    setSaving(true);
    try {
      await api.put(`notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (err) {
      console.log("Error occurred saving note changes", err);
      if (axios.isAxiosError(err) && err.response?.status !== 200) {
        toast.error("Failed to saved note changes");
      }
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  console.log(note);
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-evenly mb-10">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={() => handleDelete()}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note?.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value } as Note)
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note?.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value } as Note)
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn border-cyan-50/20"
                  disabled={saving}
                  onClick={() => handleSave()}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
