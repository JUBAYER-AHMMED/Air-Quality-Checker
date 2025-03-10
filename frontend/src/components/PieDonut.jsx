import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/dataFetch";
import ScrollReveal from "scrollreveal";

const PieDonut = () => {
  const { GetData, UpdateLocation } = useContext(DataContext);
  const [fetchedData, setFetchedData] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [userLocation, setUserLocation] = useState("");
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
        setFetchedData(Array.isArray(data) ? data : []); // Ensure fetchedData is always an array
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showDetails]);

  useEffect(() => {
    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
      const latestData = fetchedData[fetchedData.length - 1];
      setPlaceName(
        typeof latestData.location === "string"
          ? latestData.location
          : "Location not found"
      );
    }
  }, [fetchedData]);

  const handleUpdateLocation = async () => {
    await UpdateLocation(userLocation);
    setPlaceName(userLocation);
    setUserLocation("");
  };

  return (
    <>
      <figure className="charts">
        <div className="pie donut">
          <button className="btn-3d" onClick={() => setShowDetails(true)}>
            {showDetails ? (
              fetchedData.length ? (
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

      {/* Input field for updating location */}
      <div className="location-input">
        <input
          type="text"
          placeholder="Enter location"
          value={userLocation}
          onChange={(e) => setUserLocation(e.target.value)}
        />
        <button onClick={handleUpdateLocation}>Update</button>
      </div>

      {/* Display Place Name below the pie chart */}
      {showDetails && (
        <div className="location-name">
          <p>{placeName || "Location not available"}</p>
        </div>
      )}

      {/* ✅ Display fetched data safely
      {Array.isArray(fetchedData) && fetchedData.length > 0 ? (
        fetchedData.map((item) => (
          <p key={item._id}>{item.name}</p> // Assuming MongoDB stores `_id`
        ))
      ) : (
        <p>Loading data...</p>
      )} */}
    </>
  );
};

export default PieDonut;
