

class IFS {
    constructor(params){
        this.params = params
        console.log('IFS created!', this.params)
        this.initialize_functions();
        this.acc = 1000
    }

    round(N){
        return Math.round(N * this.acc) / this.acc
    }

    initialize_functions(){
        let A = this.params.A == 'rand' ? (Math.random() * Math.PI * 2) : this.params.A
        let B = this.params.B == 'rand' ? (Math.random() * Math.PI * 2) : this.params.B
        let C = this.params.C == 'rand' ? (Math.random() * Math.PI * 2) : this.params.C
        let D = this.params.D == 'rand' ? (Math.random() * Math.PI * 2) : this.params.D
        this.Fx = (x,y) =>{
            return this.round(Math.sin(A * y) - Math.cos(B * x))
        }
        this.Fy = (x,y) =>{
            return this.round(Math.sin(C * x) - Math.cos(D * y))
        }
        console.log(A,B,C,D)
    }

    generate_points(){
        let points = [[0.01,0.01]]
        for(let i = 1; i < this.params.iterations; i++){
            let xn = points[i - 1][0]
            let yn = points[i - 1][1]
            points.push([this.Fx(xn,yn),this.Fy(xn,yn)])
        }
        // console.log(points)
        return points
    }



    quantize(points, dims,scale){
        this.tiles = [];
        this.generate_tiles(dims,scale)
        let scaled_points = this.scale_points(points, scale)
        this.filter_points(points);
        this.average_tiles()
        return this.tiles
    }

    generate_tiles(dims,scale){
        this.x_step = scale / dims[0]
        this.y_step = scale / dims[1]
        let max_tiles = dims[0] * dims[1];
        console.log('dims : max_tiles ->\t',dims,' : ',max_tiles)
        let row_count = -1;
        for(let i = 0; i < max_tiles; i++){
            let x = i % dims[0] //squares only for now
            if (x == 0)
                row_count++;
            let y = row_count
            let tile = {
                id: i,
                x:x,
                y:y,
                points:[],
                point_count: 0,
                bounds: [
                    this.x_step * x, // x1
                    this.x_step * (x + 1), //x2
                    this.y_step * y, // y1
                    this.y_step * (y + 1) //y2
                ]
            }
            this.tiles.push(tile)
        }
    }

    average_tiles(){
        for(let i = 0; i < this.tiles.length; i++){
            this.tiles[i].point_count = this.tiles[i].points.length
            console.log('averaging tile values', this.tiles[i].point_count)
            let x_sum = 0;
            let y_sum = 0;
            let point_count =  this.tiles[i].point_count
            for(let j = 0; j < point_count; j++){
                x_sum += this.tiles[i].points[j][0]
                y_sum += this.tiles[i].points[j][1]
            }
            let ave_x = (x_sum / point_count) / this.x_step
            let ave_y = (y_sum / point_count) / this.y_step
            this.tiles[i].ave_x = ave_x
            this.tiles[i].ave_y = ave_y
            console.log('x_sum ->',x_sum, 'x_avg ->',this.tiles[i].ave_x)
            console.log('y_sum ->',y_sum, 'y_avg ->',this.tiles[i].ave_y)
        }
    }


    filter_points(points){
        for(let i = 0; i < points.length; i++){
            let x = points[i][0]
            let y = points[i][1]
            console.log('point->', x,y)

            for(let j = 0; j < this.tiles.length; j++){
                let in_tile = (x >= this.tiles[j].bounds[0]) &&
                               (x <=  this.tiles[j].bounds[1]) &&
                                (y >= this.tiles[j].bounds[2]) &&
                                (y <= this.tiles[j].bounds[3])
                if(in_tile){
                    // console.log('in_tile_xy point->',x,y,'\tbounds->',tiles[j].bounds)
                    this.tiles[j].points.push([x,y])
                    // tiles[j].points.push({x:x,y:y})
                    this.tiles[j].point_count = this.tiles[j].points.length
                    // console.log(this.tiles[j].point_count,'pc')
                    break;
                }
            }
        }
        // console.log(tiles)
        // for(let j = 0; j < tiles.length; j++){
        //     console.log('bound->',tiles[j].bounds,'points->',tiles[j].points)
        // }
    }

    scale_points(points, scale){
        for(let i = 0; i < points.length; i++){ 
            let x = points[i][0]
            let y = points[i][1]
            points[i][0] = this.round((scale * (x + 2)) / 4)
            points[i][1] = this.round((scale * (y + 2)) / 4)
        }
        return points
    }
}



module.exports = IFS;