import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="mb-10 bg-base-300 h-[100px] ">
      <div className="mx-auto max-w-6xl px-4 py-4 ">
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-4xl font-sans  text-white/80">Nota</h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-neutral">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
