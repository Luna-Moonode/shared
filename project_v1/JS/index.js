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
