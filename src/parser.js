var Parser = function(){

    this.isValidFact = function(factToCheck){
        var factPatt = /^[a-z]+\(([a-z]+, )*[a-z]+\)/;
        return factPatt.test(factToCheck);
    }

    this.isValidRule = function(ruleToCheck){
        var rulePatt = /^[a-z]+\(([A-Z]+, )*[A-Z]+\) :- (([a-z]+\(([A-Z]+, )*[A-Z]+\)), )*([a-z]+\(([A-Z]+, )*[A-Z]+\))\./;
        return rulePatt.test(ruleToCheck);
    }

    this.getName = function (rawFact){
        return rawFact.slice(0, rawFact.indexOf("("));
    }

    this.getArgs = function (rawQuery) {
        var args = rawQuery.slice(rawQuery.indexOf("(")+1, rawQuery.indexOf(")"));
        return args.split(", ");
    }

    this.getRuleFacts = function(rawRule){
        return rawRule.slice(rawRule.indexOf(":- ") + 3, rawRule.length).replace("),",").").split(". ");
    }

}

module.exports = Parser;