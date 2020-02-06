let big_screen = true;
let small = {
  width: 2400,
  height: 2400
}
let large = {
  width: 12000,
  height: 12000
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
    frame_rate: 1,
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
      background: 'black',
      background_palette: 'binary',
      // points_palette:'random',
      points_palette:'spectral',
      // points_palette:'ylorrd',
      points:'',
      x: 'black',
      y: 'black',
      
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
      generator_type: 'trig_ifs',
      filter: 10000000
    }
}
