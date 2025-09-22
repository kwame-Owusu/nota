import { Link, useNavigate } from "react-router";
import type { Note } from "../pages/HomePage";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import type React from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";

type setNotesType = Dispatch<SetStateAction<Note[]>>;
interface NoteCardProps {
  note: Note;
  setNotes: setNotesType;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, setNotes }) => {
  const navigate = useNavigate();
  const handleDelete = async (e: React.SyntheticEvent, noteId: string) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${noteId}`);
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (err) {
      console.log("Error deleting note", err);
      if (axios.isAxiosError(err) && err.response?.status !== 200) {
        toast.error("Failed to delete note");
      }
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-opacity duration-300 border border-base-content border-opacity-40 hover:border-opacity-100 ease-in"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <h3 className="text-base-content/70 line-clamp-3">{note.content}</h3>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1 text-white/70">
            <button className="btn btn-ghost btn-xs">
              <PenSquareIcon className="size-4" />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
