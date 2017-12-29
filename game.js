var num = [];
for(var i = 1; i <= 8; i++) {
    num.push(i);
}//创建一个数字1-8的数组
var sameNum = num;//复制数组
var double = num.concat(sameNum);//使数组内分别包含两个1-8
//将double数组随机排列
Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length-1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
var bt = document.getElementsByClassName('button1');
var td = document.getElementsByTagName('td');
var randomArray = double.shuffle();
for(var x = 0; x < 16; x++) {
    td[x].innerText = randomArray[x];
}
