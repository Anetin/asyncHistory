// name.txt  (age.txt) -> data
let fs = require("fs");

function read(url){
    return new Promise((resolve, reject)=>{
        fs.readFile(url, "utf8", (err, data)=>{
            if(err) reject(err);
            resolve(data);
        })
    });
}

read("name.txt").then(data=>{
    console.log(data);
    return read(data);
}).then(data=>{
    console.log(data);
});

