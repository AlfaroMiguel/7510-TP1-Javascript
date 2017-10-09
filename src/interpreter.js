var Parser = require('./parser');
var Database = require('./database');

function InvalidQueryError(msj){
    this.name = "Invalid Query";
    this.message = msj;
}

var Interpreter = function () {
    var parser = new Parser();
    var db;

    this.parseDB = function (database) {
        db = new Database(parser);
        db.create(database);
    }

    this.checkQuery = function (query) {

        if(!parser.isValidFact(query)){
            throw new InvalidQueryError("The query does not respect the expected format");
        }
        if(db.existFact(query)) {
            return true;
        }
        if(db.existRule(query)){
            return db.evaluateRule(query);
        }
        return false;
    }
}

module.exports = Interpreter;


