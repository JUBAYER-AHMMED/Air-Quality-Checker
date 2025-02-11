import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/dataFetch";
import ScrollReveal from "scrollreveal";

const PieDonut = () => {
  const { GetData } = useContext(DataContext);
  const [fetchedData, setFetchedData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // ScrollReveal setup
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
      // Start interval when showDetails is true
      intervalId = setInterval(async () => {
        const data = await GetData();
        setFetchedData(data);
      }, 1000);
    }

    // Cleanup interval on component unmount or when showDetails changes
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showDetails, GetData]); // Add dependencies

  const handleOnClick = () => {
    setShowDetails(true); // Show details and start fetching data
  };

  return (
    <>
      <figure className="charts">
        <div className="pie donut">
          <button className="btn-3d" onClick={handleOnClick}>
            {showDetails ? (
              fetchedData ? (
                <span className="percentage">{fetchedData} ppm</span>
              ) : (
                <div className="name">Loading...</div>
              )
            ) : (
              <div className="name">OxyTrack</div>
            )}
          </button>
        </div>
      </figure>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          const formData = new FormData(e.target); // Get form data
          const location = formData.get("location"); // Extract the 'location' value

          // Send the data using fetch
          fetch("http://localhost:8080/api/sensor-readings/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location }),
          })
            .then((response) => {
              if (response.ok) {
                alert("Location submitted successfully!");
              } else {
                alert("Failed to submit location.");
              }
            })
            .catch((error) => console.error("Error:", error));
        }}
      >
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          required
        />
        <button type="submit">Enter</button>
      </form>
    </>
  );
};

export default PieDonut;
