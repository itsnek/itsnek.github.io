var i = 0;
var deleting = false,done = false;
var txt = 'Nikos Siachamis...'; /* The text */
var context = '|'
var speed = 120; /* The speed/duration of the effect in milliseconds */

window.addEventListener('load',() => typeWriter());

function typeWriter() {

    let name = document.getElementById("name");

    if(i <= txt.length){
        if(i == 10 && !deleting && !done){
            name.innerHTML = txt.substring(0, i) + 'n';
            deleting = true;
        }
        else if(i == 10 && done){
            name.innerHTML = txt.substring(0,i);
            done = false;
            speed = 120;
        }
        else if(i == 11 && deleting){
            name.innerHTML = txt.substring(0, i-1) + 'n' + txt.substring(i-1, i);
            i--;
            done = true;
            deleting = false;
            speed = speed*2 ;
        }        
        else if(i == 11 && done){
            name.innerHTML = txt.substring(0,i - 1) + 'n';
            i = i - 2;
            speed = speed/3.5 ;
        }
        else {
            name.innerHTML = txt.substring(0,i + 1);
        }
        i++;

    }
    setTimeout(typeWriter,speed);
    name.style.fontFamily= "Titillium Web";
    name.style.textShadow= "0px 0px 10px #000000"
}