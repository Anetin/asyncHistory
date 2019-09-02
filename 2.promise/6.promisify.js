let fs = require("fs");
function promisify(fn){
    return function(){
        return new Promise((resolve, reject)=>{
            fn(...arguments, (err, data)=>{
                if(err) reject(err);
                resolve(data);
            })
        });
    }
}

//generator + co  = async await


let readFile = promisify(fs.readFile);

readFile("name.txt", "utf8").then(data=>{
    console.log(data);
})