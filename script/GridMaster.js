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
                let tile = {
                    id: index,
                    x:i,
                    y:j,
                    width: this.tile_width,
                    height: this.tile_height,
                    origin: origin,
                    center: center,
                    points: [],
                }
                index++;
                row.push(tile);
            }
            this.grid.push(row)
        }
    }

    InitializeGenerator(){
        this.grid.map((row)=>{
            row.map((tile)=>{
                console.log('tile ->',tile)
                if(this.params.data.generator_type == 'trad_ifs')
                    tile.generator = new TradIFS();
                if(this.params.data.generator_type == 'trig_ifs')
                    tile.generator = new TrigIFS();
                if(this.params.data.generator_type == 'wolfram')
                    tile.generator = new Wolfram();
                if(this.params.data.generator_type == 'ant_colony')
                    tile.generator = new AntColony();
                if(this.params.data.generator_type == 'pulley')
                    tile.generator = new Pulley();
            });
        });
    }

    InitializeParameters(){
        this.param_machine = new ParameterGenerator()
        if(this.params.data.generator_type == 'trad_ifs')
            this.init_trad_ifs_params();
        if(this.params.data.generator_type == 'trig_ifs')
            this.init_trig_ifs_params();
        if(this.params.data.generator_type == 'wolfram')
            this.init_wolfram_params();
        if(this.params.data.generator_type == 'ant_colony')
            this.init_ant_colony_params();
        if(this.params.data.generator_type == 'pulley')
            this.init_pulley_params();
    }

    init_trad_ifs_params(){
        let base_params = this.generate_trad_ifs_base_params();
        let offset_matrix_x = [];
        let offset_matrix_y = [];
        for(let i = 0; i < trad_ifs_params.function_count; i++){
            offset_matrix_x.push(
                this.param_machine.rand_param_list(
                    trad_ifs_params.constant_count,
                    config_preview.offset.stdev
            ));
            offset_matrix_y.push(
                this.param_machine.rand_param_list(
                    trad_ifs_params.constant_count,
                    config_preview.offset.stdev
            ));
        }
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                let base_params_copy = base_params.map(funct => funct.slice())
                let current_params = this.param_machine.apply_offset_matrix_2d(base_params_copy,offset_matrix_x, i)
                current_params = this.param_machine.apply_offset_matrix_2d(current_params,offset_matrix_y, j)
                console.log('current_params',i,j,current_params)
                // let current_params = this.generate_trad_ifs_base_params();
                this.grid[i][j].generator.Initialize(new Object(current_params))  
            }
        }
    }

    init_trig_ifs_params(){
        let base_params = this.generate_trig_ifs_base_params();
        let offset_matrix_x = this.param_machine.rand_param_list(
            trig_ifs_params.constant_count,
            trig_ifs_params.variance)
        let offset_matrix_y = this.param_machine.rand_param_list(
            trig_ifs_params.constant_count,
            trig_ifs_params.variance)
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                let base_params_copy = new Object(base_params)
                let current_params = this.param_machine.apply_offset_matrix_1d(base_params_copy,offset_matrix_x, i)
                current_params = this.param_machine.apply_offset_matrix_1d(current_params,offset_matrix_y, j)
                this.grid[i][j].generator.Initialize([...current_params])  
            }
        }
    }

    init_wolfram_params(){
        //base_seed returned as string to keep leading zeros
        
        let seed_length;
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                seed_length = this.grid[i][j].generator.Initialize()
            }
        }
        // console.log(seed_length)
        let base_seed = this.generate_wolfram_base_seed(seed_length);
        console.log('wolfram base params ->',base_seed, base_seed.length)

        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                this.grid[i][j].generator.SetSeed(base_seed)
            }
        }
    }


    init_ant_colony_params(){
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                this.grid[i][j].generator.Initialize()
            }
        }
    }
    
    init_pulley_params(){
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                this.grid[i][j].generator.Initialize()
            }
        }
    }



    generate_wolfram_base_seed(seed_length){
        if(wolfram_params.load == '')
            return this.param_machine.rand_int(wolfram_params.base,seed_length)
        else{
            let seed = load_wolfram_saved_seed(wolfram_params.load).value
            return seed
        }
    }

    generate_trad_ifs_base_params(){
        let base_params = [];
        if(trad_ifs_params.load == ''){
            for(let i = 0; i < trad_ifs_params.function_count; i++){
                let v = trad_ifs_params.variance;
                let cc = trad_ifs_params.constant_count;
                let param_array = this.param_machine.rand_param_list(cc,v)
                base_params.push(param_array)
            }
            return base_params
        }
        else {
            return load_trad_ifs_saved_seed(trad_ifs_params.load)
        }
    }

    generate_trig_ifs_base_params(){
        if(trig_ifs_params.load == ''){
            let v = trig_ifs_params.variance;
            let cc = trig_ifs_params.constant_count;
            return this.param_machine.rand_param_list(cc,v)
        }
        else {
            return load_trig_ifs_saved_seed(trig_ifs_params.load)
        }
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