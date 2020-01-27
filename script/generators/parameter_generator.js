

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
        for (let i = 0; i < iterations;i++){
            for (let j = 0; j < base.length;j++){
                for (let k = 0; k < base[j].length;k++){
                    base[j][k] += offset[j][k]
                }
            }
        }
        return base
    }
}