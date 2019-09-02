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

function *reads(){
    let ageTxt = yield readFile("name.txt", "utf8");
    let age    = yield readFile(ageTxt, "utf8");
    return age;
}
//实现co
function co(it){
    return new Promise((resolve, reject)=>{
        function steps(val){
            let {value, done} = it.next(val);
            if(done){
                return resolve(value);
            }
            Promise.resolve(value).then(data=>{
                steps(data);
            });
        }
        steps();
    });
}

co(reads()).then(data=>{
    console.log(data);
})
