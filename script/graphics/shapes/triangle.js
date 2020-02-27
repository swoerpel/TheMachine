class ShapeTriangle {
    constructor(color_machines){
        this.color_machines = color_machines;
        console.log('triangle_machine')
    }

    generateShapeGroup(params,graphic){
        graphic.angleMode(DEGREES)
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
                    params.shape_sizes.map((scaler)=>{
                        params.rotation.stack.map((rot)=>{
                            this.drawTriangle(
                                sub_origin,
                                sub_tile_width * scaler,
                                sub_tile_height * scaler,
                                rot + params.rotation.initial
                            )
                        })
                    })
                }else{
                    params.subshape_sizes.map((scaler)=>{
                        params.rotation.stack.map((rot)=>{
                            this.drawTriangle(
                                sub_origin,
                                sub_tile_width * scaler,
                                sub_tile_height * scaler,
                                rot + params.rotation.initial
                            )
                        });
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

    drawTriangle(origin,bound_width, bound_height,rotation){
        let points = [
            {
                x: origin.cx,// - bound_width / 2,
                y: origin.y,// - bound_height / 2,
            },
            {
                x: origin.x + bound_width,
                y: origin.y + bound_height
            },
            {
                x: origin.x,
                y: origin.y + bound_height
            },
        ]
        // let points = [
        //     {
        //         x: origin.cx - bound_width / 2,
        //         y: origin.cy - bound_height / 2,
        //     },
        //     {
        //         x: origin.cx + bound_width / 2,
        //         y: origin.cy + bound_height / 2
        //     },
        //     {
        //         x: origin.cx - bound_width / 2,
        //         y: origin.cy + bound_height / 2
        //     },
        // ]
        points = this.rotatePoints(points,origin,rotation)
        graphic.fill(this.color_machines[0](Math.random()).hex())
        graphic.beginShape();
        points.map((p) => {
            graphic.vertex(p.x,p.y)
        })
        graphic.endShape(CLOSE);
    }


    rotatePoints(points,origin,rotation){
        let radians = rotation * Math.PI / 180
        let new_points = [];
        for(let i = 0; i < points.length; i++){
            let x = points[i].x
            let y = points[i].y
            let cos = Math.cos(radians)
            let sin = Math.sin(radians)
            let nx = (cos * (x - origin.cx)) + (sin * (y - origin.cy)) + origin.cx
            let ny = (cos * (y - origin.cy)) - (sin * (x - origin.cx)) + origin.cy
            new_points.push({
                x: nx,
                y: ny
            })
        }
        return new_points
    }


}