

class Wolfram{
    constructor(){
        console.log('new wolfram generator')
        console.log('wolfram params',wolfram_params)

        this.row_index = 0;

    }

    generateRow(){
        
        for(let i = 0; i < wolfram_params.grid.width; i++){
            let kernel_slice = '';
            for(let j = 0; j < wolfram_params.kernel; j++){
                kernel_slice += this.current_row[(i + j) % wolfram_params.grid.width]
            }
            for(let j = 0; j < this.neighborhoods.length; j++){
                if(this.neighborhoods[j] == kernel_slice)
                    this.next_row[i] = this.seed[j]
                    console.log(this.neighborhoods[j],kernel_slice,j)
            }
        }
        this.current_row = this.next_row
        this.row_index = (this.row_index + 1) % wolfram_params.grid.height
        return {row:this.next_row,index:this.row_index}
    }



    Initialize(seed){
        this.seed = seed
        this.initStartRow();
        console.log('current_row ->',this.current_row)
        this.initNeighborhoods();
        // this.initRules();
    }

    initNeighborhoods(){
        this.neighborhoods = [];
        let pad = (num, places) => String(num).padStart(places, '0')
        let seed_length = Math.pow(wolfram_params.base,wolfram_params.kernel)
        for(let i = 0; i < seed_length; i++){
            let num = i.toString(wolfram_params.base)
            this.neighborhoods.push(pad(num,wolfram_params.kernel))
        }
        console.log(this.neighborhoods)
    }

    initStartRow(){
        this.next_row = new Array(wolfram_params.grid.width).fill(0);
        this.current_row = [];
        if(wolfram_params.init_row == 'random'){
            for(let i = 0; i < wolfram_params.grid.width; i++){
                this.current_row.push(Math.floor(Math.random() * wolfram_params.base))
            }
        }
        else{
            //one at center
            for(let i = 0; i < wolfram_params.grid.width; i++){
                if(i == Math.floor(wolfram_params.grid.width / 2))
                    this.current_row.push(wolfram_params.base)
                else
                    this.current_row.push(0)
            }
        }
        console.log('current_row -> ',this.current_row)
    }


    // initRules(){
    //     let seed_length = Math.pow(wolfram_params.base,wolfram_params.kernel)
    //     this.rules = []
    //     for(let i = 0; i < seed_length; i++){
    //         // this.rules.push()
    //     }
    // }

    // initGrid(){
    //     //initialize grid
    //     this.grid = [];
    //     for(let i = 0; i < wolfram_params.grid.width; i++){
    //         let rows = []
    //         for(let j = 0; j < wolfram_params.grid.height; j++){
    //             rows.push(0)
    //         }
    //         this.grid.push(rows)
    //     }
    //     console.log('wolfram grid', this.grid)
    // }

    //initialize base_params -> states, kernel, 
    //initialize init_row
    //initialize
}