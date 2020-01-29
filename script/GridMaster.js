// var config = require("./config/config_gridmaster.js");


class GridMaster {
    constructor(params){
        console.log('Grid Master Initialized')
        this.params = params;
    }


    InitializeGenerator(){
        this.grid.map((row)=>{
            row.map((tile)=>{
                console.log('tile ->',tile)
                if(this.params.data.generator_type == 'trad_ifs')
                    tile.generator = new TradIFS();
                if(this.params.data.generator_type == 'trig_ifs')
                    tile.generator = new TrigIFS();
            });
        });
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
                    function_color_vals: Array.from({
                        length: trad_ifs_params.function_count
                    }, () => Math.random()),
                    background_val:1,
                    vals : [
                        1 / Math.sqrt(i*i + j*j),
                        1 - (1 / Math.sqrt(i*i + j*j))
                    ]
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

    InitializeParameters(loaded_base_params){
        this.param_machine = new ParameterGenerator()
        if(this.params.data.generator_type == 'trad_ifs')
            this.init_trad_ifs_params(loaded_base_params);
        if(this.params.data.generator_type == 'trig_ifs')
            this.init_trig_ifs_params(loaded_base_params);
    }

    init_trad_ifs_params(loaded_base_params){
        let base_params;
        if(!loaded_base_params)
            base_params = loaded_base_params
        else
            base_params = this.generate_trad_ifs_base_params();
        console.log('base params ->',base_params,loaded_base_params)
        let offset_matrix_x = [];
        let offset_matrix_y = [];
        for(let i = 0; i < trad_ifs_params.function_count; i++){
            offset_matrix_x.push(this.param_machine.rand_param_list(trad_ifs_params.constant_count,config_preview.offset.stdev))
            offset_matrix_y.push(this.param_machine.rand_param_list(trad_ifs_params.constant_count,config_preview.offset.stdev))
        }
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                let base_params_copy = base_params.map(funct => funct.slice())
                let current_params = this.param_machine.apply_offset_matrix_2d(base_params_copy,offset_matrix_x, i)
                current_params = this.param_machine.apply_offset_matrix_2d(current_params,offset_matrix_y, j)
                console.log('current_params',i,j,current_params)
                // let current_params = this.generate_trad_ifs_base_params();
                this.grid[i][j].generator.setParams(new Object(current_params))  
            }
        }
    }

    init_trig_ifs_params(loaded_base_params){
        let base_params;
        if(!loaded_base_params)
            base_params = loaded_base_params
        else
            base_params = this.generate_trig_ifs_base_params();
        console.log('base params ->',base_params,loaded_base_params)
        let offset_matrix_x = this.param_machine.rand_param_list(trig_ifs_params.constant_count,config_preview.offset.stdev)
        let offset_matrix_y = this.param_machine.rand_param_list(trig_ifs_params.constant_count,config_preview.offset.stdev)
        
        // console.log('offset x,y',offset_matrix_x,',',offset_matrix_y)
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                let base_params_copy = new Object(base_params)
                let current_params = this.param_machine.apply_offset_matrix_1d(base_params_copy,offset_matrix_x, i)
                current_params = this.param_machine.apply_offset_matrix_1d(current_params,offset_matrix_y, j)
                // console.log('CHET->',i,j,current_params)
                this.grid[i][j].generator.setParams([...current_params])  

            }
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
        }
        else {
            base_params = load_trad_ifs_saved_seed(trad_ifs_params.load)
        }
        return base_params
    }

    generate_trig_ifs_base_params(){
        if(trig_ifs_params.load == ''){
            let v = trig_ifs_params.variance;
            let cc = trig_ifs_params.constant_count;
            return this.param_machine.rand_param_list(cc,v)
        }
        else {
            let chet = load_trig_ifs_saved_seed(trig_ifs_params.load)
            // console.log('loaded trig ifs params ->',chet, trad_)
            return chet
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