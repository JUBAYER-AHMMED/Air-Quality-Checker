import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/dataFetch";
import ScrollReveal from "scrollreveal";
import axios from "axios"; // Import axios

const PieDonut = () => {
  const { GetData } = useContext(DataContext);
  const [fetchedData, setFetchedData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1000,
      delay: 100,
      reset: false,
    });
    sr.reveal(".charts");

    let intervalId;

    if (showDetails) {
      intervalId = setInterval(async () => {
        const data = await GetData();
        setFetchedData(data); // Store the entire array of data
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showDetails, GetData]);

  const handleOnClick = () => {
    setShowDetails(true);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const location = formData.get("location");

  //   if (!fetchedData.length) {
  //     alert("Please wait for the sensor data to load.");
  //     return;
  //   }

  //   // Example: Use the latest data (last entry) to submit
  //   const airQuality = fetchedData[fetchedData.length - 1]?.airQuality || 0;

  //   try {
  //     const response = await axios.post(
  //       "https://air-quality-checker-ftzu.onrender.com/api/air-quality",
  //       { location, airQuality },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.status === 201) {
  //       alert("Location and air quality submitted successfully!");
  //     } else {
  //       alert("Failed to submit data.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error submitting data.");
  //   }
  // };

  return (
    <>
      <figure className="charts">
        <div className="pie donut">
          <button className="btn-3d" onClick={handleOnClick}>
            {showDetails ? (
              fetchedData.length ? (
                <span className="percentage">
                  {fetchedData[fetchedData.length - 1]?.airQuality || "N/A"} ppm
                </span>
              ) : (
                <div className="name">Loading...</div>
              )
            ) : (
              <div className="name">OxyTrack</div>
            )}
          </button>
        </div>
      </figure>

      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          required
        />
        <button type="submit">Enter</button>
      </form> */}
    </>
  );
};

export default PieDonut;
