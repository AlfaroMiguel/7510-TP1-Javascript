String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};

var Rule = function(name, args, facts){
    this.name = name;
    this.genericArgs = args;
    this.genericFacts = facts;

    this.evaluate = function(args, database){
        for(genericFact of this.genericFacts){
            for(var i in args){
                var genericFact = genericFact.replaceAll(this.genericArgs[i], args[i]);
            }
            var fact = genericFact;
            if(!database.existFact(fact)){
                return false;
            }
        }
        return true;
    }

}

module.exports = Rule;