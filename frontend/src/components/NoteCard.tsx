import { Link } from "react-router";
import type { Note } from "../pages/HomePage";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
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
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
