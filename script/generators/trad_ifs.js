class TradIFS {
    constructor() {
        this.x = 0
        this.y = 0
        this.values = []
        this.last_function_index = 0;
        this.colors = []; // holds one or many colors for plotting
        this.stdev = {
            x:0,
            y:0
        };
    }

    setParams(params){
        this.params = params;
        this.setupFunctions()
        this.generatePoints(10000)
        this.calculateExtrema();
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
            let function_prob = 1 / this.transform_functions.length
            let nextPoint;
            let prob = random(1)
            let sum = 0
            for (let j = 0; j < this.transform_functions.length; j++) {
                sum += function_prob
                if (sum > prob) {
                    this.values.push(new Object({
                        x: this.x,
                        y: this.y,
                        function_index: this.last_function_index,
                    }));
                    nextPoint = this.transform_functions[j](this.x, this.y)
                    this.x = nextPoint.x
                    this.y = nextPoint.y
                    this.last_function_index = j
                    break;
                }
            }
        
        }
        this.stdev = this.calculateSTDEV()
        this.values = this.filterOutliers(this.values,this.stdev)
        return this.values
    }

    
    filterOutliers(values,stdev,sigma=2){
        let new_ary = [];
        for(let i = 0; i < values.length; i++){
            if(values[i].x > -(stdev.x * sigma) && values[i].x < (stdev.x * sigma)){
                if(values[i].y > -(stdev.y * sigma) && values[i].y < (stdev.y * sigma)){
                    new_ary.push(new Object(values[i]))
                }
            }
        }
        
        return new_ary
    }

    round(N,acc = 1000000){
        return Math.round(N * acc) / acc
    }

    // for zooming and displaying IFSs 
    // off screen boundaries
    scaleValues(values) {
        for(let i = 0; i < values.length; i++){
            values[i].x = this.round(values[i].x / (this.extrema.width / 2))
            values[i].y = this.round(values[i].y / (this.extrema.height / 2))
        }
        return values
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

        // console.log('sum x y', sumx, sumy)
        // console.log('avg x y', avex, avey)

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


    setupFunctions() {
        this.transform_functions = []
        // console.log(this.params, 'params')
        let current_seed_group = this.params
        for (let j = 0; j < current_seed_group.length; j++) {
            this.transform_functions.push((x, y) => {
                return {
                    x: current_seed_group[j][0] * x + current_seed_group[j][1] * y + current_seed_group[j][4],
                    y: current_seed_group[j][2] * x + current_seed_group[j][3] * y + current_seed_group[j][5]
                }
            });
        }
    }
}