var Machine = require('./the_machine.js')
let machine = new Machine();
//optional second bool param -> mask_mode
let total_batch_time = machine.Initialize('circle_C',false); 
console.log('total batch time', total_batch_time)
machine.Generate();