"use strict";

module.exports = function(options, imports, register) {
    
    imports.bar.message("from foo");
    
    register(null,{
        foo:{
            message:console.log.bind(console,"message in foo:")
        }
    });
    
};