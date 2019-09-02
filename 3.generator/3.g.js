function *fn(){  // yield
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
}
let it = fn();
console.log(it.next());
console.log(it.next(100));
console.log(it.next(200));