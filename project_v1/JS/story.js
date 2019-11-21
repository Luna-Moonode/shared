let foo = document.getElementsByTagName('p'),
    storyboard = document.getElementById('storyboard'),
    title = foo[0],
    text = foo[1];

function alterText(textArr) {
    // 传入含有title, text两个元素的数组
    title.innerHTML = '';
    text.innerHTML = '';
    let titleString = textArr[0],
        textString = textArr[1];
    for (let i = 0; i < titleString.length; i++) {
        setTimeout(() => {
            title.innerHTML += titleString[i];
        }, 100 * i)
    }
    for (let i = 0; i < textString.length; i++) {
        setTimeout(() => {
            text.innerHTML += textString[i];
        }, 100 * (i + titleString.length));
    }
}

// TODO:给storyboard加点击事件，点击后出发altertext()切换
// 注意我写了两种class，第一次和非第一次，两中class left值不一样，需要做一下切换