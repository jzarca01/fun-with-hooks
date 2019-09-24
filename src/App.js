import React, { useState, useContext, createContext } from "react";

const ButtonContext = createContext([{}, () => {}])

const App = () => {
  const [isPushed, setPushed] = useState(false);

  const Button = () => {
    const [isPushed, setPushed] = useContext(ButtonContext)
    return (
      <button onClick={setPushed}>
        {isPushed ? "true" : "false"}
      </button>
    );
  };

  return (
    <ButtonContext.Provider value={[isPushed, () => setPushed(!isPushed)]}>
      <Button />
    </ButtonContext.Provider>
  );
}

export default App;