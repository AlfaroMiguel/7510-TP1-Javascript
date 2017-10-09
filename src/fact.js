var Fact = function(name, args){
    this.name = name;
    this.args = args;

    this.equal = function(query, parser){
        var queryName = parser.getName(query);
        var queryArgs = parser.getArgs(query);
        if(queryName == this.name){
            for(var i in this.args){
                if( queryArgs[i] != this.args[i]){
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}

module.exports = Fact;