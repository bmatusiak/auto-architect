"use strict";

module.exports = function(options, imports, register) {
    
    imports.sub.app.foo.message("from bar(sub)");
    
    register(null,{
        bar:{
            message:console.log.bind(console,"message in bar(sub):")
        }
    });
    
};