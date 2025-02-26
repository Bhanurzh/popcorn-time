import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center p-5 w-full min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CircleAlert size={40} className="text-white" />
          <p className="text-white font-bold text-xl md:text-3xl">
            Oops, Looking For Something?
          </p>
        </div>
        <Link to={"/"}>
          <Button className="w-fit bg-red-primary hover:bg-red-primary/90 hover:shadow-[0_0_15px_#aa1d1d]">
            Go Back Here!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
