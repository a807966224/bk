function search() {
var data = [

{
"title" : "主题预览",
"time" : "2015/01/01",
"categories":"jekyll",
"url" : "/posts/2015/01/01/%E4%B8%BB%E9%A2%98%E9%A2%84%E8%A7%88.html"
}


]
    var text_input = document.getElementById("text-input");
    var searchlist = document.getElementById("searchlist");
    var beforeinput = "";
    
    function addnode(json) {
        var li = document.createElement('li');
        var node = "<time>" + json.time + "&nbsp;</time>";
        node += "<a href='" + json.url + "'>" + json.title + "</a>";
        var arr = json.categories.split("@");
        for (var j = 0; j < arr.length; j++) {
            node += "<span>&nbsp;<a href='/pages/categories.html#" + arr[j] + "'>" + arr[j] + "</a></span>";
        }
        li.innerHTML = node;
        searchlist.appendChild(li);
    }

    function inputchange() {
        var currentinput = text_input.value;

        //输入有变化，重新检索
        if (beforeinput != currentinput.trim()) {
            beforeinput = currentinput.trim();
            if (beforeinput != "") {
                searchlist.innerHTML = "";
                var dataarray = data;
                for (i = 0; i < dataarray.length; i++) {
                    var keywords = beforeinput.split(" ");
                    for (var j = 0; j < keywords.length; j++) {
                        if (dataarray[i].time.match(keywords[j])) {
                            addnode(dataarray[i]);
                            break;
                        }
                        if (dataarray[i].title.toLocaleUpperCase().match(keywords[j].toLocaleUpperCase())) {
                            addnode(dataarray[i]);
                            break;
                        }
                        if (dataarray[i].categories.toLocaleUpperCase().match(keywords[j].toLocaleUpperCase())) {
                            addnode(dataarray[i]);
                            break;
                        }
                    }
                }
            } else {
                searchlist.innerHTML = "";
            }
        }
    }

    /*绑定事件*/
    if (window.attachEvent) {
        text_input.attachEvent("oninput", inputchange);
    } else if (window.addEventListener) {
        text_input.addEventListener("input", inputchange, false);
    }
}

/*绑定事件*/
if (window.attachEvent) {
    window.attachEvent("onload", search);
} else if (window.addEventListener) {
    window.addEventListener("load", search, false);
}