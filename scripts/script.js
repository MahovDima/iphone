let iphone = document.querySelector('.iphone')
let btn = document.querySelector('button')
let lock = iphone.querySelector('.lock')
let lockscreen = iphone.querySelector('.lockscreen')
let content = iphone.querySelector('.iphone-content')
let homeButton = iphone.querySelector('.home')
let unlockscreen = iphone.querySelector('.unlockscreen')
let passwordButtons = unlockscreen.querySelectorAll('.password-item')
let passCir = unlockscreen.querySelector('.passCir')
let homescreen = iphone.querySelector('.homescreen')
let password = "119733"
let enterPass = ''

let unlocked = false;
let passEntered = false;
var newDate = new Date()

document.querySelector('.time>li:first-child').textContent = newDate.getHours() < 10 ? `0${newDate.getHours()}` : `${newDate.getHours()}`;
document.querySelector('.time>li:last-child').textContent = newDate.getMinutes() < 10 ? ` 0${newDate.getMinutes()}` : ` ${newDate.getMinutes()}`

lock.addEventListener('dblclick',()=>{
    lock.classList.toggle('locked')
})

const locker = () =>{
    if(!lock.classList.contains('locked')){
        homescreen.classList.remove('shown')
        unlockscreen.classList.remove('shown')
        lockscreen.classList.add('shown')
        unlocked = false;
        passEntered = false;
        lockscreen.style.top = '0px';
        homeButton.style.bottom = '10px';
        content.style.cssText = `backdrop-filter: none`
    }
    lock.classList.toggle('locked')
}

const unlock = (e) =>{
    lockscreen.style.top = e.pageY - 820 + 'px'
    homeButton.style.bottom = 830 - e.pageY + 'px'
    content.style.cssText = `backdrop-filter: blur(${20 - Math.floor(e.pageY / 40)}px)`
    homeButton.style.opacity = (e.pageY / 3280).toFixed(2);
}

homeButton.addEventListener('mousedown', ()=>{
    if(!unlocked) {
        document.addEventListener('mousemove', unlock)
        homeButton.classList.remove('unlock');
    }
})

document.addEventListener('mousemove', (evt)=>{
    if(!evt.target) return;
    if((evt.target == document.querySelector('body') || homeButton.style.bottom == '8px') && !unlocked){
        document.removeEventListener('mousemove', unlock);
        lockscreen.style.top = '0px';
        homeButton.style.bottom = '10px';
        content.style.cssText = `backdrop-filter: none`
        homeButton.classList.add('unlock');
        homeButton.style.opacity = 1
    } 
    if(Number(lockscreen.style.top.slice(0,-2)) < -400){
        document.removeEventListener('mousemove', unlock);
        lockscreen.style.top = '1000px';
        homeButton.style.bottom = '10px';
        unlocked = true;
        homeButton.classList.remove('unlock');
        content.style.cssText = `backdrop-filter: blur(20px)`
        homeButton.style.opacity = 1
        unlockscreen.classList.add('shown')
    }
})

document.querySelector('.deleteBtn').addEventListener('click', ()=>{
    if(enterPass.length == 0){
        lockscreen.style.top = '0px';
        homeButton.style.bottom = '10px';
        unlocked = false;
        homeButton.classList.add('unlock');
        content.style.cssText = `backdrop-filter: none`
        unlockscreen.classList.remove('shown')
    }
    else{
        document.querySelector(`.passCir li:nth-child(${enterPass.length})`).classList.remove('active')
        enterPass = enterPass.slice(0,-1)
        console.log(enterPass.slice(0,-1))
        if(enterPass.length == 0){
            document.querySelector('.deleteBtn').textContent = 'Отменить'
        }
    }
    
})

passwordButtons.forEach(btn => {
    btn.addEventListener('click', (evt)=>{
        let key = btn.querySelector('span').textContent
        enterPass += key;
        document.querySelector(`.passCir li:nth-child(${enterPass.length})`).classList.add('active')
        if(enterPass.length == 6){
            if(enterPass == password){
                passEntered = true;
                content.style.cssText = `backdrop-filter: none`
                unlockscreen.classList.remove('shown')
                homescreen.classList.add('shown')
                homeButton.classList.add('onhomescreen')
            }
            else{
                passCir.classList.add('wrong')
                setTimeout(() => {
                    passCir.classList.remove('wrong')
                }, 650);
                document.querySelector('.deleteBtn').textContent = 'Отменить'
            }
            enterPass = ''
            passCir.querySelectorAll(`li`).forEach(li =>{
                li.classList.remove('active')
            })
        }
        else if(enterPass.length > 0){
            document.querySelector('.deleteBtn').textContent = 'Удалить'
        }
    })
});

