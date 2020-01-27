

class ParameterGenerator{
    constructor(){
        console.log('param generator created')
    }

    rand_param_list(len,std,acc = 100000){
        let params = []
        for(let i = 0; i < len; i++){
            let val = this.round(Math.random() * std * ((Math.random() > 0.5) ? -1 : 1),acc)
            params.push(val)
        }
        return params;
    }

    round(N,acc){
        return Math.round(N * acc) / acc
    }
      
    // base and offset need to be same length
    apply_offset_matrix(base,offset,iterations){
        // let new_params = [];
        console.log('base','offset',base,offset)
        for (let i = 0; i < iterations;i++){
            for (let j = 0; j < base.length;j++){
                for (let k = 0; k < base[j].length;k++){
                    base[j][k] += offset[j][k]
                }
            }
        }
        console.log('base after a few',iterations,base)
        return base

    //             console.log('base[j]',base[j])
    //             // base[j] += float(base[j])
    //             base = base.map((funct,index)=>{
    //                 funct += offset[index]
    //             })
    //             // base[j] += float(offset[j]) * i
    //         }
    //     }
    //     return base
    }
}