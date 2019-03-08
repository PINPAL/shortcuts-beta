var config = "#Section1;Example1 Website;https://www.example1.com;Example2 Website;https://www.example2.com;Example3 Website;https://www.example3.com#Section2;Example4 Website;https://www.example4.com"

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

    var sectionHeader = document.createElement("h1");
    sectionHeader.innerText = section[0];
    document.getElementsByTagName("body")[0].appendChild(sectionHeader);

    var bigBox = document.createElement("div");
    bigBox.className = "bigBox";

    for (j = 1; j < section.length/2; j++) {
        var rowContent = document.createElement("div");
        rowContent.className = "tableRow"

        var linkTitle = document.createElement("span");
        linkTitle.className = "linkTitle";
        linkTitle.innerText = section[j]

        var linkURL = document.createElement("span");
        linkURL.className = "linkURL"
        linkURL.innerText = section[j + 1]

        rowContent.appendChild(linkTitle)
        rowContent.appendChild(linkURL)

        bigBox.appendChild(rowContent);
    }

    bigBox.appendChild(rowContent);
    document.getElementsByTagName("body")[0].appendChild(bigBox);
}
