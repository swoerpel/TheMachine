var Machine = require('./the_machine.js')
let machine = new Machine();
//optional second bool param -> mask_mode
let total_batch_time = machine.Initialize('triangle_B',true); 
console.log('total batch time', total_batch_time)
machine.Generate();