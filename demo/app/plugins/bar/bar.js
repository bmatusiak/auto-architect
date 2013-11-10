"use strict";

module.exports = function(options, imports, register) {
    
    register(null,{
        bar:{
            message:console.log.bind(console,"message in bar:")
        }
    });
    
};