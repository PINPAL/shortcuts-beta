//Function to load text files
function loadFile(filename){
    if (window.XMLHttpRequest)
        {xhttp=new XMLHttpRequest();}
    else // code for IE5 and IE6
        {xhttp=new ActiveXObject("Microsoft.XMLHTTP");}
    xhttp.open("GET",filename,false);
    xhttp.send();
    return xhttp.responseText;
}

//Load config 
var config = loadFile("config.txt").replace(/\r?\n|\r/g,"")
loadConfig(false)

//Function to render
function loadConfig(showEditMode) {
    //Clear old columns
    for (i=0; i < document.getElementsByClassName("column").length; i++) {
        document.getElementsByClassName("column")[i].innerHTML = "";
    }
    //Split up config
    var categories = config.split("#")
    for (i = 1; i < categories.length; i++) {
        section = categories[i].split(";");
        //Create "Add New Link" button
        var editButtonWrapper = document.createElement("div")
        editButtonWrapper.className = "editButtonWrapper"
        var editButton = document.createElement("button")
        editButton.className = "editButton";
        editButton.setAttribute("onclick","addShortcut('" + section[0] + "')")
        editButton.innerText = "Add New Link";
        editButtonWrapper.appendChild(editButton);
        //Create the section header
        var sectionHeader = document.createElement("h1");
        sectionHeader.innerText = section[0].replace(/\[.\]/,"")
        var columnForSection = section[0]
        columnForSection = columnForSection[columnForSection.search(/\[.\]/)+ 1];
        document.getElementsByClassName("column")[columnForSection].appendChild(sectionHeader);
        //Create the bigbox
        var bigBox = document.createElement("div");
        bigBox.className = "bigBox";
        //Create the links
        for (j = 1; j < section.length-1; j+=3) {
            //Create the href (make row clickable)
            var a = document.createElement('a');
            a.href = section[j + 1];
            //Create the row
            var rowContent = document.createElement("div");
            rowContent.className = "tableRow";        
            rowContent.style.backgroundImage = "url('"+section[j+2]+"')"
            //Create the link title
            var linkTitle = document.createElement("span");
            linkTitle.className = "linkTitle";
            linkTitle.innerText = section[j]
            //Create the link URL
            var linkURL = document.createElement("span");
            linkURL.className = "linkURL"
            linkURL.innerText = section[j + 1].replace(/^(https?:|)\/\/www\./, "")
            //Add link and title into the row
            rowContent.appendChild(linkTitle)
            rowContent.appendChild(linkURL)
            //Add the row into bigbox
            a.appendChild(rowContent)
            bigBox.appendChild(a);
        }
        //Add the bigboxes to the columns
        bigBox.appendChild(a);
        bigBox.appendChild(editButtonWrapper);
        document.getElementsByClassName("column")[columnForSection].appendChild(bigBox);
        
    }
    //Insert Edit Column Buttons
    for (column=0; column < 4; column++) {
        var editButtonWrapper = document.createElement("div")
        editButtonWrapper.className = "editButtonWrapper"
        var addColButton = document.createElement("button")
        addColButton.className = "addColumnButton";
        addColButton.innerText = "Add Category";
        addColButton.setAttribute("onclick","addCategory('" + column + "')")
        editButtonWrapper.appendChild(addColButton);
        document.getElementsByClassName("column")[column].appendChild(editButtonWrapper);
    }
    if (showEditMode) {
        showHideElement("editButton","True")
        showHideElement("addColumnButton","True") 
    }
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

//Apply Changes ("Add New Link")
function applyAddShortcut() {
    //Reset error messages
    document.getElementsByClassName("errorMessageContainer")[0].innerHTML = ""
    var errorMessages = [];
    //Get content of form
    linkTitle = document.getElementById("linkTitleHolder").value
    linkURL = document.getElementById("linkURLHolder").value
    linkIcon = document.getElementById("linkIconHolder").value
    //Title validation
    if (linkTitle == "") {
        errorMessages.push("Error: Link title must not be empty!")
    }
    //URL validation
    var validURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    if (validURL.test(linkURL) == false) {
        errorMessages.push("Error: Link URL is not a valid URL!")
    }
    //Display error messages
    for (i=0; i < errorMessages.length; i++) {
        errorMesssageBox = document.createElement("div")
        errorMesssageBox.className = "errorMessageBox"
        document.getElementsByClassName("errorMessageContainer")[0].appendChild(errorMesssageBox)
        document.getElementsByClassName("errorMessageBox")[i].innerText = errorMessages[i]
        window.setTimeout(showErrorMesssges,10);
    }
    //If no error messages, apply the new link
    if (errorMessages.length == 0) {
        //Hide popup
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
        document.getElementById("addShortcut").style.display = "none";
        //Split up config and add new sections
        var splitConfig = config.split((window.value))
        splitConfig.splice(1,0,window.value)
        splitConfig.splice(2,0,";" + linkTitle + ";" + linkURL + ";" + linkIcon)
        //Merge split config back into one
        config = ""
        for (i=0; i < splitConfig.length; i++) {
            config = config + splitConfig[i]
        }
        //Display new config
        loadConfig(true)
    }
}

//Apply Changes ("Add Category")
function applyAddCategory() {
    //Reset Error Messages
    document.getElementsByClassName("errorMessageContainer")[1].innerHTML = ""
    var errorMessages = [];
    //Get content of form
    var categoryName = document.getElementById("categoryName").value
    //Category name validation
    if (categoryName == "") {
        errorMessages.push("Error: Category name must not be empty!")
    }
    //Display error messages
    for (i=0; i < errorMessages.length; i++) {
        errorMesssageBox = document.createElement("div")
        errorMesssageBox.className = "errorMessageBox"
        document.getElementsByClassName("errorMessageContainer")[1].appendChild(errorMesssageBox)
        document.getElementsByClassName("errorMessageBox")[i].innerText = errorMessages[i]
        window.setTimeout(showErrorMesssges,10);
    }
    //If no error messages, apply the new link
    if (errorMessages.length == 0) {
        //Hide popup
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
        document.getElementById("addCategory").style.display = "none";
        //Split up config and add new sections
        var splitConfig = [config]
        splitConfig.splice(2,0,"#" + categoryName + "[" + window.value + "];Example Site;https://pinpal.github.io;https://pinpal.github.io/assets/pinpal.png");
        //Merge split config back into one
        config = ""
        for (i=0; i < splitConfig.length; i++) {
            config = config + splitConfig[i]
        }
        console.log(config)
        console.log(splitConfig)
        //Display new config
        loadConfig(true)
    }
}

//Function to display error messages
function showErrorMesssges() {
    for (i=0; i < document.getElementsByClassName("errorMessageBox").length; i++) {
        document.getElementsByClassName("errorMessageBox")[i].style.fontSize = "13pt"
        document.getElementsByClassName("errorMessageBox")[i].style.opacity= "1"
    }
}

//"Add New Link" Button
function addShortcut(sectionID) {
    window.value = sectionID
    document.getElementsByClassName("popupWrapper")[0].style.display = "inline";
    document.getElementById("addShortcut").style.display = "inline";
}

//"Add Category" Button
function addCategory(columnNumber) {
    window.value = columnNumber
    document.getElementsByClassName("popupWrapper")[0].style.display = "inline";
    document.getElementById("addCategory").style.display = "inline";
}

//Hide popup when clicking on background ONLY (prevent propagation of onClick)
document.getElementsByClassName("popupWrapper")[0].addEventListener("click", function( e ){
    e = window.event || e; 
    if(this === e.target) {
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
        document.getElementById("addCategory").style.display = "none";
        document.getElementById("addShortcut").style.display = "none";
    }
});