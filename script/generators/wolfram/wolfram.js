

class Wolfram{
    constructor(){
        console.log('new wolfram generator')
        console.log('wolfram params',wolfram_params)

        this.row_index = 0;
        
        this.init_row_machine = new InitRowGenerator();
    }

    SetSeed(seed){
        this.seed = seed
    }


    generateRow(){
        let row;
        if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[0])
            row = this.generateTraditionalRow()
        else if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[1])
            row = this.generateTotalisticRow()
        this.current_rows.pop()
        this.current_rows.push(row)
        return row
    }


    generateTraditionalRow(){
        let next_row = []
        let kernel_slices = [];
        for(let i = 0; i < wolfram_params.grid.width; i++){
            let kernel_slice = '';
            for(let j = this.kernel.length - 1; j >= 0; j--){
                let x_index = (i + this.kernel.offsets[j].x) % (wolfram_params.grid.width)
                let y_index = this.kernel.offsets[j].y
                if(x_index < 0)
                    x_index = wolfram_params.grid.width + x_index
                kernel_slice += this.current_rows[y_index][x_index].toString()
            }
            kernel_slices.push(kernel_slice)
        }
        for(let j = 0; j < kernel_slices.length; j++){
            this.neighborhoods.map((n,index)=>{
                if(kernel_slices[j] == n)
                    next_row.push(int(this.seed[index]))
            });
        }
        return next_row
    }

    generateTotalisticRow(){
        let next_row = []
        let kernel_slices = [];
        for(let i = 0; i < wolfram_params.grid.width; i++){
            let kernel_slice = '';
            for(let j = this.kernel.length - 1; j >= 0; j--){
                let x_index = (i + this.kernel.offsets[j].x) % (wolfram_params.grid.width)
                let y_index = this.kernel.offsets[j].y
                if(x_index < 0)
                    x_index = wolfram_params.grid.width + x_index
                kernel_slice += this.current_rows[y_index][x_index].toString()
            }
            kernel_slices.push(kernel_slice)
        }
        for(let j = 0; j < kernel_slices.length; j++){
            this.neighborhoods.map((n,index)=>{
                let avg = 0;
                [...kernel_slices[j]].forEach(v => avg += int(v))
                avg = this.round((avg / this.kernel.length) / (wolfram_params.base - 1))
                if(avg == n)
                    next_row.push(int(this.seed[index]))
            });
        }
        return next_row
    }

    Initialize(){
        this.next_row = new Array(wolfram_params.grid.width).fill(0);
        this.initKernel();
        this.initStartRows();
        this.initNeighborhoods();
        return this.seed_length
    }

    initKernel(){
        this.kernel_machine = new KernelGenerator();
        this.kernel = this.kernel_machine.GenerateKernel();
        console.log('kernel offsets', this.kernel)
    }

    initStartRows(){
        this.init_rows = [];
        this.current_rows = [];
        for(let i = 0; i < this.kernel.dims.y; i++){
            let row = this.init_row_machine.generate_row(
                wolfram_params.init_row.mode,
                wolfram_params.base,
                wolfram_params.grid.width,
                wolfram_params.init_row.group_size + i
            )
            // console.log('init_row',i,row)
            this.init_rows.push(row)
            this.current_rows.push(row)
        }
        console.log(this.current_rows)
    }

    getInitRow(index){
        return this.init_rows[index];
    }

    initNeighborhoods(){
        this.neighborhoods = [];
        let pad = (num, places) => String(num).padStart(places, '0')

        //traditional
        if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[0]){
            let seed_length = Math.pow(wolfram_params.base,this.kernel.length)
            for(let i = 0; i < seed_length; i++){
                let num = i.toString(wolfram_params.base)
                this.neighborhoods.push(pad(num,this.kernel.length))
            }
        }
        //totalistic
        else if(wolfram_modes[wolfram_params.mode] ==  wolfram_modes[1]) { 
            let seed_length = Math.pow(wolfram_params.base,this.kernel.length)
            for(let i = 0; i < seed_length; i++){
                let num = pad(i.toString(wolfram_params.base),this.kernel.length)
                let avg = 0;
                [...num].forEach(v => avg += int(v))
                avg = this.round((avg / this.kernel.length) / (wolfram_params.base - 1))
                if(!this.neighborhoods.includes(avg))
                    this.neighborhoods.push(avg)
            }
        }
        this.seed_length = this.neighborhoods.length
        console.log('neighborhoods',this.neighborhoods)
    }

    round(N,acc = 100000){
        return Math.round(N * acc) / acc
    }

}