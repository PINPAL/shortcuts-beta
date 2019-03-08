
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

var categories = config.split("#Section")
for (i = 1; i < categories.length; i++) {
    section = categories[i].split(";");
    console.log(section);
    
    var sectionHeader = document.createElement("h1");
    sectionHeader.innerText = "Section "+ i;
    document.getElementsByTagName("body")[0].appendChild(sectionHeader);

    var bigBox = document.createElement("div");
    bigBox.className = "bigBox";

    for (j = 1; j < section.length/2; j+=2) {
        var rowContent = document.createElement("div");
        rowContent.className = "tableRow"

        var linkTitle = document.createElement("span");
        linkTitle.className = "linkTitle";
        linkTitle.innerText = section[j]

        var linkURL = document.createElement("span");
        linkURL.className = "linkURL"
        linkURL.innerText = section[j+1];

        rowContent.appendChild(linkTitle)
        rowContent.appendChild(linkURL)

        bigBox.appendChild(rowContent);
    }

    bigBox.appendChild(rowContent);
    document.getElementsByTagName("body")[0].appendChild(bigBox);
}
