var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter - parent db", function () {

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
            var errorName = "";
            try{
                interpreter.checkQuery('hijo(pepe, jua');
            }
            catch(e){
                errorName = e.name;
            };
            assert(errorName == "Invalid Query");
        });

        it('(cecilia) should throw a InvalidQueryError', function () {
            var errorName = "";
            try{
                interpreter.checkQuery('(cecilia)');
            }
            catch(e){
                errorName = e.name;
            };
            assert(errorName == "Invalid Query");
        });

        it('padre should throw a InvalidQueryError', function () {
            var errorName = "";
            try{
                interpreter.checkQuery('padre');
            }
            catch(e){
                errorName = e.name;
            };
            assert(errorName == "Invalid Query");
        });

    });


});


describe("Interpreter - number db", function () {

    var db = [
        "add(zero, zero, zero).",
        "add(zero, one, one).",
        "add(zero, two, two).",
        "add(one, zero, one).",
        "add(one, one, two).",
        "add(one, two, zero).",
        "add(two, zero, two).",
        "add(two, one, zero).",
        "add(two, two, one).",
        "subtract(X, Y, Z) :- add(Y, Z, X)."
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

        it('add(zero, zero, zero) should be true', function () {
            assert(interpreter.checkQuery('add(zero, zero, zero)'));
        });

        it('add(zero, zero, one) should be false', function () {
            assert(interpreter.checkQuery('add(zero, zero, one)') == false);
        });

        it('add(one, one, two) should be true', function () {
            assert(interpreter.checkQuery('add(one, one, two)'));
        });

        it('add(zero, two, two) should be true', function () {
            assert(interpreter.checkQuery('add(zero, two, two)'));
        });

        it('add(zero, two, zero) should be false', function () {
            assert(interpreter.checkQuery('add(zero, two, zero)') == false);
        });

        it('add(two, one, one) should be false', function () {
            assert(interpreter.checkQuery('add(two, one, one)') == false);
        });

        it('add(zero, one, two) should be true', function () {
            assert(interpreter.checkQuery('add(zero, one, two)') == false);
        });

    });

    describe('Interpreter Rules', function () {

        it('subtract(one, one, two) should be false', function () {
            assert(interpreter.checkQuery('subtract(one, one, two)') == false);
        });

        it('subtract(two, one, one) should be true', function () {
            assert(interpreter.checkQuery('subtract(two, one, one)'));
        });

        it('subtract(one, one, zero) should be true', function () {
            assert(interpreter.checkQuery('subtract(one, one, zero)'));
        });

        it('subtract(one, one, one) should be false', function () {
            assert(interpreter.checkQuery('subtract(one, one, one)') == false);
        });

        it('subtract(two, one, one) should be false', function () {
            assert(interpreter.checkQuery('subtract(two, one, one)'));
        });

    });


    describe("Interpreter - friends db", function () {

        var db = [
            "friend(pepe, juan).",
            "friend(juan, franco).",
            "friend(franco, pedro).",
            "friend(miguel, tomas).",
            "friend(tomas, pablo).",
            "friend(gabriel, miguel).",
            "friend(marcos, martin).",
            "enemy(miguel, martin).",
            "enemy(gabriel, marcos).",
            "enemy(miguel, pepe).",
            "enemy(tomas, juan).",
            "group(X, Y, Z) :- friend(X, Y), friend(Y, Z).",
            "fight(X, Y, Z, W) :- friend(X, Y), friend(Z, W), enemy(X, Z), enemy(Y, W)."
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

            it('friend(pepe, juan) should be true', function () {
                assert(interpreter.checkQuery('friend(pepe, juan)'));
            });

            it('friend(franco, pedro) should be true', function () {
                assert(interpreter.checkQuery('friend(franco, pedro)'));
            });

            it('friend(tomas, pablo) should be true', function () {
                assert(interpreter.checkQuery('friend(tomas, pablo)'));
            });

            it('friend(pepe, miguel) should be false', function () {
                assert(interpreter.checkQuery('friend(pepe, miguel)') == false);
            });

            it('friend(tomas, mariano) should be false', function () {
                assert(interpreter.checkQuery('friend(tomas, mariano)') == false);
            });

            it('friend(micaela, juan) should be false', function () {
                assert(interpreter.checkQuery('friend(micaela, juan)') == false);
            });

            it('enemy(miguel, pepe) should be true', function () {
                assert(interpreter.checkQuery('enemy(miguel, pepe)'));
            });

            it('enemy(tomas, juan) should be true', function () {
                assert(interpreter.checkQuery('enemy(tomas, juan)'));
            });

            it('enemy(pedro, juan) should be false', function () {
                assert(interpreter.checkQuery('friend(micaela, juan)') == false);
            });

            it('enemy(pepe, juan) should be false', function () {
                assert(interpreter.checkQuery('friend(micaela, juan)') == false);
            });

        });

        describe('Interpreter Rules', function () {

            it('group(pepe, juan, franco) should be true', function () {
                assert(interpreter.checkQuery('group(pepe, juan, franco)'));
            });

            it('group(miguel, tomas, pablo) should be true', function () {
                assert(interpreter.checkQuery('group(miguel, tomas, pablo)'));
            });

            it('group(pepe, juan, tomas) should be false', function () {
                assert(interpreter.checkQuery('group(pepe, juan, tomas)') == false);
            });

            it('group(tomas, pablo, pepe) should be false', function () {
                assert(interpreter.checkQuery('group(tomas, pablo, pepe)') == false);
            });

            it('fight(gabriel, miguel, marcos, martin) should be true', function () {
                assert(interpreter.checkQuery('fight(gabriel, miguel, marcos, martin)'));
            });

            it('fight(miguel, tomas, pepe, juan) should be true', function () {
                assert(interpreter.checkQuery('fight(miguel, tomas, pepe, juan)'));
            });

        });

    });

    describe("Interpreter - Incomplete db", function () {

        var db = [
            "varon(juan).",
            "varon"
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
        });

        afterEach(function () {
            // runs after each test in this block
        });


        describe('Incomplete database', function () {

            it('Incomplete database should throw InvalidDatabaseError', function () {
                var errorName = "";
                try{
                    interpreter.parseDB(db);
                }
                catch(e){
                    errorName = e.name;
                }
                assert(errorName == "Invalid Database");
            });

        });


        });
});

