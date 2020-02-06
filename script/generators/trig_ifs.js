

class TrigIFS {
    constructor() {
        this.t = 0.95;
        this.values = []
        this.filtered_values = []
        this.last_function_index = 0;
        this.filter = 100000;
        this.first_gen = true;
        this.colors = []; // holds one or many colors for plotting
        this.stdev = {
            x:0,
            y:0
        };
    }

    Initialize(params){
        this.params = params;
        console.log('if params->',this.params)
        this.setupInitialPoints()
        this.setupFunctions()
        this.generatePoints(1000)
        this.calculateExtrema();
        this.scaleValues();
    }


    setupInitialPoints(){
        this.vectors = []
        this.vectors.push({x:0,y:0})
        this.vectors.push({x:1,y:0})
        this.vectors.push({x:0,y:1})
        this.vectors.push({x:1,y:1})
        this.vectors.push({x:-1,y:0})
        this.vectors.push({x:0,y:-1})
        this.vectors.push({x:-1,y:-1})
        console.log(JSON.stringify(this.vectors))
    }

    setupFunctions(){
        console.log('functions being setup..',this.params)
        this.Fx = (x,y,t) =>{
            let a = Math.sin(this.params[0] * y + t)
            let b = Math.cos(this.params[1] * x + t)
            return a - b
        }
        this.Fy = (x,y,t) =>{
            let a = Math.sin(this.params[2] * x + t)
            let b = Math.cos(this.params[3] * y + t)
            return a - b
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
        // console.log(trig_ifs_params.bounds)
        for (let i = 0; i < iterations; i++) {
            this.vectors.map((v, index)=>{
                let x_in = (v.x >= trig_ifs_params.bounds.xmin) && (v.x <= trig_ifs_params.bounds.xmax) 
                let y_in = (v.y >= trig_ifs_params.bounds.ymin) && (v.y <= trig_ifs_params.bounds.ymax) 
                // console.log('x->',v.x,'in range ->', x_in,'y->',v.y,'in range ->', y_in,)
                if(x_in && y_in){
                    this.values.push(new Object({
                        x: v.x,
                        y: v.y,
                        i: index,
                        t: this.t
                    }));

                }
                v.x = this.Fx(v.x,v.y,this.t)
                v.y = this.Fy(v.x,v.y,this.t)
            })
            this.t += trig_ifs_params.delta_t
        }
        

        if(!this.first_gen){
            // this.first_gen = false;
            this.scaleValues();
        }
        this.first_gen = false;
        return this.values
    }

    round(N,acc = 1000000){
        return Math.round(N * acc) / acc
    }

    // for zooming and displaying IFSs 
    // off screen boundaries
    scaleValues() {
            //scale by extrema

        // console.log(this.extrema.width / 2)
        for(let i = 0; i < this.values.length; i++){
            this.values[i].x = (this.values[i].x - this.extrema.center_x) / (this.extrema.width / 2)
            this.values[i].y = (this.values[i].y - this.extrema.center_y) / (this.extrema.height / 2)
            // if(this.values[i].x < this.extrema.center_x)
            //     this.values[i].x = (this.extrema.center_x - this.values[i].x) / (this.extrema.width / 2) * -1
            // else
            //     this.values[i].x = (this.extrema.x.max - this.values[i].x) / (this.extrema.width / 2)

            // if(this.values[i].y < this.extrema.center_y)
            //     this.values[i].y = (this.extrema.center_y - this.values[i].y) / (this.extrema.height / 2) * -1
            // else
            //     this.values[i].y = (this.extrema.y.max - this.values[i].y) / (this.extrema.height / 2)

            // this.values[i].x = this.round(this.values[i].x / 2)
            // this.values[i].y = this.round(this.values[i].y / 2)
            // console.log(JSON.stringify(this.values[i]))
        }
        // console.log(this.values)

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
            center_x: ((maxx - minx) / 2) + minx,
            center_y: ((maxy - miny) / 2) + miny,
        }
        console.log('extrema ->',this.extrema)
    }
}