
var trad_ifs_params = {
    zoom:{x:1,y:1},
    stroke_weight:1,
    iterations_per_draw: 100,
    // load: '', //rand if blank
    load: 'helix', //rand if blank
    // load: 'califlower', //rand if blank
    variance: 1, // +- params can be from zero
    function_count: 2,
    constant_count: 6
    // load: 'floor_spikes', //rand if blank
}


function load_saved_seed(seed_id) {
    let seeds = {
      'leaf_bois': [[-0.6466558, 0.12387177, -0.53947019, -0.69715325, 0.77943671, -0.79004337],
      [0.59591638, -0.0258686, -0.40476259, -0.62336581, -0.39510686, -0.13025707]],
      'chet_bois': [[0.76832497, -0.75066203, 0.66118018, 0.1483618, -0.17053463, -0.21652481],
      [0.51233157, -0.38954531, 0.2008771, 0.58077079, 0.10759817, 0.77734813]],
  
      'stalags': [[0.88396032, 0.22063894, 0.20292951, 0.567214, -0.10332333, 0.66799224],
      [-0.08923335, -0.75483106, -0.53338819, 0.801923, -0.27279865, -0.3211181]],
  
      'paintBrush':
        [[-0.65528484, 0.31520157, 0.13575914, 0.50665012, 0.64990745, 0.57546619],
        [-0.94684552, -0.18767946, -0.09292563, 0.63450593, 0.24349842, -0.28090146]],
  
      'strokes':
        [[-0.19915228, -0.8981415, 0.72326924, -0.47651867, 0.02816197, 0.46517965],
        [0.24453893, -0.5577731, 0.90412684, -0.33577616, 0.18344771, 0.26639198]],
  
      'flowerboi':
        [[-0.1715, -0.6509, -0.4434, -0.0154, -0.4762, -0.78],
        [-0.8277, 0.5572, -0.263, -0.7199, 0.4776, 0.387]],
  
      'curl': //chets default debug image
        [[0.0089, -0.9702, -0.6750, 0.0844, 0.3041, 0.3336],
        [0.4735, -0.1982, -0.0845, -0.4997, -0.9720, -0.9981]],
  
      'califlower':
        [[0.9214517035925556, -0.20837734212381687, -0.8778739878894375, -0.7268201634085902, 0.3881429703646999, -0.0903587572158262],
        [0.18925913979345932, 0.36237031426907107, -0.2666231584559582, 0.5703776429844525, -0.808166850064028, -0.32778035894084745]],
  
      'floor_spikes':
      [[-0.38994, -0.6637, -0.6104, -0.09085, -0.16613, -0.24464],
       [0.59601, -0.02116, -0.46346, 0.83797, -0.2646, 0.39447]],

       'helix':
       [[0.8665, -0.0095, 0.3579, 0.7326, 0.2283, 0.3088],
       [-0.8968, 0.5793, 0.5454, -0.6753, -0.1575, -0.7916]],

    }
    return seeds[seed_id]
}