let small = {
  width: 2400,
  height: 2400
}
let large = {
  width: 2400,
  height: 6000
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
      background_palette: 'binary',//['white','gold'],
      points_palette:'vibrant',
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
      stdev:0.05
    },
    data:{
      generator_type: 'wolfram',
      filter: 10000000
    }
  }
