var config = require("./config/config_gridmaster.js");


class GridMaster {
    constructor(){
        console.log('Grid Master Initialized')
        // console.log(config)
        this.params = config;
    }

    InitializeGrid(){
        let index = 0;
        this.grid = [];
        this.tile_width = this.params.canvas.width / this.params.grid.width
        this.tile_height = this.params.canvas.height / this.params.grid.height

        console.log('[tile width, tile height]-> [', this.tile_width,',' ,this.tile_height, ']')
        for(let i = 0; i < this.params.grid.width; i++){
            let row = [];
            for(let j = 0; j < this.params.grid.height; j++){
                let origin = {
                    x: i * this.params.canvas.width,
                    y: j * this.params.canvas.height
                }
                let center = {
                    x: origin.x + this.params.canvas.width / 2,
                    y: origin.y + this.params.canvas.height / 2
                }
                let tile = {
                    id: index,
                    x:i,
                    y:j,
                    origin: origin,
                    center: center,
                }
                row.push(tile);
            }
            this.grid.push(row)
        }
    }

    PrintGrid(){
        console.log('===============GRID===============')
        this.grid.map((row)=>{
            row.map((tile)=>{
                console.log(tile)
            })
        })
    }
}


let grid_master = new GridMaster();
grid_master.InitializeGrid();
grid_master.PrintGrid();
    // grid.tile_size = new Object(
    //     {
    //     x:params.main_graphic.width / params.grid.width,
    //     y: params.main_graphic.height / params.grid.height
    //     }
    // );
    // params.grid.tile_size = new Object(grid.tile_size)
    // for(let i = 0; i < params.grid.width; i++){
    //     let row = [];
    //     for(let j = 0; j < params.grid.height; j++){
    //     let x = i * params.grid.tile_size.x
    //     let y = j * params.grid.tile_size.y
    //     let origin = {
    //         x:params.grid.tile_size.x/2 + x,
    //         y:params.grid.tile_size.y/2 + y
    //     }
    //     let xc = (i / params.grid.width) * (i / params.grid.width)
    //     let yc = (j / params.grid.height) * (j / params.grid.height)
    //     let bcv = Math.sqrt(xc + yc)
    //     let tile = {
    //         origin: new Object(origin),
    //         colors:{
    //         background_val: bcv
    //         }
    //     }
    //     row.push(tile)
    //     }
    //     grid.tiles.push(row)
    // }

