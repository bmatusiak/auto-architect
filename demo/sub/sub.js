"use strict";

module.exports = function(options, imports, register) {
    
    require("../../").setup("sub",__dirname+"/plugins",function(sub,subPlugins){
        
        for(var i in subPlugins){
            if(subPlugins[i].init)subPlugins[i].init();
        }
        
    })(options, imports, register);
    
};