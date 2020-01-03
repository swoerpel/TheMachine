var Machine = require('./the_machine.js')
let machine = new Machine();
//optional second bool param -> mask_mode

//generation modes
// optional param: bool
// use custom mask folder

let total_batch_time = machine.Initialize('square_C',true); 
console.log('total batch time', total_batch_time)
machine.Generate();