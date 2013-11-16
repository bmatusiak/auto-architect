"use strict";
var fs = require("fs");

var Architect = require("architect");
    
var EventEmitter = require('events').EventEmitter;

Architect.setup = function(pluginName,pluginDir,init){
    
return function(options, imports, register) {
    
    if(!imports.on || !imports.emit){
        var _events = new EventEmitter();
        imports.on = _events.on.bind(_events);
        imports.emit = _events.emit.bind(_events);
    }
    var pluginObject = imports;
    var registerObject = {};
    registerObject[pluginName] = pluginObject;
    
    
    if(!options.plugins){
        options.plugins = [];
        var dirList = fs.readdirSync(pluginDir);
        for(var i = 0; dirList.length >= i;i++){
            if(dirList[i] && dirList[i].indexOf("_.") !== 0){
                if(options.pluginOptions && options.pluginOptions[dirList[i]]){
                    options.pluginOptions[dirList[i]].packagePath = pluginDir+"/"+dirList[i];
                    options.plugins.push(options.pluginOptions[dirList[i]]);
                }else{
                    options.plugins.push(pluginDir+"/"+dirList[i]);
                }
            }
        }
    }
    
    var ArchitectConfig = Architect.resolveConfig(options.plugins, pluginDir);
    
    ArchitectConfig.push({
        packagePath:__dirname,
        consumes:["hub"],
        provides:[pluginName],
        setup:function($options, $imports, $register){
            $imports.hub.on("service", function(name, plugin) {
                if(!plugin.name)plugin.name = name;
                
                registerObject[pluginName][plugin.name] = plugin;
            });
            $imports.hub.on("ready", function(app) {
                var plugins = app.services;
                init(registerObject[pluginName], plugins);
                register(null, registerObject);
            });
            $register(null, registerObject);
        }
    });

    Architect.createApp(ArchitectConfig, function(err, architect) {
        if (err) {
            register(err);
        }
    });
    
    return imports;
};

};

module.exports = Architect;
