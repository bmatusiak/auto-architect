"use strict";

module.exports = function(options, imports, register) {
    
    require("../../").setup("app",__dirname+"/plugins",function(app,subPlugins){
        
        for(var i in subPlugins){
            if(subPlugins[i].init)subPlugins[i].init();
        }
        
    })(options, imports, register);
    
};