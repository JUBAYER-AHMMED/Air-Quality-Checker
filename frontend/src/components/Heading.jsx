import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const Heading = () => {
  useEffect(() => {
    // Initialize ScrollReveal after the component is mounted
    const sr = ScrollReveal({
      origin: "left",
      distance: "60px",
      duration: 1000,
      delay: 100,
      reset: false,
    });

    // Apply the reveal effect
    sr.reveal(".heading-container");
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="heading-container">
      <h1 className="header">AirWatch</h1>
      <br />
      <div className="slogan">
        <p className="lead para1">
          Gain immediate visibility into oxygen concentration with our advanced
          monitoring technology. Stay informed, stay safe, and keep your
          surroundings healthy.
        </p>
        <span className="sp"> Real-Time Oxygen Level Monitoring.</span>
      </div>
    </div>
  );
};

export default Heading;
