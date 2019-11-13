var btn = document.getElementById('btn'),
    input = document.getElementById('input'),
    csrf = document.getElementsByName('csrfmiddlewaretoken')[0],
    h1 = document.getElementsByTagName('h1')[0];
console.log(csrf.value);

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
            if (this.request.readyState == 4 && this.request.status == 200) {
                callback();
            } else {
                err();
            }
        };
        this.request.send();
    }
}

let object = {
    'csrfmiddlewaretoken': csrf.value,
    'testVariable': 10
};
//
// btn.onclick = () => {
//     let xhr = new XHR();
//     xhr.post('/ajax/', object, () => {
//         h1.innerHTML = xhr.request.responseText;
//     }, () => {
//         h1.innerHTML = '';
//     });
// };


btn.onclick = () => {
    let xhr = new XHR();
    xhr.get('/ajax/',{
        'testVariable': '我真菜'
    }, () => {
        h1.innerHTML = xhr.request.responseText;
    })
};



// btn.onclick = () => {
//     var text = input.value;
//     var xmlHttp = new XMLHttpRequest();
//     // xmlHttp.open('POST', '/ajax/?csrfmiddlewaretoken=' + csrf.value + '&req=' + text);
//     xmlHttp.open('POST', '/ajax/');
//     xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlHttp.onreadystatechange = () => {
//         if (xmlHttp.status == 200) {
//             h1.innerHTML = xmlHttp.responseText;
//         } else {
//             console.log('err!');
//         }
//     };
//     xmlHttp.send('csrfmiddlewaretoken=' + csrf.value + '&req=' + text);
// };