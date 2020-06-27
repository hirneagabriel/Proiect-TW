var url = location.href.split("/");
var lista = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
var i=0;
var currentPage = url[url.length - 1];

for(i; i < lista.length; i++){
  var x = lista[i].href.split("/");
  if(x[x.length-1] == currentPage) {
   lista[i].classList.add('current')

  }
  }