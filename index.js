let screenheight = window.screen.availHeight;
let totalheight = screenheight * 4;
let spinamount = 180 / screenheight;

console.log(spinamount);
console.log(screenheight);

document.documentElement.style.setProperty('--spacer-amount', totalheight + "px");


window.addEventListener('scroll', (event) => {
    let scroll = this.scrollY;

    console.clear();
    console.log(scroll);
    
    document.documentElement.style.setProperty('--rotate-amount', spinamount * scroll + "deg");

    

})