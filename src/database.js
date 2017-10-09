var Fact = require('./fact');
var Rule = require('./rule');

function InvalidDatabaseError(msj){
    this.name = "Invalid Database";
    this.message = msj;
}

var Database = function(parser){

    var parser = parser;
    var facts = [];
    var rules = [];

    this.create = function(rawDatabase){
        for (elem of rawDatabase){
            if(parser.isValidFact(elem)) {
                var rawFact = elem.slice(0, -1);
                var factName = parser.getName(rawFact);
                var factArgs = parser.getArgs(rawFact);
                facts.push(new Fact(factName, factArgs));
            }else if(parser.isValidRule(elem)){
                var rawRule = elem.slice(0, -1);
                var ruleName = parser.getName(rawRule);
                var ruleArgs = parser.getArgs(rawRule);
                var ruleFacts = parser.getRuleFacts(rawRule);
                rules.push(new Rule(ruleName, ruleArgs, ruleFacts));
            }else{
                throw new InvalidDatabaseError("The database does not respect the expected format");
            }
        }
    }

    this.existFact = function(query){
        for(fact of facts){
            if(fact.equal(query, parser)){
                return true;
            }
        }
        return false;
    }

    this.existRule = function (query) {
        var queryName = parser.getName(query);
        for(rule of rules){
            if(queryName == rule.name){
                return true;
            }
        }
        return false;
    }

    this.evaluateRule = function(rawRule){
        var genericRule;
        var ruleName = parser.getName(rawRule);
        for(rule of rules){
            if(ruleName == rule.name){
                genericRule = rule;
            }
        }
        var ruleArgs = parser.getArgs(rawRule);
        return genericRule.evaluate(ruleArgs, this);
    }

}

module.exports = Database;