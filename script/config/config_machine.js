module.exports = {
  canvas: {
    paper_width: 2400,
    paper_height: 2400
  },

  square_A: {
    step_shape: 0,
    step_path: 3, // overlap order path
    color_path: 3, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 2,
    stroke_weights: [1],
    rotation: [0],
    sub_shapes: [1],
    sub_stroke_weights: [1]
  },

  square_B: {
    step_shape: 0,
    step_path: 2, // overlap order path
    color_path: 1, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 1,
    stroke_weights: [1, 0.9, 0.8, 0.7, 0.6, 0.5],
    rotation: [0],
    sub_shapes: [1],
    sub_stroke_weights: [1]
  },
  square_C: {
    step_shape: 0,
    step_path: 3, // overlap order path
    color_path: 3, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 3,
    stroke_weights: [1],
    rotation: [0],
    sub_shapes: [1,2],
    sub_stroke_weights: [1]
  },
  circle_A: {
    step_shape: 1,
    step_path: 2, // overlap order path
    color_path: 2, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 1,
    stroke_weights: [1,.5],
    rotation: [0],
    sub_shapes: [1,2],
    sub_stroke_weights: [1,.5]
  },
  circle_B: {
    step_shape: 1,
    step_path: 2, // overlap order path
    color_path: 2, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 1,
    stroke_weights: [1,.5],
    rotation: [0],
    sub_shapes: [1, 2],
    sub_stroke_weights: [1]
  },
  circle_C: {
    step_shape: 1,
    step_path: 4, // overlap order path
    color_path: 4, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 2,
    stroke_weights: [Math.sqrt(2)],//, 1 - 2 * ((Math.sqrt(2) / 2) - 0.5)],
    rotation: [0],
    sub_shapes: [1],
    sub_stroke_weights: [1]
  },
  triangle_A: {
    step_shape: 2,
    step_path: 3, // overlap order path
    color_path: 3, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 0,
    stroke_weights: [1,],
    rotation: [0, 180],
    sub_shapes: [1,2,4],
    sub_stroke_weights: [1]
  },
  triangle_B: {
    step_shape: 2,
    step_path: 3, // overlap order path
    color_path: 3, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 1,
    stroke_weights: [1,],
    rotation: [0, 180],
    sub_shapes: [1,2,4],
    sub_stroke_weights: [1]
  },
  triangle_C: {
    step_shape: 2,
    step_path: 3, // overlap order path
    color_path: 3, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 2,
    stroke_weights: [1,],
    rotation: [0, 180],
    sub_shapes: [1,2,4],
    sub_stroke_weights: [1]
  },
  block_A: {
    step_shape: 3,
    step_path: 3, // overlap order path
    color_path: 3, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 1,
    stroke_weights: [3,2,1,.5],
    rotation: [0],
    sub_shapes: [1, 2],
    sub_stroke_weights: [1]
  },
  block_B: {
    step_shape: 3,
    step_path: 2, // overlap order path
    color_path: 3, // color sequence path
    grid_scale: { x: 1, y: 1 },
    grid_size: 0,
    stroke_weights: [2, 1, 0.5],
    rotation: [0],
    sub_shapes: [1, 2],
    sub_stroke_weights: [1, 0.5]
  }
};
