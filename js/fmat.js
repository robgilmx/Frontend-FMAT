var monthToShow = {month: 0, year: 0};
var currentDegree = "";

window.onload = (function(){
    resetMonthToShow();
    setTodayDate();
    goToTab();
});


function goToTab() {
    var hash = window.location.hash.toString();
    hash = hash.slice(1);
    //add logic to check if degree page
    if (hash.length > 2){
        loadDegree(hash)
    }
}
function setTodayDate(){
    d = new Date();
    document.getElementById('todaysDate').innerHTML = changeDateLanguage(d, 'dmy');
}

function openCalendar(){
    resetMonthToShow();
    setCalendar();

    divCalendarOverlay = document.getElementById('calendar-overlay');
    divCalendarContainer = document.getElementById('calendar-container');

    divCalendarOverlay.style.visibility = 'visible';
    divCalendarContainer.style.visibility = 'visible';

    if(divCalendarOverlay.classList.contains('fade-out-animation')){
        divCalendarOverlay.classList.replace('fade-out-animation', 'fade-in-animation');
    }else{
        divCalendarOverlay.classList.add('fade-in-animation');
    }

    if(divCalendarContainer.classList.contains('fade-out-animation')){
        divCalendarContainer.classList.replace('fade-out-animation', 'fade-in-animation');
    }else{
        divCalendarContainer.classList.add('fade-in-animation');
    }
}

function closeCalendar(){
    btnCloseCalendar = document.getElementById('btnCloseCalendar');
    divCalendarContainer = document.getElementById('calendar-container');
    if(divCalendarContainer.classList.contains('fade-in-animation')){
        divCalendarContainer.classList.replace('fade-in-animation', 'fade-out-animation');
    }
    if(divCalendarOverlay.classList.contains('fade-in-animation')){
        divCalendarOverlay.classList.replace('fade-in-animation', 'fade-out-animation');
    }
}

function prevMonth(){
    changeMonthToShow(-1);
    setCalendar();
}

function nextMonth(){
    changeMonthToShow(+1);
    setCalendar();
}

function resetMonthToShow(){
    var actualDate = new Date();
    if(monthToShow.month != actualDate.getMonth() || monthToShow.year != actualDate.year){
        monthToShow.month = actualDate.getMonth();
        monthToShow.year = actualDate.getFullYear();
    }
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
    document.getElementById('month-and-year').innerHTML = changeDateLanguage(d, 'my');
    var divMonthDays = document.getElementById('month-days');
    if(divMonthDays.firstChild){
        divMonthDays.removeChild(divMonthDays.firstChild);
    }
    divMonthDays.appendChild(calendar);
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
    if(format=='dmy'){
        return d.getDate()+' de '+monthname[d.getMonth()]+' de '+d.getFullYear();
    }else if(format == 'my'){
        return monthname[d.getMonth()] + ' ' + d.getFullYear();
    }else{
        return d.toString();
    }
}

function loadDegree(degree){
    $('.index-container').empty();
    $('.index-container').load(degree+"/objetivos.html", function () {
        loadDegreeHeader(degree);
        setNavbarActive(degree);
        currentDegree = degree;
    });
}

function loadDegreeHeader(degree){
    if (degree !== currentDegree){
        $('.degree-banner-container').empty();
        $('.degree-banner-container').load(degree+"/banner.html");
        $('.degrees-menu').load(degree+"/menu.html");
    }
}

function setNavbarActive(degree) {
    if (degree === null){
        degree = currentDegree;
    }
    var hrefPage = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
    $('a[href="' + hrefPage + '"]').closest(degree).addClass('active');
}

function loadDegreePage(page){
    $('.degree-container').empty();
    $('.degree-container').load(currentDegree+'/'+page+'.html');
}
