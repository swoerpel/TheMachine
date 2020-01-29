var wolfram_params = {
    grid:{
        width: 64,
        height: 64
    },
    load:'',
    base:3,
    kernel:3,
    init_row: 'random', //'random'
}


function load_wolfram_saved_seed(seed_id){
    let seeds = {
        '110':{
            value: '00111110',
            // value: '01110110',
            base:2,
            kernel:3,
        },
        '30':{
            value: '01111000',
            base:2,
            kernel:3,
        },
        '66':{
            value: '01100110',
            base:2,
            kernel:3,
        }
    }
    return seeds[seed_id]
}