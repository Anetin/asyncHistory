// 发布 订阅设计模式
let fs = require("fs");

function EventEmitter(){  
    this.arrs = []; //中介 用来存储订阅信息
}
EventEmitter.prototype.on = function(callback){  //订阅
    this.arrs.push(callback);
}
EventEmitter.prototype.emit = function(key, val){
    this.arrs.forEach(fn=>fn(key, val));
}

let ev = new EventEmitter();
//订阅
let results = {};
ev.on(function(key, val){
    results[key] = val;
    if(Object.keys(results).length==2){
        console.log(results);
    }
});


fs.readFile("name.txt", "utf8", (err, data)=>{
    if(err) return err;
    ev.emit("name", data);
});

fs.readFile("age.txt", "utf8", (err, data)=>{
    if(err) return err;
    ev.emit("age", data);
})