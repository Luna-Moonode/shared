// animation of register area
let registerArea = document.getElementById("register");

function register() {
    registerArea.className = "activeRegister";
}
// declarations
let username = document.getElementById('username'),
    password = document.getElementById('password'),
    passwordConfirm = document.getElementById('passwordConfirm'),
    username_input = document.getElementById('username_input'),
    pwd_input = document.getElementById('pwd_input'),
    pwdConfirm_input = document.getElementById('pwdConfirm_input'),
    // csrf_token = document.getElementsByName('hidden')[0].value,
    registerSubmit = document.getElementById('registerSubmit'),
    username_status = 0,
    password_status = 0;


// XHR构造函数，用于创建ajax请求
function XHR() {
    this.request = null;
    this._createRequest = function createRequest() {
        this.request = new XMLHttpRequest();
        // 这地方可以做一下兼容
    };
    this.post = function post(url, object, callback, err = () => {}) {
        this._createRequest();
        this.request.open('post', url);
        this.request.onreadystatechange = () => {
            if (this.request.readyState == 4 && this.request.status == 200) {
                callback();
            } else if (this.request.readyState == 4 && this.request.status != 200) {
                err();
            }
        };
        let req = '';
        for (attr in object) {
            if (req == '') {
                req = attr + '=' + object[attr];
            } else {
                req = req + '&' + attr + '=' + object[attr];
            }
        }
        this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.request.send(req);
    };
    this.get = function get(url, object, callback, err = () => {}) {
        this._createRequest();
        let req = '';
        for (attr in object) {
            if (req == '') {
                req = attr + '=' + object[attr];
            } else {
                req = req + '&' + attr + '=' + object[attr];
            }
        }
        this.request.open('get', url + '?' + req);
        this.request.onreadystatechange = () => {
            if (this.request.status == 200) {
                callback();
            } else {
                err();
            }
        };
        this.request.send();
    }
}


// 一劳永逸的方法validateInput(),（只适用于密码，呵呵）
function validateInput(req, res) {
    function validate() {
        let xhr = new XHR();
        xhr.post('/login/register-passed/', {
            [req]: req,
            'csrfmiddlewaretoken': csrf_token
        }, () => {
            let feedback = JSON.parse(xhr.request.responseText)[res];
            if (!feedback) {
                eval(req).style.color = 'red';
            } else {
                password_status = 1;
                eval(req).innerHTML = '通过';
            }
        })
    }
    return validate;
}
// log：此函数可能出现找不到req, res值的问题, 联调时再看效果

function validateUsername() {
    // 用户名是否通过？未通过，是哪种类型？格式错误\用户名已存在
    // 判断的变量: username_length(长度), username_format(格式)
    let xhr = new XHR();
    xhr.post('/login/register-passed/', {
        'username': username_input.value,
        'csrfmiddlewaretoken': csrf_token
    }, () => {
        let feedback = JSON.parse(xhr.request.responseText)['username_length'];
        if (!feedback) {
            username.innerHTML = '用户名长度应为...';
            username.style.color = 'red';
        } else {
            username_status = 1;
            username.innerHTML = '通过';
        }
        feedback = JSON.parse(xhr.request.responseText)['username_format'];
        if (!feedback) {
            username.style.color = 'red';
            username.innerHTML = '用户名应为字母或数字的组合...';
        } else {
            username_status = 1;
            username.innerHTML = '通过';
        }
    })
}


function remind_username() {
    if (username_input.value == '') {
        username.innerHTML = '用户名必须为。。。';
    }
}

function remind_password() {
    if (pwd_input.value == '') {
        password.innerHTML = '密码必须为。。。';
    }
}

function remind_pwdConfirm() {
    if (pwdConfirm_input.value == '') {
        passwordConfirm.innerHTML = '两次密码须一致';
    }
}

// addEventListener
username_input.onfocus = remind_username;
username_input.onkeydown = validateUsername;
pwd_input.onfocus = remind_password;
pwd_input.onkeydown = validateInput('password', 'password_format');
pwdConfirm_input.onfocus = remind_pwdConfirm;
pwdConfirm_input.onkeydown = validateInput('passwordConfirm','password_confirm');

// 通过判断username_status和password_status两个状态值来验证表单, 每200毫秒验证一次
setInterval(() => {
    if (username_status && password_status) {
        registerSubmit.removeAttribute('disabled');
        registerSubmit.className = 'unlocked';
    } else {
        registerSubmit.disabled = 'disabled';
        registerSubmit.className = 'locked';
    }
}, 200);
