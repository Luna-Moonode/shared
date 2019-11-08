var btn = document.getElementById('btn'),
    input = document.getElementById('input'),
    csrf = document.getElementsByName('csrfmiddlewaretoken')[0],
    h1 = document.getElementsByTagName('h1')[0];
console.log(h1);


btn.onclick = () => {
    var text = input.value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', '/ajax/?csrfmiddlewaretoken=' + csrf.value + '&req=' + text);
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.status == 200) {
            h1.innerHTML = xmlHttp.responseText;
        } else {
            console.log('err!');
        }
    };
    xmlHttp.send();
};