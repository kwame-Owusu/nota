import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import axios, { type AxiosResponse } from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res: AxiosResponse<Note[]> = await api.get("notes/");
        setNotes(res.data);
        setIsRateLimited(false);
        console.log(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          if (status === 429) {
            setIsRateLimited(true);
          } else {
            toast.error("Failed to load notes.");
          }
        } else {
          toast.error("Unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}
      <div className="max-w-txl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center py-10 text-3xl">Loading notes...</div>
        )}
        {notes.length === 0 && !isLoading && !isRateLimited && (
          <NotesNotFound />
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div>
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
