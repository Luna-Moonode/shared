var btn = document.getElementById('btn'),
    input = document.getElementById('input'),
    csrf = document.getElementsByName('csrfmiddlewaretoken')[0];


btn.onclick = () => {
    var text = input.value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', '/ajax/?csrfmiddlewaretoken=' + csrf.value + '&req=' + text);
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.status == 200) {
            console.log(xmlHttp.responseText)
        } else {
            console.log('err!');
        }
    }
    xmlHttp.send();
}
// $("#btn").click(() => {
//     $.ajax({
//         url: "/ajax/",
//         type: "post",
//         data: {
//             name: $("#input").val(),
//             // csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
//             csrfmiddlewaretoken: '{% csrf_token %}'
//         },
//         success: (data) => {
//             console.log(data);
//         }
//     })
// })