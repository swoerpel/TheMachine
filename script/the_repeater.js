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
        let scale = 1600;
        let tiles = this.ifs.quantize(points, this.params.dims, scale)
        paper.setup(new paper.Size(scale,scale))
        let tile_size = scale / this.params.dims[0]
        this.draw_background()

        let tile_color_machine = chroma.scale(this.palettes['Spectral']);
        let point_color_machine = chroma.scale(this.palettes['binary']);

        // this.draw_tiles(tiles,tile_size, tile_color_machine)
        this.draw_points(tiles,tile_size,point_color_machine)
        this.save_image()
    }

    draw_tiles(tiles,tile_size,color_machine){
        for(let i = 0; i < tiles.length; i++){
            // console.log(i,tiles[i])
            let point_count = tiles[i].points.length
            let x = tiles[i].bounds[0]
            let y = tiles[i].bounds[2]
            // console.log(tiles[i].bounds)
            let border_ratio = 0.0;
            let border_width = border_ratio * tile_size;
            let size = new paper.Size(tile_size, tile_size);
            let sub_size = new paper.Size(tile_size - border_width, tile_size - border_width)
            let local_origin = new paper.Point(x,y)
            let local_sub_origin = new paper.Point(x + border_width / 2 ,y + border_width / 2)
            let square = new paper.Path.Rectangle(local_origin, size);
            let sub_square = new paper.Path.Rectangle(local_sub_origin, sub_size);
            // let color_val = point_count / this.params.constants.iterations
            let color_val = 1 - tiles[i].point_count_ratio;
            square.fillColor = 'black'//this.color_machine(color_val).hex();
            sub_square.fillColor = color_machine(color_val).hex();
        }
    }

    draw_points(tiles,tile_size,color_machine){
        for(let i = 0; i < tiles.length; i++){
            let point_count = tiles[i].points.length
            let color_val =1
            // let color_val = tiles[i].point_count_ratio;
            for(let j = 0; j < point_count; j++){
                let x = tiles[i].points[j][0]
                let y = tiles[i].points[j][1]
                let dot = new paper.Path.Circle(x,y,1)
                dot.fillColor = color_machine(color_val).hex();
            }
            // let avg = new paper.Path.Circle(tiles[i].ave_x,tiles[i].ave_y,25)
            // let color_val = tiles[i].point_count_ratio;
            // console.log('colorval', color_val)
            // avg.fillColor = color_machine(color_val).hex();
            // avg.fillColor = 'yellow'
        }
    }

    draw_background(color = 'white') {
        var rect = new paper.Path.Rectangle({
            point: [0, 0],
            size: [paper.view.size.width, paper.view.size.height],
            strokeColor: 'black',
            selected: true
        });
        rect.sendToBack();
        rect.fillColor = color;
    }

    save_image(){
        let svg = paper.project.exportSVG({
            asString: true,
            precision: 2,
            matchShapes: true,
            embedImages: false
        });
        this.image_id = 'chez'
        this.ExportSVG(svg,this.image_id)
        this.ExportPNG(svg, this.image_id);
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
        this.color_machine = chroma.scale(this.palettes['BuYl']);
    }

    ExportPNG(svg, image_id) {
        let path = "C:\\File\\Programming\\TheMachine\\script\\"
        path += (image_id + '.png');
        svg2img(svg, function (error, buffer) {
            fs.writeFileSync(path, buffer);
        });
        console.log('PNG saved at', path)
        return path
    }

    ExportSVG(svg, image_id) {
        let path = "C:\\File\\Programming\\TheMachine\\script\\"
        path += (image_id + '.svg');
        fs.writeFile(path, svg, function (err) {
            if (err) throw err;
            console.log('SVG saved at', path)
        });
    }
}
module.exports = Repeater;