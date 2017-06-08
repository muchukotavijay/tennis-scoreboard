'use strict';

var expect   = require('chai').expect,
    scorefixture = require('./fixtures/general'),
    scoreboard = require('../lib/scoreboard')('player 1', 'player 2', true),
    lodash = require('lodash');

describe('Score Card tests', function() {
    describe('score pointWonBy', function() {
        let act, exp, testdata;

        it('score and pointWonBy are functions', function() {
            expect(scoreboard.score).to.be.a('function');
            expect(scoreboard.pointWonBy).to.be.a('function');
        });

        it('score should return default scores', function() {
            testdata = ['player 1', 'player 2', 'player 1', 'player 2', 'player 1', 'player 2', 'player 1', 'player 2', 'player 1', 'player 2',]
            testdata.forEach((data) => {
                scoreboard.pointWonBy(data);
            });

            act = '0 - 0 , duce';
            exp = scoreboard.score();

            expect(act).to.deep.equal(exp);
        });

    });
});
