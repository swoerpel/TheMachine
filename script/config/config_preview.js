var config_preview = {
    // canvas: {
    //   width: 5000,
    //   height: 5000
    // },
    // main_graphic:{
    //   width: 5000,
    //   height: 5000
    // },
    canvas: {
      width: 4800 * 2,
      height: 4800
    },
    main_graphic:{
      width: 4800 * 2,
      height: 4800
    },
    info_graphic:{
      active:true,
      background: 'grey',
      margin:{x:0.125, y:0.0625} 
    },
    colors: {
      background: 'black',
      background_palette: 'Spectral',//['white','gold'],
      points_palette:'Pastel1',
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
