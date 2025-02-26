import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/dataFetch";
import ScrollReveal from "scrollreveal";
import axios from "axios"; // Import axios

const PieDonut = () => {
  const { GetData } = useContext(DataContext);
  const [fetchedData, setFetchedData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [placeName, setPlaceName] = useState(""); // State to hold the place name

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

  useEffect(() => {
    if (fetchedData.length > 0) {
      const { latitude, longitude } =
        fetchedData[fetchedData.length - 1].location;

      // Fetch place name using OpenCage Geocoder
      const fetchPlaceName = async () => {
        try {
          console.log(
            "Fetching place name for coordinates:",
            latitude,
            longitude
          ); // Debugging log
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=bbc25f7246c44be1bd2506a54adfbbf7`
          );

          console.log("OpenCage API response:", response.data); // Debugging log

          const result = response.data.results[0]; // Get the first result
          if (result) {
            setPlaceName(result.formatted); // Set the place name
          } else {
            setPlaceName("Place not found"); // Handle case where no place is found
          }
        } catch (error) {
          console.error("Error fetching place name:", error); // Log full error
          // Check if error response exists and log it
          if (error.response) {
            console.error("Error response:", error.response);
            setPlaceName(
              `Error: ${error.response.status} - ${error.response.statusText}`
            );
          } else if (error.request) {
            console.error("Error request:", error.request);
            setPlaceName("Error: No response from server");
          } else {
            console.error("Error message:", error.message);
            setPlaceName("Error fetching place name");
          }
        }
      };

      fetchPlaceName();
    }
  }, [fetchedData]); // Trigger when fetchedData changes

  const handleOnClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <figure className="charts">
        <div className="pie donut">
          <button className="btn-3d" onClick={handleOnClick}>
            {showDetails ? (
              fetchedData?.length ? (
                <span className="percentage">
                  {fetchedData[fetchedData.length - 1]?.airQuality || "0"} pm
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

      {/* Display Place Name below the pie chart */}
      {showDetails && (
        <div className="location-name">
          <p>{placeName || "Loading place name..."}</p>
        </div>
      )}
    </>
  );
};

export default PieDonut;
