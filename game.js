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

$('button').click(function() {
    location.reload();
});

var newStar = 0;
var loc = [];//临时储存位置
var main = [];//临时储存参数

//储存阴影值
var shadow = $('td').css('box-shadow');

$('td').click(function flips(){
    if ($(this).css('box-shadow') === 'none' || main.length > 1) {
        return;
    }

    if (newStar == 0) {
        newStar = 1;
        addTime();
    }

    var tdIndex = $('td').index(this);
    //识别没有内容的表格并且保证不会连续快速点击几个数字
    if (!$(this).html() && main.length < 2) {
        //点击后将对应位置的随机数赋值给表格
        $(this).append(randomArray[tdIndex]);//点击显示内容
        /*80行代码，我之前用数字测试时写成
        this.append(randomArray[tdIndex])可以正常运行;
        但是换成图片时前面写this,图片不能正常显示，
        但是chrome侧边的控制栏里的td元素里已经正确显示代码信息，
        但是显示出来的不是图片而是代码，这是为什么？*/
        $(this).css('box-shadow', 'none');//点击消除阴影
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
var steps = 0;
function records() {
    steps++;
    $('.moves').empty().append(steps);
    var fs = document.getElementById('fStar');
    switch (steps) {
        case 12:
            fs.nextElementSibling.remove();
            break;
        case 16:
            fs.nextElementSibling.remove();
            break;
    }
    //如果临时储存的值不等，清空表格内容,并将临时储存的数组清空
        if (main[0] != main[1]) {
            let a = loc[0];
            let b = loc[1];
            $("#img"+a).empty();
            $("#img"+b).empty();
            $("#img"+a).css('box-shadow', shadow);
            $("#img"+b).css('box-shadow', shadow);
        }else {
            counts++;
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
    $('.endWords>h2').after($('.stars'));
    $('.end').css("display","block");
}
