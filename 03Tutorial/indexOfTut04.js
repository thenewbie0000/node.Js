const logEvents = require('./logEventsOfTuto4')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter{};

// initialize object 
const myEmitter = new MyEmitter();

// add listener for log event
myEmitter.on('log', (msg)=>logEvents(msg));


setTimeout(()=>{
  // Emit Event
  myEmitter.emit('log', 'Log Event Emitted')
}, 2000);