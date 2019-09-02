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

let readFile = promisify(fs.readFile);

function *reads(){
    let ageTxt = yield readFile("name.txt", "utf8");
    let age    = yield readFile(ageTxt, "utf8");
    return age;
}
let it = reads();
let { value, done } = it.next();
value.then(data=>{
    let {value, done } = it.next(data);
    value.then(data=>{
        console.log(it.next(data));
    })
})