import "./App.css";
import Card from "./components/Card";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Form />
      <Card
        id={1235352}
        name="narayan"
        email="narayan.pradhan1117@gmail.com"
        doctor="aniket"
        date="12-23-2023"
        purpose="no purpose"
        slot="11:00"
      />
    </>
  );
}

export default App;
