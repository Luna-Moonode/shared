let view = document.getElementById('view'),
    ul = document.querySelector('#view ul'),
    imgs = document.getElementsByTagName('img');


// 360除以图片数量就是需要旋转的角度，这里有6张图片，所以是60度
// 初始化页面渲染时的角度
function initRotate() {
    let deg = 60;
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = 'rotateY(' + deg + 'deg) scale(0.85)';
        setTimeout(() => {
            imgs[i].style.transition = 'transform 0.8s';
            // 设置过渡
        }, 10)
        deg -= 60;
    }
    // 这里使用setTimeout是为了第一次渲染时不出现动画
    imgs[1].style.transform = 'rotateY(0deg) scale(1)';
}
initRotate();

imgs[7].style.transform = imgs[7].style.transform.replace(/scale\([(\d)][.]?[(\d)]*\)/, 'scale(1)');
// 将第8张图片（与第2张图片等同，是在视窗最中间的图片）的scale改成1，是为了最开始时，视窗从0到6转换时平滑转换，不出现scale突变的情况

// 转换函数，scale和rotate都需要变换
function transform(direction) {
    for (let i = 0; i < imgs.length; i++) {
        let deg;
        if (direction == 'r') {
            deg = getRotateDeg(imgs[i]) + 60;
            // 向右时，旋转角度加60度
        } else {
            deg = getRotateDeg(imgs[i]) - 60;
        }
        imgs[i].style.transform = 'rotateY(' + deg + 'deg) scale(0.85)';
        // 将所有的图片依次设置他们应有的旋转角度，scale都设置为0.85
    }
    imgs[viewCount + 1].style.transform = imgs[viewCount + 1].style.transform.replace(/scale\([(\d)][.]?[(\d)]*\)/, 'scale(1)');
    // 将视窗中间那张图片的scale设置为1
}
// log: 图片在viewCount 0->6->5转换和6->0->1转换 时，scale出现卡顿，原因是第2张和第8张图片的scale需要重置

// 获取旋转角度的函数
function getRotateDeg(object) {
    let reg = /-?(\d)+/;
    return parseInt(object.style.transform.match(reg));
}


let viewCount = 0; // 视窗index
let lock = 0; // 按钮锁
view.onclick = (e) => {
    if (!lock) {
        if (e.target.className == 'fl') {
            // left btn
            if (viewCount == 0) {
                // 如果按下按钮时视窗index为0，将其变为5
                viewCount = 5;
                ul.removeAttribute('style');  // 去除else if 设置的ul的动画效果，以免class v0->v6时出现过渡效果
                ul.className = 'v6';  // 将ul的className设为v6（视窗6），悄无声息地转换
                lock = 1; // 将按钮锁住
                setTimeout(() => {
                    ul.className = 'v' + viewCount.toString();  // 向左滑动效果
                    transform('l')  // 角度，大小改变效果
                    ul.addEventListener('transitionend', function (e) {
                        // 当动画完成后，解锁按钮
                        lock = 0;
                    });
                }, 50)
                // 用setTimeout防止v6刚换完就进行下一个动画，这样会产生过渡效果，我要悄无声息地转换
            } else if (viewCount == 1) {
                // 进行这个分支是因为。。。CSSclass中，v1->v0没有过渡效果，这里手动加上
                viewCount -= 1;
                ul.style.transition = 'margin-left 1s';
                // 手动添加向左滑动的style
                lock = 1;
                ul.className = 'v' + viewCount.toString();
                transform('l')
                imgs[7].style.transform = imgs[7].style.transform.replace(/scale\([(\d)][.]?[(\d)]*\)/, 'scale(1)');
                // 在v1->v0转换时就提前做好准备，将第8张图的scale先设置为1，为之后的平滑转换做准备
                ul.addEventListener('transitionend', function (e) {
                    ul.removeAttribute('style');
                    // 当动画完成之后就不需要这个style属性了，移除她
                    lock = 0;
                });
            } else {
                // 常规操作
                viewCount -= 1;
                lock = 1;
                ul.className = 'v' + viewCount.toString();
                transform('l');
                ul.addEventListener('transitionend', function (e) {
                    lock = 0;
                });
            }
        } else if (e.target.className == 'fr') {
            // right btn
            if (viewCount == 6) {
                viewCount = 1;
                lock = 1;
                ul.className = 'v0';
                setTimeout(() => {
                    ul.className = 'v' + viewCount.toString();
                    transform('r')
                    ul.addEventListener('transitionend', function (e) {
                        lock = 0;
                    });
                }, 50);
            } else if (viewCount == 5) {
                viewCount += 1;
                ul.style.transition = 'margin-left 1s';
                lock = 1;
                ul.className = 'v' + viewCount.toString();
                transform('r')
                imgs[1].style.transform = imgs[1].style.transform.replace(/scale\([(\d)][.]?[(\d)]*\)/, 'scale(1)');
                ul.addEventListener('transitionend', function (e) {
                    ul.removeAttribute('style');
                    lock = 0;
                });
            } else {
                viewCount += 1;
                lock = 1;
                ul.className = 'v' + viewCount.toString();
                transform('r');
                ul.addEventListener('transitionend', function (e) {
                    lock = 0;
                });
            }
        }
    }
};