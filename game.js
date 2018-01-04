//创建表格
let str = '';
for (let i = 0; i < 4; i++) {
    str += '<tr>';
    for (var j = 0; j < 4; j++) {
    //这里将每个td的id拼接为imgxx  xx为元素索引
        var index = i * 4 + j;
        var id = "img" + index;
        str += '<td id="' + id + '">';
        str += '</td>';
    }
    str += '</tr>';
}
$('table').append (str);//如果不用jQuery,应该怎么写才正确。
//为什么下面这行无效？？
//document.getElementsByTagName('table').innerHTML = str;

//创建随机数列
var num = [];
//创建一个数字1-8的数组
for(var i = 1; i <= 8; i++) {
    num.push(i);
}
var sameNum = num;//复制数组
var double = num.concat(sameNum);//使数组内分别包含两个1-8
//将数组随机排列函数
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
var randomArray = double.shuffle();//将数组组内随机交换位置

var loc = [];//临时储存位置
var main = [];//临时储存参数
$('td').click(function flips(){
    /*tdIndex获取当前位置
    其实上面生成表格时ID里面有个Index值，怎么直接使用Index来定位位置？
    */
    var tdIndex = parseInt($(this).attr('id').replace(/[^0-9]/ig,""));
    //识别没有内容的表格并且保证不会连续快速点击几个数字
    if (!$(this).text() && main.length < 2) {
        //点击后将对应位置的随机数赋值给表格
        this.append(randomArray[tdIndex])
        loc.push(tdIndex);//将位置临时储存
        main.push(randomArray[tdIndex])//将数字临时储存
    }
    //限制临时储存的个数
    if (main.length == 2) {
        setTimeout("records()","500");//延时执行
    }
});
//参数匹配
function records() {
    //如果临时储存的值不等，
        if (main[0] != main[1]) {
            let a = loc[0];
            let b = loc[1];
            //清空表格内容
            $("#img"+a).empty();
            $("#img"+b).empty();
        }
        //将临时储存的数组清空
        main = [];
        loc = [];
    }
