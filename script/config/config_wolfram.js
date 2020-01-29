var wolfram_params = {
    grid:{
        width: 16,
        height: 16
    },
    load:'',
    mode:'totalistic', //traditional,totalistic
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
        },
        'chet_01':{
            value: '000211101020200222201221210',
            base:3,
            kernel:3,
        }
    }
    return seeds[seed_id]
}