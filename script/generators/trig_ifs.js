

class TrigIFS {
    constructor() {
        this.x = 0
        this.y = 0
        this.values = []
        this.filtered_values = []
        this.last_function_index = 0;
        this.filter = 100000;
        this.colors = []; // holds one or many colors for plotting
        this.stdev = {
            x:0,
            y:0
        };
    }

    setParams(params){
        this.params = params;
        console.log('if params->',this.params)
        this.setupFunctions()
        this.generatePoints(10000)
        this.calculateExtrema();
    }


    setupFunctions(){
        this.Fx = (x,y) =>{
            return Math.sin(this.params[0] * y) - Math.cos(this.params[1] * x)
        }
        this.Fy = (x,y) =>{
            return Math.sin(this.params[2] * x) - Math.cos(this.params[3] * y)
        }
    }

    calculateSTDEV(){
        let sumx = 0;
        let sumy = 0;
        let sumx_sqrd = 0;
        let sumy_sqrd = 0;
        this.values.map((point)=>{
            sumx += point.x
            sumy += point.y
            sumx_sqrd += (point.x * point.x)
            sumy_sqrd += (point.y * point.y)
        })
        let avgx = sumx / this.values.length
        let avgy = sumy / this.values.length
        let avgx_sqrd = sumx_sqrd / this.values.length
        let avgy_sqrd = sumy_sqrd / this.values.length
        let stdev = {}
        stdev.x = Math.sqrt(avgx_sqrd + (avgx * avgx))
        stdev.y = Math.sqrt(avgy_sqrd + (avgy * avgy))
        return stdev
    }

    // generates raw values, no scaling
    generatePoints(iterations) {
        this.values = []
        for (let i = 0; i < iterations; i++) {
            this.values.push(new Object({
                x: this.x,
                y: this.y,
            }));
            this.x = this.Fx(this.x,this.y)
            this.y = this.Fy(this.x,this.y)
            // console.log('x,y ->',this.x,',',this.y)
        }

        this.scaleValues();
        return this.values
    }

    round(N,acc = 1000000){
        return Math.round(N * acc) / acc
    }

    // for zooming and displaying IFSs 
    // off screen boundaries
    scaleValues() {
        for(let i = 0; i < this.values.length; i++){
            this.values[i].x = this.round(this.values[i].x / 2)
            this.values[i].y = this.round(this.values[i].y / 2)
        }
    }
    // returns filtered values
    getValues() {
        return this.values
    }

    getExtrema() {
        return this.extrema
    }

    getAvgPoint(){
        return {x:this.avgx, y:this.avgy}
    }

    calculateExtrema() {
        let values = this.values
        // if (this.filtered_values.length == 0)
        // values = this.filtered_values
        let minx = 10000
        let miny = 10000
        let maxx = -10000
        let maxy = -10000
        let sumx = 0;
        let sumy = 0;

        let sumx_sqrd = 0;
        let sumy_sqrd = 0;
        values.map((p) => {
            if (p.x > maxx)
                maxx = p.x
            if (p.x < minx)
                minx = p.x
            if (p.y > maxy)
                maxy = p.y
            if (p.y < miny)
                miny = p.y
            sumx += p.x
            sumy += p.y
            sumx_sqrd += (p.x * p.x)
            sumy_sqrd += (p.y * p.y)
        })

        this.avgx = this.round(sumx / values.length)
        this.avgy = this.round(sumy / values.length)
        sumx = this.round(sumx)
        sumy = this.round(sumy)
        this.extrema = {
            x: {
                min: minx,
                max: maxx,
            },
            y: {
                min: miny,
                max: maxy
            },
            width: maxx - minx,
            height: maxy - miny,
        }
    }
}