var Machine = require('./the_machine.js')
let machine = new Machine();
//optional second bool param -> mask_mode

//generation modes
// optional param: bool
// use custom mask folder

let custom = {
    active: false,
    setting: 'B',
}


let total_batch_time = machine.Initialize('triangle_C',custom); 
console.log('total batch time', total_batch_time)
machine.Generate();