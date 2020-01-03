var fs = require('fs');
var paper = require('paper-jsdom-canvas');
var svg2img = require('svg2img');
var Templates = require('./Templates.js');
var Grid = require('./Grid.js');
var ColorSequencer = require('./ColorSequencer.js');
var Path = require('./Path.js');
var Block = require('./Block.js');
class MasterController {
    constructor() {
        this.grid_size_index = 0;
        this.image_id = ''
    }

    GenerateVitalParams() {
        let vital_params = {
            step_shape: {
                id: this.step_shape,
                name: Templates.step_shapes[this.step_shape]
            },
            rule_template: Templates.rule_templates[this.step_shape],
            grid_size: Templates.grid_sizes[this.grid_size_index],
            color_rand: .4,
            stroke_weights: Templates.stroke_weight_templates[this.step_shape],
            step_path: Templates.step_paths.index,
            color_path: Templates.color_paths.index,
            ant_count: 20,
            ant_origins_random: false,
            duration: 1000,
            color_spread: 5,
        }
        return vital_params;
    }

    SetupPaper() {
        let tile_width = Templates.png_dims.x / this.vital_params.grid_size.x
        let tile_height = Templates.png_dims.y / this.vital_params.grid_size.y
        this.paper_width = tile_width * this.vital_params.grid_size.x
        this.paper_height = tile_height * this.vital_params.grid_size.y
        paper.setup(new paper.Size(this.paper_width, this.paper_height))
    }

    GenerateImage(color_machine) {
        this.color_machine = color_machine;
        this.vital_params = this.GenerateVitalParams(this.step_shape)
        this.SetupPaper();
        DrawBackground();
        let grid = new Grid(this.vital_params)
        let grid_layers = grid.WalkAnts(this.vital_params.duration)
        this.DrawGrids(grid_layers)
        let svg = paper.project.exportSVG({
            asString: true,
            precision: 2,
            matchShapes: true,
            embedImages: false
        });
        // this.ExportSVG(svg, this.image_id);
        if (this.save_image)
            this.ExportPNG(svg, this.image_id);
    }

    SetPaths(svg_path, png_path) {
        this.paths = {
            svg: svg_path,
            png: png_path
        }
    }

    SetStepShape(step_shape) {
        this.step_shape = step_shape;
    }

    SetStepPath(step_path) {
        Templates.step_paths.index = step_path;
    }
    SetColorPath(color_path) {
        Templates.color_paths.index = color_path;
    }

    SetStrokeWeights(weights) {
        Templates.stroke_weight_templates[this.step_shape] = weights;
    }
    SetRotation(rotation) {
        Templates.ant_attributes.rotation.delta = rotation;
    }
    SetSubShapes(values) {
        Templates.ant_attributes.sub_shape.values = values
    }
    SetSubStrokeWeights(weights) {
        Templates.ant_attributes.sub_shape.stroke_weights = weights
    }
    SetGridScale(scale) {
        this.grid_scale = {
            x: scale.x,
            y: scale.y
        }
        this.SetPngSize()
    }
    SetPngSize() {
        Templates.png_dims.x *= this.grid_scale.x;
        Templates.png_dims.y *= this.grid_scale.y;
    }

    SetGridSize(index) {
        this.grid_size_index = index;
    }

    SetImageId(image_id) {
        this.image_id = image_id
    }

    SetSaveImage(save_image){
        this.save_image = save_image
    }

    SetCustomMode(custom){
        this.custom = new Object(custom)

    }

    linearize_array(grid) {
        return [...grid.map(((row) => { return [...row] }))]
    }

    DrawGrids(grid) {
        let path_machine = new Path(this.vital_params.grid_size.x,
            this.vital_params.grid_size.y,
            this.paper_width,
            this.paper_height);

        let step_path = path_machine.GeneratePath(this.vital_params.step_path, false);
        let color_path = path_machine.GeneratePath(this.vital_params.color_path, true)
        let color_step = 1 / color_path.length
        let color_origins = color_path.map((c) => { return (c * color_step) });
        let color_magnitude = (ss) => { return ((color_step * 2) / ss) }
        let origin_index = 0;


        // EXPERIMENTAL ZONE ====================================
        let city_heights = []
        for (let i = 0; i < this.vital_params.grid_size.x; i++) {
            city_heights.push(Math.floor(Math.random() * (this.vital_params.grid_size.y - 1)))
        }
        //=======================================================

        for (let i = 0; i < this.vital_params.grid_size.x; i++) {
            for (let j = 0; j < this.vital_params.grid_size.y; j++) {
                let origin = step_path[origin_index];
                let current_grid = grid[i][j];
                let color_sub_step = color_magnitude(current_grid.sub_shape)
                let tile_colors = []
                for (let k = 0; k < current_grid.sub_shape; k += color_sub_step) {
                    // tile_colors.push(1)

                    tile_colors.push((color_origins[origin_index]) +
                        ((Math.random() > .5) ? -1 : 1) * Math.random() *
                        this.vital_params.color_rand)
                }
                origin_index++;

                if(this.custom.active){
                    if(j % 2 == 0)
                        current_grid.color = 1
                    else
                        current_grid.color = 0
                }

                // EXPERIMENTAL ZONE =============================

                // if ((i + j) % 2 == 0 && (2*i + 3) % 2 == 0)
                //     current_grid.color = 1
                // else
                //     current_grid.color = 0

                // if (i < city_heights[j])
                //     current_grid.color = 1
                // else
                //     current_grid.color = 0
                // if(i % 2 == 0)
                    // current_grid.color = 1
                // else
                    // current_grid.color = 0
                // if ( 2 * i + 1) )
                // if (i % 2 == 0){
                //     if(j % 2 == 0)
                //         current_grid.color = 1
                //     else
                //         current_grid.color = 0
                // }
                // else{
                //     if(j % 2 == 0)
                //         current_grid.color = 0
                //     else
                //         current_grid.color = 1
                // }
                
                
                // ===============================================
                let grid_values = {
                    origin: origin,
                    width: this.paper_width / this.vital_params.grid_size.x,
                    color: current_grid.color,
                    sub_shape: current_grid.sub_shape,
                    stroke_weight: current_grid.stroke_weight,
                    rotation: current_grid.rotation,
                    rule: current_grid.rule
                }
                let colors = tile_colors.reverse()
                // let colors = this.SetColors(Templates.ant_attributes.color.style, grid_values.color)
                if (this.vital_params.step_shape.name == 'square')
                    DrawSquares(grid_values, colors, this.color_machine, this.custom);
                if (this.vital_params.step_shape.name == 'circle')
                    DrawCircles(grid_values, colors, this.color_machine,this.custom);
                if (this.vital_params.step_shape.name == 'triangle')
                    DrawTriangles(grid_values, colors, this.color_machine,this.custom);
                if (this.vital_params.step_shape.name == 'cube')
                    DrawCustomShape(grid_values, colors, this.color_machine,this.custom);
            }
        }

    }

    SetColors(index, color_grid) {
        let colors = []
        if (index == 0) { // 
            for (let k = 0; k < color_grid.length; k++)
                colors.push(round(color_grid[k] / Templates.ant_attributes.color.max_color, 3));
        } else if (index == 1) {
            let C = new ColorSequencer()
            colors = C.NewSequence('trapped knight')
        } else {
            for (let k = 0; k < color_grid.length; k++)
                colors.push(Math.random());
        }

        //remove later, just for debugging
        for (let k = 0; k < color_grid.length; k++)
            colors.push(Math.random());
        return colors
    }



    ExportSVG(svg, image_id) {
        // let path = path.resolve("chez") // COMMENT OUT 
        let path = this.paths.svg;
        // if (path.includes('Debug'))
            image_id = 'chez'
        path += (image_id + '.svg');
        fs.writeFile(path, svg, function (err) {
            if (err) throw err;
            console.log('SVG saved at', path)
        });
    }

    ExportPNG(svg, image_id) {
        let path = this.paths.png;
        path += (image_id + '.png');
        svg2img(svg, function (error, buffer) {
            fs.writeFileSync(path, buffer);
        });
        console.log('PNG saved at', path)
        return path
    }

}
module.exports = MasterController;

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function DrawBackground(color = 'black') {
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


function DrawSquares(grid_values, colors, color_machine, custom) {
    // console.log('color value!', grid_values.color)
    for (let k = 0; k < grid_values.sub_shape; k++) {
        for (let l = 0; l < grid_values.sub_shape; l++) {
            let x_local_origin = grid_values.origin.x + grid_values.width / grid_values.sub_shape * k
            let y_local_origin = grid_values.origin.y + grid_values.width / grid_values.sub_shape * l
            let local_origin = new paper.Point(x_local_origin, y_local_origin);
            let size = new paper.Size(grid_values.width / grid_values.sub_shape, grid_values.width / grid_values.sub_shape);
            let concentric_sub_stroke_weights;
            if (grid_values.sub_shape == 1)
                concentric_sub_stroke_weights = grid_values.stroke_weight;
            else
                concentric_sub_stroke_weights = Templates.ant_attributes.sub_shape.stroke_weights;

            concentric_sub_stroke_weights.map((sw, index) => {
                let con_size = new paper.Size(size.width, size.height);
                let concentric_square = new paper.Path.Rectangle(local_origin, con_size);
                let color_val = colors[Math.floor(Math.random() * colors.length)]
                if (custom.active)
                    color_val = grid_values.color
                concentric_square.fillColor = color_machine(color_val).hex();
                concentric_square.scale(sw, concentric_square.bounds.center);
            });
        }
    }
}

function DrawCircles(grid_values, colors, color_machine,custom) {
    for (let k = 0; k < grid_values.sub_shape; k++) {
        for (let l = 0; l < grid_values.sub_shape; l++) {
            let radius = grid_values.width / grid_values.sub_shape / 2
            let x_local_origin = grid_values.origin.x + grid_values.width / grid_values.sub_shape * k + radius
            let y_local_origin = grid_values.origin.y + grid_values.width / grid_values.sub_shape * l + radius
            let local_origin = new paper.Point(x_local_origin, y_local_origin);
            let concentric_sub_stroke_weights;
            if (grid_values.sub_shape == 1)
                concentric_sub_stroke_weights = grid_values.stroke_weight;
            else
                concentric_sub_stroke_weights = Templates.ant_attributes.sub_shape.stroke_weights;
            concentric_sub_stroke_weights.map((sw) => {
                let concentric_circle = new paper.Path.Circle(local_origin, radius);
                let color_val = colors[Math.floor(Math.random() * colors.length)]
                if (custom.active)
                    color_val = grid_values.color
                concentric_square.fillColor = color_machine(color_val).hex();
                concentric_circle.scale(sw, concentric_circle.bounds.center);
            });
        }
    }
}


function DrawTriangles(grid_values, colors, color_machine,custom) {
    for (let k = 0; k < grid_values.sub_shape; k++) {
        for (let l = 0; l < grid_values.sub_shape; l++) {
            let radius = grid_values.width / grid_values.sub_shape / 2
            let x_local_origin = grid_values.origin.x + grid_values.width / grid_values.sub_shape * k + radius
            let y_local_origin = grid_values.origin.y + grid_values.width / grid_values.sub_shape * l + radius
            let local_origin = new paper.Point(x_local_origin, y_local_origin);
            let concentric_sub_stroke_weights;
            if (grid_values.sub_shape == 1)
                concentric_sub_stroke_weights = grid_values.stroke_weight;
            else
                concentric_sub_stroke_weights = Templates.ant_attributes.sub_shape.stroke_weights;
            let local_radius = radius
            grid_values.rotation.sort(() => Math.random() - 0.5)
            grid_values.rotation.map((rot, index) => {
                concentric_sub_stroke_weights.map((sw, index) => {
                    local_radius = radius * sw
                    let triangle = new paper.Path();
                    triangle.strokeWidth = 0
                    triangle.add(new paper.Point(local_origin.x - local_radius, local_origin.y - local_radius));
                    triangle.add(new paper.Point(local_origin.x - local_radius, local_origin.y + local_radius));
                    triangle.add(new paper.Point(local_origin.x + local_radius, local_origin.y + local_radius));
                    // triangle.fillColor = color_machine(Math.random() > 0.5).hex();
                    let color_val = colors[Math.floor(Math.random() * colors.length)]
                    if (custom.active)
                        color_val = grid_values.color
                    concentric_square.fillColor = color_machine(color_val).hex();
                    triangle.rotate(rot, local_origin)
                });
            });
        }
    }
}

function DrawCustomShape(grid_values, colors, color_machine,custom) {
    let block_machine = new Block()
    let block_type_count = block_machine.GetBlockTypeCount();
    for (let k = 0; k < grid_values.sub_shape; k++) {
        for (let l = 0; l < grid_values.sub_shape; l++) {
            let radius = grid_values.width / grid_values.sub_shape / 2
            let x_local_origin = grid_values.origin.x + grid_values.width / grid_values.sub_shape * k + radius
            let y_local_origin = grid_values.origin.y + grid_values.width / grid_values.sub_shape * l + radius
            let local_origin = new paper.Point(x_local_origin, y_local_origin);
            let block_type = Math.floor(Math.random() * block_type_count)
            grid_values.stroke_weight.map((sw) => {
                let block = block_machine.GenerateBlock(local_origin, radius * sw, block_type);
                let color_val = colors[Math.floor(Math.random() * colors.length)]
                if (custom.active)
                    color_val = grid_values.color
                concentric_square.fillColor = color_machine(color_val).hex();
                block.map((face) => {
                    let face_path = new paper.Path();
                    face.points.map((point) => {
                        face_path.add(new paper.Point(point.x, point.y))
                    });
                    face_path.fillColor = color_machine(color_val).darken(face.color_index).hex();
                })
            })
        }
    }
}

