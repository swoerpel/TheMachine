class Pulley{
    constructor(){
    }

    Initialize(){
        this.initGrid();
        this.initPath();
    }

    initGrid(){
        this.grid = []
        let index = 0;
        // let seed = '1000001111111011011110010'
        let seed = '1011101100011100101101110'
        this.on_states = 0;
        for(let i = 0; i < pulley_params.grid.width; i++){
            let row = [];
            for(let j = 0; j < pulley_params.grid.height; j++){
                this.on_states += int(seed.charAt(index))
                let tile = {
                    id: index,
                    i: i,
                    j: j,
                    state: int(seed.charAt(index)),
                    // state: (Math.random() > 0.5),
                    shape_sizes: [...pulley_params.shape_sizes],
                }
                row.push(tile)
                index++;
            }
            this.grid.push(row)
        }
        this.tile_keys = Object.keys(this.grid[0][0])
        console.log(this.tile_keys, this.grid,this.on_states)
    }

    initPath(){
        let index = 0;
        let path = [];

        // console.log(this.spiral(5,5))
        let spiral_grid = this.spiral(pulley_params.grid.width,pulley_params.grid.height)
        console.log(spiral_grid)
        for(let i = 0; i < pulley_params.grid.width; i++){
            for(let j = 0; j < pulley_params.grid.height; j++){
                if(this.grid[i][j].state){
                    // this.grid[i][j].state -= (1 / (index + 1))
                    let sp = spiral_grid[i][j]

                    console.log('active',sp, this.on_states)
                    for(let k = 0; k < this.on_states; k++){
                        if(k == index)
                            console.log(sp,k)
                    }
                }
                
                // let a = index % pulley_params.grid.width  
                // let b = index % pulley_params.grid.height  //repeater
                // console.log(i,j,' - ',a,b)
                index++

            }
        }
    }

    getGrid(){
        return this.grid
    }

    spiral(width, height) {
        let step_count = 0;
        let max_step_count = width * height;
        let origin = {
            x: Math.floor(width / 2),
            y: Math.floor(height / 2),
        }
        let grid = new Array(width).fill().map(() => new Array(height).fill(0));
        let current_direction = 2;
        let distance = 1;
        let direction_change_count = 0;
        let position = {
            x: origin.x,
            y: origin.y,

        }
        while (step_count < max_step_count) {
            for (let i = 0; i < distance; i++) {
                grid[position.x][position.y] = (step_count)
                step_count++;
                if (current_direction == 0) {

                    position = {
                        x: (position.x + 1) % width,
                        y: position.y
                    }
                }
                else if (current_direction == 1) {
                    position = {
                        x: position.x,
                        y: (position.y + 1) % height,
                    }
                }
                else if (current_direction == 2) {
                    position = {
                        x: (position.x < 0) ? width - 1 : position.x - 1,
                        y: position.y
                    }
                }
                else if (current_direction == 3) {
                    position = {
                        x: position.x,
                        y: (position.y < 0) ? height - 1 : position.y - 1,
                    }
                }
            }
            current_direction = (current_direction + 1) % 4
            direction_change_count++
            if (direction_change_count == 2) {
                distance++;
                direction_change_count = 0;
            }
        }
        return grid
    }
}