let vm_rank = new Vue({
    el: '#wrapper',
    data: {
        rankArr: [],
    },
});

let dataCount = 0; // 数据的条数
let getRankData = () => {
        let xhr = new XHR();
        xhr.get('rank/', {
            // 'username': username
        }, () => {
            let res = JSON.parse(xhr.response);
            vm_rank.rankArr = res;
            dataCount = res.length;
        }, () => {
            alert('ajax err!')
            //    TODO：调用失败后的提示
        })
};
getRankData();

let line = document.getElementById('line');
let textArea = document.getElementById('textArea');
textArea.onscroll = () => {
    line.style.marginTop = 6.4 / (dataCount - 6) * textArea.scrollTop / 100 + 'rem';
//    TODO:这条语句有bug, 在改变视窗宽高之后, 并不能实现滚动条从上到下完全拉到底, 而是有一定的空隙,如何设计更好的计算方式呢？
//
};
// TODO:我虽然设置了滚动条hover的动画, 但是并没有给他加上拖拽移动的功能，需要你来实现喽