import { Item } from "./item";

export const Transaction = ({flights}) => {
  return (
    <ul>
      <div className="mt-3">
        {flights?.map((flight, i) => {
          return (
            <a
              key={i}
              href="/"
              className="max-w-1000 flex items-center mt-3 bg-white border border-gray-200 rounded-lg shadow hover:ring ring-gray-200"
            >
              <Item {...flight} />
            </a>
          );
        })}
      </div>
    </ul>
  );
};
