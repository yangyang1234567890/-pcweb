;
//轮播图部分
(function () {
    var banner_right_top = document.getElementById("banner_right_top");
    var bannerInner = document.getElementById("bannerInner");
    var imgDivList = bannerInner.getElementsByTagName("div");
    var bannerTip = document.getElementById("bannerTip");
    var tipList = bannerTip.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft");
    var btnRight = document.getElementById("btnRight");
    /*我写的轮播图
     var imgNumber = 0;
     var timer = window.setInterval(setBanner, 2000);
     function setBanner() {
     //  console.log(imgList[imgNumber]);
     imgList[imgNumber].className = "select";

     for (var i = 0; i < imgList.length; i++) {
     if (imgNumber != i) {
     imgList[i].className = ""
     }
     }
     imgNumber++;
     if (imgNumber === imgList.length) {
     imgNumber = 0;
     }
     }*/

    var autoTimer = window.setInterval(autoMove, 3000);
    var imgNumber = 0;

    function autoMove() {
        if (imgNumber === (imgDivList.length - 1)) {
            imgNumber = -1;
        }
        imgNumber++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0, len = imgDivList.length; i < len; i++) {
            var curDiv = imgDivList[i];
            if (i === imgNumber) {
                utils.css(curDiv, "zIndex", 1);
                cglAnimate(curDiv, {opacity: 1}, 500, function () {
                    var curDivSib = utils.siblings(this);
                    for (var k = 0, len = curDivSib.length; k < len; k++) {
                        utils.css(curDivSib[k], "opacity", 0);
                    }
                });
                continue;
            }
            utils.css(curDiv, "zIndex", 0);
        }
        //->实现焦点对齐
        for (i = 0, len = tipList.length; i < len; i++) {
            var curLi = tipList[i];
            i === imgNumber ? utils.addClass(curLi, "select") : utils.removeClass(curLi, "select");
        }
    }

//5、实现鼠标悬停停止自动轮播和离开在开启自动轮播的效果
    banner_right_top.onmouseover = function () {
        window.clearInterval(autoTimer);
        btnLeft.style.display = btnRight.style.display = "block";
    };
    banner_right_top.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, 3000);
        btnLeft.style.display = btnRight.style.display = "none";
    };

//6、实现点击焦点切换
    ~function () {
        for (var i = 0, len = tipList.length; i < len; i++) {
            var curLi = tipList[i];
            curLi.index = i;
            curLi.onclick = function () {
                imgNumber = this.index;
                setBanner();
            }
        }
    }();

//7、实现左右切换
    btnRight.onclick = autoMove;
    btnLeft.onclick = function () {
        if (imgNumber === 0) {
            imgNumber = imgDivList.length;
        }
        imgNumber--;
        setBanner();
    };
})();
//选项卡部分（HI范儿）---有空自己要封装一个选项卡插件！很多选项卡写很多遍会很麻烦
;
(function () {
    var cont = document.getElementById("cont");
    var tab = utils.firstChild(cont);
    var tabList = utils.children(tab);
    var tabInner = utils.lastChild(cont);
    var tabInnerList = utils.children(tabInner);
    for (var i = 0; i < tabList.length; i++) {
        var curTab = tabList[i];
        curTab.index = i;
        curTab.onclick = function () {
            this.className = "active";
            tabInnerList[this.index].className = "tab-item active";
            for (var k = 0; k < tabList.length; k++) {
                if (k != this.index) {
                    tabList[k].className = "";
                    tabInnerList[k].className = "tab-item";
                }

            }
        }
    }
})();
//选项卡部分（HI范儿）---有空自己封装一个！
;
(function () {
    var cont = document.getElementById("cont1");
    var tab = utils.firstChild(cont);
    var tabList = utils.children(tab);
    var tabInner = utils.lastChild(cont);
    var tabInnerList = utils.children(tabInner);
    for (var i = 0; i < tabList.length; i++) {
        var curTab = tabList[i];
        curTab.index = i;
        curTab.onclick = function () {
            this.className = "active";
            tabInnerList[this.index].className = "tab-item active";
            for (var k = 0; k < tabList.length; k++) {
                if (k != this.index) {
                    tabList[k].className = "";
                    tabInnerList[k].className = "tab-item";
                }

            }
        }
    }
})();
//好店推荐里的鼠标滑过出现透明层
(function () {
    var recommend_shop = document.getElementsByClassName("recommend_shop")[0];
    var imgList = recommend_shop.getElementsByTagName("img");
    var mask = document.getElementsByClassName("mask");
    for (var i = 0; i < imgList.length; i++) {
        var curImg = imgList[i];
        curImg.index = i;
        curImg.onmouseover = function () {
            mask[this.index].style.display = "block";
        };
        /*mask[this.index].onmousemove=function () {
         this.style.display = "block";
         };*/
        curImg.onmouseout = function () {
            mask[this.index].style.display = "none";
        };
        /*mask[this.index].onmouseout=function () {
         this.style.display = "none";
         }*/
    }
})();
//折叠菜单
(function () {
    var bannerLeft = utils.getElementsByClass('banner_left')[0];
    var list = bannerLeft.getElementsByClassName('list');
    var listCont=utils.getElementsByClass('list_cont');
    var listHidden=utils.getElementsByClass('list_hidden');
    for(var i=0;i<list.length;i++){
        var curList=list[i];
        curList.index=i;
        curList.onmouseover = function (e) {
            if (e && e.stopPropagation){
                e.stopPropagation();
            }
            else{
                e.cancelBubble=true;
            }
            utils.css(listHidden[this.index],'display','block');
            utils.css(listCont[this.index],'border-right','none');
        };
        curList.onmouseout = function () {
            utils.css(listHidden[this.index],'display','none');

            utils.css(listCont[this.index],'border-right','1px solid #cccccc');
        }
    }
})();














