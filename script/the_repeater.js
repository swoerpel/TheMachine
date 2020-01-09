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
        this.params = config['A']
        this.ifs = new IFS(this.params.constants);
        let points = this.ifs.generate_points()
        // console.log(points)
        this.draw(points)
    }

    draw(points){
        
        this.canvas_width = 3200
        this.canvas_height = 3200  
        let origin = new paper.Point(this.canvas_width/2,this.canvas_height/2);
        paper.setup(new paper.Size(this.canvas_width, this.canvas_height))

        this.draw_background()
        // console.log('origin',origin)
        for(let i = 0; i < points.length; i++){
            let x = points[i][0] + 2
            let y = points[i][1] + 2
            let scaled_x = this.canvas_width * x / 4
            let scaled_y = this.canvas_height * y / 4
            let local_origin = new paper.Point(scaled_x,scaled_y)
            // console.log(local_origin)
            let cir = new paper.Path.Circle(local_origin, 5);
            cir.fillColor = 'black'
        }
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