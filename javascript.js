
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
    editButton.setAttribute("onclick","addShortcut('" + section[0].replace(/\[.\]/,"") + "')")
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

//Edit Column Buttons
for (i=0; i < 4; i++) {
    var editButtonWrapper = document.createElement("div")
    editButtonWrapper.className = "editButtonWrapper"
    var addColButton = document.createElement("button")
    addColButton.className = "addColumnButton";
    addColButton.innerText = "Add Category";
    editButtonWrapper.appendChild(addColButton);
    document.getElementsByClassName("column")[i].appendChild(editButtonWrapper);
}


//Function to hide/show all elements of a class
function showHideElement(className,showHide) {
    var elements = document.getElementsByClassName(className);
    if (showHide == "True") {
        for (i=0; i < elements.length; i++) {
         elements[i].style.display = "inline";
       }
    } else {
        for (i=0; i < elements.length; i++) {
        elements[i].style.display = "none";
        }
    }
}

//Enable/Disable Edit Mode
function editMode() {
    if (document.getElementById("editModeButton").innerText == "Edit Page") {
        showHideElement("editButton","True")
        showHideElement("addColumnButton","True")
       document.getElementById("editModeButton").innerHTML = 'Save Changes'
    } else {
        showHideElement("editButton","False")
        showHideElement("addColumnButton","False")
        document.getElementById("editModeButton").innerHTML = 'Edit Page'
    }
}

//Add Shortcut Button
function addShortcut(sectionID) {
    document.getElementsByClassName("popupWrapper")[0].style.display = "inline";
}

//Hide Popup 
function hidePopup() {
    document.getElementsByClassName("popupWrapper")[0].style.display = "none";
}

//Centering Popup Window
document.getElementsByClassName("popupWrapper")[0].style.paddingTop = window.innerWidth/2 - 700 + "px"