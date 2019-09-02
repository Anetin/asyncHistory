// generator 生成器   -  迭代器 iterator next方法 {value , done}
// 类数组 有索引  有长度  有迭代器  是对象
// let obj = {0:1, 1:2, 2:3, length:3, [Symbol.iterator]:function(){
//     let self = this;
//     let index = 0;
//     return {
//         next(){
//             return {
//                 value: self[index],
//                 done: index++ == self.length
//             }
//         }
//     }
// }};
let obj = {0:1, 1:2, 2:3, length:3, [Symbol.iterator]: function *(){
    let index = 0;
    while(index != this.length){
        yield this[index++];
    }
}}
function fn(){
    let r = [...obj];
    console.log(r, Array.isArray(r));
}
fn(1,2,3);