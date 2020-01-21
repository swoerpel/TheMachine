

var graphic;
var info_graphic;
var ifs_grid = [];
var ifs_params;
var color_machine = chroma.scale([params.colors.x,params.colors.y])
function setup() {
  frameRate(32)
  console.log(params.grid)
  let canvas = createCanvas(params.canvas.width,params.canvas.height);
  canvas.background('black');
  reset();
  ifs_params = IFS_Params[params.data.type];
  generate_ifs_grid(ifs_params);
  draw_tiles();
  // draw_ifs_origins(ifs_params);
}

function generate_load_params(ifs_params){
  let load_params;
  if(ifs_params.load != ''){
    load_params = load_saved_seed(ifs_params.load)
    console.log(load_params)
  }
  else{
    load_params = [];
    for(let i = 0; i < ifs_params.functs.length; i++){
      let funct = [];
      for(let j = 0; j < ifs_params.functs[i].vars.length; j++){
        // console.log(ifs_params.functs[i].vars[j])
        let constant = ifs_params.functs[i].vars[j]
        let val = (constant == 'rand') ? round_(1 - 2 * Math.random())  : constant
        funct.push(val)
      }
      load_params.push(funct);
    }
  }
  return load_params;
}

function generate_ifs_grid(ifs_params){
  for(let i = 0; i < params.grid.width; i++){
    for(let j = 0; j < params.grid.height; j++){
      let x = i * params.grid.tile_size.x
      let y = j * params.grid.tile_size.y
      let origin = {
        x:params.grid.tile_size.x/2 + x,
        y:params.grid.tile_size.y/2 + y
      }
      let load_params = generate_load_params(ifs_params)
      let xc = (i / params.grid.width) * (i / params.grid.width)
      let yc = (j / params.grid.height) * (j / params.grid.height)
      let bcv = Math.sqrt(xc + yc)
      let tile = {
        params: new Object(load_params),
        ifs: new TradIFS(load_params,params.data.filter),
        origin: new Object(origin),
        colors:{
          background_val: bcv
        }
      }
      ifs_grid.push(tile)
    }
  }
}

function draw_ifs_origins(ifs_params){
  for(let i = 0; i < ifs_grid.length; i++){
    let origin = ifs_grid[i].origin
    console.log('origin->',origin)
    graphic.strokeWeight(50)
    graphic.point(origin.x,origin.y)
  }
}

function reset(){
  params.grid.tile_size = new Object(
    {
      x:params.main_graphic.width / params.grid.width,
      y: params.main_graphic.height / params.grid.height
    }
  );
  if(params.info_graphic.active){
    params.info_graphic.width = params.canvas.width - params.main_graphic.width;
    params.info_graphic.height = params.canvas.height
    info_graphic = createGraphics(params.info_graphic.width,params.info_graphic.height);
    info_graphic.background(params.info_graphic.background)
    draw_info();
    image(info_graphic,params.main_graphic.width,0)
  }
  graphic = createGraphics(params.main_graphic.width,params.main_graphic.height);
  console.log(params.colors.background)
  graphic.background(params.colors.background)
  image(graphic,0,0)
}

function draw_info(){
  info_graphic.textSize(60)
  info_graphic.text('chet',
        params.info_graphic.width * params.info_graphic.margin.x, 
        params.info_graphic.height * params.info_graphic.margin.y)

}

function draw_tiles(){
  let gs = Math.sqrt(params.grid.width * params.grid.width + params.grid.height * params.grid.height)
  // console.log(color_machine(.5).hex())
  for(let i = 0; i < params.grid.width; i++){
    for(let j = 0; j < params.grid.height; j++){
      let x = i * params.grid.tile_size.x
      let y = j * params.grid.tile_size.y
      let s = Math.sqrt(i * i + j * j)
      let t = 0.1
      let color_val = s / gs
      graphic.strokeWeight(params.grid.border_thickness)
      graphic.stroke('blue')
      
      graphic.fill(color_machine(Math.random()).hex())
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


function scale_points(points,input_bounds,zoom){
  // console.log(zoom)
  for(let i = 0; i < points.length; i++){
    let scaled_x;
    let scaled_y;
    if(points[i].x > 0)
    points[i].x = Math.abs(points[i].x) / input_bounds.x.max * zoom.x
    else
    points[i].x = Math.abs(points[i].x) / input_bounds.x.min * zoom.x

    if(points[i].y > 0)
    points[i].y = Math.abs(points[i].y) / input_bounds.y.max * zoom.y
    else
    points[i].y = Math.abs(points[i].y) / input_bounds.y.min * zoom.y

    // console.log('points ->',points[i].x,points[i].y)
    // console.log('xbounds->',input_bounds.x.min,input_bounds.x.max)
    // console.log('ybounds->',input_bounds.y.min,input_bounds.y.max)
    // console.log('scaled ->',scaled_x,scaled_y)
  }
  return points
}

function draw() {
  graphic.strokeWeight(ifs_params.stroke_weight)
  
  for(let i = 0; i < ifs_grid.length; i++){
    // console.log(ifs_grid[i].ifs)
    let origin = ifs_grid[i].origin
    let points = ifs_grid[i].ifs.generatePoints(ifs_params.iterations_per_draw)
    // console.log(points)
    let input_bounds = ifs_grid[i].ifs.extrema;
    
    points = scale_points(points,input_bounds, ifs_params.zoom );
    // console.log(origin)
    graphic.translate(origin.x,origin.y);
    graphic.stroke(params.colors.points)
    for(let j = 0; j < points.length; j++){
      let point_x = points[j].x * (params.grid.tile_size.x / 2)
      let point_y = points[j].y * (params.grid.tile_size.y / 2)
      // let point_y = origin.y + points[j].y
      graphic.point(point_x,point_y)

    }
    graphic.translate(-origin.x,-origin.y);

  }
    image(graphic,0,0)
}  

function round_(N,acc = 100000){
  return Math.round(N * acc) / acc
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




