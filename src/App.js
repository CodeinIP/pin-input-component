import { useEffect, useState } from "react";
import "./App.css";
import Pin from "./components/Pin";

function App() {
  const [otp, setOtp] = useState("");
  const [correctOtp, setCorrectOtp] = useState(false);
  useEffect(() => {
    if (otp == "12345") {
      setCorrectOtp(true);
    }
  }, [otp]);
  return (
    <div className="App">
      <Pin length={5} setOtp={setOtp} correctOtp={correctOtp} />
      <p>
        The OTP is {otp} <b>{correctOtp && "CORRECT"}</b>
      </p>
    </div>
  );
}

export default App;
