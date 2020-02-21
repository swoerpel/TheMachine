


class ShapeTriangle {
    constructor(color_machine){
        this.color_machine = color_machine;
        console.log('triangle_machine')
    }

    generateShape(params,graphic){
        // console.log(params)
        graphic.fill(this.color_machine(params.color_value).hex())
        graphic.translate(-params.width / 2, -params.height / 2)
        graphic.beginShape();
        graphic.vertex(params.origin.x,params.origin.y)
        graphic.vertex(params.origin.x + params.width, params.origin.y + params.height)
        graphic.vertex(params.origin.x,params.origin.y + params.height)
        graphic.endShape(CLOSE);
        graphic.translate(params.width / 2, params.height / 2)
    }
}