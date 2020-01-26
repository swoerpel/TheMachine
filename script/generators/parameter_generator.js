

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
      

}