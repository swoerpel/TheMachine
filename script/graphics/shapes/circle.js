


class ShapeCircle {
    constructor(color_machine){
        this.color_machine = color_machine;
        console.log('circle_machine')
    }

    generateShapeGroup(params,graphic){
        graphic.strokeWeight(params.stroke_weight)
        let sub_tile_width = params.tile_width / params.subshapes
        let sub_tile_height = params.tile_height / params.subshapes
        for(let i = 0; i < params.subshapes; i++){
            for(let j = 0; j < params.subshapes; j++){
                let x_off =  -(sub_tile_width * (params.subshapes - 1) * 0.5)
                let y_off =  -(sub_tile_height * (params.subshapes - 1) * 0.5)
                let sub_origin = {
                    x: params.origin.x + (sub_tile_width * i),
                    y: params.origin.y + (sub_tile_height * j),
                    cx: params.origin.cx + (sub_tile_width * i) + x_off,
                    cy: params.origin.cy + (sub_tile_height * j) + y_off,
                }  
                if(params.subshapes == 1){
                    params.shape_sizes.map((scaler,index)=>{
                        if(index == 0)
                            graphic.fill(this.color_machine(params.color_value).hex())
                        graphic.circle(sub_origin.cx,sub_origin.cy,sub_tile_width * scaler / 2)
                    })
                }else{
                    params.subshape_sizes.map((scaler)=>{
                        graphic.fill(this.color_machine(Math.random()).hex())
                        graphic.circle(sub_origin.cx,sub_origin.cy,sub_tile_width * scaler / 2)
                    })   
                }
                if(false){//debug
                    graphic.strokeWeight(50)
                    graphic.stroke('white')
                    graphic.point(sub_origin.x,sub_origin.y)
                    graphic.strokeWeight(80)
                    graphic.stroke('black')
                    graphic.point(sub_origin.cx,sub_origin.cy)
                }
            }
        }
    }
}