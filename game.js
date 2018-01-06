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
$('table').append (str);
//如果不用jQuery,应该怎么写才正确。
//为什么下面这行无效？？
//document.getElementsByTagName('table').innerHTML = str;

//创建随机数列
var num = [];
//创建一个数字1-8的数组
/*for(var i = 1; i <= 8; i++) {
    num.push(i);
}*/

//创建水果数组
for (let i = 0; i < 8; i++) {
    num[i] = '\<img src\=\"img\/' + i +'\.png\" alt=\"\"\>';
}

var sameNum = num;//复制数组
var double = num.concat(sameNum);//使数组内分别包含两个相同值
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

//初始化时间
var times = 0;
function addTime() {
    if (newStar == 1) {
        setTimeout('addTime()', '1000');
        $('.times').empty().append(times);
        times++;
    }else if (newStar == 2) {
        return times;
    }
}

var newStar = 0;
var loc = [];//临时储存位置
var main = [];//临时储存参数

/*var tds = document.getElementsByTagName('td')是一个数组，
可以通过tds[index]提取单个内容，
但是var jTds = $('td')好像不是数组，不能使用jTds[index]；
两个的区别是什么，怎么互相装换？
*/

$('td').click(function flips(){
    if (newStar == 0) {
        newStar = 1;
        addTime();
    }
    /*tdIndex获取当前位置
    其实上面生成表格时ID里面有个Index值，怎么直接使用Index来定位位置？
    */
    var tdIndex = parseInt($(this).attr('id').replace(/[^0-9]/ig,""));
    //识别没有内容的表格并且保证不会连续快速点击几个数字
    if (!$(this).html() && main.length < 2) {
        //点击后将对应位置的随机数赋值给表格
        $(this).append(randomArray[tdIndex]);
        loc.push(tdIndex);//将位置临时储存
        main.push(randomArray[tdIndex])//将数字临时储存
    }
    //限制临时储存的个数，延时执行
    if (main.length == 2) {
        setTimeout("records()","500");
    }
});

//参数匹配
var counts = 0;
function records() {
    //如果临时储存的值不等，清空表格内容,并将临时储存的数组清空
        if (main[0] != main[1]) {
            let a = loc[0];
            let b = loc[1];
            $("#img"+a).empty();
            $("#img"+b).empty();
        }else {
            counts++;
            /*counts的值有BUG暂时搞不懂？？？
            有时候==8时还有两个没翻出来（好像点快了就不行），要调到9，有时候9也不管用，要调到10。
            另外records()延时了0.5秒执行，这样的话是不是newStar=2传入
            addTime()时导致最终计时多了0.5秒？？？？
            如果多了，应该有什么好的解决方法。
            */
            if (counts == 8) {
                newStar = 2;
                addTime()
                endGame();
            }
        }
        main = [];
        loc = [];
    }

function endGame() {
    $('.end').css("display","block");
    $('button').click(function() {
        location.reload();
    });
}
