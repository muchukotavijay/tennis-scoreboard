'use strict';


module.exports = function(player1, player2, debug) {

    let self = {},
        standardScore = [0, 15, 30, 40],
        playersscores = [{
            'player': player1,
            'score': 0,
            'set': 0,
            'tiebreak': 0
        }, {
            'player': player2,
            'score': 0,
            'set': 0,
            'tiebreak': 0
        }];

    /**
     *   displays the score
     */

    self.score = () => {
        let score = validateScores() || '';

        if(!debug){
            console.log(score);    
        }else{
            return score;
        }
    };

    /**
     *   point won by player to update the score card
     */

    self.pointWonBy = (player) => {

        if (!player) {
            return;
        }

        if (isTieBreak()) {
            updateTieBreakScore(player);
        } else {
            updatePlayersScore(player);
            validateScores();
        }

    };

    /**
     *   score would be validate here to check duce or player wins or is it a tie break etc
     *   @returns {String}
     */

    let validateScores = () => {
        let score = '',
            setsScore = '';

        // check duce
        if (isDuce(player1, player2)) {
            score = 'duce';
        }
        // check advantage
        else if (getPlayersScore(player1) > 2 && getPlayersScore(player2) > 2 && Math.abs(getPlayersScore(player1) - getPlayersScore(player2)) === 1) {
            score = getAdvantageMessage(player1, player2);
        }
        // check if any player wins  
        else if (getPlayersScore(player1) > 3 || getPlayersScore(player2) > 3) {
            updatePlayersSet(player1, player2);
            score = score.concat(standardScore[getPlayersScore(player1)], ' - ', standardScore[getPlayersScore(player2)]);
        }
        // check tie break 
        else if (isTieBreak()) {
            score = score.concat('Tie Break : ', getPlayersTieBreakerScore(player1), ' - ', getPlayersTieBreakerScore(player2));
        }
        // update the score
        else {
            score = score.concat(standardScore[getPlayersScore(player1)], ' - ', standardScore[getPlayersScore(player2)]);
        }

        setsScore = setsScore.concat(getPlayersSet(player1), ' - ', getPlayersSet(player2));
        score = setsScore.concat(' , ', score);

        if (isGameOver()) {
            score = isGameOver();
        }

        return score;

    };

    /**
     *   to get the player score
     *   @param {String} player
     *
     *   @returns {String}
     */

    let getPlayersScore = (player) => {
        let score = '';
        playersscores.some((playerscore) => {
            if (playerscore.player === player) {
                score = playerscore.score;
            }
        });

        return score;
    };

    /**
     *   update the player score
     *   @param {String} player
     *
     */

    let updatePlayersScore = (player) => {
        playersscores.some((playerscore) => {
            if (playerscore.player === player) {
                playerscore.score++;
            }
        });
    };

    /**
     *   check duce
     *   @param {String} player1
     *   @param {String} player2
     *
     *   @returns {Boolean}
     */

    let isDuce = (player1, player2) => {
        let duce = false;
        if (getPlayersScore(player1) === getPlayersScore(player2) && getPlayersScore(player1) > 2) {
            duce = true;
        }
        return duce;
    };

    /**
     *   get advantage message
     *   @param {String} player1
     *   @param {String} player2
     *
     *   @returns {String}
     */

    let getAdvantageMessage = (player1, player2) => {
        let advantageMsg = '';
        if (getPlayersScore(player1) > getPlayersScore(player2)) {
            advantageMsg = advantageMsg.concat('Advantage ', player1);
        } else {
            advantageMsg = advantageMsg.concat('Advantage ', player2);
        }
        return advantageMsg;
    };

    /**
     *   To update the players set
     *   @param {String} player1
     *   @param {String} player2
     *
     */    

    let updatePlayersSet = (player1, player2) => {
        if (getPlayersScore(player1) > 3) {
            playersscores[0].set++;
        } else if (getPlayersScore(player2) > 3) {
            playersscores[1].set++;
        }
        resetScores();
    };

    /**
     *   returns the player set
     *   @param {String} player1
     *   @param {String} player2
     *
     *   @returns {String}
     */  

    let getPlayersSet = (player) => {
        let set = 0;
        if (player === 'player 1') {
            set = playersscores[0].set;
        } else if (player === 'player 2') {
            set = playersscores[1].set;
        }

        return set;
    };

    /**
     *   Updates the tie break score
     *   @param {String} player
     *
     *   @returns {String}
     */ 

    let updateTieBreakScore = (player) => {
        if (player === 'player 1') {
            playersscores[0].tiebreak++;
        } else if (player === 'player 2') {
            playersscores[1].tiebreak++;
        }
        isGameOver();
    };

    /**
     *   get the players tie breaker score
     *   @param {String} player
     *
     *   @returns {String}
     */ 

    let getPlayersTieBreakerScore = (player) => {
        let tieBreakerScore = 0;
        if (player === 'player 1') {
            tieBreakerScore = playersscores[0].tiebreak;
        } else if (player === 'player 2') {
            tieBreakerScore = playersscores[1].tiebreak;
        }

        return tieBreakerScore;
    };

     /**
     *   check if it is a tie break point
     */ 

    let isTieBreak = () => {
        let isTieBreak = false;
        if (getPlayersSet(player1) >= 6 && getPlayersSet(player2) >= 6) {
            isTieBreak = true;
        }

        return isTieBreak;
    };

    /**
     *   check if the game is over
     *
     *   @returns {String}
     */ 

    let isGameOver = () => {
        let winnerMsg = '',
            diff = getPlayersTieBreakerScore(player1) - getPlayersTieBreakerScore(player2);

        if (isTieBreak()) {
            if ((Math.abs(diff) > 1) && (getPlayersTieBreakerScore(player1) > 6 || getPlayersTieBreakerScore(player2) > 6)) {
                if (diff > 0) {
                    winnerMsg = player1 + ' won the game';
                } else {
                    winnerMsg = player2 + ' won the game';
                }
            }
        } else if (Math.abs(getPlayersSet(player1) - getPlayersSet(player2)) > 1) {
            if (getPlayersSet(player1) > getPlayersSet(player2) && getPlayersSet(player1) >= 6) {
                winnerMsg = player1 + ' won the game';
            } else if (getPlayersSet(player2) > getPlayersSet(player1) && getPlayersSet(player2) >= 6) {
                winnerMsg = player2 + ' won the game';
            }
        }

        return winnerMsg;
    };

    /**
     *   defaults the scores
     */ 

    let resetScores = () => {
        playersscores[0].score = 0;
        playersscores[1].score = 0;
    };

    return self;
};
