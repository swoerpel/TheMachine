var chroma = require("chroma-js");
var now = require("performance-now");
var chromotome = require("chromotome");
var fs = require("fs");
var config = require("./config/config_repeater.json");

class Repeater{
    constructor(){
        console.log('Lets Repeat Baby')
        this.params = new Object(config)
        console.log('PARAMS',this.params)
    }

    



    
}

module.exports = Repeater;