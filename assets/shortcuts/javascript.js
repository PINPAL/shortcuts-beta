
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
loadConfig()

function loadConfig() {
    //Clear old columns
    for (i=0; i < document.getElementsByClassName("column").length; i++) {
        document.getElementsByClassName("column")[i].innerHTML = "";
    }
    
    //Split up config
    var categories = config.split("#")
    for (i = 1; i < categories.length; i++) {
        section = categories[i].split(";");

        //Create things
        var editButtonWrapper = document.createElement("div")
        editButtonWrapper.className = "editButtonWrapper"
        var editButton = document.createElement("button")
        editButton.className = "editButton";
        editButton.setAttribute("onclick","addShortcut('" + section[0] + "')")
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

//Apply Add Shortcut
function applyAddShortcut() {
    var validURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    document.getElementsByClassName("errorMessageContainer")[0].innerHTML = ""
    var errorMessages = [];
    linkTitle = document.getElementById("linkTitleHolder").value
    linkURL = document.getElementById("linkURLHolder").value
    linkIcon = document.getElementById("linkIconHolder").value
    if (linkTitle == "") {
        errorMessages.push("Error: Link Title must be entered!")
    } 
    if (validURL.test(linkURL) == false) {
        errorMessages.push("Error: Link URL is not a valid URL!")
    }
    for (i=0; i < errorMessages.length; i++) {
        errorMesssageBox = document.createElement("div")
        errorMesssageBox.className = "errorMessageBox"
        document.getElementsByClassName("errorMessageContainer")[0].appendChild(errorMesssageBox)
        document.getElementsByClassName("errorMessageBox")[i].innerText = errorMessages[i]
        window.setTimeout(showErrorMesssges,10);
    }
    if (errorMessages.length == 0) {
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
        var splitConfig = config.split((window.value))
        splitConfig.splice(1,0,window.value)
        splitConfig.splice(2,0,";" + linkTitle + ";" + linkURL + ";" + linkIcon)
        config = ""
        for (i=0; i < splitConfig.length; i++) {
            config = config + splitConfig[i]
        }
        loadConfig()
        console.log(config)
        console.log(splitConfig)
    }
}

//Show Error Messages
function showErrorMesssges() {
    for (i=0; i < document.getElementsByClassName("errorMessageBox").length; i++) {
        document.getElementsByClassName("errorMessageBox")[i].style.fontSize = "13pt"
        document.getElementsByClassName("errorMessageBox")[i].style.opacity= "1"
    }
}

//Add Shortcut Button
function addShortcut(sectionID) {
    window.value = sectionID
    document.getElementsByClassName("popupWrapper")[0].style.display = "inline";
}

//Hide Popup when clicking on background ONLY (prevent propagation of onClick)
document.getElementsByClassName("popupWrapper")[0].addEventListener("click", function( e ){
    e = window.event || e; 
    if(this === e.target) {
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
    }
});