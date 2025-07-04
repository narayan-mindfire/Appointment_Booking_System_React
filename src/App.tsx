import Counter from "./components/Counter";
import ContentBody from "./components/ContentBody";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="bg-black text-center text-4xl text-white py-7">
        Appointment Booking System
      </h1>
      <div id="counter-container">
        <Counter />
      </div>
      <ContentBody />
    </div>
  );
}

export default App;
