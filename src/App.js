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

  let audio = document.getElementById("audio");
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
      <audio id={fileName}>
        <source src={props.type + ".mp3"} type="audio/mpeg" />
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
      return "q";
    case "chord2":
      return "w";
    case "chord3":
      return "e";
    case "shaker":
      return "a";
    case "openHH":
      return "s";
    case "HH":
      return "d";
    case "kick":
      return "z";
    case "rim":
      return "x";
    case "snare":
      return "c";
    default:
      return undefined;
  }
}

function getSound(key) {
  switch (key) {
    case "q":
      return "chord1";
    case "w":
      return "chord2";
    case "e":
      return "chord3";
    case "a":
      return "shaker";
    case "s":
      return "openHH";
    case "d":
      return "HH";
    case "z":
      return "kick";
    case "x":
      return "rim";
    case "c":
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
