import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/dataFetch";
import ScrollReveal from "scrollreveal";

const PieDonut = () => {
  const { GetData } = useContext(DataContext);
  const [fetchedData, setFetchedData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Ensure ScrollReveal runs after data is fetched and the component has rendered
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1000,
      delay: 100,
      reset: false,
    });
    sr.reveal(".charts");
  });

  const handleOnClick = () => {
    const fetchData = async () => {
      const data = await GetData();
      setFetchedData(data);
      // console.log(data);
    };

    fetchData();

    setShowDetails(true); // Change state when button is clicked
  };
  // useEffect(() => {
  //   console.log("fetchedData updated:", fetchedData);
  // }, [fetchedData]);

  return (
    // <figure className="charts">
    //   <div className="pie donut">
    //     <button className="btn-3d" onClick={handleOnClick}>
    //       {showDetails ? (
    //         fetchedData ? (
    //           <div className="name">
    //             OxyTrack <br />
    //             {fetchedData.oxygenLevel}
    //           </div>
    //         ) : (
    //           <div className="name">Loading...</div>
    //         )
    //       ) : fetchedData ? (
    //         <span>{fetchedData.percentage}</span>
    //       ) : (
    //         <div className="name">OxyTrack</div>
    //       )}
    //     </button>
    //   </div>
    // </figure>

    <figure className="charts">
      <div className="pie donut">
        <button className="btn-3d" onClick={handleOnClick}>
          {showDetails ? (
            fetchedData ? (
              <span className="percentage">{fetchedData} %</span>
            ) : (
              <div className="name">Loading...</div>
            )
          ) : (
            <div className="name">OxyTrack</div>
          )}
        </button>
      </div>
    </figure>
  );
};

export default PieDonut;
