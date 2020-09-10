import React from "react";
import ReactLoading from "react-loading";

const classes = {
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    width: '100px',
    fill: '#357EDD'
  }
}

const Loading = () => {
  return (
    <div style={classes.root}>
      <ReactLoading type="spinningBubbles" color="#357EDD" style={classes.spinner}/>
    </div>
  );
};

export default Loading;
