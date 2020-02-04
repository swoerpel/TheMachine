

class InitRowGenerator{
    constructor(){
        console.log('init row machine created')
    }

    generate_row(alg_index,base,length,group_size, offset = 0){
        if(alg_index == 0)
            return this.rand_row(base,length,group_size,offset)
        if(alg_index == 1)
            return this.step_row(base,length,group_size,offset)
        if(alg_index == 2)
            return this.alt_step_row(base,length,group_size,offset)
        if(alg_index == 3)
            return this.center_group_row(base,length,group_size,offset)
    }

    rand_row(base,length,group_size,offset = 0){
        let row = [];
        
        let rand_val = Math.floor(Math.random() * base)
        for(let i = 0; i < length; i++){
            row.push(
                rand_val
            )
            if(i % group_size == 0)
                rand_val = Math.floor(Math.random() * base)
        }
        return row
    }

    step_row(base,length, group_size = 1, offset = 0){
        let row = [];
        let count = 0;
        for(let i = 0; i < length / group_size; i++){
            let val = (count + offset) % base
            for(let j = 0; j < group_size; j++){
                row.push(val)
            }
            count++;
        }
        return row.slice(0,length)
    }

    alt_step_row(base,length, group_size = 1, offset = 0){
        let row = [];
        let up = [...Array(base).keys()]
        let down = [...Array(base).keys()].reverse().slice(1,base - 1)
        let step = up.concat(down)
        for(let i = 0; i < length; i++)
            for(let j = 0; j < group_size; j++)
                row.push(step[(i + offset) % step.length])
        return row
    }

    center_group_row(base,length, group_size = 1, offset = 0){
        let count = 1;
        let row = [];
        let center = Math.floor(length / 2)
        let start_index = center - (base - 2)
        let end_index = center + (base - 2)
        // console.log('start and end index', start_index, end_index)
        for(let i = 0; i < length; i++)
            if(i == center)
                row.push(count)
                // row.push(count)
                // if(i < center)
                    // count++;
                // else
                    // count--;
            else{
                row.push(0)
            }
            // for(let j = 0; j < group_size; j++)
                // row.push(step[(i + offset) % step.length])
        return row
    }


}