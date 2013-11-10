"use strict";

module.exports = function(options, imports, register) {
    
    imports.bar.message("from foo(sub)");
    
    register(null,{
        foo:{
            message:console.log.bind(console,"message in bar(sub):")
        }
    });
    
};