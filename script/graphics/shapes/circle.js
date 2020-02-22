


class ShapeCircle {
    constructor(color_machine){
        this.color_machine = color_machine;
        console.log('circle_machine')
    }

    generateShape(params,graphic){
        graphic.fill(this.color_machine(params.color_value).hex())
        graphic.translate(-params.width / 2, -params.height / 2)
        graphic.circle(
            params.origin.x,
            params.origin.y,
            params.width / 2,
            );
        graphic.translate(params.width / 2, params.height / 2)

    }
}