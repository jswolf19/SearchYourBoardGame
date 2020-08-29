//イベント登録処理
function eventsRegister(){
    $(function($){
        $(".filter_player select").on("change", onFilterChange);
        $(".filter_tag input").on("change", onFilterChange);
    });
}

//Googleスプレッドシートからデータを取得する
function getSpreadData(){
    const MAX_ROW = 10000;
    const START_ROW = 0;
    const store = new SteinStore("https://api.steinhq.com/v1/storages/5f43a0655d3cdc44fcd7d382");
    store.read("test", {limit: MAX_ROW, offset: START_ROW}).then(data => {
        //デバッグ用データ内容表示
        console.log(" - - - - - - - - - - - ");
        console.dir(data);
        //文字列を対象のデータ型に直す
        for(i = 0; i < data.length; i++){
            data[i].player = parseInt(data[i].player,10);
            data[i].time = parseInt(data[i].time,10);
            data[i].tags = String(data[i].tags).split(';');
        }
        //ローカルにデータをJSON形式で保存する
        localStorage.setItem('json', JSON.stringify(data));
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

//フィルターエリアの変更を検知し実行される
function onFilterChange(){
    var filterFncs = [];
    var result = [];
    var allList = JSON.parse(localStorage.getItem('json'));

    //Playerフィルタの追加
    filterFncs.push(
        function(list){
            return filterByPlayer(list, $('.filter_player select').val());
        }
    );
    //Tagフィルタの追加
    filterFncs.push(
        function(list) {
            return filterByTag(list, $('.filter_tag input:checked'));
        }
    );

    //全件リストをフィルタリングした結果を出力
    result = filterFncs.reduce(function(list, fnc){
        return fnc(list);
    }, allList);

    //デバッグ用データ内容表示
    console.log(" - - - - - - - - - - - ");
    console.dir(result); 

    makeTable(result, "table")
}

//Playerフィルタ
function filterByPlayer(list, value){
    if(value == ""){
        return list;
    }

    return list.filter(function(item){
        switch(value){
            case '1':
                return item.player == 1;
            case '2':
                return 1 < item.player;
        }
    });
}
//Tagフィルタ
function filterByTag(list, value){
    if(value.length == 0){
        return list;
    }

    return list.filter(function(item){
        var isMatch = false;
        Array.from(value).forEach(function(chkItem, i) {
            item.tags.forEach(function(tagItem, i) {
                if (tagItem === $(chkItem).val()) {
                    isMatch = true;
                }
            });
        });
        return isMatch;
    });
}

//最初に実行される
eventsRegister();
//読み込み完了時に実行される
window.onload = function(){
    getSpreadData()
};