let animation = new AnimationSequence([
    '#dreamstartp',
    '#dyht-gs',
    '#bs-gs',
    '#lxh-gs',
    '#nz-gs'
], {
    initialClass: ['opacity0', 'display_block'],
    finalClass: 'opacity1',
    animationClass: 'emerge'
}, (index) => {
    if (index === 0) {
        setTimeout(() => {
            animation.fallthrough = true;
        }, 2000)
    }else {
        setTimeout(() => {
            animation.fallthrough = true;
        }, 600)
    }
}, true);
animation.initializer = (element) => {
    element.classList.remove('disappear');
    element.classList.remove('display_none');
};
animation.callback = selectGame;

let childrenArr = document.getElementById('game-select').children,
    mask = document.getElementById('mask'),
    listenerArr = [];

function initializeGame() {
    for (let i = 0; i < childrenArr.length; i++) {
        childrenArr[i].classList.add('display_none')
    }
}

function selectGame() {
    lock_header = 0;
    // TODO: finish the link to game playground
    for (let i = 1; i < childrenArr.length; i++) {
        listenerArr.push(addRemovableEventListener(childrenArr[i], 'mouseenter', () => {
            for (let j = 1; j < childrenArr.length; j++) {
                childrenArr[j].classList.remove('fade_reverse');
                if (j === i) continue;
                childrenArr[j].classList.add('fade');
            }
        }));
        listenerArr.push(addRemovableEventListener(childrenArr[i], 'mouseleave', () => {
            for (let j = 1; j < childrenArr.length; j++) {
                childrenArr[j].classList.remove('fade');
                if (j === i) continue;
                childrenArr[j].classList.add('fade_reverse')
            }
        }));
        listenerArr.push(addRemovableEventListener(childrenArr[i], 'click', (e) => {
            for (let j = 0; j < childrenArr.length; j++) {
                if (i === j) continue;
                childrenArr[j].className = 'display_none';
            }
            childrenArr[i].classList.remove('fade');
            childrenArr[i].classList.add('click_magnify_game');
            childrenArr[i].classList.add('flyToMiddle');
            mask.className = 'gameSelected';
        }));
    }
}

function triggerGame() {
    scrollToTop();
    initializeGame();
    setTimeout(animation.animate, 2000);
}

function removeGame() {
    listenerArr.forEach((fn) => {
        fn();
    });
    listenerArr = [];
    for (let i = 0; i < childrenArr.length; i++) {
        childrenArr[i].classList.remove('opacity1');
        childrenArr[i].classList.remove('fade_reverse');
        childrenArr[i].classList.add('disappear');
        listenerArr.push(addRemovableEventListener(childrenArr[i], 'animationend', () => {
            childrenArr[i].classList.add('display_none');
            listenerArr[i]();
        }));
    }
}

initializeGame();
