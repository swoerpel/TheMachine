// var config = require("./config/config_gridmaster.js");


class GridMaster {
    constructor(params){
        console.log('Grid Master Initialized')
        this.params = params;
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
                    x: i * this.tile_width,
                    y: j * this.tile_height
                }
                let center = {
                    x: origin.x + this.tile_width / 2,
                    y: origin.y + this.tile_height / 2
                }

                let color = {
                    background_val:1,//Math.random()
                }
                let tile = {
                    id: index,
                    x:i,
                    y:j,
                    width: this.tile_width,
                    height: this.tile_height,
                    origin: origin,
                    center: center,
                    color: color,
                    points: [],
                }
                
                index++;
                row.push(tile);
            }
            this.grid.push(row)
        }
    }

    InitializeParameters(){
        this.param_machine = new ParameterGenerator()
        if(this.params.data.generator_type == 'trad_ifs')
            this.init_trad_ifs_params();
    }


    init_trad_ifs_params(){
        let base_params = this.generate_trad_ifs_base_params();
        console.log('Base Parameters ->',base_params)
        this.grid.map((row)=>{
            row.map((tile)=>{
                tile.generator.setParams(new Object(base_params))  
            });
        });
    }

    generate_trad_ifs_base_params(){
        let base_params = [];
        if(trad_ifs_params.load == ''){
            for(let i = 0; i < trad_ifs_params.function_count; i++){
                let param_array = this.param_machine.rand_param_list(trad_ifs_params.constant_count,trad_ifs_params.variance)
                base_params.push(param_array)
            }
        }
        else {
            base_params = load_saved_seed(trad_ifs_params.load)
        }
        return base_params
    }

    InitializeGenerator(){
        this.grid.map((row)=>{
            row.map((tile)=>{
                console.log('tile ->',tile)
                if(this.params.data.generator_type == 'trad_ifs')
                    tile.generator = new TradIFS();
            });
        });
    }


    GetGrid(){
        return this.grid
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

