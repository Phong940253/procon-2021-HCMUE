import React, { useEffect, useState } from 'react';
import { getTileCoords, distanceBetween, invert } from '../lib/utils';
// import Grid from './Grid';
import Menu from './Menu';
import FormInput from './FormInput';
import {
  GAME_IDLE,
  GAME_OVER,
  GAME_STARTED,
  GAME_PAUSED,
} from '../lib/game-status';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReadFile from './ReadFile';
import GridKonvas from './GridKonvas';

// { numbers, tileSize, gridSize, moves, seconds }
const Game = props => {
  const generateTiles = (numbers, gridSize, tileSize) => {
    const tiles = [];

    numbers.forEach((number, index) => {
      tiles[index] = {
        ...getTileCoords(index, gridSize, tileSize),
        width: props.tileSize,
        height: props.tileSize,
        number,
      };
    });

    return tiles;
  };

  const [tiles, setTiles] = useState(
    generateTiles(props.numbers, props.gridSize, props.tileSize),
  );
  const [gameState, setGameState] = useState(GAME_IDLE);
  const [moves, setMoves] = useState(props.moves);
  const [seconds, setSeconds] = useState(props.seconds);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // eslint-disable-next-line
  const [snackbarText, setSnackbarText] = useState('');

  let timerId = null;

  // End game by pressing CTRL + ALT + F
  const keyDownListener = key => {
    if (key.ctrlKey && key.altKey && key.code === 'KeyF') {
      const { original, gridSize, tileSize } = props;
      const solvedTiles = generateTiles(original, gridSize, tileSize).map((
        tile,
        index,
      ) => {
        tile.number = index + 1;
        return Object.assign({}, tile);
      });

      clearInterval(timerId);

      setGameState(GAME_OVER);
      setTiles(solvedTiles);
      setDialogOpen(true);
    }
  };

  document.addEventListener('keydown', keyDownListener);

  useEffect(() => {
    // const { tileSize, gridSize } = props;
    // const newTiles = generateTiles(props.numbers, gridSize, tileSize);
    // setGameState(GAME_IDLE);
    // setTiles(newTiles);
    // setMoves(0);
    // setSeconds(0);
    // clearInterval(timerId);
    // eslint-disable-next-line
    // if (image != undefined) console.log(image);
  });

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = reason => {
    setSnackbarOpen(false);
  };

  const isGameOver = tiles => {
    const correctedTiles = tiles.filter(tile => {
      return tile.tileId + 1 === tile.number;
    });

    if (correctedTiles.length === (props.gridSize) ** 2) {
      clearInterval(timerId);
      return true;
    } else {
      return false;
    }
  };

  const addTimer = () => {
    setSeconds(seconds + 1);
  };

  const setTimer = () => {
    timerId = setInterval(
      () => {
        addTimer();
      },
      1000,
    );
  };

  // const onPauseClick = () => {
  //   this.setState(prevState => {
  //     let newGameState = null;
  //     let newSnackbarText = null;

  //     if (prevState.gameState === GAME_STARTED) {
  //       clearInterval(this.timerId);
  //       newGameState = GAME_PAUSED;
  //       newSnackbarText = 'The game is currently paused.';
  //     } else {
  //       this.setTimer();
  //       newGameState = GAME_STARTED;
  //       newSnackbarText = 'Game on!';
  //     }

  //     return {
  //       gameState: newGameState,
  //       snackbarOpen: true,
  //       snackbarText: newSnackbarText,
  //     };
  //   });
  // };

  // eslint-disable-next-line
  const onTileClick = tile => {
    if (gameState === GAME_OVER || gameState === GAME_PAUSED) {
      return;
    }

    // Set Timer in case of first click
    if (moves === 0) {
      setTimer();
    }

    const { gridSize } = props;

    // Find empty tile
    const emptyTile = tiles.find(t => t.number === gridSize ** 2);
    const emptyTileIndex = tiles.indexOf(emptyTile);

    // Find index of tile
    const tileIndex = tiles.findIndex(t => t.number === tile.number);

    // Is this tale neighbouring the zero tile? If so, switch them.
    const d = distanceBetween(tile, emptyTile);
    if (d.neighbours) {
      let t = Array.from(tiles).map(t => ({ ...t }));

      invert(t, emptyTileIndex, tileIndex, [
        'top',
        'left',
        'row',
        'column',
        'tileId',
      ]);

      const checkGameOver = isGameOver(t);

      setGameState(checkGameOver ? GAME_OVER : GAME_STARTED);
      setTiles(t);
      setMoves(moves + 1);
      setDialogOpen(checkGameOver ? true : false);
    }
  };

  const actions = [
    <FlatButton key={1} label="Close" onClick={handleDialogClose} />,
  ];

  return (
    <div className={props.className}>
      <Menu
        seconds={seconds}
        moves={moves}
        onResetClick={props.onResetClick}
        onPauseClick={props.onPauseClick}
        gameState={gameState}
      />
      <div className="container">
        <FormInput />
        {/* <Grid
          gridSize={props.gridSize}
          tileSize={props.tileSize}
          tiles={tiles}
          onTileClick={onTileClick}
        /> */
        }
        <div>
          <ReadFile />
          <GridKonvas />
        </div>
      </div>

      <Dialog
        title="Congrats!"
        actions={actions}
        modal={false}
        open={dialogOpen}
        onRequestClose={handleDialogClose}
      >
        You ve solved the puzzle in{' '}
        {moves}
        {' '}moves in{' '}
        {seconds}
        {' '}seconds!
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        message={snackbarText}
        onRequestClose={handleSnackbarClose}
      />
    </div>
  );
};

Game.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  original: PropTypes.arrayOf(PropTypes.number),
  tileSize: PropTypes.number,
  gridSize: PropTypes.number,
  moves: PropTypes.number,
  seconds: PropTypes.number,
};

Game.defaultProps = {
  tileSize: 90,
  gridSize: 4,
  moves: 0,
  seconds: 0,
};

export default styled(Game)`
  flex: 1;

  .container {
    display: flex;
    flex-direction: row; 
    align-items: flex-start;
    margin-left: 10px;
  }
`;
