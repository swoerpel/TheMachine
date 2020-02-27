


class ShapeCustom {
    constructor(color_machines){
        // expecting array of color_machines
        // IN CUSTOM ONLY
        this.color_machines = color_machines;
        // console.log('circle_machine',this.color_machines )
        this.index = 0;
        this.first = true;
        
    }

    generateShapeGroup(params,graphic){
        graphic.angleMode(DEGREES)
        graphic.strokeWeight(params.stroke_weight)
        console.log(params)
        params.shape_sizes.map((size, index)=>{
            // console.log(this.color_machines)
            graphic.fill(this.color_machines[0](1/(index + 1)).hex())

            graphic.circle(
                params.origin.cx,
                params.origin.cy,
                size * params.tile_width / 2)
        })

        if(false){//debug
            graphic.stroke('red')
            graphic.strokeWeight(100)
            graphic.point(params.origin.x,params.origin.y)
            graphic.strokeWeight(25)
            graphic.point(params.origin.cx,params.origin.cy)
            graphic.strokeWeight(5)
            graphic.line(0,0,params.tile_width,params.tile_height,)
        }
        this.index++;
    }


    initTriangleGroup(params){
        this.triangle_count = 3;
        let rotation_gap = 120;
        this.triangles = [];
        for(let i = 0; i < this.triangle_count; i++){
            let scaler = params.shape_sizes[i % params.shape_sizes.length]
            let shape_width = scaler * params.tile_width
            let shape_height = scaler * params.tile_height
            this.triangles.push({
                id: i,
                origin: JSON.parse(JSON.stringify(params.origin)),
                color_value: Math.random(),
                current_rotation: i * rotation_gap,
                shape_width: shape_width,
                shape_height: shape_height,
                path: [...this.generateHexVertices(params.origin, shape_width)]
                // path: new Array([
                //     {
                //         x: params.origin.cx - shape_width / 2,
                //         y: params.origin.cy - shape_height / 2,
                //     },
                //     {
                //         x: params.origin.cx + shape_width / 2,
                //         y: params.origin.cy + shape_height / 2
                //     },
                //     {
                //         x: params.origin.cx - shape_width / 2,
                //         y: params.origin.cy + shape_height / 2
                //     },
                // ])
            })
        }
        console.log('TRIANGLES',this.triangles)
    }
    
    // generateShapeGroup(params,graphic){
    //     if(this.first){
    //         this.first = false;
    //         this.initTriangleGroup(params);
    //     }
    //     graphic.angleMode(DEGREES)
    //     graphic.strokeWeight(params.stroke_weight)
    //     this.drawBackground(params,graphic)
    //     this.drawTriangleGroup(graphic)
    //     if(true){//debug
    //         graphic.stroke('red')
    //         graphic.strokeWeight(100)
    //         graphic.point(params.origin.x,params.origin.y)
    //         graphic.strokeWeight(25)
    //         graphic.point(params.origin.cx,params.origin.cy)
    //         graphic.strokeWeight(5)
    //         graphic.line(0,0,params.tile_width,params.tile_height,)
    //     }
    //     this.index++;
    // }

    generateHexVertices(origin, hex_diameter, v = 12, rotation = 0) {
        let angle = Math.PI * 2 / v
        let points = []
        let orientation = 0//Math.PI / v // -> pointy top : 0 -> flat top
        for (let a = -1; a < Math.PI * 2 * (1 - 1 / v); a += angle) {
            let sx = origin.cx + Math.cos(a + orientation + rotation) * hex_diameter / 2;
            let sy = origin.cy + Math.sin(a + orientation + rotation) * hex_diameter / 2;
            // sx += 200 * Math.random()
            // sy += 200 * Math.random()

            points.push({ x: sx, y: sy })
        }
        return points
    }

    drawBackground(params,graphic){
        graphic.rectMode(CENTER)
        graphic.fill('black');
        graphic.rect(
            params.origin.cx,
            params.origin.cy,
            params.tile_width,
            params.tile_height);
    }

    drawTriangleGroup(graphic){
        this.triangles.map((tri)=>{
            let cv = Math.sin(this.index / 100 + tri.id * Math.PI / 8)
            tri.path = this.rotatePoints(tri.path,tri.origin)
            graphic.fill(this.color_machine(cv).hex())
            graphic.beginShape();
            tri.path.map((p)=>{graphic.vertex(p.x,p.y)})
            graphic.endShape(CLOSE);
            tri.current_rotation = 1;
            // tri.color_value = 
            // tri.color_value = (Math.random() * (tri.color_value) * 0.05) * (Math.random() > 0.5 ? 1 : -1) + (tri.color_value)
        });
    }


    rotatePoints(path,origin,rotation = 0.05){
        let radians = rotation * Math.PI / 180
        let new_points = [];
        path.map((p)=>{
            let cos = Math.cos(radians)
            let sin = Math.sin(radians)
            let nx = (cos * (p.x - origin.cx)) + (sin * (p.y - origin.cy)) + origin.cx
            let ny = (cos * (p.y - origin.cy)) - (sin * (p.x - origin.cx)) + origin.cy
            // nx = Math.sin(this.index / 100) * nx//(Math.random() * nx * 0.05) * (Math.random() > 0.5 ? 1 : -1) + nx
            // ny = (Math.random() * ny * 0.05) * (Math.random() > 0.5 ? 1 : -1) + ny
            new_points.push({ x: nx, y: ny })
        });
        return new_points
    }

    


    drawTriangle(origin,shape_width, shape_height,rotation){
        let points = [
            {
                x: origin.cx - shape_width / 2,
                y: origin.cy - shape_height / 2,
            },
            {
                x: origin.cx + shape_width / 2,
                y: origin.cy + shape_height / 2
            },
            {
                x: origin.cx - shape_width / 2,
                y: origin.cy + shape_height / 2
            },
        ]
        points = this.rotatePoints(points,origin,rotation)
        
        graphic.fill(this.color_machine(0.5).hex())
        // graphic.fill(this.color_machine(Math.random()).hex())
        graphic.beginShape();
        points.map((p) => {
            graphic.vertex(p.x,p.y)
        })
        graphic.endShape(CLOSE);
    }



}