let Promise = require("./promise");
let promise = new Promise((resolve, reject)=>{
    resolve(100);
});
promise.then().then().then(data=>{
    console.log(data);
})

// let p2 = promise.then(data=>{
//     console.log(data);
//     return 123;
// }).then(data=>{
//     console.log(data);
// })