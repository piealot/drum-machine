import { useEffect } from "react";
import "./App.css";

function App() {
  let audio = document.getElementById("audio");
  return (
    <div className="drum-machine" id="drum-machine">
      <div className="pad-bank" id="pad-bank">
        <DrumPad />
        <DrumPad />
        <DrumPad />
        <DrumPad />
        <DrumPad />
        <DrumPad />
        <DrumPad />
        <DrumPad />
        <DrumPad />
      </div>
      <Display />
      <Input />
    </div>
  );
}

function DrumPad() {
  return (
    <div className="drum-pad" id="drum-pad">
      <button
        onClick={() => {
          document.getElementById("audio").currentTime = 0;
          document.getElementById("audio").play();
        }}
        class="drum-pad-button"
      >
        Play
      </button>
      <audio id="audio">
        <source src="RP4_KICK_1.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

function Display() {
  return (
    <div class="display" id="display">
      Last sound
    </div>
  );
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    console.log("enter");
  }
}
function Input() {
  return <input onKeyDown={handleKeyDown} />;
}

export default App;
