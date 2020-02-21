class AntColony{
    constructor(){
        let selected_params = ant_colony_params.step_shape + '_' + ant_colony_params.template;
        this.params = ant_colony_params[selected_params];
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