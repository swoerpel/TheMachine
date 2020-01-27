
var trad_ifs_params = {
    zoom:{x:1,y:1},
    stroke_weight:2,
    iterations_per_draw: 100,
    load: 'truss_01', //rand if blank
    // load: 'spiral_02', //rand if blank
    // load: 'forest_03', //rand if blank
    // load: 'hooks_and_spirals', //rand if blank
    // load: 'roofing', //rand if blank
    // load: 'flowerBois', //rand if blank
    // load: 'helix', //rand if blank
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

       'flowerBois':
       [[-0.1715, -0.6509, -0.4434, -0.0154, -0.4762, -0.78],
       [-0.8277, 0.5572, -0.263, -0.7199, 0.4776, 0.387]],

       //new generation
        'roofing': 
        [[0.97195, 0.64809, -0.02474, 0.57822, 0.68884, -0.39228],
        [-0.48576, 0.17361, 0.31782, 0.61979, -0.57585, 0.41506]],

        'hooks_and_spirals':
        [[0.89252, 0.00244, 0.69927, -0.27241, 0.7442, -0.919],
        [0.11344, 0.88832, -0.61767, 0.69828, -0.29237, 0.92495]],

        'forest_01':
        [[0.48236, 0.7214499999999999, 0.9376699999999998, -0.21221, -0.5320499999999999, 0.20521],
        [0.25712, -0.7631999999999999, -0.34789, 0.15267000000000003, -0.0848, 0.55708]],

        'forest_02':
        [[-0.54789, -0.52524, -0.43554, 0.71865, -0.01643, -0.03041],
        [0.03658, -0.77846, -0.56235, 0.03903, 0.36082, 0.08155]],

        'forest_03':
        [[-0.62627, -0.71152, -0.2439, 0.52677, -0.04993, 0.05583],
        [0.14318, -0.95448, -0.47081, -0.12767, 0.18652, -0.03505]],

        'triangle_01':
        [[-0.70383, 0.46882, -1.04071, 0.29646, 1.0083, 0.19497],
        [1.03957, -0.58739, -0.01332, -0.49897, -0.49438, -0.64292]],

        'spiral_01':
        [[-0.4844, 0.021469999999999996, -0.10001, -0.61674, -0.023620000000000002, 0.24269999999999997],
        [0.7512399999999999, 0.85836, -0.16377, 0.92718, -0.27603, -0.6473399999999999]],

        'spiral_02':
        [[-0.512, 0.12233999999999999, -0.017520000000000008, -0.6513899999999999, -0.014130000000000002, 0.40386],
        [0.8355199999999999, 0.93498, -0.26031, 0.75703, -0.27277999999999997, -0.6029899999999999]],

        'truss_01':
        [[0.17471000000000003, -0.60972, 0.8580300000000001, -0.26062, -0.022610000000000005, -0.37754],
        [-0.5193399999999999, -0.42176, 0.7828600000000001, -0.24722, -1.1024699999999998, -0.17445999999999995]],

    }
    return seeds[seed_id]
}