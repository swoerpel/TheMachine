// var paper = require('paper-jsdom-canvas');
var chroma = require('chroma-js')
var now = require("performance-now");
var chromotome = require('chromotome');
var MasterController = require('./MasterController.js');
var fs = require('fs');
var config = require('./config.js')
class Machine {
    constructor(){
        console.log('Building the MACHINE')
        this.canvas_params = config.canvas
        this.build_color_library();
    }

    build_color_library(){
        let chromotome_palettes = chromotome.getAll();
        this.palettes = {};
        for(let i = 0; i < chromotome_palettes.length; i++){
            let key = chromotome_palettes[i].name
            this.palettes[key] = new Object(chromotome_palettes[i].colors)
        }
        this.palettes = {...this.palettes, ...chroma.brewer}
        this.palette_names = Object.keys(this.palettes);
        // console.log(this.palettes)
    }

    Initialize(key){
        this.static_params = config[key]
        this.static_params.png_path = '../images//' + key + '//';
        this.estimateGenerationTime();
        return this.total_batch_time;

    }

    estimateGenerationTime(){
        console.log('estimating time...')
        let params = new Object(this.static_params)
        params.image_id = 'time_estimate'
        params.palette = this.palette_names[Math.floor(Math.random() * this.palette_names.length)]
        var start = now();
        this.generate_image(params);
        var end = now();
        this.interval_step = (end-start).toFixed(3) * 2
        console.log("time interval step ->", this.interval_step)
        this.total_batch_time = Math.round(this.interval_step * this.palette_names.length)
    }

    Generate(){
        // will be loop once timing is  figured out
        let image_count = 0;
        let start = now();
        let interval = setInterval(()=>{
            console.log('image_count', image_count)
            if(image_count >= this.palette_names.length){
                clearInterval(interval);
            }
            let params = new Object(this.static_params)
            // params.image_id = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            params.palette = this.palette_names[image_count]
            params.image_id = params.palette
            this.generate_image(params);
            image_count++;
        },this.interval_step)
        let end = now();
        console.log('total time taken to generate ', this.palette_names.length, ' images ->',(end-start).toFixed(3))
    }


    generate_image(params) {
        let color_machine = chroma.scale(this.palettes[params.palette])
        let master_controller = new MasterController();
        master_controller.SetPaths(params.png_path, params.png_path);
        master_controller.SetStepShape(params.step_shape);
        master_controller.SetStepPath(params.step_path);
        master_controller.SetColorPath(params.color_path);
        master_controller.SetGridScale(params.grid_scale);
        master_controller.SetGridSize(params.grid_size);
        master_controller.SetImageId(params.image_id);
        master_controller.SetStrokeWeights(params.stroke_weights);
        master_controller.SetRotation(params.rotation);
        master_controller.SetSubShapes(params.sub_shapes);
        master_controller.SetSubStrokeWeights(params.sub_stroke_weights);
        master_controller.GenerateImage(color_machine);
    }
}

module.exports = Machine;

