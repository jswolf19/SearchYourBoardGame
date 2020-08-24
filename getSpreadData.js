function getSpreadData(){
    const MAX_ROW = 10000;
    const START_ROW = 0;
    const store = new SteinStore("https://api.steinhq.com/v1/storages/5f43a0655d3cdc44fcd7d382");
    store.read("test", {limit: MAX_ROW, offset: START_ROW}).then(data => {
        //デバッグ用データ内容表示↓↓↓↓↓↓↓↓↓↓
        console.log(" - - - - - - - - - - - ");
        console.dir(data);
        console.log(" - - - - - - - - - - - ");
        //デバッグ用データ内容表示↑↑↑↑↑↑↑↑↑↑
        makeTable(data, "table")
    });
}

function makeTable(data, tableId){
    var rows=[];
    var table = document.createElement("table");

    //ヘッダ行
    var keys = Object.keys(data[0]);
    rows.push(table.insertRow(-1)); //行追加
    keys.forEach(element => {
        cell = rows[0].insertCell(-1); //列追加
        cell.appendChild(document.createTextNode(element)); //データ追加
        cell.style.backgroundColor = "#bbb"; //背景色の設定
    });

    //データ行
    for(rowNo = 0; rowNo < data.length; rowNo++){
        rows.push(table.insertRow(-1)); //行追加
        var row = data[rowNo]
        keys.forEach(element => {
            cell = rows[rowNo+1].insertCell(-1); //列追加
            cell.appendChild(document.createTextNode(row[element])); //データ追加
            cell.style.backgroundColor = "#ddd"; //背景色の設定
        });
    }

    //指定したdiv要素に表を加える
    document.getElementById(tableId).appendChild(table);
}

window.onload = function(){
    getSpreadData()
};
