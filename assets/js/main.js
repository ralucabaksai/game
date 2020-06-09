class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.element.classList.add("obstacle");
    board.appendChild(this.element);
    this._positionObstacle();
  }

  _positionObstacle() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}

const keyMap = {
  TOP: 38,
  RIGHT: 39,
  BOTTOM: 40,
  LEFT: 37,
};

const PLAYER_MOVE_STEP = 20;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 300;

class Player {
  element = document.querySelector(".player");
  x = 0;
  y = 0;
  lives = 2;

  // when new Player is called, `this` is created
  constructor() {
    // console.log(this.element)
    this._initMovement();
  }

  _initMovement() {
    // document.addEventListener("keydown", this._handleMovement.bind(this));
    document.addEventListener("keydown", this._movePlayer.bind(this));
  }

  _movePlayer(event) {
    this._handleMovement(event);
    setTimeout(() => {
      this._checkCollision();
    }, 0);
  }

  _handleMovement(event) {
    switch (event.keyCode) {
      case keyMap.TOP: {
        this.moveTop();
        break;
      }
      case keyMap.RIGHT: {
        this.moveRight();
        break;
      }
      case keyMap.BOTTOM: {
        this.moveBottom();
        break;
      }
      case keyMap.LEFT: {
        this.moveLeft();
        break;
      }
    }
  }

  moveTop() {
    const newY = this.y - PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveRight() {
    const newX = this.x + PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  moveBottom() {
    const newY = this.y + PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveLeft() {
    const newX = this.x - PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  _updatePosition() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
  _updateLives() {
    this.lives = this.lives - 1;
    if (this.lives < 0) {
      alert("Game over!");
      this.lives = 2;
    } else {
      alert("You lost 1 life");
    }
    document.querySelector(".lives").innerHTML = `Lives: ${this.lives}`;
  }
  _checkCollision() {
    // console.log("a");
    const arrayObstacles = document.querySelectorAll(".obstacle");
    // console.dir(arrayObstacles);
    for (let i = 0; i < arrayObstacles.length; i++) {
      if (this._collision(arrayObstacles[i])) {
        // console.log(this);
        // console.log(arrayObstacles[i]);
        this.x = 0;
        this.y = 0;
        this._updatePosition();
        this._updateLives();
      }
    }
  }
  _collision(obstacle) {
    const l1 = this.x;
    const t1 = this.y;
    const r1 = l1 + PLAYER_WIDTH;
    const b1 = t1 + PLAYER_HEIGHT;
    const l2 = parseInt(obstacle.style.left);
    const t2 = parseInt(obstacle.style.top);
    const b2 = t2 + OBSTACLE_HEIGHT;
    const r2 = l2 + OBSTACLE_WIDTH;
    if (b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2) return false;
    return true;
  }
  _isMoveInBoundaries(x, y) {
    if (y < 0) {
      return false;
    }

    if (x < 0) {
      return false;
    }

    if (x > MAP_WIDTH - PLAYER_WIDTH) {
      return false;
    }

    if (y > MAP_HEIGHT - PLAYER_HEIGHT) {
      return false;
    }

    return true;
  }
}
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const board = document.querySelector(".board");
const o1 = new Obstacle(getRandomInteger(20, 100), 0);
const o2 = new Obstacle(getRandomInteger(140, 220), 200);
const o3 = new Obstacle(getRandomInteger(260, 340), 0);
const o4 = new Obstacle(getRandomInteger(380, 460), 200);
const o5 = new Obstacle(getRandomInteger(500, 580), 0);
const o6 = new Obstacle(getRandomInteger(620, 700), 200);
const o7 = new Obstacle(getRandomInteger(740, 820), 0);
const o8 = new Obstacle(getRandomInteger(860, 960), 200);

const p = new Player();
// const pl = {
//   key: 'player',
//   test: function() {
//     console.log('test is called')
//   },
//   callMe: function () {
//     console.log(this);
//     this.test();
//   },
// };

// pl.callMe(); // pl -> this

// const doc = {
//   key: 'document',
// };

// // with bind we can hardcode the execution context(`this`)
// doc.callMe = pl.callMe.bind(pl);
// // console.log(doc);
// doc.callMe(); //
