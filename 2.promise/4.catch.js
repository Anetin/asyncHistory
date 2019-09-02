let Promise = require("./promise");

let promise = new Promise((resolve, reject)=>{
    reject(100);
});
promise.then().then().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log("errs....", err);
})

Promise.resolve(123).then(data=>{
    console.log(data);
})

Promise.reject(345).catch(err=>{
    console.log(err);
});