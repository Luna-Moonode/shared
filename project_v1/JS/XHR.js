function XHR() {
    // XHR构造函数，用于创建本机ajax请求
    this.URL_ROOT = 'http://127.0.0.1:8000/';
    this.request = null;
    let createRequest = () => {
        if (window.XMLHttpRequest) {
            this.request = new XMLHttpRequest();
        } else {
            this.request = new ActiveXObject('Microsoft.XMLHTTP');
        }
    };
    this.post = function post(url, object, callback, err = () => {}) {
        createRequest();
        this.request.open('post', `${this.URL_ROOT}${url}`);
        this.request.onreadystatechange = () => {
            if (this.request.readyState === 4 && this.request.status === 200) {
                callback();
            } else if (this.request.readyState === 4 && this.request.status !== 200) {
                err();
            }
        };
        let req = '';
        for (let attr in object) {
            if (req === '') {
                req = `${attr}=${object[attr]}`;
            } else {
                req += `&${attr}=${object[attr]}`;
            }
        }
        this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.request.send(req);
    };
    this.get = function get(url, object, callback, err = () => {}) {
        createRequest();
        let req = '';
        for (let attr in object) {
            if (req === '') {
                req = `${attr}=${object[attr]}`;
            } else {
                req += `&${attr}=${object[attr]}`;
            }
        }
        this.request.open('get', `${this.URL_ROOT}${url}?${req}`);
        this.request.onreadystatechange = () => {
            if (this.request.readyState === 4 && this.request.status === 200) {
                callback();
            } else if (this.request.readyState === 4 && this.request.status !== 200) {
                err();
            }
        };
        this.request.send();
    }
}