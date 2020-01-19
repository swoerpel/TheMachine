

class MatrixMachine
{
    constructor(transform_function_count)
    {
        this.precision = 2
        this.transform_function_count = transform_function_count
        // this.create_single_column_variation = this.create_single_column_variation.bind(this)
        this.linearize = this.linearize.bind(this)
        this.delinearize = this.delinearize.bind(this)
        this.offset = this.offset.bind(this)
        this.create_custom_matrix = this.create_custom_matrix.bind(this)
    }

    scale_matrix(matrix,scale_factor)
    {
        let new_matrix = []
        let index = 0
        for (let i = 0; i < matrix.length; i++)
        {
            let row = []
            for (let j = 0; j < matrix[0].length; j++)
            {
                row.push(matrix[i][j] * scale_factor)
                index++
            }
            new_matrix.push(row)
        }
        console.log('old matrix', matrix)
        console.log('new matrix', new_matrix)
        return new_matrix

    }


    create_random_variation(tolerance)
    {
        let rand_matrix = []
        for (let i = 0; i < this.transform_function_count; i++)
        {
            let row = []
            for (let j = 0; j < 6; j++)
            {
                row.push(parseFloat(random(-tolerance,tolerance).toFixed(this.precision)))
            }
            rand_matrix.push(row)
        }
        return rand_matrix
    }

    create_custom_variation(set_value,changed_variables)
    {
        
        let matrix = []
        for (let i = 0; i < this.transform_function_count; i++)
        {
            let row = []
            // console.log(set_indexes)
            let random_indexes = []
            for (let r = 0; r < changed_variables; r++)
                random_indexes.push([Math.floor(Math.random() * PARAMCOUNT),
                                    Math.floor(Math.random() * this.transform_function_count)])

            for (let j = 0; j < PARAMCOUNT; j++)
            {
                let pair_included = false

                // console.log(random_indexes)
                for (let k = 0; k < random_indexes.length; k++)
                {
                    // console.log(i,j,set_indexes[k].includes(i), set_indexes[k].includes(j))
                    if (random_indexes[k].includes(i) && random_indexes[k].includes(j))
                        pair_included = true
                }
                if (pair_included)
                    row.push(set_value)
                else
                    row.push(0)
            
            }
            matrix.push(row)
        }      
        return matrix
    }

    create_zeroed_variation(dimX, dimY)
    {
        let new_matrix = []
        let index = 0
        for (let i = 0; i < dimY; i++)
        {
            let row = []
            for (let j = 0; j < dimX; j++)
            {
                row.push(0.0)
                index++
            }
            new_matrix.push(row)
        }
        return new_matrix       
    }

    // used for transition 
    // outputs variation matrix of all parameter differences
    // EM[x][y] - SM[x][y] = DM[x][y]
    // input(start matrix, end matrix)
    create_difference_matrix(SM, EM)
    {
        let rand_matrix = []
        for (let i = 0; i < this.transform_function_count; i++)
        {
            let row = []
            for (let j = 0; j < 6; j++)
            {
                let cur_diff = EM[i][j] - SM[i][j]
                row.push(cur_diff)
            }
            rand_matrix.push(row)
        }
        return rand_matrix        
    }

    
    create_transition_matrix(difference_matrix, steps)
    {
        let trans_matrix = []
        for (let i = 0; i < this.transform_function_count; i++)
        {
            let row = []
            for (let j = 0; j < 6; j++)
            {
                row.push(difference_matrix[i][j] / (steps - 1))
            }
            trans_matrix.push(row)
        }
        return trans_matrix

    }

    // used for color grid options
    //returns linear array
    // create_custom_matrix(dimX, dimY, tour_count, grid_choice, color_count)
    create_custom_matrix(color_type,matrix_choice,parameters)
    {
        let color_count = 0;
        color_type == 'background' ?
        color_count = parameters.CP.background_color_count :
        color_count = parameters.CP.fill_color_count
        // we dont care about fill or background
        // this is a general custom matrix machine
        // all options are available for both color_types
        let linear_grid = []
        if (matrix_choice == 'A')
        {
            for(let i = 0; i < parameters.GP.tour_count; i++) 
            {
                linear_grid.push(0);
            }
        }
        else if (matrix_choice == 'B')
        {
            // console.log('cc', color_count)
            try 
            {
                for(let i = 0; i < parameters.GP.tour_count; i++) 
                    linear_grid.push(Math.round(Math.random() * (color_count - 1)))
            }
            catch(e)
            {
                console.log('tour_count is less than color_count')
            }

        }
        else if (matrix_choice == 'C') // stripes, horizontal
        {
            let multi_matrix = []
            let index = 0
            for (let i = 0; i < parameters.GP.shape.y; i++)
            {
                let row = [ ]
                for (let j = 0; j < parameters.GP.shape.x; j++)
                {
                    row.push(i % color_count)
                    index++
                }
                multi_matrix.push(row)
            }
            return this.linearize(multi_matrix)
        }
        else if (matrix_choice == 'D') // stripes, vertical
        {
            let multi_matrix = []
            let index = 0
            for (let i = 0; i < parameters.GP.shape.y; i++)
            {
                let row = []
                for (let j = 0; j < parameters.GP.shape.x; j++)
                {
                    row.push(j % color_count)
                    index++
                }
                multi_matrix.push(row)
            }
            // console.log('new matrix',multi_matrix)
            return this.linearize(multi_matrix)
        }
        else if (matrix_choice == 'D') // checker board
        {
            // let multi_matrix = []
            // let index = 0
            // for (let i = 0; i < dimY; i++)
            // {
            //     let row = []
            //     for (let j = 0; j < dimX; j++)
            //     {
            //         row.push(linear_matrix[i % color_count])
            //         index++
            //     }
            //     new_matrix.push(row)
            // }
        }
        // console.log('linear grid', linear_grid)
        return linear_grid

    }

    linearize(matrix)
    {
        // console.log('nonlinear matrix', matrix)
        let linear_matrix = []
        let dims = [ matrix.length, matrix[0].length ];
        for (let i = 0; i < dims[0]; i++)
            for (let j = 0; j < dims[1]; j++)
                linear_matrix.push(matrix[i][j])
        return linear_matrix
    }

    delinearize(linear_matrix, dimX, dimY)
    {
        let new_matrix = []
        let index = 0
        for (let i = 0; i < dimY; i++)
        {
            let row = []
            for (let j = 0; j < dimX; j++)
            {
                row.push(linear_matrix[index])
                index++
            }
            new_matrix.push(row)
        }
        return new_matrix
    }

    offset(matrix, offset_value, random_direction)
    {
        let dims = [ matrix.length, matrix[0].length ];
        let linear_matrix = this.linearize(matrix)
        for (let i = 0; i < linear_matrix.length; i++)
        {
            if (random_direction)
                Math.random() >= 0.5 ? linear_matrix[i] += offset_value :  linear_matrix[i] -= offset_value
            else
                linear_matrix[i] += offset_value
        }
        return this.delinearize(linear_matrix, dims[0], dims[1])
    }

    // for (let i = 0; i < this.grid_parameters.transform_function_count; i++)
    // {
    //     let rands = []
    //     rands.push(parseFloat(random(-1,1).toFixed(this.grid_parameters.precision)))
    //     rands.push(parseFloat(random(-1,1).toFixed(this.grid_parameters.precision)))
    //     rands.push(parseFloat(random(-1,1).toFixed(this.grid_parameters.precision)))
    //     rands.push(parseFloat(random(-1,1).toFixed(this.grid_parameters.precision)))
    //     rands.push(parseFloat(random(-1,1).toFixed(this.grid_parameters.precision)))
    //     rands.push(parseFloat(random(-1,1).toFixed(this.grid_parameters.precision)))
    //     //function weight/probibility
    //     //rands.push(1 / this.grid_parameters.transform_function_count) 
    //     transform_parameters.push(rands)
    // }
}