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

getCsvData('https://script.google.com/macros/s/AKfycbx0zpemQ7kHliQX_NLItfD4PhoykuzbOcMWncYfSK0O04GKXv4/exec')