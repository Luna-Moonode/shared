var viewport = document.documentElement;
var viewport_width = viewport.clientWidth;
var font_size = 100 * viewport_width / 1920; // 设计稿字号x实际屏宽/设计稿宽 1rem = 100px  原公式：实际字号/实际屏宽 = 设计字号/设计稿宽
viewport.style.fontSize = font_size.toFixed(1) + 'px';

let vm_header = new Vue({
    el: '#header',
    data: {
        nav0: true,
        nav1: false,
        nav2: false
    },
    methods: {
        mouseenterli(e) {
            vm_header.nav0 = false;
            vm_header.nav1 = false;
            vm_header.nav2 = false;
            vm_header['nav' + e.target.id.match(/\d+/)[0]] = true;
        },
        mouseleaveli(e) {
            vm_header.nav0 = true;
            vm_header.nav1 = false;
            vm_header.nav2 = false;
        }
    }
});
