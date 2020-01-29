let small = {
  width: 2400 * 2,
  height: 2400
}
let large = {
  width: 8000,
  height: 8000
}


var config_preview = {
    // canvas: {
    //   width: large.width,
    //   height: large.height
    // },
    // main_graphic:{
    //   width: large.width,
    //   height: large.height
    // },
    canvas: {
      width: small.width,
      height: small.height
    },
    main_graphic:{
      width: small.width,
      height: small.height
    },
    info_graphic:{
      active:true,
      background: 'grey',
      margin:{x:0.125, y:0.0625} 
    },
    colors: {
      background: 'black',
      background_palette: 'Spectral',//['white','gold'],
      points_palette:'random',
      points:'',
      x: 'black',
      y: 'black',
      
    },
    grid: {
      width: 2,
      height:2,
      border_thickness: 0,
    },
    offset:{
      stdev:0.1
    },
    data:{
      generator_type: 'trad_ifs',
      filter: 10000
    }
  }
