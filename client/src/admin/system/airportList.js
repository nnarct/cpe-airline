export const AirportList = () => {

  return(
    <>
    <div className="flex justify-center mt-4">
      <table>
        <thead>
          <tr>
            <th  className="p-2 border border-1 border-black">AirportID</th>
            <th  className="p-2 border border-1 border-black">Name</th>
            <th className="p-2 border border-1 border-black">IATA</th>
            <th className="p-2 border border-1 border-black">State</th>
            <th className="p-2 border border-1 border-black">Province</th>
          </tr>
        </thead>
      </table>
    </div>
    </>
  );
}