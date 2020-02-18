class AntColony{
    constructor(){
        let selected_params = config_ant_colony.step_shape + '_' + config_ant_colony.template;
        this.params = config_ant_colony[selected_params];
        console.log(this.params)
    }

    Initialize(){
        this.initGrid()
        // console.log(this.grid)
    }


    //class keeps entire grid data at all times
    initGrid(){
        // this.grid = new Array(this.params.grid.width).fill()
        // .map(() => new Array(this.params.grid.height).fill({
        //     rule: 0,
        //     color: new Array(this.params.color_spread).fill(0),// [0, 0, 0, 0, 0, 0, 0],
        //     sub_shape: 1,
        //     stroke_weight: [],
        //     rotation: [],
        // }));
        // console.log(this.grid)
    }

    updateGrid(steps){
        
    }


}