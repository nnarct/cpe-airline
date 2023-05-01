import Axios from "axios";
export const ForUser = () => {
  const handleDelete = () => {
    Axios.get("http://localhost:3001/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className="py-1 px-4 rounded border border-2 border-white font-bold text-white hover:text-primary hover:bg-white transition ease-out active:opacity-70 text-center cursor-pointer"
        onClick={() => handleDelete()}
      >
        Log out
      </div>
    </>
  );
};
