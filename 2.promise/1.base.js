// promise  承诺  等待pending   成功态 fulfilled  失败rejected
// 一旦成功不能失败 反之亦然
let Promise = require("./promise");
let promise = new Promise((resolve, reject)=>{ // exector 执行器
    // here
    // resolve(123);
    // reject(234);
    // throw new Error("错了");
    setTimeout(() => {
        resolve(122);
    }, 1000);
})
promise.then(data=>{
    console.log(data);
}, err=>{
    console.log("err...", err);
});
