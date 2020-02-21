


class ShapeRectangle {
    constructor(color_machine){
        this.color_machine = color_machine;
        console.log('rectangle_machine',color_machine)
    }

    generateShape(params,graphic){
        graphic.rectMode(CENTER);
        graphic.fill(this.color_machine(params.color_value).hex())
        graphic.rect(
            params.origin.x,
            params.origin.y,
            params.width,
            params.height
            );
    }
}