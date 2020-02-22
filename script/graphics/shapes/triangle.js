


class ShapeTriangle {
    constructor(color_machine){
        this.color_machine = color_machine;
        console.log('triangle_machine')
    }

    generateShape(params,graphic){
        let points = [
            {
                x: params.origin.x - params.width / 2,
                y: params.origin.y - params.height / 2
            },
            {
                x: params.origin.x + params.width / 2,
                y: params.origin.y + params.height / 2
            },
            {
                x: params.origin.x - params.width / 2,
                y: params.origin.y + params.height / 2
            },
        ]
        points = this.rotatePoints(points,params.origin,params.rotation)
        graphic.angleMode(DEGREES)
        graphic.fill(this.color_machine(params.color_value).hex())
        graphic.translate(-params.width / 2, -params.height / 2)

        graphic.beginShape();
        points.map((p) => {
            graphic.vertex(p.x,p.y)
        })
        graphic.endShape(CLOSE);
        graphic.translate(params.width / 2, params.height / 2)
    }

    rotatePoints(points,origin,rotation){
        let radians = rotation * Math.PI / 180
        let new_points = [];
        for(let i = 0; i < points.length; i++){
            let x = points[i].x
            let y = points[i].y
            let cos = Math.cos(radians)
            let sin = Math.sin(radians)
            let nx = (cos * (x - origin.x)) + (sin * (y - origin.y)) + origin.x
            let ny = (cos * (y - origin.y)) - (sin * (x - origin.x)) + origin.y
            new_points.push({
                x: nx,
                y: ny
            })
        }
        // console.log(points,new_points)
        return new_points
    }


}