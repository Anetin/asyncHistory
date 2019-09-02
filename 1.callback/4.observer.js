//观察者  被观察者
// 被观察者  baby
class Subject {
    constructor(){
        this.state = "开心";
        this.arrs = [];   //存储 观察者的
    }
    attach(observer){
        this.arrs.push(observer);
    }
    setState(newState){
        this.state = newState;
        this.arrs.forEach(observer=>observer.update(newState));
    }
}


//观察者 （我 我媳妇）
class Observer {
    constructor(name){
        this.name = name;
    }
    update(state){
        console.log(`${this.name}知道了，宝宝${state}`);
    }
}

let subject = new Subject();
let w1 = new Observer("我");
let w2 = new Observer("我媳妇");
subject.attach(w1);
subject.attach(w2);
subject.setState("不开心了");