const outputElement = document.getElementById('output_csv');

function getCsvData(dataUrl) {
    const request = new XMLHttpRequest();
/*
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            //outputElement.innerHTML = request.responseText
            document.getElementById("display").innerHTML = request.responseText;
        }
    };
    request.open('GET', dataUrl, true);
    request.send(null);
*/

    request.addEventListener('load', (event) => {
        const response = event.target.responseText;
        outputElement.innerHTML = response;
    });
    request.open('GET', dataUrl, true);
    request.send(null);

}

getCsvData('https://docs.google.com/spreadsheets/d/e/2PACX-1vT1PU7m8bNHsSdLkTssjuG8l8s0wUGSGsEXHqP5kuylHZM7O2eKSJcd8Lu1q2T9JzEzTBHuvjeUgAlt/pub?gid=747156868&single=true&output=csv')