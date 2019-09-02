// es5
function Promise(exector){
    this.status = "pending";
    this.value = "";
    this.reason = "";
    this.onFulfilledCallbacks = [];//成功的回调
    this.onRejectedCallbacks  = [];//失败的回调
    let self = this;
    function resolve(value){
        if(self.status=='pending'){
            self.status = "fulfilled";
            self.value = value;
            self.onFulfilledCallbacks.forEach(fn=>fn());
        }
    }
    function reject(reason){
        if(self.status=="pending"){
            self.status = "rejected";
            self.reason = reason;
            self.onRejectedCallbacks.forEach(fn=>fn());
        }
    }
    try {
        exector(resolve, reject);
    }catch(e){
        reject(e);
    }
}

//resolvePromise
function resolvePromise(promise2, x, resolve, reject){
    if(promise2==x){
        throw new TypeError("循环引用");
    }
    if(x!=null && (typeof x=='object' || typeof x=='function')){ //有可能是一个promise
        let called;
        try {
            let then = x.then;
            if(typeof then=='function'){ //promise 
                then.call(x, y=>{
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, r=>{
                    if(called) return;
                    called = true;
                    reject(r);
                });
            }else{//x={then:123/undefined}
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
    }else{
        resolve(x);
    }
}
Promise.prototype.then = function(onFulfilled, onRejected){
    onFulfilled = typeof onFulfilled=='function' ? onFulfilled : val=>val;
    onRejected  = typeof onRejected=='function'? onRejected : err=>{throw err};
    let promise2 = new Promise((resolve, reject)=>{
        if(this.status=='fulfilled'){
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);   
                }catch(e){
                    reject(e);
                }
            });
        }
        if(this.status=='rejected'){
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);   
                }catch(e){
                    reject(e);
                }
            });
        }
        if(this.status == 'pending'){
            this.onFulfilledCallbacks.push(()=>{
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);   
                    }catch(e){
                        reject(e);
                    }
                });
            });
            this.onRejectedCallbacks.push(()=>{
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);   
                    }catch(e){
                        reject(e);
                    }
                });
            });
        }
    });
    return promise2;
}

Promise.deferred = function(){
    let dtd = {};
    dtd.promise = new Promise((resolve, reject)=>{
        dtd.resolve = resolve;
        dtd.reject = reject;
    })
    return dtd;
}

//catch
Promise.prototype.catch = function(errCallback){
    return this.then(null, errCallback);
}

//resovle
Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        resolve(value);
    });
}

//reject
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    });
}

module.exports = Promise;