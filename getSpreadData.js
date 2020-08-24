const outputElement = document.getElementById('output_spread');

function getSpreadData(){
    const store = new SteinStore("https://api.steinhq.com/v1/storages/5f43a0655d3cdc44fcd7d382");
      store.read("test", { limit: 100, offset: 0 }).then(data => {
          console.dir(data);
          console.log(" - - - - - - - - - - - ");
          for (let i = 0; i < data.length; i++) {
                const element = data[i];
                console.log("title:"+element.text);
          }
      });
}

getSpreadData()

/*
function getCsvData(dataUrl) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            //outputElement.innerHTML = request.responseText
            document.getElementById("display").innerHTML = request.responseText;
        }
    };
    request.open('GET', dataUrl, true);
    request.send(null);


    request.addEventListener('load', (event) => {
        const response = event.target.responseText;
        outputElement.innerHTML = response;
    });
    request.open('GET', dataUrl, true);
    request.send(null);

}

getCsvData('https://script.google.com/macros/s/AKfycbx0zpemQ7kHliQX_NLItfD4PhoykuzbOcMWncYfSK0O04GKXv4/exec')
*/