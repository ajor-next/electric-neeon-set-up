import { useShape } from "@electric-sql/react";

type BookToRead = {
  id: number; // Changed to number since `id` is a SERIAL field in the schema
  title: string;
  author: string;
};

function App() {
  // Fetching books data from the ElectricSQL shape
  const { data: books } = useShape<BookToRead>({
    url: `${import.meta.env.VITE_ELECTRIC_URL}/v1/shape/`,
    params: {
      table: "books_to_read", // Correct table name
    },
  });

  return (
    <div>
      <h1 className="text-center text-xl py-2">Books To Read</h1>
      <div>
        {books?.length === 0 ? (
          <div className="flex justify-center">
            <p className="text-gray-500">No books to show - add one!</p>
          </div>
        ) : (
          books?.map((book) => (
            <div key={book.id} className="p-4 border-b">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-700">Author: {book.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
