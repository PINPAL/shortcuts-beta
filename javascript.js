
function loadFile(filename){
    if (window.XMLHttpRequest)
        {xhttp=new XMLHttpRequest();}
    else // code for IE5 and IE6
        {xhttp=new ActiveXObject("Microsoft.XMLHTTP");}
    xhttp.open("GET",filename,false);
    xhttp.send();
    return xhttp.responseText;
}

var config = loadFile("config.txt").replace(/\r?\n|\r/g,"")

var categories = config.split("#")
for (i = 1; i < categories.length; i++) {
    section = categories[i].split(";");
    console.log(section);
    
    var sectionHeader = document.createElement("h1");
    sectionHeader.innerText = section[0]
    document.getElementsByTagName("body")[0].appendChild(sectionHeader);

    var bigBox = document.createElement("div");
    bigBox.className = "bigBox";

    for (j = 1; j < section.length-1; j+=3) {
        var a = document.createElement('a');
        a.href = section[j + 1];
        
        
        var rowContent = document.createElement("div");
        rowContent.className = "tableRow";        
        rowContent.style.backgroundImage = "url('"+section[j+2]+"')"
        
        var linkTitle = document.createElement("span");
        linkTitle.className = "linkTitle";
        linkTitle.innerText = section[j]
        
        var linkURL = document.createElement("span");
        linkURL.className = "linkURL"
        linkURL.innerText = section[j + 1].replace(/^(https?:|)\/\/www\./, "")
        
        rowContent.appendChild(linkTitle)
        rowContent.appendChild(linkURL)
        
        a.appendChild(rowContent)
        bigBox.appendChild(a);
    }

    bigBox.appendChild(a);
    document.getElementsByTagName("body")[0].appendChild(bigBox);
}
