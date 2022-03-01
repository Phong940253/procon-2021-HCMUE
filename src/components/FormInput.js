import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const FormInput = () => {
  return (
    <div className="formInput">
      <TextField
        required
        id="outlined-required"
        floatingLabelText="Token"
        className="inputText"
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
