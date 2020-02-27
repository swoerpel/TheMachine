let big_screen = false;
// let big_screen = true;
let small = {
  width: 2400,
  height: 2400
}
let large = {
  width: 4800,
  height: 4800
}
let width;
let height;
if(big_screen){
  width = large.width
  height = large.height
}
else{
  width = small.width
  height = small.height
}

var config_preview = {
    frame_rate: 32,
    canvas: {
      width: width,
      height: height
    },
    main_graphic:{
      width: width,
      height: height
    },
    info_graphic:{
      active:true,
      background: 'grey',
      margin:{x:0.125, y:0.0625} 
    },
    colors: {
      background: 'white',
      background_palette: 'binary',
      // points_palette:['spectral'],
      // points_palette:['binary'],
      // points_palette:['random'],
      // points_palette:['ylorrd'],
      palettes:['binary'],
      points:'',
      
    },

    shape: {
      // type: 'rectangle'
      // type: 'circle'
      // type: 'triangle'
      type: 'custom'
    },

    grid: {
      width: 1,
      height:1,
      border_thickness: 0,
    },
    offset:{
      stdev:0.15
    },
    data:{
      // generator_type: 'trig_ifs',
      // generator_type: 'trad_ifs',
      generator_type: 'ant_colony',
      // generator_type: 'wolfram',
      // generator_type: 'pulley',
      filter: 10000000
    }
}
