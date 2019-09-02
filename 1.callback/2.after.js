// name.txt age.txt
let fs = require("fs");

function after(times, callback ){
    let results = {};
    return function(key, val){
        results[key] = val;
        if(--times == 0){
            callback(results);
        }
    }
}

let newFn = after(2, function(res){
    console.log(res);
});

fs.readFile("name.txt", "utf8", (err, data)=>{
    if(err) return err;
    newFn("name", data);
});

fs.readFile("age.txt", "utf8", (err, data)=>{
    if(err) return err;
    newFn("age", data);
})