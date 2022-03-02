import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { useSelector, useDispatch } from 'react-redux';
import { change_state } from '../redux/ducks';

const FormInput = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.general);

  return (
    <div className="formInput">
      <TextField
        required
        id="outlined-required"
        floatingLabelText="Token"
        className="inputText"
        onChange={text => {
          gameState.token = text;
          dispatch(change_state(gameState));
        }}
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="test"
        className="inputText"
        value={gameState.token}
      />
      <RaisedButton
        className="menuButton"
        label="Start"
        title="Start a new game"
      />
    </div>
  );
};

export default styled(FormInput)`
  flex: 1;

  .formInput {
    display: flex;
    background-color: #fff;
    flex-direction: column;
  }

  .inputText {
  }
`;
