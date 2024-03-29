const imgdir = {
    'dyht': {
        first: './img/final/dyht/1.png',
        second: './img/final/dyht/2.png',
        third: './img/final/dyht/3.png',
        firstbg: './img/final/dyht/bg1.png',
        secondbg: './img/final/dyht/bg2.png',
        thirdbg: './img/final/dyht/bg3.png',
    },
    'lxh': {
        first: './img/final/lxh/1.png',
        second: './img/final/lxh/2.png',
        third: './img/final/lxh/3.png',
        firstbg: './img/final/lxh/bg1.png',
        secondbg: './img/final/lxh/bg2.png',
        thirdbg: './img/final/lxh/bg3.png',
    },
    'bs': {
        first: './img/final/bs/1.png',
        second: './img/final/bs/2.png',
        third: './img/final/bs/3.png',
        firstbg: './img/final/bs/bg1.png',
        secondbg: './img/final/bs/bg2.png',
        thirdbg: './img/final/bs/bg3.png',
    },

};

let vm_final = new Vue({
    el: '#wrapper',
    data: {
        username: '',
        score: 0,
        rank: 0,
        bgimgsrc: '',
        bgimgsrc_copy: '',
        rightimgsrc_1: {
            'background-image': ''
        },
        rightimgsrc_2: {
            'background-image': ''
        },
        rightimgsrc_3: {
            'background-image': ''
        },
    }
});


// document.cookie = 'username=nowhere';
// 获取cookie中的用户名

// let username = document.cookie.match(/username=.[^; ]+;?/)[0];
// username = username.split('=')[1].slice(0, -1);

let previous,
    b64imgArr = [];

let xhr = new XHR();
xhr.get('api/outcome/', {
    // username: username
}, () => {
    let res = JSON.parse(xhr.response);
    previous = res.previous;
    // test area 测试区
    // previous = 'dyht';
    // previous = 'bs';
    // previous = 'lxh';
    // test area 测试区
    b64imgArr = res.bgsrc;
    vm_final.username = res.username;
    vm_final.score = res.score;
    vm_final.rank = res.rank;
    // 中部背景图
    vm_final.bgimgsrc = b64imgArr[0];
    // 右部三个图片
    vm_final.rightimgsrc_1['background-image'] = `url(${imgdir[previous].first})`;
    vm_final.rightimgsrc_2['background-image'] = `url(${imgdir[previous].second})`;
    vm_final.rightimgsrc_3['background-image'] = `url(${imgdir[previous].third})`;
    // 如果排名小于10，调整位置
    if (vm_final.rank < 10) {
        rank.style.marginRight = '0.3rem';
    }
});


let rank = document.getElementsByClassName('score')[1],
    innerqrcode = document.getElementById('innerqrcode'),
    bottomp = document.getElementsByClassName('bottomp')[0],
    fatherdiv = document.querySelector('#wrapper .imgarea .right'),

    rightimgdiv = document.querySelector('#wrapper .squarearea'),
    flyer = document.getElementById('flyer'),
    lefttext = document.querySelector('#wrapper .left'),
    righttext = document.querySelector('#wrapper .right'),
    bgimgwrapper = document.querySelector('#wrapper .imgarea'),
    bgimg = document.querySelector('#wrapper .bgimg');
    

// 截图功能
let lock_download = 0;
$(".download").on("click", function () {
    if (lock_download) return
    lock_download = 1;
    var shareContent = $(".imgarea")[0];
    var width = shareContent.offsetWidth;
    var height = shareContent.offsetHeight;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    scale = 1;
    var opts = {
        scale: scale,
        canvas: canvas,
        width: width,
        height: height,
        dpi: window.devicePixelRatio,
        allowTaint: true,
        useCORS: true,
    };
    fatherdiv.removeChild(innerqrcode);
    fatherdiv.removeChild(bottomp);
    html2canvas(shareContent, opts).then(function (canvas) {
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        var dataUrl = canvas.toDataURL('image/png', 1.0);
        var newImg = document.createElement("img");
        newImg.src = dataUrl;
        newImg.width = width;
        newImg.height = height;
        const alink = document.createElement("a");
        alink.href = newImg.src;
        alink.download = `${vm_final.username}.png`;
        alink.click();
        fatherdiv.appendChild(bottomp);
        fatherdiv.appendChild(innerqrcode);
        lock_download = 0;
    });
});

// 改变背景图
lock_fly = 0;
rightimgdiv.addEventListener('click', (e) => {
    let id = parseInt(e.target.id);
    if (lock_fly || e.target === rightimgdiv || b64imgArr[id] === vm_final.bgimgsrc) return
    lock_fly = 1;
    lock_download = 1;
    bgimg.classList.add('disappear');
    lefttext.classList.add('disappear');
    righttext.classList.add('disappear');
    vm_final.bgimgsrc_copy = b64imgArr[id];
    flyer.classList.add(`bgselect-${id}`);
    flyer.addEventListener('animationend', () => {
        bgimg.classList.remove('disappear');
        lefttext.classList.remove('disappear');
        righttext.classList.remove('disappear');
        bgimg.classList.add('emerge');
        lefttext.classList.add('emerge');
        righttext.classList.add('emerge');
        flyer.classList.remove(`bgselect-${id}`)
        vm_final.bgimgsrc = b64imgArr[id]
        lock_fly = 0;
        lock_download = 0;
    })
});

let lock_rightimgdiv = 0;
rightimgdiv.addEventListener('click', function (e) {
    if (lock_rightimgdiv) return
    e.target.classList.add('click_magnify');
    lock1 = 1;
    setTimeout(() => {
        e.target.classList.remove('click_magnify');
        lock_rightimgdiv = 0;
    }, 250)
});
