import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Divider } from 'material-ui';

import { useSelector, useDispatch } from 'react-redux';
import { change_state } from '../redux/ducks';

const inputCard = {
  margin: '10px',
};

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
        floatingLabelText="Host"
        className="inputText"
        onChange={(e, text) => {
          gameState.host = text;
          dispatch(change_state(gameState));
        }}
        fullWidth={true}
      />
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
      <Card style={inputCard}>
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
            hintText="Thông tin chi tiết Tournament"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
          />
        </CardText>
      </Card>
      <Card style={inputCard}>
        <CardHeader
          title="ROUND"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <TextField
            required
            floatingLabelText="ID Round"
            className="inputText"
            fullWidth={true}
          />
          <RaisedButton
            className="menuButton"
            label="Get Round"
            title="Start a new game"
          />
          <TextField
            required
            hintText="Thông tin chi tiết Round"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
          />
        </CardText>

      </Card>
      <Card style={inputCard}>
        <CardHeader
          title="MATCH"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <TextField
            required
            floatingLabelText="ID Match"
            className="inputText"
            fullWidth={true}
          />
          <RaisedButton
            className="menuButton"
            label="Get Match"
            title="Start a new game"
          />
          <TextField
            required
            hintText="Thông tin chi tiết Match"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
          />
        </CardText>

      </Card>
      <Card style={inputCard}>
        <CardHeader
          title="CHALLENGE"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <TextField
            required
            floatingLabelText="ID Challenge"
            className="inputText"
            fullWidth={true}
          />
          <RaisedButton
            className="menuButton"
            label="Get Challenge"
            title="Start a new game"
          />
          <TextField
            required
            hintText="Thông tin chi tiết Challenge"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
          />
        </CardText>

      </Card>
    </div>
  );
};

export default styled(FormInput)`
  flex: 1;
`;
