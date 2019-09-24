import React, { useState, useRef, useEffect } from "react";

const buttonReducer = (state, action) => {
  switch(action.type) {
    case 'push':
      return {
        ...state,
        isPushed: !state.isPushed
      }
    default:
      return state;
  }
}

const useReducer = (reducer, initialState) => {
  const [ state, setState ] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch] ;
}

const Button = () => {
  const [buttonState, dispatch] = useReducer(buttonReducer, {
    isPushed: false
  });

  const buttonRef = useRef(null);

  const testFn = text => {
    const { current } = buttonRef;
    current.innerText = `${text} wesh alors`;
  };

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      testFn(i);
      i += 1;
      if (i > 5) {
        clearInterval(interval);
        dispatch({
          type: 'push',
          payload: {
            isPushed: true
          }
        })
      }
    }, 1000);
  }, []);

  const { isPushed } = buttonState;
  return (
    <button ref={buttonRef} onClick={() => testFn('bruh')}>
      {isPushed ? "true" : "false"}
    </button>
  );
};

function App() {
  return (
    <div className="App">
      <Button />
    </div>
  );
}

export default App;
