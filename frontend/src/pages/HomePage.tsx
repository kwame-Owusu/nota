import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import axios from "axios";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes/");
        console.log(res.data);
      } catch (err) {
        console.log("Error fetching notes,", err);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}
    </div>
  );
};

export default HomePage;
