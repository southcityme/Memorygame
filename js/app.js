
/*
 * 创建一个包含所有卡片的数组
 */

var arrynew=['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];//初始图像数组



/*open show match
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
let stars=0;   //记录步数
let flag=1;
let flagfinish=1; //一次配完成是的标志
let intervar=0; 
let intervarelea=-1;   //中间变量，记录上一次得图标
let intervareleb=-1;
let total=0;

const sta=document.getElementById('stars');
const staLi=sta.getElementsByTagName('li');
const iBox=document.getElementById('box');
const Oli=iBox.getElementsByTagName('li');//获取所有的li
const reSet=document.getElementById('reset');//获取重置按钮
const oTotal=document.getElementById('moves');//获取重置按钮

// 初始化页面
start();
var arrynew2=shuffle(arrynew);
resetway(arrynew2);
// 重置按钮功能
reSet.onclick=function (){
	var arrynew1=shuffle(arrynew);
	resetway(arrynew1);
	start();
}
// 点击卡片出现
for (var i = 0,len=Oli.length; i <len; i++) {
	Oli[i].index=i;
	Oli[i].onclick=function () {
		if (Oli[this.index].className=="card"&&flagfinish==1) {
			if (flag==1) {
				Oli[this.index].className="card open show";
				intervarelea=this.index;
				intervar=Oli[this.index].children[0].className;
				flag=2;
			}
			else{
				if (flag==2) {
					intervareleb=this.index;
					if (intervar==Oli[this.index].children[0].className) {
						Oli[this.index].className="card match animated flipInY";
						Oli[intervarelea].className="card match animated flipInY";
						++stars;

						intervar=0; 
						intervarelea=-1;
						intervareleb=-1;
						flag=1;
						oTotal.innerHTML=++total;
						if(stars==8){
							stars=0;
							leval(total);
							setTimeout(function () {
								alert("Congratulations!!!");//此处为什么要延时才行，不然会打断前面得执行语句
							},100);
						}
					}
					else{
						Oli[this.index].className="card defaule show animated wobble";
						Oli[intervarelea].className="card defaule show animated wobble";
						flagfinish=2;
						setTimeout(function () {
							Oli[intervareleb].className="card";
							Oli[intervarelea].className="card";
							intervar=0; 
							intervarelea=-1;
							intervareleb=-1;
							flag=1;
							flagfinish=1;
						},1000);
						oTotal.innerHTML=++total;
					}
				}
			}
		}
	}
}

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// 重置图案
function resetway(array) {
	for (var i = 0,len=Oli.length; i <len; i++) {
		var newclass="fa"+" "+array[i];
		Oli[i].children[0].className=newclass;
	}
}

// 初始化函数
function start() {
	for (var i = 0,len=staLi.length; i <len; i++) {
		staLi[i].children[0].className = 'fa fa-star-o';
	}
	for (var i = 0,len=Oli.length; i <len; i++) {
		Oli[i].className = 'card open show';
	}
	setTimeout(function () {
		for (var i = 0,len=Oli.length; i <len; i++) {
			Oli[i].className = 'card';
		}
	},3000);
	oTotal.innerHTML=0;
}
// 等级判断 fa-star-o fa-star
function leval(tota) {
	if (tota>=8 && tota<=13) {
		for (var i = 0,len=staLi.length; i <len; i++) {
			staLi[i].children[0].className = 'fa fa-star';
		}
	}
	else if (tota>13&&tota<20) {
		for (var i = 0,len=staLi.length; i <len-1; i++) {
			staLi[i].children[0].className = 'fa fa-star';
		}
	}
	else{
		for (var i = 0,len=staLi.length; i <len-2; i++) {
			staLi[i].children[0].className = 'fa fa-star';
		}
	}
}
// this is a little game!