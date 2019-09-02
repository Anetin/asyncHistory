let fs = require("fs");

function read(url){
    return new Promise((resolve, reject)=>{
        fs.readFile(url, "utf8", (err, data)=>{
            if(err) reject(err);
            resolve(data);
        })
    });
}

Promise.all = function(values){  //values array
    return new Promise((resolve, reject)=>{
        let res = [];
        let count = 0;
        function processDatas(key, val){
            res[key] = val;
            if(++count == values.length){
                resolve(res);
            }
        }
        for(let i=0; i<values.length; i++){
            let current = values[i];
            let then = current.then;
            if(then && typeof then=='function'){  //promise
                then.call(current, y=>{
                    processDatas(i, y);
                }, r=>{
                    reject(r);
                });
            }else{ //普通值
                processDatas(i, current);
            }
        }
    });
}

Promise.all([read("name.txt"), read("age.txt"), 1,2,3]).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log("err...", err);
})