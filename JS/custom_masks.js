

const mask_A = (i,j) =>{
    if(j % 2 == 0)
        return 1
    else
        return 0
}

const mask_B = (i,j,city_heights) =>{
    if (j < city_heights[i])
        return 1
    else
        return 0
}

exports.mask_A = mask_A;
exports.mask_B = mask_B;