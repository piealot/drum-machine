import { useEffect, useCallback ,useState} from "react";
import "./App.css";

function App() {

  const [lastSound, setLastSound] = useState("");

  const handleKeyPress = useCallback((event) => {
    const key = (event.key).toUpperCase();
    if(getSound(key)){
      console.log("hello");
      playSound(getSound(key), setLastSound);
    }
    
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

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
  return (
    <div onClick={() => {
      playSound(props.type, props.setLast);
    }} className="drum-pad" id={props.type}>
      
        <p>{getKey(props.type)}</p>

        <audio className="clip" id={getKey(props.type)} src={process.env.PUBLIC_URL +"/" + props.type + ".mp3"}>
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
  const fileName = getKey(sound);
  const audio = document.getElementById(fileName);
  setLast(sound);
  audio.currentTime = 0;
  audio.play();
}

export default App;
