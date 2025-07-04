// import pino from 'pino';
// import { Writable } from 'stream';


// const transport = new Writable({
//   write(chunk:any, enc:any, cb:any) {
//     const msg = JSON.parse(chunk.toString());
//     const level = msg.level;
//     const logFunction = (level <= 30) ? console.log : (level === 40) ? console.warn : console.error;
    
//     logFunction(chunk.toString());
//     cb();
//   }
// });

// const logger = pino(transport)

// export default logger