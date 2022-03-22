import React from 'react';
import styled from 'styled-components';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Moves from 'material-ui/svg-icons/action/compare-arrows';
import Replay from 'material-ui/svg-icons/av/replay';
import New from 'material-ui/svg-icons/action/power-settings-new';
import Submit from 'material-ui/svg-icons/action/done';
import Delete from 'material-ui/svg-icons/action/delete';
// import { GAME_STARTED, GAME_PAUSED } from '../lib/game-status';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
// import { TextField } from 'material-ui';

import { useSelector } from 'react-redux';

import type { BoardTiles } from '../lib/board';
import Board from '../lib/board';
import Solver from '../lib/solver';

// import {Graph, astar} from "../lib/astar";

const StyledToolbar = styled(Toolbar)`

@media (max-width: 1190px) {
  
  & {
    justify-content: center !important;
  }

  .toolbarTitle {
    display: none;
  }

}

@media (max-width: 890px) {

  .menuButton {
    margin: 10px 5px !important;
    min-width: 36px !important;
  }

  .menuIcon {
    margin-left: 0px !important;
  }

  .menuIcon+span {
    display: none !important;
  }

}

`;

const Menu = ({ seconds, moves, onResetClick }) => {
  const dataImage = useSelector(state => state.dataImage.dataImage);
  const imageState = useSelector(state => state.image.image);
  const onSolveClick = () => {
    let tiles: BoardTiles = new Array(imageState.row);

    for (let i = 0; i < tiles.length; i++) {
      tiles[i] = new Array(imageState.col);
    }

    dataImage.map(item => tiles[item.posY][item.posX] = parseInt(item.id));
    // console.log(tiles);
    const initial = new Board(0, tiles, imageState.maxSelection, null, {
      x: 0,
      y: 0,
    });
    const solver = new Solver(initial);

    solver
      .solve()
      .then((solution: SolverSolution) => {
        console.log('\nSolution found with the following moves:');
        console.log(solution);
        solution.states.filter((state: SolverState) =>
          console.log(state.board.toString()));
        console.log(`\nMinimum number of moves: ${solution.moves}`);
      })
      .catch((error: NotSolvableError) => {
        console.error(`[${error.name}]:`, error.message);
      });

    console.log(initial);
  };

  return (
    <StyledToolbar className="toolbar">
      <ToolbarTitle className="toolbarTitle" text="PROCON HCMUE" />
      <ToolbarGroup>
        <RaisedButton
          className="menuButton"
          label="Submit"
          onClick={onSolveClick}
          title="Start a new game"
          icon={<Submit className="menuIcon" />}
        />
        <RaisedButton
          className="menuButton"
          label="Delete"
          onClick={onSolveClick}
          title="Start a new game"
          icon={<Delete className="menuIcon" />}
        />

        <RaisedButton
          className="menuButton"
          label="Solve"
          onClick={onSolveClick}
          title="Start a new game"
          icon={<New className="menuIcon" />}
        />

        {/* <RaisedButton
          className="menuButton"
          label={gameState === GAME_PAUSED ? 'Continue' : 'Pause'}
          onClick={onPauseClick}
          icon={
            gameState === GAME_PAUSED
              ? <Play className="menuIcon" />
              : <Pause className="menuIcon" />
          }
          title="Pause/Continue current game."
          disabled={gameState !== GAME_STARTED && gameState !== GAME_PAUSED}
        /> */
        }
        <RaisedButton
          className="menuButton"
          label="Reset game"
          onClick={onResetClick}
          title="Reset game"
          icon={<Replay className="menuIcon" />}
        />
        <Chip>
          <Avatar icon={<Alarm />} />
          <MediaQuery query="(min-width: 772px)" component="span">
            Time Elapsed:{' '}
          </MediaQuery>
          {seconds}s
        </Chip>
        <Chip>
          <Avatar icon={<Moves />} />
          <MediaQuery query="(min-width: 772px)" component="span">
            Moves Counter:{' '}
          </MediaQuery>
          {moves}
        </Chip>
      </ToolbarGroup>
    </StyledToolbar>
  );
};

Menu.propTypes = {
  seconds: PropTypes.number.isRequired,
  moves: PropTypes.number.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onNewClick: PropTypes.func.isRequired,
  gameState: PropTypes.symbol.isRequired,
};

export default Menu;
