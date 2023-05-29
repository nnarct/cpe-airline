const ITEMS_PER_PAGE = 20;

export const paginateData = (data, currentPage) => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return data.slice(startIndex, endIndex);
};
export const RenderPaginationLinks = ({filteredFlights, currentPage, setCurrentPage}) => {
  console.log(filteredFlights);
  const totalPages = Math.ceil(filteredFlights?.length / ITEMS_PER_PAGE);
  const pageNumbers = [];

  // Add "<<" button
  if (currentPage > 1) {
    pageNumbers.push(
      <li
        key="<<"
        className="bg-white border p-2 border-black/50 mr-1 cursor-pointer"
      >
        <button onClick={() => setCurrentPage(1)}>{"<<"}</button>
      </li>
    );
  }

  // Add "<" button
  if (currentPage > 1) {
    pageNumbers.push(
      <li
        key="<"
        className="bg-white border p-2 border-black/50 mr-1 cursor-pointer"
      >
        <button onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
      </li>
    );
  }

  // Add current page button
  pageNumbers.push(
    <li
      key={currentPage}
      className={`bg-white border p-2 border-black/50 mr-1 cursor-pointer`}
    >
      <button>{currentPage}</button>
    </li>
  );

  // Add ">" button
  if (currentPage < totalPages) {
    pageNumbers.push(
      <li
        key=">"
        className="bg-white border p-2 border-black/50 mr-1 cursor-pointer"
      >
        <button onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>
      </li>
    );
  }

  // Add ">>" button
  if (currentPage < totalPages) {
    pageNumbers.push(
      <li
        key=">>"
        className="bg-white border p-2 border-black/50 mr-1 cursor-pointer"
      >
        <button onClick={() => setCurrentPage(totalPages)}>{">>"}</button>
      </li>
    );
  }

  return <ul className="flex">{pageNumbers}</ul>;
};
