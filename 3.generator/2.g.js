function *fn(){  // yield
    yield 1;
    yield 2;
    return 3;
}
let it = fn();
console.log(it.next());
console.log(it.next());
console.log(it.next());