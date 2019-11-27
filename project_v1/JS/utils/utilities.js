var viewport = document.documentElement;
var viewport_height = viewport.clientHeight;
var font_size = 100 * viewport_height / 1080;
viewport.style.fontSize = font_size.toFixed(1) + 'px';


function XHR() {
    // XHR构造函数，用于创建本机ajax请求
    this.URL_ROOT = 'http://127.0.0.1:8000/';
    this.request = null;
    this.response = null;
    let createRequest = () => {
        if (window.XMLHttpRequest) {
            this.request = new XMLHttpRequest();
        } else {
            this.request = new ActiveXObject('Microsoft.XMLHTTP');
        }
    };
    this.post = (url, object, callback, err = () => {}) => {
        createRequest();
        this.request.open('post', `${this.URL_ROOT}${url}`);
        this.request.onreadystatechange = () => {
            if (this.request.readyState === 4 && this.request.status === 200) {
                this.response = this.request.responseText;
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
    this.get = (url, object, callback, err = () => {}) => {
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
                this.response = this.request.responseText;
                callback();
            } else if (this.request.readyState === 4 && this.request.status !== 200) {
                err();
            }
        };
        this.request.send();
    }
}

function AnimationSequence(querySelectorSequence, options, animationEndHandler = () => {this.fallthrough = true}, clear = false) {
    this.fallthrough = false;
    this.callback = () => {};
    this.initializer = () => {};
    function activate(element) {
        if (typeof options.animationClass === 'object') {
            for (let i = 0; i < options.animationClass.length; i++) {
                element.classList.add(options.animationClass[i])
            }
        } else {
            element.classList.add(options.animationClass);
        }
    }

    function inactivate(element) {
        element.classList.remove(options.animationClass);
    }

    function addInitialClassName(element) {
        if (typeof options.initialClass === 'object') {
            for (let i = 0; i < options.initialClass.length; i++) {
                element.classList.add(options.initialClass[i])
            }
        } else {
            element.classList.add(options.initialClass);
        }
    }

    function removeInitialClassName(element) {
        if (typeof options.initialClass === 'object') {
            for (let i = 0; i < options.initialClass.length; i++) {
                element.classList.remove(options.initialClass[i])
            }
        } else {
            element.classList.remove(options.initialClass);
        }
    }

    function addFinalClassName(element) {
        if (typeof options.finalClass === 'object') {
            for (let i = 0; i < options.finalClass.length; i++) {
                element.classList.add(options.finalClass[i])
            }
        } else {
            element.classList.add(options.finalClass);
        }
    }

    function addAnimationEndEventListener(scope, listener) {
        scope.addEventListener('animationend', listener);
        return () => {
            scope.removeEventListener('animationend', listener);
        }
    }
    sequence = [];
    if (typeof querySelectorSequence === 'string') {
        sequence[0] = document.querySelector(querySelectorSequence);
    } else {
        for (let i = 0; i < querySelectorSequence.length; i++) {
            sequence[i] = document.querySelector(querySelectorSequence[i]);
        }
    }
    let listenerArr = [];
    this.animate = () => {
        this.initializer(sequence[0]);
        addInitialClassName(sequence[0]);
        activate(sequence[0]);
        for (let i = 0; i < sequence.length; i++) {
            let element = sequence[i];
            listenerArr.push(addAnimationEndEventListener(element, (e) => {
                removeInitialClassName(element);
                addFinalClassName(element);
                if (clear) inactivate(e.target);
                if (i === sequence.length - 1) {
                    listenerArr.forEach((fn) => {
                        fn();
                    });
                    listenerArr = [];
                    this.callback();
                    return;
                }
                animationEndHandler(i, element);
                let interval = setInterval(() => {
                    if (!this.fallthrough) return;
                    clearInterval(interval);
                    this.initializer(sequence[i + 1]);
                    addInitialClassName(sequence[i + 1]);
                    activate(sequence[i + 1]);
                    this.fallthrough = false;
                }, 10);
            }));
        }
    }
}

function addRemovableEventListener(scope, type, listener) {
    scope.addEventListener(type, listener);
    return () => {
        scope.removeEventListener(type, listener)
    }
}
