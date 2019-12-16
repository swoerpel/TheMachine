module.exports = {
    canvas :{
        paper_width: 2400,
        paper_height: 2400
    }, 


    square_A:{
        step_shape: 0,
        step_path: 0, // overlap order path
        color_path: 0, // color sequence path
        grid_scale: { x: 1, y: 1 },
        grid_size: 0,
        stroke_weights: [1],
        rotation: [0],
        sub_shapes: [1],
        sub_stroke_weights: [1],
    },
    circle_A:{
        
    },
    triangle_A:{
        step_shape: 2,
        step_path: 0, // overlap order path
        color_path: 0, // color sequence path
        grid_scale: { x: 1, y: 1 },
        grid_size: 2,
        stroke_weights: [2,1,.75,.5],
        rotation: [0,90,180],
        sub_shapes: [1,2],
        sub_stroke_weights: [1,.5],
    },
    triangle_B:{
        step_shape: 2,
        step_path: 0, // overlap order path
        color_path: 0, // color sequence path
        grid_scale: { x: 1, y: 1 },
        grid_size: 0,
        stroke_weights: [1],
        rotation: [0,90,180],
        sub_shapes: [1],
        sub_stroke_weights: [1],
    },
    block_A:{
        
    },
};