
function animation()
{
    var targets = document.querySelectorAll(".hidden");
    var i=0
    var j=targets.length-1

timer()
function timer()
    {if(i<j)
        {targets[i].style.visibility = "visible"
        targets[j].style.visibility ="visible"
        i++
        j--
        setTimeout(timer,200)
        }
    }
}

animation()