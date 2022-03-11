import React, {useState} from "react";
import "./App.css";
import CountdownCtx from "./Components/Contexts/CountdownCtx";
import Main from "./Containers/Main";

function App() {
    const [isCountdown, setisCountdown] = useState(false);
    const setCountdownEnded = () => {
        setisCountdown(true);
    };
    return (
        <CountdownCtx.Provider
            value={{
                isCountdownEnded: isCountdown,
                setCountdownEnd: setCountdownEnded,
            }}
        >
            <div className="App">
                <Main/>
            </div>
        </CountdownCtx.Provider>
    );
}

export default App;
