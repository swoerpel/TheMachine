

class InitRowGenerator{
    constructor(){
        console.log('init row machine created')
    }

    rand_row(base,length,group_size,){
        let row = [];
        
        let rand_val = Math.floor(Math.random() * base)
        for(let i = 0; i < length; i++){
            row.push(
                rand_val
            )
            if(i % group_size == 0)
                rand_val = Math.floor(Math.random() * base)
        }
        console.log('Init Row ->', row)
        return row
    }

    step_row(base,length, gap_size = 1, offset = 0){
        let row = [];
        let count = 0;
        for(let i = 0; i < length / gap_size; i++){
            let val = (count + offset) % base
            for(let j = 0; j < gap_size; j++){
                row.push(val)
            }
            count++;
        }
        return row
    }

    alt_step_row(base,length, gap_size = 1, offset = 0){
        let row = [];
        let count = 0;

        for(let i = 0; i < length / gap_size; i++){
            let val = (count + offset) % base
            if(i % 2 == 0)
                val = ((base + i) - val)
            for(let j = 0; j < gap_size; j++){
                row.push(val)
            }
            count++;
        }
        return row
    }


}