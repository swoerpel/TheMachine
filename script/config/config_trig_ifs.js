var trig_ifs_params = {
    stroke_weight:2,
    variance: 2.2, // +- params can be from zero
    constant_count: 8,
    init_point_count: 10,
    load: '', //rand if blank
}


function load_trig_ifs_saved_seed(seed_id) {
    let seeds = {
        'pend':[-2.87121, 1.64786, -0.13852, -2.09002,1,1,1,1],
        'hook': [-2.89359, 2.5385, 0.91296, -1.62066, 0.1908, -2.59592, 2.54108, -2.41399]
    }
    return seeds[seed_id]
}