// @flow

'use strict';

/** A two-dimensional array of board tiles. */
export type BoardTiles = number[][];
/** Coordinate reference for the empty tile in a board. */
export type TileCoord = {
  x: number,
  y: number,
};
/** Coordinate comparator object. */
export type CoordComparator = {
  board: TileCoord,
  goal: TileCoord,
};

/**
 * Gets the goal board based on a provided board.
 * @todo: this should be done via passing a length not a board.
 * @param {BoardTiles} board The board to determine a goal for.
 * @returns {BoardTiles} the goal board.
 */
export const getOriginBoard = (width: number, height: number): BoardTiles => {
  const range: number = width * height;
  const origin: BoardTiles = [];

  for (let i = 0, n = 0; i < height; ++i) {
    origin[i] = [];
    for (let j = 0; j < width; ++j, ++n) {
      origin[i][j] = n;
    }
  }
  console.log(origin);
  return origin;
};

/**
 * Flattens a board into a one-dimensional array for easier parsing.
 * @param {BoardTiles} board The board to flatten.
 * @returns {Array<number>} A one-dimensional array.
 */
export const flattenBoard = (board: BoardTiles): Array<number> => {
  return board.reduce((prev, cur) => prev.concat(cur));
};

/**
 * Finds the position of zero in a board and returns a coordinate for it
 * @param {BoardTiles} board Finds the position of zero within a board.
 * @returns {TileCoord} The tile coordinate of the empty tile.
 */
export const getZeroPosition = (board: BoardTiles): TileCoord => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] === 0) {
        return { x, y };
      }
    }
  }
  throw new Error('Board does not contain an empty tile.');
};

/**
 * Creates a new Board instance from an new 0 coordinate.
 * @param {BoardTiles} reference board to build the new board from
 * @param {TileCoord} position the new zero position (where to place the zero in the new board)
 * @param {TileCoord} oldPosition the old zero position (for efficiency reasons)
 * @returns a new board with zero at the provided position
 */
export const newBoardFromPosition = (
  reference: BoardTiles,
  goal: BoardTiles,
  width: Number,
  height: Number,
  position: TileCoord,
  oldPosition: TileCoord,
  maxSelection: Number,
  selectAction: ?Boolean = false,
): Board => {
  const tiles = reference.map(row => row.slice());
  // const movedVal = tiles[position.y][position.x]; // Value copy, don't reference copy
  // Replace the old 0 with the number being moved before assigning 0 to its new position
  if (!selectAction) {
    if (position.x >= width) position.x = 0;
    if (position.x < 0) position.x = width - 1;

    if (position.y >= height) position.y = 0;
    if (position.y < 0) position.y = height - 1;

    // console.log(position, oldPosition);
    const temp = tiles[oldPosition.y][oldPosition.x];
    tiles[oldPosition.y][oldPosition.x] = tiles[position.y][position.x];
    tiles[position.y][position.x] = temp;
    return new Board(1, tiles, maxSelection, goal, position);
  }
  return new Board(1, tiles, maxSelection - 1, goal, position);
};

/**
 * Board class.
 */
export default class Board {
  /** Reference to the provided board */
  board: BoardTiles;

  /** The board height */
  height: number;

  /** The board width */
  width: number;

  /** Reference to the goal board */
  goal: BoardTiles;

  /** The current position of zero */
  selectPos: TileCoord;

  maxSelection: number;

  constructor(
    type: number,
    tiles: BoardTiles,
    maxSelection: ?Number = 1,
    goal: ?BoardTiles = null,
    position: ?TileCoord = null,
  ) {
    if (type == 0) {
      this.height = tiles.length;
      this.width = tiles[0].length;
      this.selectPos = position;
      this.goal = tiles;
      this.board = getOriginBoard(this.width, this.height);
      this.maxSelection = maxSelection;
      // console.log("contructor 1");
    } else {
      this.height = tiles.length;
      this.width = tiles[0].length;
      this.selectPos = position;
      this.goal = goal;
      this.board = tiles;
      this.maxSelection = maxSelection;
      // console.log("contructor 2");
    }
  }

  /**
   * Returns a string representation of the board.
   * @returns {string} The board as a string.
   */
  toString(): string {
    return this.board
      .reduce((prev, cur) => `${prev}\n${cur.join(' ')}`, '')
      .replace(this.board[this.selectPos.y][this.selectPos.x], ' ');
  }

  /**
   * Compares two boards equality.
   * @param {BoardTiles} other The other board.
   * @returns {boolean} If the boards are equal.
   */
  equals(other: Board): boolean {
    const otherBoard = flattenBoard(other.board);
    return flattenBoard(this.board).every((val, i) => val === otherBoard[i]);
  }

  /**
   * Hamming priority function.
   * The number of blocks in the wrong position, plus the number of moves made so far to get to the state.
   * @param {number} moves The number of moves that have been taken.
   * @returns {number} The Hamming priority value.
   */
  hamming(moves: number = 0): number {
    // 1 should be at the 0 index, 2 at 1, etc.
    return flattenBoard(this.board).filter((n, idx) => {
      if (n === this.board[this.selectPos.y][this.selectPos.x]) {
        return false;
      }
      if (n !== idx + 1) {
        return true;
      }
    }).length + moves;
  }

  /**
   * Manhattan priority function.
   * The sum of the distances (vertical + horizontal) of blocks to their goal positions, plus the number of moves made so far.
   * @param {number} moves The moves taken so far.
   * @returns {number} The Manhattan priority value.
   */
  manhattan(moves: number = 0): number {
    const numTiles: number = this.height * this.width;
    let priority: number = moves;

    for (var i = 0; i < numTiles; i++) {
      const coords: CoordComparator = {};
      // Iterate through rows and see if the value exists
      for (var y = 0; y < this.board.length; y++) {
        const boardX = this.board[y].indexOf(i);
        // console.log("goalX: ", goalX);
        const goalX = this.goal[y].indexOf(i);
        if (boardX !== -1) {
          coords.board = { x: boardX, y };
        }
        if (goalX !== -1) {
          coords.goal = { x: goalX, y };
        }
        if (coords.hasOwnProperty('board') && coords.hasOwnProperty('goal')) {
          break;
        }
      }

      priority += Math.abs(coords.board.x - coords.goal.x) +
        Math.abs(coords.board.y - coords.goal.y);
    }

    return priority;
  }

  /**
   * Returns the lowest priority function result as this boards priority.
   * @param {number} moves The number of moves so far.
   * @returns {number} The current priority.
   */
  getPriority(moves: number): number {
    const hamming = this.hamming(moves);
    const manhattan = this.manhattan(moves);
    return hamming > manhattan ? manhattan : hamming;
  }

  /**
   * Gets the neighbors of the current board.
   * @returns {Array<Board>} An array of the neighboring boards.
   */
  getNeighbors(): Array<Board> {
    const result = [];
    const { selectPos, board, width, height, goal, maxSelection } = this;

    // Work from right to left since most puzzles favour that direction
    for (let i = 1; i > -2; i -= 2) {
      // Check horizontally first...
      if (selectPos.x + i >= -1 && selectPos.x + i <= width) {
        result.push(
          newBoardFromPosition(
            board,
            goal,
            width,
            height,
            {
              x: selectPos.x + i,
              y: selectPos.y,
            },
            selectPos,
            maxSelection,
          ),
        );
      }

      // Now vertically...
      if (selectPos.y + i >= -1 && selectPos.y + i <= height) {
        result.push(
          newBoardFromPosition(
            board,
            goal,
            width,
            height,
            {
              x: selectPos.x,
              y: selectPos.y + i,
            },
            selectPos,
            maxSelection,
          ),
        );
      }
    }

    if (maxSelection > 0) {
      for (let i = 0; i < width; ++i)
        for (let j = 0; j < height; ++j)
          result.push(
            newBoardFromPosition(
              board,
              goal,
              width,
              height,
              { x: i, y: j },
              null,
              maxSelection,
              true,
            ),
          );
    }
    return result;
  }
}
