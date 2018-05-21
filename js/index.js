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
    var year = d.getFullYear(); //2014
    var first_date = month_name[month] + ' ' + 1 + ' ' + year;
    //September 1 2014
    var first_date_full = new Date(first_date).toDateString();
    //Mon Sep 01 2014 ...
    var first_day = first_date_full.substring(0, 3);    //Mon
    var day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var day_no = day_name.indexOf(first_day);   //1
    var days = new Date(year, month+1, 0).getDate();    //30
    //Tue Sep 30 2014 ...
    var calendar = getCalendar(day_no, days);
    var monthname=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    document.getElementById('month-and-year').innerHTML = monthname[month]+' '+year;
    document.getElementById('month-days').appendChild(calendar);
}

function getCalendar(day_no, days){
    var table = document.createElement('table');
    table.classList.add('table');
    var tr = document.createElement('tr');
    //row for the day letters
    for(var c=0; c<=6; c++){
        var th = document.createElement('th');
        th.innerHTML = 'LMMJVSD'[c];
        tr.appendChild(th);
    }
    table.appendChild(tr);
    //create 2nd row
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
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
	return table;
}