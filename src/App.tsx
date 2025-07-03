import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Form from "./components/Form";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal
          message="this is a demo modal"
          onConfirm={() => {
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
      <Toast message="welcome" visible={true} />
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
