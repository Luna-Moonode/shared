var btn = document.getElementById('btn'),
    input = document.getElementById('input'),
    csrf = document.getElementsByName('csrfmiddlewaretoken')[0],
    h1 = document.getElementsByTagName('h1')[0];
console.log(csrf.value);


btn.onclick = () => {
    var text = input.value;
    var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open('POST', '/ajax/?csrfmiddlewaretoken=' + csrf.value + '&req=' + text);
    xmlHttp.open('POST', '/ajax/');
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.status == 200) {
            h1.innerHTML = xmlHttp.responseText;
        } else {
            console.log('err!');
        }
    };
    xmlHttp.send('csrfmiddlewaretoken=' + csrf.value + '&req=' + text);
};
