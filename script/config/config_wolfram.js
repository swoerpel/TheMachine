var wolfram_params = {
    grid:{
        width: 301,
        height: 301
    },
    load:'',
    mode:1, //traditional,totalistic
    base:9,   // < 10
    init_row: {
        type:4, 
        group_size: 6
    },
    kernel:{
        type: 'B',
    }
}


var wolfram_modes = [
    'traditional',  //0
    'totalistic',   //1 
]

var wolfram_init_row_modes = [
    'random',       //0
    'steps',        //1
    'alt_steps',    //2
    'left_group',   //3
    'center_group', //4
    'right_group',  //5
]

var wolfram_kernels = {
    'A':[
        [1,1,1]
    ],

    'B':[
        [1,0,1],
        [0,1,0],
        [1,0,1]
    ],

    'C':[
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,1,1,1,1]
    ],
}


function load_wolfram_saved_seed(seed_id){
    let seeds = {
        '000':{
            value: '201111210021012021010101222',
        },
        'large_triangles':{
            value: '00111100010000110011011001001111',
        },
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