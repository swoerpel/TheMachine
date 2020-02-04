var wolfram_params = {
    grid:{
        width: 32,
        height: 32
    },
    load:'',
    mode:1, //traditional,totalistic
    base:2,
    kernel:3,
    init_row: {
        type:2, 
        gap_size: 1
    },
    // kernel:{
    //     A: [['xxx']],

    //     shift:{
    //         x: 0,
    //         y: 0
    //     }
    // }
}
var wolfram_modes = [
    'traditional',
    'totalistic',
]

var wolfram_init_row_modes = [
    'random',
    'steps',
    'alt_steps'
]


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
        },
        'chet_02':{
            value: '2103121223300202012331132030023133032122202232301330110211231031',
            base:4,
            kernel:3,
        }
    }
    return seeds[seed_id]
}