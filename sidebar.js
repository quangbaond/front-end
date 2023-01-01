const itemSideBar = document.getElementsByClassName('item-sidebar')
const sideBar = document.getElementById('side-bar')
const sideBarBlock = document.getElementById('side-bar-block')
const widthSideBarBlock = 320
let statusHoverItemSideBar = false
const textItemSideBar = [
    {
        content: 'top',
        text: 'トップ',
        textReplace: 'トップ'
    },
    {
        content: 'platform',
        text: 'プラットフォーム',
        textReplace: 'プラットフォーム'
    },
    {
        content: 'partner',
        text: 'パートナー',
        textReplace: 'POST'
    },
    {
        content: 'about',
        text: 'EXP→fxについて',
        textReplace: 'NEXUS <br> MANAGEMENT'
    },
    {
        content: 'faq',
        text: 'F　A　Q',
        textReplace: 'F　A　Q'
    }
]
for (let i = 0; i < itemSideBar.length; i++) {
    const classList = itemSideBar[i].classList
    itemSideBar[i].onmouseenter = function (e) {
        statusHoverItemSideBar = true
        classList.add('active')
    }
    itemSideBar[i].onmouseleave = function (e) {
        classList.remove('active')
        closeSideBar()
    }
}
sideBarBlock.onmouseenter = function (e) {
    removeClassItemSideBar()
    statusHoverItemSideBar = true
    const childrenSideBar = this.children
    let contentSideBar = null
    for (let i = 0; i < childrenSideBar.length; i++) {
        const classList = childrenSideBar[i].classList
        if(classList.contains('show')){
            contentSideBar = childrenSideBar[i].getAttribute('data-content')
        }
    }

    switch (contentSideBar) {
        case 'top':
            itemSideBar[0].classList.add('active')
            break
        case 'platform':
            itemSideBar[1].classList.add('active')
            break
        case 'partner':
            itemSideBar[2].classList.add('active')
            break
        case 'about':
            itemSideBar[3].classList.add('active')
            break
        default:
            break
    }
}
function openSideBar () {
    statusHoverItemSideBar = true
    displaySideBarBlock(true)
}
function closeSideBar () {
    statusHoverItemSideBar = false
    setTimeout(function () {
        if(!statusHoverItemSideBar){
            displaySideBarBlock(false) // close sidebar
            showContentSideBar(null) // close content sidebar
            replaceTitleSideBar(false, null) // replace title side bar
        }
    },200)
}
function displaySideBarBlock(status) {
    // status = true => show sidebar block
    if(status) {
        sideBarBlock.style.display = 'block'
        sideBar.style.right = widthSideBarBlock  + 'px'
        sideBarBlock.style.width = widthSideBarBlock + 'px'
    }else {
        sideBar.style.right = '0'
        sideBarBlock.style.width = '0px'
    }
}
function removeClassItemSideBar () {
    // remove class active
    for (let i = 0; i < itemSideBar.length; i++) {
        const classList = itemSideBar[i].classList
        classList.remove('active')
    }
}
function showContentSideBar(title = null, element = null, textReplace = null) {
    removeClassItemSideBar() // remove class active
    const parentElement = element ? element.parentElement : null  // get parent element
    if(parentElement) {
        parentElement.classList.add('active') // add class active for parent element
    }
    const childSideBarBlock = sideBarBlock.children // get children element
    for (let i = 0; i < childSideBarBlock.length; i++) {
        childSideBarBlock[i].style.display = 'none' // hide all children element
        childSideBarBlock[i].classList.remove('show') // remove class show
    }
    if(!title) return // if title is null return
    replaceTitleSideBar(true, title) // replace title
    openSideBar() // open sidebar
    switch (title) {
        case 'top':
            childSideBarBlock[0].classList.add('show') // add class show for element
            delayDisplaySideBarBlock(childSideBarBlock[0], true)
            break;
        case 'platform':
            childSideBarBlock[1].classList.add('show') // add class show for element
            delayDisplaySideBarBlock(childSideBarBlock[1], true)
            break;
        case 'partner':
            childSideBarBlock[2].classList.add('show') // add class show for element
            delayDisplaySideBarBlock(childSideBarBlock[2], true)
            break;
        case 'about':
            childSideBarBlock[3].classList.add('show') // add class show for element
            delayDisplaySideBarBlock(childSideBarBlock[3], true)
            break;
        case 'faq':
            window.location.href = '/faq' // redirect to page faq
            break;
        default:
            delayDisplaySideBarBlock(childSideBarBlock[0], true) // default show content top
            break;
    }
}
function delayDisplaySideBarBlock(element, status) {
    // delay display content side bar
    setTimeout(function () {
        if(status) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    },200)
}
function replaceTitleSideBar(status = false, title = null) {
    // replace title side bar
    for (let i = 0; i < textItemSideBar.length; i++) {
        const elementReplace = itemSideBar[i].children[3] // get element replace
        if(title === textItemSideBar[i].content) {
            if(status) {
                elementReplace.innerHTML = textItemSideBar[i].textReplace // replace text
            }
        } else {
            elementReplace.innerHTML = textItemSideBar[i].text // replace text
        }
    }
}