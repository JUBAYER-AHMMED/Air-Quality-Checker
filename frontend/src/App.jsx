import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PieDonut from "./components/PieDonut";
import DataProvider from "./store/dataFetch";
import Heading from "./components/Heading";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="main">
      <DataProvider>
        <NavBar />
        <div className="container">
          <Heading />
          <PieDonut />
        </div>
      </DataProvider>
    </div>
  );
}

export default App;
