let b = 3;
function fn(){
    let a = 2;
    return function(){
        console.log(a);
    }
}

fn()

// a