let num = [];
for(let i = 1; i <= 8; i++) {
    num.push(i);
}//创建一个数字1-8的数组
let samenum = num;//复制数组
let double = num.concat(samenum);//使数组内分别包含两个1-8
//将double数组随机排列
let td = document.getElementsByTagName("td");
for(let x = 0; x < 16; x++) {
    td[x].innerText = double[x];
}
