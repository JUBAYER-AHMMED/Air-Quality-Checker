import { createContext, useState } from "react";
import axios from "axios";
export const DataContext = createContext({
  GetData: () => {}, // Fixed typo: changed "Getdata" to "GetData"
});

const DataProvider = ({ children }) => {
  const [fetching, setFetching] = useState(false);

  const GetData = async () => {
    setFetching(true);

    try {
      const response = await axios.get(
        "https://air-quality-checker-ftzu.onrender.com/api/air-quality"
      );
      setFetching(false);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetching(false);
      return null; // Handle errors gracefully
    }
  };

  return (
    <DataContext.Provider
      value={{
        GetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
