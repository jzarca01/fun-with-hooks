import React, { useState, useRef, useEffect, useContext, createContext } from "react";

const ButtonContext = createContext({
  isPushed: false,
  setPushed: () => {}
})

const Button = () => {
  return (
    <ButtonContext.Consumer>
    {({isPushed, setPushed}) => <button onClick={setPushed}>
      {isPushed ? "true" : "false"}
    </button>
    }
    </ButtonContext.Consumer>
  );
};

export default class App extends React.Component {
  constructor() {
    super();

    this.setPushed = () => {
      this.setState(state => ({
        isPushed: !state.isPushed
      }))
    }

  this.state = {
    isPushed: false,
    setPushed: this.setPushed 
  };
}

  render() {
    return (
      <ButtonContext.Provider value={this.state}>
        <Button />
      </ButtonContext.Provider>
    );
  }
}