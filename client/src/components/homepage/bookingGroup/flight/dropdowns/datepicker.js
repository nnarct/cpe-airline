import Datepicker from "react-tailwindcss-datepicker";
export const DatePick = ({ values, setValues, isReturn }) => {
  const handleValueChange = (newValue) => {
    setValues({ ...values, date: newValue });
  };
  return (
    <>
      <Datepicker
        minDate={new Date()}
        primaryColor={"blue"}
        placeholder={
          isReturn ? "Departure Date ~ Arrival Date" : "Departure Date"
        }
        value={values.date}
        asSingle={!isReturn}
        onChange={handleValueChange}
        displayFormat={"DD/MM/YYYY"}
        inputClassName={
          "relative transition-all duration-300 py-2.5 pl-4 pr-14 h-20 w-full  border border-primary rounded-xl tracking-wide text-xl font-bold placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
        }
      />
    </>
  );
};
