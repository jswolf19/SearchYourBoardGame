function getSpreadData(){
    const MAX_ROW = 10000;
    const START_ROW = 0;
    const store = new SteinStore("https://api.steinhq.com/v1/storages/5f43a0655d3cdc44fcd7d382");
      store.read("test", {limit: MAX_ROW, offset: START_ROW}).then(data => {
          //デバッグ用データ内容表示↓↓↓↓↓↓↓↓↓↓
          console.dir(data);
          console.log(" - - - - - - - - - - - ");
          for(let i = 0; i < data.length; i++){
                const element = data[i];
                console.log("name:"+element.text);
          }
          //デバッグ用データ内容表示↑↑↑↑↑↑↑↑↑↑
      });
      return data
}

function makeTable(data, tableId){
    var rows=[];
    var table = document.createElement("table");
    for(rowNo = 0; rowNo < data.length; rowNo++){
        rows.push(table.insertRow(-1)); //行追加
        for(columnNo = 0; columnNo < data[0].length; columnNo++){
            cell = rows[rowNo].insertCell(-1); //列追加
            cell.appendChild(document.createTextNode(data[rowNo][columnNo])); //データ追加
            //背景色の設定
            if(rowNo == 0){
                cell.style.backgroundColor = "#bbb"; //ヘッダ行
            }else{
                cell.style.backgroundColor = "#ddd"; //データ行
            }
        }
    }
    //指定したdiv要素に表を加える
    document.getElementById(tableId).appendChild(table);
}

window.onload = function(){
    var data = getSpreadData()
    makeTable(data, "table")
};
