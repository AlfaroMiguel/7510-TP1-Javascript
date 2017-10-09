var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(pepe) should be true', function () {
            assert(interpreter.checkQuery('varon(pepe)'));
        });

        it('varon(hector) should be true', function () {
            assert(interpreter.checkQuery('varon(hector)'));
        });

        it('varon(roberto) should be true', function () {
            assert(interpreter.checkQuery('varon(roberto)'));
        });

        it('varon(alejandro) should be true', function () {
            assert(interpreter.checkQuery('varon(alejandro)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(maria) should be true', function () {
            assert(interpreter.checkQuery('mujer(maria)'));
        });

        it('varon(cecilia) should be false', function () {
            assert(interpreter.checkQuery('varon(cecilia)') == false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

        it('padre(roberto, cecilia) should be true', function () {
            assert(interpreter.checkQuery('padre(roberto, cecilia)'));
        });

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)'));
        });

        it('hijo(pepe, roberto) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepe, roberto)') === false);
        });
        it('hija(maria, hector) should be true', function () {
            assert(interpreter.checkQuery('hija(maria, hector)'));
        });
        it('hijo(pepa, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepa, juan)') === false);
        });

    });

    describe('Interpreter Errors', function () {

        it('hijo(pepe, jua should throw a InvalidQueryError', function () {
            try{
                interpreter.checkQuery('hijo(pepe, jua');
            }
            catch(e){
                assert(e.name == "Invalid Query");
            };
        });

        it('(cecilia) should throw a InvalidQueryError', function () {
            try{
                interpreter.checkQuery('(cecilia)');
            }
            catch(e){
                assert(e.name == "Invalid Query");
            };
        });

        it('padre should throw a InvalidQueryError', function () {
            try{
                interpreter.checkQuery('padre');
            }
            catch(e){
                assert(e.name == "Invalid Query");
            };
        });

    });


});


