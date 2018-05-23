var monthToShow = {month: 0, year: 0};

window.onload = function(){
	setTodayDate();
	setCalendar();
}

function setTodayDate(){
    var d = new Date();
    monthToShow.month = d.getMonth();
    monthToShow.year = d.getFullYear();
    document.getElementById('todaysDate').innerHTML = changeDateLanguage(d, 'dmy');
}

function openCalendar(){
    document.getElementById('calendar-overlay').style.display = 'block';
    document.getElementById('calendar-container').style.display = 'block';
}

function closeCalendar(){
    document.getElementById('calendar-container').style.display = 'none';
	document.getElementById('calendar-overlay').style.display = 'none';
    resetMonthToShow();
    setCalendar();
    //setCalendar('actual');
}

function prevMonth(){
	// alert('prevMonth');
    changeMonthToShow(-1);
    setCalendar();
}

function nextMonth(){
	// alert('nextMonth');
    changeMonthToShow(+1);
    setCalendar();
}

function resetMonthToShow(){
    var actualDate = new Date();
    monthToShow.month = actualDate.getMonth();
    monthToShow.year = actualDate.getFullYear();
}

function setCalendar(){
    var d = new Date(monthToShow.year, monthToShow.month);
    var month = d.getMonth();   //0-11
    var year = d.getFullYear(); //yyyy

    var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var first_date = monthName[month] + ' ' + 1 + ' ' + year;
    //e.g. September 1 2014
    
    var first_date_full = new Date(first_date).toDateString();
    //Mon Sep 01 2014 ...
    
    var first_day = first_date_full.substring(0, 3); //Mon
    var day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var day_no = day_name.indexOf(first_day); //Index of day in day_name array
    var monthTotalDays = new Date(year, month+1, 0).getDate(); //Day previous to the first day of the next month
    //Tue Sep 30 2014 ...

    var calendar = getCalendar(day_no, monthTotalDays);
    // var monthname=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    document.getElementById('month-and-year').innerHTML = changeDateLanguage(d, 'my');
    var divMonthDays = document.getElementById('month-days');
    if(divMonthDays.firstChild){
        divMonthDays.removeChild(divMonthDays.firstChild);
    }
    divMonthDays.appendChild(calendar);
    // monthToShow = month;
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

function changeMonthToShow(monthsToAdd){
    actualMonth = monthToShow.month;
    actualYear = monthToShow.year;
    if(actualMonth > 0 && actualMonth < 11){
        monthToShow.month += monthsToAdd;
    }else if(actualMonth == 0 && monthsToAdd < 0){
        monthToShow.month = 11;
        monthToShow.year -= 1;
    }else if(actualMonth == 11 && monthsToAdd > 0){
        monthToShow.month = 0;
        monthToShow.year += 1;
    }else{
        monthToShow.month += monthsToAdd;
    }
    console.log(monthToShow.month + ' ' + monthToShow.year);
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

function changeDateLanguage(d, format){
    var monthname=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    // var weekday=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    if(format=='dmy'){
        return d.getDate()+' de '+monthname[d.getMonth()]+' de '+d.getFullYear();
    }else if(format == 'my'){
        return monthname[d.getMonth()] + ' ' + d.getFullYear();
    }else{
        return d.toString();
    }
}