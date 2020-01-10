var chroma = require("chroma-js");
var now = require("performance-now");
var paper = require('paper-jsdom-canvas');
var svg2img = require('svg2img');
var chromotome = require("chromotome");
var fs = require("fs");
var config = require("./config/config_repeater.json");
var IFS = require("./ifs.js")
class Repeater{
    constructor(){
        console.log('Lets Repeat Baby')
        this.build_color_library()
        this.params = config['A']
        this.ifs = new IFS(this.params.constants);
        let points = this.ifs.generate_points()
        let scale = 3200;
        let tiles = this.ifs.quantize(points, this.params.dims, scale)
        // console.log(points)
        paper.setup(new paper.Size(scale,scale))

        let tile_size = scale / this.params.dims[0]
        this.draw_background()
        this.draw_tiles(tiles,tile_size)
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
        console.log(this.palettes)
        this.color_machine = chroma.scale(this.palettes['Spectral']);
      }

    draw_tiles(tiles,tile_size){
        
        for(let i = 0; i < tiles.length; i++){
            let point_count = tiles[i].points.length
            let x = tiles[i].bounds[0]
            let y = tiles[i].bounds[2]
            console.log(tiles[i].bounds)
            let size = new paper.Size(tile_size, tile_size);
            let local_origin = new paper.Point(x,y)
            let square = new paper.Path.Rectangle(local_origin, size);
            let color_val = point_count / this.params.constants.iterations
            square.fillColor = this.color_machine(color_val).hex();
        }

        for(let i = 0; i < tiles.length; i++){
            let point_count = tiles[i].points.length
            for(let j = 0; j < point_count; j++){
                let x = tiles[i].points[j][0]
                let y = tiles[i].points[j][1]
                let dot = new paper.Path.Circle(x,y,tile_size/24)
                let color_val = point_count / this.params.constants.iterations
                dot.fillColor = this.color_machine(1-color_val).hex();
            }
        }

        
        // this.canvas_width = scale
        // this.canvas_height = scale  
        // // let origin = new paper.Point(this.canvas_width/2,this.canvas_height/2);
        // let origin = new paper.Point(0,0);
        

        
        // // console.log('origin',origin)
        // for(let i = 0; i < points.length; i++){
        //     let x = points[i][0] //* (this.canvas_width / 10)
        //     let y = points[i][1] //* (this.canvas_height / 10)
        //     console.log(x,y)
        //     let scaled_x = this.canvas_width * x / 4
        //     let scaled_y = this.canvas_height * y / 4
        //     let local_origin = new paper.Point(x,y)
        //     // console.log(local_origin)
        //     let cir = new paper.Path.Circle(local_origin, 10);
        //     cir.fillColor = 'black'
        // }
        let svg = paper.project.exportSVG({
            asString: true,
            precision: 2,
            matchShapes: true,
            embedImages: false
        });
        this.image_id = 'chez'
        this.ExportPNG(svg, this.image_id);

    }

    draw_background(color = 'white') {
        // console.log('draw background', paper)
        var rect = new paper.Path.Rectangle({
            point: [0, 0],
            size: [paper.view.size.width, paper.view.size.height],
            strokeColor: 'black',
            selected: true
        });
        rect.sendToBack();
        rect.fillColor = color;
    }


    ExportPNG(svg, image_id) {
        let path = "C:\\Files\\Programming\\TheMachine\\script\\"
        path += (image_id + '.png');
        svg2img(svg, function (error, buffer) {
            fs.writeFileSync(path, buffer);
        });
        console.log('PNG saved at', path)
        return path
    }


    generate(){

        // }
        // for(let i = 0; i < this.max_points;i++){
        //     this.x = Math.sin(this.rules.A * this.y) - Math.cos(this.rules.B * this.x)
        //     this.y = Math.sin(this.rules.C * this.x) - Math.cos(this.rules.D * this.y)
        //     if(i % 100 == 0){
        //         this.points.push([this.x,this.y])
        //     }

        // }

        console.log(this.points)
    }
}
module.exports = Repeater;