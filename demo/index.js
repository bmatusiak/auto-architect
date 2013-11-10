var Architect = require("../");

var config = [
   {
        packagePath:"./app",
        /* //for dir auto loading. if not defined, "./app" options will be sent
        pluginOptions:{
            session:{
                key:"session.key",
                secret:"CHANGEME"
            }
        }
        */
        /* //for production loading does not use pluginOptions if defined
        plugins:[
            {
                packagePath:"./session",
                key:"session.key",
                secret:"CHANGEME"
            }
        ]
        */
        
    }
    
    ,"./sub"
        
];

var resolvedConfig = Architect.resolveConfig(config, __dirname + "/");

Architect.createApp(resolvedConfig, function(err, architect) {
    if (err) {
        console.log(err);
        throw err;
    }else{
        console.log("Architect App Loaded!");
    }
});

