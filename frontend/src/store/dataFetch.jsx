import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext({
  GetData: () => {},
  UpdateLocation: () => {}, // Add UpdateLocation function
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
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetching(false);
      return null;
    }
  };

  const UpdateLocation = async (location) => {
    try {
      const response = await axios.post(
        "https://air-quality-checker-ftzu.onrender.com/api/air-quality/location",
        { location }
      );
      console.log("Location updated:", response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        GetData,
        UpdateLocation, // Provide UpdateLocation function
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
