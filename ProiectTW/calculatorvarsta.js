function calculateAge(){
    var birthDate=document.getElementById('birth_date').value
    var date = birthDate.toString()
    var yearThen = parseInt(date.substring(0,4),10)
    var monthThen = parseInt(date.substring(5,7),10)
    var dayThen = parseInt(date.substring(8,10),10)
    console.log(1)
    var birthday= new Date(yearThen,monthThen-1,dayThen)
    timer()
    function timer()
    {
    var today=new Date()
    var milisecond=today-birthday
    var year_age=Math.floor(milisecond/31536000000)
    var day_age=Math.floor((milisecond%31536000000)/86400000)
    var hour_age=Math.floor(((milisecond%31536000000)%86400000)/3600000)
    var minutes_age=Math.floor((((milisecond%31536000000)%86400000)%3600000)/60000)
    var seconds_age=Math.floor(((((milisecond%31536000000)%86400000)%3600000)%60000)/1000)
    var month_age=Math.floor(day_age/30)
    var day_age=day_age%30;
    if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) {
        document.getElementById("age").innerHTML = ("Zi de nastere invalida");
        
    }
    else {
        document.getElementById("age").innerHTML = year_age + " ani " + month_age + " luni " + day_age + " zile " + hour_age + " ore " + minutes_age + " minute " + seconds_age +" secunde"
        setTimeout(timer, 1000)
    }
    
}
}