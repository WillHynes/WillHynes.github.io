let root = document.documentElement;

let spinQuant = Math.floor(screen.availHeight/180) * 180;
console.log(spinQuant);

let scrollPercent = () => {
    let pos = document.documentElement.scrollTop;

    let calcheight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let scrollvalue = Math.round( pos * 100 / calcheight);

    return scrollvalue
}


root.style.setProperty('--spacer-amount', spinQuant + "px");

window.addEventListener('scroll', (event) => {
    let scroll = Math.round(this.scrollY);
    
    root.style.setProperty('--rotate-amount', scroll + "deg");

})