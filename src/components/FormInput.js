import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Divider } from 'material-ui';

import { useSelector, useDispatch } from 'react-redux';
import { change_state } from '../redux/ducks';

// const inputCard =

const FormInput = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.general);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        overflow: 'scroll',
      }}
    >

      <TextField
        required
        floatingLabelText="Token"
        className="inputText"
        onChange={(e, text) => {
          gameState.token = text;
          dispatch(change_state(gameState));
        }}
        fullWidth={true}
      />
      <Card style={{}}>
        <CardHeader
          title="TOURNAMENT"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <RaisedButton
            className="menuButton"
            label="Get all Tournament"
            title="Start a new game"
          />
          <TextField
            required
            id="outlined-required"
            hintText="Các Tournament của đội chơi"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
          />
          <Divider />
          <TextField
            required
            id="outlined-required"
            floatingLabelText="ID Tournament"
            className="inputText"
            fullWidth={true}
          />
          <RaisedButton
            className="menuButton"
            label="Get Tournament"
            title="Start a new game"
          />
          <TextField
            required
            id="outlined-required"
            hintText="Thông tin chi tiết Tournament"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
          />
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title="ROUND"
          actAsExpander={true}
          showExpandableButton={true}
        />
      </Card>

      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="ID Tournament"
        className="inputText"
      />
      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="ID Tournament"
        className="inputText"
      />
      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="ID Tournament"
        className="inputText"
      />
      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="ID Tournament"
        className="inputText"
      />
      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="ID Tournament"
        className="inputText"
      />
      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="ID Tournament"
        className="inputText"
      />
      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
      <TextField
        required
        id="outlined-required"
        floatingLabelText="ID Tournament"
        className="inputText"
      />
      <RaisedButton
        className="menuButton"
        label="Get Tournament"
        title="Start a new game"
      />
    </div>
  );
};

export default styled(FormInput)`
  flex: 1;
`;
