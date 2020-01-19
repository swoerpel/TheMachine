

var graphic;
var info_graphic;
var color_machine = chroma.scale([params.colors.x,params.colors.y])
function setup() {
  frameRate(32)
  console.log(params.grid)
  let canvas = createCanvas(params.canvas.width,params.canvas.height);
  canvas.background(params.colors.background);
  reset();
  generate_ifs_grid();
}


function generate_ifs_grid(){
  let ifs_params = ifs[params.data.type];
  console.log(ifs_params)
  let load_params;
  if(ifs_params.load != ''){
    load_params = load_seed('califlower')
    console.log(load_params)
  }
  else{
    load_params = [];
    
    for(let i = 0; i < ifs_params.functs.length; i++){
      let funct = [];
      for(let j = 0; j < ifs_params.functs[i].vars.length; j++){
        // console.log(ifs_params.functs[i].vars[j])
        let constant = ifs_params.functs[i].vars[j]
        let val = constant == 'rand' ? round_(Math.random()) : constant
        funct.push(val)
      }
      load_params.push(funct);
      
    }
  }
  console.log(load_params)
  let base_ifs = new TradIFS(load_params,ifs_params.iterations,50) 
  base_ifs.generateValues()
  console.log(base_ifs)
  draw_ifs(base_ifs);
}

function round_(N,acc = 100000){
  return Math.round(N * acc) / acc
}


function reset(){
  params.grid.tile_size = new Object(
    {
      x:params.main_graphic.width / params.grid.width,
      y: params.main_graphic.height / params.grid.height
    }
  );

  params.info_graphic.width = params.canvas.width - params.main_graphic.width;
  params.info_graphic.height = params.canvas.height

  graphic = createGraphics(params.main_graphic.width,params.main_graphic.height);
  graphic.background('black');

  info_graphic = createGraphics(params.info_graphic.width,params.info_graphic.height);
  info_graphic.background(params.info_graphic.background)
  
  draw_tiles();
  draw_info();

  image(graphic,0,0)
  image(info_graphic,params.main_graphic.width,0)
}

function draw_info(){
  info_graphic.textSize(60)
  info_graphic.text('chet',
        params.info_graphic.width * params.info_graphic.margin.x, 
        params.info_graphic.height * params.info_graphic.margin.y)

}


function draw_ifs(ifs_data){
  let origin = {x:0,y:0}
  graphic.translate(params.grid.tile_size.x/2,params.grid.tile_size.y/2);
  graphic.stroke('black')

  graphic.strokeWeight(50)
  for(let i = 0; i < ifs_data.values.length; i++){
    let ifs_width = ifs_data.extrema.x.max - ifs_data.extrema.x.min
    let ifs_height = ifs_data.extrema.y.max - ifs_data.extrema.y.min
    
    // console.log('ifs width and height',ifs_width,' - ',ifs_height)
    let x_min = ifs_data.extrema.x.min
    let x_max = ifs_data.extrema.x.max
    let y_min = ifs_data.extrema.y.min
    let y_max = ifs_data.extrema.y.max
    let x = ifs_data.values[i].x 
    let y = ifs_data.values[i].y
    let scaled_x;
    let scaled_y;
    // if(x < 0)
      scaled_x = x / (ifs_width / 2)
    // else
      // scaled_x = x / x_max
    // if(y < 0)
      scaled_y = y / (ifs_height / 2)
    // else
      // scaled_y = y / y_max
    // console.log(scaled_x,scaled_y)

    // console.log(ifs_data.values[i])
    graphic.strokeWeight(5)
    graphic.point(scaled_x * params.grid.tile_size.x / 2,scaled_y * params.grid.tile_size.y / 2)
  }
  graphic.point(0,0)
  image(graphic,0,0)
}

function draw_tiles(){
  let gs = Math.sqrt(params.grid.width * params.grid.width + params.grid.height * params.grid.height)
  for(let i = 0; i < params.grid.width; i++){
    for(let j = 0; j < params.grid.height; j++){
      let x = i * params.grid.tile_size.x
      let y = j * params.grid.tile_size.y
      let s = Math.sqrt(i * i + j * j)
      let t = 0.1
      let color_val = s / gs
      // graphic.fill(color_machine(color_val).hex())
      graphic.strokeWeight(40)
      graphic.stroke(color_machine(color_val).hex())
      // graphic.stroke('black')
      graphic.rect(x,y,params.grid.tile_size.x,params.grid.tile_size.y)
    }
  }
}


function keyPressed() {
  if (keyCode === 37) 
    params.grid.width--;
  if (keyCode === 39) 
    params.grid.width++;
  if (keyCode === 38) 
    params.grid.height++;
  if (keyCode === 40) 
    params.grid.height--;
  // console.log('key pressed:', keyCode)
  // reset()
}

function draw() {

}


// var saveImage = () => {
//     console.log('saving image')
//     let localURL = 'C:\\File\\Art\\transforms2.0\\'
//     let imageName = prompt("Please Enter an Image Name");
//     console.log('image name', imageName)
//     let graphic = T.GetGraphic()
//     save(graphic, imageName, 'png')
// }

// function keyPressed() {

//     if (keyCode == 80)  // print ants (p)
//     {
//         let all_points = T.GetAllPoints()
//         console.log(all_points)
//         let points_strings = []
//         all_points[0].map((p, index) => {
//             if (index < 25000) {
//                 let x = Math.round(p.x * 100) / 100
//                 let y = Math.round(p.y * 100) / 100
//                 points_strings.push([x, y])
//             }
//         })
//         console.log(points_strings)
//         download_csv(points_strings)
//     }
// }

// function download_csv(data) {
//     var csv;

//     data.map((row) => {
//         csv += row.join(',');
//         csv += "\n";
//     });

//     console.log(csv);
//     var hiddenElement = document.createElement('a');
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = 'people.csv';
//     hiddenElement.click();
// }










//====================================================================================================
//====================================================================================================
//====================================================================================================



/*


//+0.0089-0.9702-0.675+0.0844+0.3041+0.3336+0.4735-0.1982-0.0845-0.4997-0.972-0.9981

load_params = load_seed('califlower')
default_parameters = load_params
var selected_parameter_index = 0;
var param_delta = .05
let canvas_params = {
  x: 1000,// * 2 * 2,
  y: 1000,
  edge_buffer: 0.1,
  filter: 500 // 1.0: no filter, 0.0: full filter
}
let IFS_params = {
  transform_params: load_params,
}

let params = {
  steps: 10000,
  filter: 100, //will change to a percentage
  scale: 1,
}



var ifs;
var ifs_ary = [];
var values;
var filtered_points;
var extrema;
var graphic;
var saveOn = false;
var toggle_draw = true
var color_value = 0;
var save_counter = 0;
var save_id = makeid(6);
var palette = 'blues'
var master_colors = chroma.brewer[palette].reverse();
console.log('master colors', palette, master_colors)



// function preload(){
//     // let config_ifs = loadJSON('config_ifs.json');	
//     console.log(config_ifs)
// }
console.log(config_ifs)
function setup() {

  canvas = createCanvas(canvas_params.x, canvas_params.y);
  graphic = createGraphics(canvas_params.x, canvas_params.y)
  graphic.translate(canvas_params.x / 2, canvas_params.y / 2)

  graphic.background('white')
  GenenerateIFS(load_params);
  color_value = ((color_value + 1) % master_colors.length) // master_colors.length
  incrementSteps();

}

function draw() {
  if (toggle_draw) {
    image(graphic, 0, 0)
    if (saveOn) {

      let filename = save_id + "_" + nf(save_counter, 3, 0) + ".png";
      console.log('saved ', filename)
      console.log('image saved', filename)
      save(filename);
      save_counter++;
      saveOn = false
    }
    toggle_draw = false;
  }
}
var toggleSave = () => {
  saveOn = true
}

var GenenerateIFS = (load_params) => {
  //new organized call order
  ifs = new IFS(load_params, params.steps, params.filter);
  ifs.generateValues()
  ifs_ary.push(ifs);
}

function keyPressed() {
  if (keyCode === 32)  //  calculate and draw N more steps on current ifs (space)
  {

    incrementSteps();
  }
  if (keyCode === 18)  //  export csv (alt)
    exportValues();
  if (keyCode == 187 || keyCode == 189) //+
    modifySelectedParameter(keyCode);
  if (keyCode >= 48 && keyCode <= 57)
    setSelectedParameter(keyCode);
  if (keyCode == 81)
    toggleSave()
  if (keyCode === 82)  // new grid (n)
    Reset()
  if (keyCode === 83)  //  (s)
    GenenerateIFS(load_params);
  if (keyCode === 67) // color reset (c)
    resetColorValue();
  if (keyCode === 190)
    incColorValue();
  if (keyCode === 188)
    decColorValue();
  console.log('key pressed:', keyCode)
}

incColorValue = () => {
  color_value = ((color_value + 1) % master_colors.length) // master_colors.length
  console.log('inc-ed color index', color_value)

}
decColorValue = () => {
  color_value -= 1;
  if (color_value < 0)
    color_value = master_colors.length
  console.log('dec-ed color index', color_value)
}

var resetColorValue = () => {
  color_value = 0
  console.log('color index reset', color_value)
}

function incrementSteps(colors = [master_colors[color_value]]) {
  console.log('generating more steps for current ifs...')
  let ifs = ifs_ary[ifs_ary.length - 1]
  // console.log('current ifs', ifs)
  ifs.generateValues(params.steps);//saved internal to ifs
  // console.log('drawing calculated steps for current ifs...')
  let values = ifs.filterValues(ifs.getValues());
  // console.log('filtered values', values)
  let extrema = ifs.getExtrema();
  // console.log('extrema', extrema)
  toggle_draw = true;
  sw = 2;
  graphic.strokeWeight(sw)
  graphic.stroke(colors[0])
  values.map((p) => {
    let xbounds = {
      min: -canvas_params.x / 2 + canvas_params.x / 2 * canvas_params.edge_buffer,
      max: canvas_params.x / 2 - canvas_params.x / 2 * canvas_params.edge_buffer
    }
    let ybounds = {
      min: -canvas_params.y / 2 + canvas_params.y / 2 * canvas_params.edge_buffer,
      max: canvas_params.y / 2 - canvas_params.y / 2 * canvas_params.edge_buffer
    }
    let scaled_x = map(p.x, extrema.x.min, extrema.x.max, xbounds.min, xbounds.max)
    let scaled_y = map(p.y, extrema.y.min, extrema.y.max, ybounds.min, ybounds.max)
    graphic.point(scaled_x, scaled_y)
  })
}


var Reset = () => {
  if (keyIsDown(17)) //ctrl resets parameters to default
  {
    load_parameters = default_parameters;
  }
  else {
    // ifs_ary = new Array();
    clear();
    setup();
  }
}

var setSelectedParameter = (code) => {
  console.log('selected parameter change', code - 48)
  selected_parameter_index = code - 48
  ifs_ary = new Array()
}

var flaten_params = () => {
  return load_params.flat()
}
var unflatten_params = (params) => {
  let index = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      load_params[i][j] = params[index];
      index++;
    }
  }
}

var modifySelectedParameter = (code) => {

  // console.log(load_params.flat(), load_params)
  load_params_flat = flaten_params()
  code == 187 ?
    load_params_flat[selected_parameter_index] += param_delta :
    load_params_flat[selected_parameter_index] -= param_delta
  console.log('current paramter index', selected_parameter_index, load_params_flat[selected_parameter_index])
  unflatten_params(load_params_flat)
  GenenerateIFS(load_params, [master_colors[ifs_ary.length % master_colors.length]]);
}




var exportValues = () => {
  let scaled_points = []
  values.map((p) => {
    let x = map(p.x, extrema.x.min, extrema.x.max, -1, 1)
    let y = map(p.y, extrema.y.min, extrema.y.max, -1, 1)
    let fx = Math.round(x * canvas_params.filter) / canvas_params.filter
    let fy = Math.round(y * canvas_params.filter) / canvas_params.filter
    scaled_points.push({ x: fx, y: fy })
  })
  // console.log(scaled_x,scaled_y)
  var csv = 'x,y\n';
  scaled_points.forEach((p) => {
    csv += p.x.toString() + ',' + p.y.toString() + "\n";
  });

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  let encoded_params = ifs.getEncodedParams()
  console.log('exporting CSV', encoded_params)
  hiddenElement.download = encoded_params + '.csv';
  hiddenElement.click();
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function load_seed(seed_id) {
  let seeds = {
    'leaf_bois': [[-0.6466558, 0.12387177, -0.53947019, -0.69715325, 0.77943671, -0.79004337],
    [0.59591638, -0.0258686, -0.40476259, -0.62336581, -0.39510686, -0.13025707]],
    'chet_bois': [[0.76832497, -0.75066203, 0.66118018, 0.1483618, -0.17053463, -0.21652481],
    [0.51233157, -0.38954531, 0.2008771, 0.58077079, 0.10759817, 0.77734813]],

    'stalags': [[0.88396032, 0.22063894, 0.20292951, 0.567214, -0.10332333, 0.66799224],
    [-0.08923335, -0.75483106, -0.53338819, 0.801923, -0.27279865, -0.3211181]],

    'paintBrush':
      [[-0.65528484, 0.31520157, 0.13575914, 0.50665012, 0.64990745, 0.57546619],
      [-0.94684552, -0.18767946, -0.09292563, 0.63450593, 0.24349842, -0.28090146]],

    'strokes':
      [[-0.19915228, -0.8981415, 0.72326924, -0.47651867, 0.02816197, 0.46517965],
      [0.24453893, -0.5577731, 0.90412684, -0.33577616, 0.18344771, 0.26639198]],

    'flowerboi':
      [[-0.1715, -0.6509, -0.4434, -0.0154, -0.4762, -0.78],
      [-0.8277, 0.5572, -0.263, -0.7199, 0.4776, 0.387]],

    'curl': //chets default debug image
      [[0.0089, -0.9702, -0.6750, 0.0844, 0.3041, 0.3336],
      [0.4735, -0.1982, -0.0845, -0.4997, -0.9720, -0.9981]],

    'califlower':
      [[0.9214517035925556, -0.20837734212381687, -0.8778739878894375, -0.7268201634085902, 0.3881429703646999, -0.0903587572158262],
      [0.18925913979345932, 0.36237031426907107, -0.2666231584559582, 0.5703776429844525, -0.808166850064028, -0.32778035894084745]],

  }
  return seeds[seed_id]
}

*/