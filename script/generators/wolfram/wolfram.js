

class Wolfram{
    constructor(){
        console.log('new wolfram generator')
        console.log('wolfram params',wolfram_params)

        this.row_index = -1;
        
        this.init_row_machine = new InitRowGenerator();
    }

    generateRow(){
        let row = {}
        if(this.row_index == 0){
            row = new Object({
                row: this.init_row,
                index: this.row_index
            });
        }
        else{
            for(let i = 0; i < wolfram_params.grid.width; i++){
                if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[0])
                    row = this.generateTraditionalRow(i)
                else if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[1])
                    row = this.generateTotalisticRow(i);
            }
        }
        this.current_row = this.next_row
        this.row_index = this.row_index + 1//) % wolfram_params.grid.height
        return row
    }


    generateTraditionalRow(){
        
    }

    generateTotalisticRow(i){
        let kernel_slice = '';
        for(let j = 0; j < wolfram_params.kernel; j++){
            kernel_slice += this.current_row[(i + j) % wolfram_params.grid.width]
        }
        let avg_val = 0;
        for(let j = 0; j < wolfram_params.kernel; j++)
            avg_val += int(kernel_slice[j])
        avg_val = this.round(avg_val / wolfram_params.kernel / (wolfram_params.base - 1))
        for(let j = 0; j < this.neighborhoods.length; j++){
            if(this.neighborhoods[j] == avg_val)
                this.next_row[(i + Math.floor(wolfram_params.kernel / 2)) % wolfram_params.grid.width] = this.seed[j]
        }
        return new Object({row:this.next_row,index:this.row_index})

    }


    Initialize(seed){
        this.seed = seed
        this.next_row = new Array(wolfram_params.grid.width).fill(0);
        this.current_row = [];
        this.initStartRow();
        this.initKernel();
        this.initNeighborhoods();
    }

    initKernel(){
        this.kernel_machine = new KernelGenerator();
    }

    initStartRow(){
        this.init_row = [];
        //random
        if(wolfram_init_row_modes[wolfram_params.init_row.type] ==  wolfram_init_row_modes[0])
            this.init_row = this.init_row_machine.rand_row(
                wolfram_params.base,
                wolfram_params.grid.width,
                wolfram_params.init_row.gap_size);

        //steps
        if(wolfram_init_row_modes[wolfram_params.init_row.type] ==  wolfram_init_row_modes[1])
            this.init_row = this.init_row_machine.step_row(
                wolfram_params.base,
                wolfram_params.grid.width,
                wolfram_params.init_row.gap_size);


        //alt_steps
        if(wolfram_init_row_modes[wolfram_params.init_row.type] ==  wolfram_init_row_modes[2])
            this.init_row = this.init_row_machine.alt_step_row(
                wolfram_params.base,
                wolfram_params.grid.width,
                wolfram_params.init_row.gap_size);
    }

    initNeighborhoods(){
        this.neighborhoods = [];
        let pad = (num, places) => String(num).padStart(places, '0')
        let trad_seed_length = Math.pow(wolfram_params.base,wolfram_params.kernel)

        //traditional
        if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[0]){
            for(let i = 0; i < trad_seed_length; i++){
                let num = i.toString(wolfram_params.base)
                this.neighborhoods.push(pad(num,wolfram_params.kernel))
            }
        }

        //totalistic
        else if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[1]) { 
            let total_seed_length = wolfram_params.kernel * (wolfram_params.base - 1) + 1
            console.log('seed length',total_seed_length)
            for(let i = 0; i < trad_seed_length; i++){
                let num = i.toString(wolfram_params.base)
                num = pad(num,wolfram_params.kernel)
                let avg = 0;
                for(let j = 0; j < wolfram_params.kernel; j++)
                    avg += int(num[j])
                avg = this.round(avg / wolfram_params.kernel / (wolfram_params.base - 1))
                if(this.neighborhoods.indexOf(avg) == -1)
                    this.neighborhoods.push(avg)
            }
        }
        console.log(this.neighborhoods)
    }

    round(N,acc = 100000){
        return Math.round(N * acc) / acc
    }

}