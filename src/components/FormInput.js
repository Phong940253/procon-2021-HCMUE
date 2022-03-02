import React, { Component, useState } from 'react';
// import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Divider } from 'material-ui';

import { useSelector, useDispatch } from 'react-redux';
import { change_state } from '../redux/ducks';
import axios from 'axios';
// const inputCard =

const inputCard = {
  margin: '10px',
};

const FormInput = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.general);
  const [tourID, setTourID] = useState('');
  const [roundID, setRoundID] = useState('');
  const [matchID, setMatchID] = useState('');
  const [challengeID, setChallengeID] = useState('');
  const [listTournament, setListTournament] = useState('');

  const [tourInfo, setTourInfo] = useState('');
  const [roundInfo, setRoundInfo] = useState('');
  const [matchInfo, setMatchInfo] = useState('');
  const [challengeInfo, setChallengeInfo] = useState('');

  const getAllTour = async () => {
    // console.log(gameState.token);
    // console.log(`${gameState.host}/tournament`);
    await axios
      .get(`${gameState.host}/tournament`, {
        headers: { Authorization: `Bearer ${gameState.token}` },
      })
      .then(res => {
        setListTournament(JSON.stringify(res.data), null, '\t');
        console.log(res.data);
      });
  };

  const getTour = async tourID => {
    // console.log(gameState.token);
    // console.log(`${gameState.host}/tournament`);
    await axios
      .get(`${gameState.host}/tournament/${tourID}`, {
        headers: { Authorization: `Bearer ${gameState.token}` },
      })
      .then(res => {
        setTourInfo(JSON.stringify(res.data.Rounds), null, '\t');
        console.log(res.data.Rounds);
      });
  };

  const getRound = async roundID => {
    // console.log(gameState.token);
    // console.log(`${gameState.host}/tournament`);
    await axios
      .get(`${gameState.host}/round/${roundID}`, {
        headers: { Authorization: `Bearer ${gameState.token}` },
      })
      .then(res => {
        setRoundInfo(JSON.stringify(res.data.Matches), null, '\t');
        console.log(res.data.Matches);
      });
  };

  const getMatch = async matchID => {
    // console.log(gameState.token);
    // console.log(`${gameState.host}/tournament`);
    await axios
      .get(`${gameState.host}/match/${matchID}`, {
        headers: { Authorization: `Bearer ${gameState.token}` },
      })
      .then(res => {
        setMatchInfo(JSON.stringify(res.data), null, '\t');
        console.log(res.data);
      });
  };

  const getChallenge = async challengeID => {
    // console.log(challengeID);
    await axios
      .get(`${gameState.host}/challenge/raw-challenge/${challengeID}`, {
        headers: { Authorization: `Bearer ${gameState.token}` },
      })
      .then(res => {
        setChallengeInfo(res.data);
        console.log(res.data);
      });
  };

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
            onClick={getAllTour}
          />
          <TextField
            required
            hintText="Các Tournament của đội chơi"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
            value={listTournament}
          />
          <Divider />
          <TextField
            required
            floatingLabelText="ID Tournament"
            className="inputText"
            fullWidth={true}
            onChange={(e, text) => {
              setTourID(text);
            }}
          />
          <RaisedButton
            className="menuButton"
            label="Get Tournament"
            title="Start a new game"
            onClick={() => {
              getTour(tourID);
            }}
          />
          <TextField
            required
            hintText="Thông tin chi tiết Tournament"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
            value={tourInfo}
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
            onChange={(e, text) => {
              setRoundID(text);
            }}
          />
          <RaisedButton
            className="menuButton"
            label="Get Round"
            title="Start a new game"
            onClick={() => {
              getRound(roundID);
            }}
          />
          <TextField
            required
            hintText="Thông tin chi tiết Round"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
            value={roundInfo}
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
            onChange={(e, text) => {
              setMatchID(text);
            }}
          />
          <RaisedButton
            className="menuButton"
            label="Get Match"
            title="Start a new game"
            onClick={() => {
              getMatch(matchID);
            }}
          />
          <TextField
            required
            hintText="Thông tin chi tiết Match"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
            value={matchInfo}
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
            onChange={(e, text) => setChallengeID(text)}
          />
          <RaisedButton
            className="menuButton"
            label="Get Challenge"
            title="Start a new game"
            onClick={() => {
              getChallenge(challengeID);
            }}
          />
          <TextField
            required
            hintText="Thông tin chi tiết Challenge"
            className="inputText"
            multiLine={true}
            rowsMax={20}
            rows={2}
            fullWidth={true}
            value={challengeInfo}
          />

          <RaisedButton
            className="menuButton"
            label="Get Submit Challenge"
            title="Start a new game"
          />
          <TextField
            required
            hintText="Thông tin câu trả lời cho Challenge"
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
