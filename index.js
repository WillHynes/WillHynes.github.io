function changeAngle(){
    let height = window.innerHeight;
    let width = window.innerWidth;
    let hypotenuse = Math.sqrt((height*height+width*width));
    let angle = Math.asin(height/hypotenuse)*100;
    let anglecontent = angle+"deg"

    var root = document.querySelector(':root');

    root.style.setProperty('--angle', anglecontent);

    setTimeout(changeAngle, 50);

    return angle+"deg";
}

changeAngle();