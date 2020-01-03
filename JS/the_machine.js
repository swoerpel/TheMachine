// var paper = require('paper-jsdom-canvas');
var chroma = require("chroma-js");
var now = require("performance-now");
var chromotome = require("chromotome");
var MasterController = require("./MasterController.js");
var fs = require("fs");
var config = require("./config.js");
class Machine {
  constructor() {
    console.log("Building the MACHINE");
    this.canvas_params = config.canvas;
    this.build_color_library();
  }

  build_color_library() {
    let chromotome_palettes = chromotome.getAll();
    this.palettes = {};
    for (let i = 0; i < chromotome_palettes.length; i++) {
      let key = chromotome_palettes[i].name;
      this.palettes[key] = new Object(chromotome_palettes[i].colors);
    }
    this.palettes = { ...this.palettes, ...chroma.brewer };
    this.palette_names = Object.keys(this.palettes);
    // console.log(this.palettes)
  }

  Initialize(key, custom = false) {
    this.custom_mode = custom;
    this.static_params = config[key];
    let path_params = key.split("_");
    this.static_params.png_path = "../images//" + path_params[0] + "//";
    if(custom)
      this.static_params.png_path += "custom" + "//"// + path_params[1] + "//";
    else this.static_params.png_path += "group_" + path_params[1] + "//";
    this.estimateGenerationTime();
    return this.total_batch_time;
  }

  estimateGenerationTime() {
    console.log("estimating time...");
    let params = new Object(this.static_params);
    params.image_id = "time_estimate";
    params.palette = this.palette_names[
      Math.floor(Math.random() * this.palette_names.length)
    ];
    params.custom_mode = this.custom_mode
    params.save_image = false
    var start = now();
    this.generate_image(params);
    var end = now();
    this.interval_step = (end - start).toFixed(3) * 2;
    console.log("time interval step ->", this.interval_step);
    this.total_batch_time = Math.round(
      this.interval_step * this.palette_names.length
    );
  }

  Generate() {
    // will be loop once timing is  figured out
    let image_count = 0;
    let interval = setInterval(() => {
      console.log("image_count", image_count);
      if (image_count >= this.palette_names.length) {
        clearInterval(interval);
      }
      let params = new Object(this.static_params);
      params.palette = this.palette_names[image_count];
      params.image_id = params.palette;
      params.custom_mode = this.custom_mode
      params.save_image = true
      this.generate_image(params);
      image_count++;
    }, this.interval_step);
  }

  generate_image(params) {
    // console.log(params.palette)
    if (params.custom_mode){
      params.palette = 'binary'
      params.image_id = Math.floor(Math.random() * 1000000).toString()
    }
    let color_machine = chroma.scale(this.palettes[params.palette]);
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
    master_controller.SetCustomMode(params.custom_mode)
    master_controller.SetSaveImage(params.save_image)
    master_controller.GenerateImage(color_machine);
  }
}

module.exports = Machine;
