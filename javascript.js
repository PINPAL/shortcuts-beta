
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

    var editButtonWrapper = document.createElement("div")
    editButtonWrapper.className = "editButtonWrapper"
    var editButton = document.createElement("button")
    editButton.className = "editButton";
    editButton.innerText = "Add New Link";
    editButtonWrapper.appendChild(editButton);
    
    var sectionHeader = document.createElement("h1");
    sectionHeader.innerText = section[0].replace(/\[.\]/,"")
    var columnForSection = section[0]
    columnForSection = columnForSection[columnForSection.search(/\[.\]/)+ 1];
    document.getElementsByClassName("column")[columnForSection].appendChild(sectionHeader);

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
    bigBox.appendChild(editButtonWrapper);
    document.getElementsByClassName("column")[columnForSection].appendChild(bigBox);
}

function editMode() {
    if (document.getElementById("editModeButton").innerText == "Edit Page") {
        var editButtons = document.getElementsByClassName("editButton")
        for(i=0; i < editButtons.length; i++) {
         editButtons[i].style.display = "inline";
       }
       document.getElementById("editModeButton").innerHTML = 'Save Changes'
    } else {
        document.getElementById("editModeButton").innerHTML = 'Edit Page'
        var editButtons = document.getElementsByClassName("editButton")
        for(i=0; i < editButtons.length; i++) {
         editButtons[i].style.display = "none";
       }
    }
}