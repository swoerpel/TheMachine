class TradIFS {
    constructor() {
        this.x = 0
        this.y = 0
        this.values = []
        this.filtered_values = []
        // this.encodeParams()
        this.filter = 10000;
        this.colors = []; // holds one or many colors for plotting
    }


    setParams(params){
        this.params = params;
        this.setupFunctions()
        this.generatePoints(1000)
        this.calculateExtrema()
    }

    // generates raw values, no scaling
    generatePoints(iterations) {
        let values = []
        for (let i = 0; i < iterations; i++) {
            let function_prob = 1 / this.transform_functions.length
            let nextPoint;
            let prob = random(1)
            let sum = 0
            for (let j = 0; j < this.transform_functions.length; j++) {
                sum += function_prob
                if (sum > prob) {
                    values.push({
                        x: this.x,
                        y: this.y
                    })
                    nextPoint = this.transform_functions[j](this.x, this.y)
                    this.x = nextPoint.x
                    this.y = nextPoint.y
                    break;
                }
            }
        }
        let filtered_values = this.filterValues(values)
        this.values = filtered_values
        // this.values = this.scaleValues(filtered_values)
        return filtered_values
    }

    round(N,acc = 10000){
        return Math.round(N * acc) / acc
    }

    // for zooming and displaying IFSs 
    // off screen boundaries
    scaleValues(values) {
        // console.log('VALUES',values)
        for(let i = 0; i < values.length; i++){
            values[i].x += (Math.abs(this.extrema.x.min))
            values[i].y += (Math.abs(this.extrema.y.min))

        }
        for(let i = 0; i < values.length; i++){
            values[i].x = values[i].x / (this.extrema.x.max + Math.abs(this.extrema.x.min)) 
            values[i].y = values[i].y / (this.extrema.y.max + Math.abs(this.extrema.y.min))
            values[i].x = this.round(values[i].x)
            values[i].y = this.round(values[i].y)
        }
        return values
    }

    // filters out a percentage of the values
    // to make drawing quicker
    filterValues(values) {
        let filtered_values = []
        values.map((p) => {
            let fx = Math.round(p.x * this.filter) / this.filter
            let fy = Math.round(p.y * this.filter) / this.filter
            filtered_values.push({ x: fx, y: fy })
        })

        //remove duplicates
        filtered_values = filtered_values.filter((p, index, self) =>
            self.findIndex(t => t.x === p.x && t.y === p.y) === index)
        // console.log('filtered values', filtered_values)
        return filtered_values
    }

    // returns filtered values
    getValues() {
        return this.values
    }

    getExtrema() {
        return this.extrema
    }

    calculateExtrema() {
        let values = this.values
        // if (this.filtered_values.length == 0)
        // values = this.filtered_values
        let minx = 10000
        let miny = 10000
        let maxx = -10000
        let maxy = -10000
        values.map((p) => {
            if (p.x > maxx)
                maxx = p.x
            if (p.x < minx)
                minx = p.x
            if (p.y > maxy)
                maxy = p.y
            if (p.y < miny)
                miny = p.y
        })
        this.extrema = {
            x: {
                min: minx,
                max: maxx,
            },
            y: {
                min: miny,
                max: maxy
            }
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

    encodeParams() {
        let hash_str = ''
        this.params.map((funct) => {
            funct.map((val) => {
                val = Math.round(10000 * val)
                val > 0 ?
                    hash_str += '+' + val.toString() :
                    hash_str += val.toString()
            });
        });
        this.encoded_params = window.btoa(hash_str);
        // var decoded_hash = window.atob(this.encoded_params);
        // console.log('Encoded Params:', this.encoded_params)
    }

    getEncodedParams() {
        return this.encoded_params
    }

}