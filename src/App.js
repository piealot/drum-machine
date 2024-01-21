import { useEffect, useCallback ,useState} from "react";
import "./App.css";

function App() {

  const [lastSound, setLastSound] = useState("");

  // handle what happens on key press
  const handleKeyPress = useCallback((event) => {
    if(getSound(event.key)){
      playSound(getSound(event.key), setLastSound);
    }
    
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="drum-machine" id="drum-machine">
      <div className="pad-bank" id="pad-bank">
        <DrumPad type="chord1" setLast={setLastSound}/>
        <DrumPad type="chord2" setLast={setLastSound}/>
        <DrumPad type="chord3" setLast={setLastSound}/>
        <DrumPad type="shaker" setLast={setLastSound}/>
        <DrumPad type="openHH" setLast={setLastSound}/>
        <DrumPad type="HH" setLast={setLastSound}/>
        <DrumPad type="kick" setLast={setLastSound}/>
        <DrumPad type="rim" setLast={setLastSound}/>
        <DrumPad type="snare" setLast={setLastSound}/>
      </div>
      <Display last={lastSound}/>
    </div>
  );
}

function DrumPad(props, setLast) {
  const fileName = props.type + "audio";
  return (
    <div className="drum-pad" id={getKey(props.type)}>
      <button
        onClick={() => {
          playSound(props.type, props.setLast);
        }}
        className="drum-pad-button"
      >
        {getKey(props.type)}
      </button>
      <audio id={getKey(props.type)}>
        <source className="clip" src={props.type + ".mp3"} type="audio/mpeg" />
      </audio>
    </div>
  );
}

function Display(props) {
  return (
    <div class="display" id="display">
      {props.last}
    </div>
  );
}

function getKey(sound) {
  switch (sound) {
    case "chord1":
      return "Q";
    case "chord2":
      return "W";
    case "chord3":
      return "E";
    case "shaker":
      return "A";
    case "openHH":
      return "S";
    case "HH":
      return "D";
    case "kick":
      return "Z";
    case "rim":
      return "X";
    case "snare":
      return "C";
    default:
      return undefined;
  }
}

function getSound(key) {
  switch (key) {
    case "Q":
      return "chord1";
    case "W":
      return "chord2";
    case "E":
      return "chord3";
    case "A":
      return "shaker";
    case "S":
      return "openHH";
    case "D":
      return "HH";
    case "Z":
      return "kick";
    case "X":
      return "rim";
    case "C":
      return "snare";
    default:
      return undefined;
  }
}

function playSound(sound, setLast) {
  let fileName = sound + "audio";
  setLast(sound);

  document.getElementById(fileName).currentTime = 0;
  document.getElementById(fileName).play();
}

export default App;
