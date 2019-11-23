let vm_header = new Vue({
    el: '#header',
    data: {
        nav0: true,
        nav1: false,
        nav2: false
    },
    methods: {
        mouseenterli(e) {
            this.nav0 = false;
            this.nav1 = false;
            this.nav2 = false;
            this['nav' + e.target.id.match(/\d+/)[0]] = true;
        },
        mouseleaveli(e) {
            this.nav0 = true;
            this.nav1 = false;
            this.nav2 = false;
        }
    }
});

var viewport = document.documentElement;
var vh = viewport.clientHeight;

window.onscroll = () => {
    let scr = window.scrollY;
    switch (true) {
        case (scr < vh * 0.6):
            document.body.className = 'bg-default';
            break;
        case (vh * 0.8 < scr && scr < vh * 1.6):
            document.body.className = 'bg-lxh';
            break;
        case (vh * 1.8 < scr && scr < vh * 2.6):
            document.body.className = 'bg-nz';
            break;
        case (vh * 2.8 < scr && scr < vh * 3.6):
            document.body.className = 'bg-bs';
            break;
        case (vh * 3.8 < scr && scr < vh * 4.6):
            document.body.className = 'bg-dyht';
            break;
        case (vh * 4.8 < scr && scr < vh * 5.9):
            document.body.className = 'bg-dsgl';
            break;
        case (vh * 6 < scr):
            document.body.className = 'bg-bottom';
            break;
    }
};

let arrow = document.getElementById('arrow');
let play = 1;
arrow.onclick = () => {
    if (play) {
        let bgm_dyht = document.getElementById('bgm-dyht');
        bgm_dyht.play()
        play = 0;
    }
    let count = 0;
    let scrollY = window.scrollY;
    var scrollInterval = setInterval(() => {
        if (count >= 100) { 
            clearInterval(scrollInterval)
        }
        count += 1;
        window.scrollTo(0, scrollY + (vh - scrollY) * count / 100)
    }, 1)
};

let line = document.querySelector('#axis .line');
let circles = document.getElementsByClassName('circle');

function scrollToLxh() {
    let count = 0;
    let scrollY = window.scrollY;
    var scrollInterval = setInterval(() => {
        if (count >= 100) {
            clearInterval(scrollInterval)
        }
        count += 1;
        window.scrollTo(0, scrollY + (vh - scrollY) * count / 100)
    }, 1)
}

line.onclick = scrollToLxh;
for (let i = 0; i < circles.length; i++) {
    circles[i].onclick = scrollToLxh;
}

