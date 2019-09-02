let fs = require("fs");
// let co = require("co");
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

let readFile = promisify(fs.readFile);

async function reads(){
    try {
        let ageTxt = await readFile("name.txt", "utf8");
        let age    = await readFile(ageTxt, "utf8");
        return age;
    }catch(e){
        console.log("真的错了", e);
    }
}
reads().then(data=>{
    console.log(data);
})