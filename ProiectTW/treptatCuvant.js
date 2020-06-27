function animation(k)
{
    var txt =document.getElementsByClassName("textAnimation");
    var speed = 333;
    var j = k;
    var i = 0;
    var words = txt[j].innerHTML.split(" ");
    document.getElementsByClassName("textAnimation")[j].innerHTML = "";
    typeWriter() ;


    function typeWriter() {
    if (i < words.length) {
        document.getElementsByClassName("textAnimation")[j].innerHTML += words[i]+" ";
        i++;
        setTimeout(typeWriter, speed);
    }
    }
}
var txt = document.getElementsByClassName("textAnimation");
var j 
for(j=0;j<txt.length;j++)
 {
     animation(j)
 }