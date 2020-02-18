var graphic;
var grid;
var params;
var mouse;
var pause = false;
var color_palette;
var color_palette_name;
var color_machine;
var palettes;
var palette_names;
var params;
var draw_index = 0;
var color_offset = Math.random()
// var zoom = 1;

function setup() {
  params = new Object(config_preview);
  build_color_library();
  setup_colors();
  frameRate(params.frame_rate)
  Refresh();
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

function Refresh(loaded_base_params = []){
  let grid_master = new GridMaster(params);
  grid_master.InitializeGrid();
  grid_master.InitializeGenerator();
  grid_master.InitializeParameters(loaded_base_params);
  // grid_master.PrintGrid();
  grid = grid_master.GetGrid();// must be last
  let canvas = createCanvas(params.canvas.width,params.canvas.height);
  graphic = createGraphics(params.canvas.width,params.canvas.height);
  graphic.background(params.colors.background)
  drawTiles();
  draw_index = 0;
}



function draw() {
  if(!pause){
    for(let i = 0; i < grid.length; i++){
      for(let j = 0; j < grid[i].length; j++){
        let tile = grid[i][j];
        graphic.translate(tile.width * i,tile.height * j)
        if(params.data.generator_type == 'trad_ifs')
          drawTradIFS(tile);
        if(params.data.generator_type == 'trig_ifs')
          drawTrigIFS(tile);
        if(params.data.generator_type == 'wolfram')
          drawWolfram(tile);
        if(params.data.generator_type == 'ant_colony')
          drawAntColony(tile);
        graphic.translate(-tile.width * i,-tile.height * j)
      }
    }
    image(graphic,0,0)
    draw_index++;
  }
}  

function drawAntColony(tile){
  // graphic.translate(tile.width / 2, tile.height / 2)
  console.log(tile)

  let sub_step_x = tile.width / config_ant_colony.grid.width
  let sub_step_y = tile.height / config_ant_colony.grid.height
  let current_grid = tile.generator.updateGrid(config_ant_colony.steps_per_draw);
  for(let i = 0; i < config_ant_colony.grid.width; i++){
    for(let j = 0; j < config_ant_colony.grid.height; j++){
      graphic.fill(this.color_machine(Math.random()).hex())
      graphic.rect(sub_step_x * i, sub_step_y * j,sub_step_x,sub_step_y)
      graphic.circle(sub_step_x * i, sub_step_y * j,sub_step_x/2)
      // graphic.circle(tile.origin.x,tile.origin.y, sub_step_x)
    } 
  }
  // graphic.translate(-tile.width / 2, -tile.height / 2)

}


function drawWolfram(tile){
  let row;
  if(draw_index < tile.generator.kernel.dims.y)
    row = tile.generator.getInitRow(draw_index);
  else
    row = tile.generator.generateRow();
  let sub_step_x = tile.width / wolfram_params.grid.width
  let sub_step_y = tile.height / wolfram_params.grid.height
  for(let k = 0; k < row.length; k++){
    let org = {
      x: k,
      y: draw_index
    }
    let val = int(row[k])
    let color_val = val / (wolfram_params.base - 1)
    graphic.fill(this.color_machine(color_val).hex())
    graphic.stroke(this.color_machine(color_val).hex())
    if(wolfram_params.draw_shape == 0){
      graphic.rect(
        org.x * sub_step_x,
        org.y * sub_step_y,
        sub_step_x,
        sub_step_y);
    }else if(wolfram_params.draw_shape == 1){
      graphic.circle(
        org.x * sub_step_x,
        org.y * sub_step_y,
        sub_step_x / Math.sqrt(2));
    }else if(wolfram_params.draw_shape == 2){
      graphic.triangle(
        org.x * sub_step_x,
        org.y * sub_step_y,
        org.x * sub_step_x + sub_step_x,
        org.y * sub_step_y + sub_step_y,
        org.x * sub_step_x,
        org.y * sub_step_y + sub_step_y,
      )
    }
  }
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

function drawTiles(){
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      let tile = grid[i][j];
      graphic.strokeWeight(this.params.grid.border_thickness);
      graphic.stroke('white')
      graphic.fill(params.colors.background);
      graphic.rect(tile.origin.x,tile.origin.y,tile.width,tile.height)
    }
  }
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
  console.log(mouse)
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