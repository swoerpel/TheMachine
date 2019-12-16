var Machine = require('./the_machine.js')
let machine = new Machine();
let total_batch_time = machine.Initialize('triangle_A');
console.log('total batch time', total_batch_time)
machine.Generate();