var trig_ifs_params = {
    stroke_weight:0.5,
    variance: 2, // +- params can be from zero
    constant_count: 8,
    delta_t: 0.0000002,
    iterations_per_draw: 6000,
    zoom: {
        x:1,
        y:1
    },
    load: '001', //rand if blank
}


function load_trig_ifs_saved_seed(seed_id) {
    let seeds = {
        '000':[-1.50581, 1.55321, 0.30814, -1.56059, -0.29975, 1.86835, -1.33906, -1.17668],
        '001':[-1.96547, -0.61441, 1.46361, 1.0016],
        'pend':[-2.87121, 1.64786, -0.13852, -2.09002,1,1,1,1],
        'hook': [-2.89359, 2.5385, 0.91296, -1.62066, 0.1908, -2.59592, 2.54108, -2.41399]
    }
    return seeds[seed_id]
}