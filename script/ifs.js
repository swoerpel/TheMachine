

class IFS {
    constructor(params){
        this.params = params
        console.log('IFS created!', this.params)
        this.initialize_functions();
        this.acc = 10000
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
        let points = [[0,0]]
        for(let i = 1; i < this.params.iterations; i++){
            let xn = points[i - 1][0]
            let yn = points[i - 1][1]
            points.push([this.Fx(xn,yn),this.Fy(xn,yn)])
        }
        return points
    }

    quantize(points, dims){
        // console.log(points,quantize_dims)
        //create sized quantize object (grid)
        let grid = new Array(dims[0]).fill()
        .map(() => new Array(dims[1]).fill({
            points:[]
        }));
        let max = 1
        let x_step = max / dims[0]
        let y_step = max / dims[1]
        // console.log(x_step,y_step)
        let scaled_points = this.scale_points(points, max)
        let domain = []

        // for (let i = 0; i < max; i++)
            // console.log(i * x_step)
            // domain.push(i)
        // let domain = Array(10).fill(1).map((x, y) => x + y)
        console.log('scaled_points',scaled_points)
        console.log(x_step,y_step)


        for(let p = 0; p < scaled_points.length; p++){ 
            
            let x = scaled_points[p][0]
            let y = scaled_points[p][1]

            console.log(x,y)
            // console.log(x,y,(x < 3) ? 'x < 3': '')
            // console.log(x,y,(x < 6) ? 'x < 6': '')
            // console.log(x,y,(x < 12) ? 'x < 12': '')

            // console.log(x,y)
            if (x < x_step && y < y_step)
                grid[0][0].points.push([x,y]);
                // console.log('under',x,y)
            if (x < x_step && y < y_step)
                grid[0][0].points.push([x,y]);
                // console.log('under',x,y)


        }

        // console.log(grid[0][0].points)

        // console.log(grid[0][0].points)
        // console.log(grid[0][1].points)
        // console.log(grid[1][0].points)
        // console.log(grid[1][1].points)
        // let index = 0;
        // // for(let i = 0; i < quantize_dims[0]; i++){ //row
        // for(let i = 0; i < quantize_dims[0]; i++){ //row
        //     for(let j = 0; j < quantize_dims[1]; j++){ //col
        //         for(let p = 0; p < points.length; p++){ //col


        //             let x = scaled_points[p][0]
        //             let y = scaled_points[p][1]
        //             let in_quadrant = (x > x_low) && (x < x_high) && (y > y_low) && (y < y_high);
                    
        //             // console.log()
        //             // console.log(y_low,y_high)
        //             // console.log(scaled_points[p],x_low,y_low,'-',x_high,y_high,in_quadrant)

        //             if(in_quadrant){
        //                 grid[i][j].points.push([x,y])
        //             }
        //         }
        //     }
        // }



        // let x_avg = 0;
        // let y_avg = 0;

        // for(let i = 0; i < quantize_dims[0]; i++){ //row
        //     for(let j = 0; j < quantize_dims[1]; j++){ //col
        //         console.log(i,j,'CHET',grid[i][j].points)
        //         // x_avg = grid[i][j].points.map((p)=>{x_avg += p[0]})
        //         // y_avg = grid[i][j].points.map((p)=>{y_avg += p[1]})
        //         // grid[i][j].average = [x_avg,y_avg]
        //     }
        // }
        
        
        // console.log('average',grid[0][0].average)
        // console.log(grid[i][j].average'dave_00',grid[1][1])
    }

    scale_points(points, max){
        for(let i = 0; i < points.length; i++){ 
            let x = points[i][0]
            let y = points[i][1]
            points[i][0] = this.round((max * (x + 2)) / 4)
            points[i][1] = this.round((max * (y + 2)) / 4)
        }
        return points
    }
}



module.exports = IFS;