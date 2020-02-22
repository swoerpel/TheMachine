class AntColony{
    constructor(){
        this.direction_count = 4;
    }

    Initialize(){
        this.initGrid();
        this.initAntTypes();
        this.initAnts();
        
    }

    initAntTypes(){
        this.tile_max_values = {
            'color_value_a':ant_colony_params.max_state,
            'shape_size': ant_colony_params.shape_sizes.length,
            'sub_shapes': ant_colony_params.sub_shape_values.length,
            'sub_shape_size': ant_colony_params.sub_shape_sizes.length,
            'rotation': ant_colony_params.rotation.length
        }
        this.ant_types = Object.keys(this.tile_max_values);
    }

    initAnts(){
        this.ants = []
        for(let i = 0; i < ant_colony_params.ant_count; i++){
            this.ants.push({
                id: i,
                direction: i % this.direction_count,
                type: this.ant_types[i % this.ant_types.length],
                tile_param: this.tile_keys[i % this.tile_keys.length],
                x: Math.floor((ant_colony_params.grid.width - 1) / 2),
                y: Math.floor((ant_colony_params.grid.height - 1) / 2),
                step_size: 1,
                ruleset: this.generateAntRuleset()
            })
        }
        console.log('Active Ants:',this.ants)
    }

    generateAntRuleset(){
        let ruleset = [];
        for(let i = 0; i < ant_colony_params.max_state; i++){
            ruleset.push(Math.floor(Math.random() * this.direction_count))
        }
        return ruleset
    }

    initGrid(){
        this.grid = []
        for(let i = 0; i < ant_colony_params.grid.width; i++){
            let row = []
            for(let j = 0; j < ant_colony_params.grid.height; j++){
                let tile = {
                    color_value_a: Math.random() / 2,
                    color_value_b: Math.random() / 2,
                    shape_size: 0,
                    sub_shapes: 0,
                    sub_shape_size: 0,
                    rotation:0,
                    state: 0,
                }
                row.push(tile)
            }
            this.grid.push(row)
        }
        this.tile_keys = Object.keys(this.grid[0][0])
        // console.log(this.grid,this.tile_keys)
    }



    updateGrid(){
        for(let i = 0; i < ant_colony_params.steps_per_update; i++){
            this.ants.map((ant, index)=>{
                this.grid[ant.x][ant.y].state = (this.grid[ant.x][ant.y].state + 1) % ant_colony_params.max_state
                this.grid[ant.x][ant.y][ant.type] = (this.grid[ant.x][ant.y][ant.type] + 1) % this.tile_max_values[ant.type]
                // console.log(ant.type, this.tile_max_values[ant.type])
                this.updateAnt(ant,this.grid[ant.x][ant.y].state);
            })
        }
        return this.grid
    }
    

    updateAnt(ant,state){
        // console.log(ant.direction,ant.x,ant.y)
        ant.direction = ant.ruleset[state];
        if(ant.direction == 0){
            ant.x = (ant.x + 1) % ant_colony_params.grid.width
        }else if(ant.direction == 1){
            ant.y = (ant.y + 1) % ant_colony_params.grid.height
        }else if(ant.direction == 2){
            if(ant.x <= 0)
                ant.x = ant_colony_params.grid.width - 1
            else
                ant.x--;
        }else if(ant.direction == 3){
            if(ant.y <= 0)
                ant.y = ant_colony_params.grid.height - 1
            else
                ant.y--;
        }else{
            throw 'ERROR ANT DIRECTION VALUE TOO LARGE'
        }
    }

}