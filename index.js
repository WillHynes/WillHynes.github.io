let root = document.documentElement;

let spinQuant = Math.floor(screen.availHeight/180) * 180;
console.log(spinQuant);

root.style.setProperty('--spacer-amount', spinQuant + "px");

window.addEventListener('scroll', (event) => {
    let scroll = Math.round(this.scrollY);
    
    root.style.setProperty('--rotate-amount', scroll + "deg");

})