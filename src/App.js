import "./App.css";
import Converter from "./components/converter";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <div className="box">
          <div className="square" style={{ "--i": "0" }}></div>
          <div className="square" style={{ "--i": "1" }}></div>
          <div className="square" style={{ "--i": "2" }}></div>
          <div className="square" style={{ "--i": "3" }}></div>
          <div className="square" style={{ "--i": "4" }}></div>
          <Converter />
        </div>
      </div>
    </div>
  );
}

export default App;
