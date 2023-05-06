import { Navbar } from "../components/navbar";
import { Footer } from "../components/navbar/footer";
import { SearchResult } from "../components/searchResult/searchResult";

export const SearchResultPage = () => {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div >
          <Navbar />
          <SearchResult />
        </div>
        <Footer />
      </div>
    </>
  );
};
