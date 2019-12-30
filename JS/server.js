var Machine = require('./the_machine.js')
let machine = new Machine();
//optional second bool param -> mask_mode

//generation modes

// ''              : colored image
// 'mask'          : black and white image saved to mask folder
// 'custom'        : saves to folder with unique names 

let total_batch_time = machine.Initialize('circle_B', 'mask'); 
console.log('total batch time', total_batch_time)
machine.Generate();