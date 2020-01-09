

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
            return Math.round((Math.sin(C * x) - Math.cos(D * y)) * this.acc) / this.acc
        }
        console.log(A,B,C,D)
    }

    generate_points(){
        this.points = [[0.5,0.5]]
        for(let i = 1; i < this.params.iterations; i++){
            let xn = this.points[i - 1][0]
            let yn = this.points[i - 1][1]
            this.points.push([this.Fx(xn,yn),this.Fy(xn,yn)])
        }
        return this.points
    }
}



module.exports = IFS;