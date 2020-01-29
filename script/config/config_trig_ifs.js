var trig_ifs_params = {
    stroke_weight:2,
    variance: Math.PI, // +- params can be from zero
    constant_count: 4,
    load: '', //rand if blank
}


function load_trig_ifs_saved_seed(seed_id) {
    let seeds = {

        'pend':[-2.87121, 1.64786, -0.13852, -2.09002]
    }
    return seeds[seed_id]
}