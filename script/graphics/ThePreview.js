var graphic;
var grid;
var params;
var mouse;
var pause = false;
var color_palette;
var color_palette_name;
var color_machine;
var shape_machine;
var palettes;
var palette_names;
var params;
var draw_index = 0;
var color_offset = Math.random()
// var zoom = 1;

function setup() {
  params = new Object(config_preview);
  Refresh();
  build_color_library();
  setup_colors();
  setup_shapes();
  frameRate(params.frame_rate)
  
}

function build_color_library() {
  palettes = {};
  for (let i = 0; i < chromotome_palettes.length; i++) {
    let key = chromotome_palettes[i].name;
    this.palettes[key] = new Object(chromotome_palettes[i].colors);
  }
  palettes = { ...palettes, ...chroma.brewer };
  palette_names = Object.keys(palettes);
  // console.log(palettes)
}

function setup_colors(){
  if(params.colors.points_palette == 'random' || params.colors.points_palette == ''){
    let keys = Object.keys(palettes)
    let rand_index = Math.floor(Math.random() * keys.length)
    color_palette_name = keys[rand_index]
  }else{
    color_palette_name = params.colors.points_palette
  }
  color_palette = palettes[color_palette_name]
  color_machine = chroma.scale(color_palette)
  console.log('color palette',color_palette_name,color_palette)
}

function setup_shapes(){
  // console.log(ShapeTriangle)
  if(params.shape.type == 'rectangle')
    shape_machine = new ShapeRectangle(color_machine);
  if(params.shape.type == 'circle')
    shape_machine =new ShapeCircle(color_machine);
  if(params.shape.type == 'triangle')
    shape_machine =new ShapeTriangle(color_machine);
  if(params.shape.type == 'custom')
    shape_machine =new ShapeCustom(color_machine);
  // if(params.shape.type == '')
    // shape_machine =new ShapeBlock(color_machine);
  // if(params.shape.type == '')
    // shape_machine =new ShapeBlock(color_machine);
  // if(params.shape.type == '')
  //   shape_machine =new ShapeBlock(color_machine);
  if(!shape_machine)
    throw "ERROR: incorrect shape setting"
  console.log('new shape machine', shape_machine)
}

function Refresh(loaded_base_params = []){
  let grid_master = new GridMaster(params);
  grid_master.InitializeGrid();
  grid_master.InitializeGenerator();
  grid_master.InitializeParameters(loaded_base_params);
  // grid_master.PrintGrid();
  grid = grid_master.GetGrid();// must be last
  console.log(params)
  let canvas = createCanvas(params.canvas.width,params.canvas.height);
  graphic = createGraphics(params.canvas.width,params.canvas.height);
  graphic.background(params.colors.background)
  graphic.strokeWeight(0)
  draw_index = 0;
}




function draw() {
  if(!pause){
    for(let i = 0; i < grid.length; i++){
      for(let j = 0; j < grid[i].length; j++){
        let tile = grid[i][j];
        // console.log(grid[i][j])

        graphic.translate(tile.width * i,tile.height * j)

        if(params.data.generator_type == 'trad_ifs')
          drawTradIFS(tile);
        if(params.data.generator_type == 'trig_ifs')
          drawTrigIFS(tile);
        if(params.data.generator_type == 'wolfram')
          drawWolfram(tile);
        if(params.data.generator_type == 'ant_colony')
          drawAntColony(tile);
        if(params.data.generator_type == 'pulley')
          drawPulley(tile);
        graphic.translate(-tile.width * i,-tile.height * j)
      }
    }
    image(graphic,0,0)
    draw_index++;
  }
}  


function drawPulley(tile){
  let sub_step_x = tile.width / pulley_params.grid.width
  let sub_step_y = tile.height / pulley_params.grid.height
  let pulley_grid = tile.generator.getGrid()
  for(let i = 0; i < pulley_params.grid.width; i++){
    for(let j = 0; j < pulley_params.grid.height; j++){
      let shape_params = {
        origin: {
          x: sub_step_x * i, 
          y: sub_step_y * j, 
          cx: sub_step_x * i + (sub_step_x / 2),
          cy: sub_step_y * j + (sub_step_y / 2)
        },
        shape_sizes: pulley_grid[i][j].shape_sizes,
        tile_width: sub_step_x,
        tile_height: sub_step_y,
        subshape_sizes: [1], // not implemented on pulley
        subshapes: 1,        // not implemented on pulley
        rotation: {          // not implemented on pulley
          initial: 0,
          stack: [0] 
        },
        stroke_weight: 10,
        color_value: pulley_grid[i][j].state,
      }
      shape_machine.generateShapeGroup(shape_params,graphic)
    } 
  }
}

function drawAntColony(tile){
  let sub_step_x = tile.width / ant_colony_params.grid.width
  let sub_step_y = tile.height / ant_colony_params.grid.height
  let ant_grid = tile.generator.updateGrid();
  // console.log(ant_grid)
  // graphic.translate(sub_step_x / 2, sub_step_y / 2)
  
  for(let i = 0; i < ant_colony_params.grid.width; i++){
    for(let j = 0; j < ant_colony_params.grid.height; j++){

      // console.log(ant_grid[i][j])
      let shape_size_scaler = ant_colony_params.shape_sizes[ ant_grid[i][j]['shape_size']]
      let rotation_value = ant_colony_params.rotation[ ant_grid[i][j]['rotation']]
      
      // console.log('rotation_value',rotation_value)
      let shape_params = {
        origin: {
          x: sub_step_x * i, //center
          y: sub_step_y * j, //
          cx: sub_step_x * i + (sub_step_x / 2),
          cy: sub_step_y * j + (sub_step_y / 2)
        },
        shape_sizes: [1,.5,.3,.25],
        tile_width: sub_step_x,// * shape_size_scaler,// * ant_colony_params['shape_size'][],
        tile_height: sub_step_y,// * shape_size_scaler,
        subshape_sizes: [1],
        subshapes: 1,
        
        // subshape_sizes: (Math.random() > 0.5) ? [1,.5] : [1],
        // subshapes: (Math.random() > 0.25) ? 1:2,
        rotation: {
          initial: 0,
          stack: [0,45,90] 
        },
        stroke_weight: 0,
         //temporary jus to see output
        color_value: ant_grid[i][j].state / ant_colony_params.max_state
      }



      shape_machine.generateShapeGroup(shape_params,graphic)
    } 
  }
  // graphic.translate(-sub_step_x / 2, -sub_step_y / 2)
}

function drawWolfram(tile){
  let sub_step_x = tile.width / wolfram_params.grid.width
  let sub_step_y = tile.height / wolfram_params.grid.height
  let row;
  let row_index = draw_index;//tile.generator.getRowIndex();
  (row_index < tile.generator.kernel.dims.y) ?
    row = tile.generator.getInitRow(row_index):
    row = tile.generator.generateRow()
  graphic.translate(sub_step_x / 2, sub_step_y / 2)
  // console.log(row)
  for(let k = 0; k < row.length; k++){
    let shape_params = {
      origin: {
        x: k * sub_step_x + (sub_step_x / 2), 
        y: row_index * sub_step_y + (sub_step_y / 2), 
      },
      width: sub_step_x,
      height: sub_step_y,
      subshape_size: 1,
      rotation: wolfram_params.rotation[Math.floor(Math.random() * wolfram_params.rotation.length)],
      color_value: int(row[k]) / (wolfram_params.base - 1)
    }
    shape_machine.generateShape(shape_params,graphic)
  }
  graphic.translate(-sub_step_x / 2, -sub_step_y / 2)
}



function drawTradIFS(tile){
  let avg_point = tile.generator.getAvgPoint();
  let sx = avg_point.x * tile.width / 2 * trad_ifs_params.zoom.x
  let sy = avg_point.y * tile.height / 2 * trad_ifs_params.zoom.y
  let offset_x = -sx
  let offset_y = -sy
  let trans_x = (tile.width / 2)
  let trans_y = (tile.height / 2)
  graphic.translate(trans_x + offset_x,trans_y + offset_y)
  let points = tile.generator.generatePoints(trad_ifs_params.iterations_per_draw);
  graphic.strokeWeight(trad_ifs_params.stroke_weight)
  let max_color_val = tile.width * Math.sqrt(2)
  points.map((p,index)=>{
    let px = p.x * tile.width / 2
    let py = p.y * tile.height / 2
    color_val = Math.sqrt((px - sx)*(px - sx) + (py - sy)*(py - sy)) / max_color_val
    graphic.stroke(color_machine(p.function_index % 2 == 0? color_val : 1 - color_val).hex())
    graphic.point(px,py)
  })
  graphic.translate(-(trans_x + offset_x),-(trans_y + offset_y))
}

function drawTrigIFS(tile){
  graphic.translate((tile.width / 2),(tile.height / 2))
  let points = tile.generator.generatePoints(trig_ifs_params.iterations_per_draw);
  // console.log(points)
  graphic.strokeWeight(trig_ifs_params.stroke_weight)
  points.map((p)=>{
    let px = p.x * tile.width / 2
    let py = p.y * tile.height / 2
    // color_val = Math.sqrt((px - sx)*(px - sx) + (py - sy)*(py - sy)) / max_color_val
    graphic.strokeWeight(trig_ifs_params.stroke_weight)
    graphic.stroke(color_machine((1 + Math.sin(p.t)) / 2).hex())
    graphic.point(px,py)
  })
  graphic.translate(- (tile.width / 2),-(tile.height / 2))
}

function keyPressed() {
  if(keyCode === 32) //'space' pause/play
    pause = !pause
  if(keyCode === 187){ //'+' zoom in
    trad_ifs_params.zoom.x += 0.5
    trad_ifs_params.zoom.y += 0.5
    Refresh();
    console.log('zoom', trad_ifs_params.zoom)
  }
  if(keyCode === 189){ // '-' zoom out
    if(trad_ifs_params.zoom.x > 0){
      trad_ifs_params.zoom.x -= 0.5
      trad_ifs_params.zoom.y -= 0.5
      Refresh();
      console.log('zoom', trad_ifs_params.zoom)
    }
  }
  if(keyCode == 82) // 'r'
    Refresh();
  if(keyCode === 37){
    params.grid.width--;
    Refresh();
  }else if(keyCode === 39){
    params.grid.width++;
    Refresh();
  }else if(keyCode === 38){
    params.grid.height++;
    Refresh();
  }else if(keyCode === 40){
    params.grid.height--;
    Refresh();
  }
  console.log('key pressed:', keyCode)
}

function mousePressed() {
  // console.log(mouseButton, mouseX, mouseY)
  if (mouseButton === LEFT) {
    let mouse_in_range =
      (mouseX <= params.main_graphic.width && mouseX > 0) &&
      (mouseY <= params.main_graphic.height && mouseY > 0)
    if (mouse_in_range) {
      mouse = { x: mouseX, y: mouseY }
      }
    }
}

var saveImage = () => {
    console.log('saving image')
    // let localURL = 'C:\\File\\Art\\transforms2.0\\'
    // let imageName = prompt("Please Enter an Image Name");
    console.log('image name', imageName)
    imageName = 'chez'
    save(graphic, imageName, 'png')
}