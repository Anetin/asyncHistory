Function.prototype.before = function(callback){
    let self  = this;
    return function(){
        callback();
        self.apply(null, arguments);
    }
}

function fn(val){
    console.log("我要结婚", val);
}

let newFn = fn.before(function(){
    console.log("买房子");
})

newFn('hello');