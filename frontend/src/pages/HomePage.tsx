import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}
    </div>
  );
};

export default HomePage;
