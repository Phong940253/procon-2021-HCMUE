// @flow
// @todo: Add check to determine if a puzzle is possible or not

'use strict';

import Board from './board';

export type SolverState = {
  board: Board,
  moves: number,
  previous: ?SolverState,
};

export type SolverSolution = {
  states: Array<SolverState>,
  moves: number,
  solvable: boolean,
  context: Solver,
};

export type PriorityQueueItem = {
  priority: number,
  board: Board,
};

/**
 * Error for when a board is not solvable.
 */
export class NotSolvableError extends Error {
  solver: SolverSolution;
  constructor(solver: SolverSolution) {
    super('Board not solvable!');
    this.name = this.constructor.name;
    this.solver = solver;
  }
}

/**
 * Checks to see whether a provided board has been used within a queue.
 * @param {Board} board - The board to check against the queue.
 * @param {Array<SolverState>} queue - The queue to check in.
 * @returns boolean - true if the board has been used previously.
 */
export const hasBoardBeenUsed = (
  board: Board,
  queue: Array<SolverState>,
): boolean => {
  return !queue.every(state => !board.equals(state.board));
};

export default class Solver {
  /** The starting board we are solving for */
  start: Board;

  /** The goal board we are trying to get to */
  goal: Board;

  constructor(initial: Board) {
    this.start = initial;
    this.goal = new Board(1, initial.goal, initial.maxSelection, initial.goal);
  }

  /**
   * Main solver function. Continues searching for moves until the state board equals the goal board.
   */
  solve(): Promise<?SolverSolution> {
    let state: SolverState = {
      board: this.start,
      moves: 0,
      previous: null,
    };
    const history: Array<SolverState> = [state];

    return new Promise((resolve, reject) => {
      try {
        console.log('board: ', state.board);
        // console.log("start: ", this.start);
        console.log('goal: ', this.goal);
        // console.log(state.board.equals(this.goal));

        console.log('solving...');
        // while (!state.board.equals(this.goal)) {
        // console.log("solving...");
        state = this.getNextMove(state, history, 0, resolve);
        // history.push(state);
        // }
        // resolve({
        //   states: history,
        //   moves: state.moves,
        //   context: this,
        //   solvable: true,
        // });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  chooseBestMove(priority) {
    let curr, prev, bestOption;

    priority.map((item, index, arr) => {
      if (index == 0) {
        bestOption = item;
        return;
      }

      if (
        item.hamming === 0 && item.manhattan === 0 ||
        item.hamming < bestOption.hamming &&
          item.manhattan < bestOption.manhattan
      ) {
        bestOption = item;
        return;
      }
    });

    return bestOption.board;
  }

  /**
   * Checks all neighbors and determines which one is the most likely to lead to a solved puzzle,
   * then pushes that into the state.
   */
  getNextMove(
    state: SolverState,
    history: Array<SolverState>,
    depth: Number,
    resolve,
  ): SolverState {
    // console.log("get next move");
    // Create a new priority queue with all neighbors that haven't already been used
    if (depth >= 5) return;

    let history_copy = [...history];
    // console.log("c", history_copy.length);
    // console.log(history.length);
    history_copy.push(state);
    // console.log(history)
    if (state.board.equals(this.goal)) {
      resolve({
        states: history_copy,
        moves: state.moves,
        context: this,
        solvable: true,
      });
    }

    const neighbors = state.board.getNeighbors();
    // .filter(board => !hasBoardBeenUsed(board, history));
    // console.log('board', state.board);
    // console.log('neighbors', neighbors);

    const priority = this.createPriorityQueue(neighbors, state.moves);
    // If the priority queue is empty that means we've tried everything already
    // const bestOption = this.chooseBestMove(priority);
    // if (priority.length < 1) {
    //   console.log(`Queue length was less than 1.`);
    //   throw new NotSolvableError({
    //     states: history,
    //     moves: state.moves,
    //     context: this,
    //     solvable: false,
    //   });
    // }
    priority.map(item => this.getNextMove(
      {
        board: item.board,
        moves: state.moves + 1,
        previous: state,
      },
      history_copy,
      depth + 1,
      resolve,
    ));
    // Return a new state
    // return {
    //   board: priority,
    //   moves: state.moves + 1,
    //   previous: state,
    // };
  }

  /**
   * Creates a sorted priority queue from a group of boards.
   * @param {Array<Board>} boards - The group of boards the queue should be created from.
   * @returns Array<PriorityQueueItem> - A priority queue filled with the boards.
   */
  createPriorityQueue(
    boards: Array<Board>,
    moves: number,
  ): Array<PriorityQueueItem> {
    return boards
      .map(board => ({
        priority: board.getPriority(moves),
        board: board,
      }))
      .sort((a, b) => a.priority - b.priority);
  }
}
