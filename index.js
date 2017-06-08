'use strict';

const scoreBoard = require('./lib/scoreboard')('player 1', 'player 2');

scoreBoard.pointWonBy("player 1");
scoreBoard.pointWonBy("player 2");
// this will return "0-0, 15-15"
scoreBoard.score();

scoreBoard.pointWonBy("player 1");
scoreBoard.pointWonBy("player 1");
// this will return "0-0, 40-15"
scoreBoard.score();

scoreBoard.pointWonBy("player 2");
scoreBoard.pointWonBy("player 2");
// this will return "0-0, Deuce"
scoreBoard.score();

scoreBoard.pointWonBy("player 1");
// this will return "0-0, Advantage player 1"
scoreBoard.score();

scoreBoard.pointWonBy("player 1");
// this will return "1-0"
scoreBoard.score();
