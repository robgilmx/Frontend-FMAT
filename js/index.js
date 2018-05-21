window.onload = function(){
	setTodayDate();
	setCalendar();
}

function openCalendar(){
    document.getElementById('calendar-overlay').style.display = 'block';
    document.getElementById('calendar-container').style.display = 'block';
}

function closeCalendar(){
    document.getElementById('calendar-container').style.display = 'none';
	document.getElementById('calendar-overlay').style.display = 'none';
}

function prevMonth(){
	alert('prevMonth');
}

function nextMonth(){
	alert('nextMonth');
}

function setTodayDate(){
	var d = new Date();
	document.getElementById('fechaHoy').innerHTML = setSpanishDate(d);
}

function setSpanishDate(d){
	var monthname=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	var weekday=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
	return d.getDate()+' de '+monthname[d.getMonth()]+' de '+d.getFullYear();
}

function setCalendar(){ 
    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = d.getMonth();   //0-11
    var year = d.getFullYear(); //yyyy
    var first_date = month_name[month] + ' ' + 1 + ' ' + year;
    //e.g. September 1 2014
    
    var first_date_full = new Date(first_date).toDateString();
    //Mon Sep 01 2014 ...
    
    var first_day = first_date_full.substring(0, 3); //Mon
    var day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var day_no = day_name.indexOf(first_day); //Index of day in day_name array
    var monthTotalDays = new Date(year, month+1, 0).getDate(); //Day previous to the first day of the next month
    //Tue Sep 30 2014 ...

    var calendar = getCalendar(day_no, monthTotalDays);
    var monthname=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    document.getElementById('month-and-year').innerHTML = monthname[month]+' '+year;
    document.getElementById('month-days').appendChild(calendar);
}

function getCalendar(day_no, monthTotalDays){
    var table = document.createElement('table');
    table.classList.add('table');
    var tr = document.createElement('tr');

    //row for the letters of the monthTotalDays
    for(var c=0; c<=6; c++){
        var th = document.createElement('th');
        th.innerHTML = 'LMMJVSD'[c];
        tr.appendChild(th);
    }
    table.appendChild(tr);

    //row for the first week of the month
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = '';
        tr.appendChild(td);
    }
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        setTdDate(td, count, 'red');
        count++;

        tr.appendChild(td);
    }
    table.appendChild(tr);

    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > monthTotalDays){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            setTdDate(td, count, 'yellow');

            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function setTdDate(td, day, color){
    var br = document.createElement('br');
    var imgsvg = document.createElement('img');
    if(color=='red'){
        imgsvg.setAttribute('src', 'img/holiday-circle-red.svg');
    }else{
        imgsvg.setAttribute('src', 'img/holiday-circle-yellow.svg');
    }
    var label = document.createElement('label');
    label.innerHTML = day;
    td.appendChild(imgsvg);
    td.appendChild(br);
    td.appendChild(label);
}