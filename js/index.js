window.onload = function(){
	setTodayDate();
}

function setTodayDate(){
	var d = new Date();
	document.getElementById('fechaHoy').innerHTML = setSpanishDate(d);
}

function setSpanishDate(d){
	var weekday=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
	var monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	return d.getDate()+" de "+monthname[d.getMonth()]+" de "+d.getFullYear();
}