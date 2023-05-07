import { useLocation } from "react-router-dom";
export const SearchResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const v = {
    from: params.get("from"),
    to: params.get("to"),
    departure: params.get("departure"),
    arrival: params.get("arrival"),
    adult: params.get("adult"),
    child: params.get("child"),
    infant: params.get("infant"),
    class: params.get("class"),
    isReturn: params.get("isReturn"),
  };
  return (
    <>
      <div className="flex flex-col justify-between bg-blue">
        Search Result
      </div>
    </>
  );
};
