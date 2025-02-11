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
      <h1 className="header">Oxytrack</h1>
      <br />
      <p className="lead">
        Gain immediate visibility into oxygen concentration with our advanced
        monitoring technology. Stay informed, stay safe, and keep your
        surroundings healthy.
      </p>
      <span className="sp"> Real-Time Oxygen Level Monitoring.</span>
    </div>
  );
};

export default Heading;
