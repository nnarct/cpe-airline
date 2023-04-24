export const FlightInfo = () => {

  return (
    <>
      <div className="flex justify-center">
        <table className="bg-red-500">
          <thead>
            <tr>
              <th className="p-2 border border-1 border-black">FlightID</th>
              <th className="p-2 border border-1 border-black">
                Flight Number
              </th>
              <th className="p-2 border border-1  order-black">AirlineID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black">1</td>
              <td className="border border-black">1</td>
              <td className="border border-black">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
