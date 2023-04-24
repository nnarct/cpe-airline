import { AirlinesPartner } from "../components/homepage/airlines";
import { Navbar } from "../components/navbar";
export const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-calc bg-slate-100 flex justify-center items-center text-4xl">
        Homepage
        <AirlinesPartner />
      </div>
    </>
  );
};
