//Load config 
loadConfig(false)
//Function to render
function loadConfig(showeditMode) {
    //Load config from cookie
    config = document.cookie
    //Clear old columns
    for (i = 0; i < document.getElementsByClassName("column").length; i++) {
        document.getElementsByClassName("column")[i].innerHTML = "";
    }
    //Split up config into categories
    var categories = config.split("#")
    for (i = 1; i < categories.length; i++) {
        //Split up category into title, links and header
        section = categories[i].split("•");
        //Create category header (contains title/delete button etc)
        var categoryHeader = document.createElement("div")
        categoryHeader.className = "categoryHeader"
        categoryHeader.id = section[0].replace(/\[.\]/, "")
        //Create the category name title
        var categoryName = document.createElement("input");
        categoryName.value = section[0].replace(/\[.\]/, "")
        categoryName.className = "categoryName"
        categoryName.type = "text"
        categoryName.readOnly = true
        var columnForSection = section[0]
        columnForSection = columnForSection[columnForSection.search(/\[.\]/) + 1];
        //Create the "Delete Category" button
        var deleteCategoryButton = document.createElement("div")
        deleteCategoryButton.className = "deleteCategoryButton"
        deleteCategoryButton.setAttribute("onClick","deleteCategory(this)")
        //Create right move category buttons
        var moveCategoryRightButton = document.createElement("div")
        moveCategoryRightButton.className = "moveCategoryButton"
        moveCategoryRightButton.id = "rightButton"
        moveCategoryRightButton.setAttribute("onClick","shiftCategory(this,1)")
        if (columnForSection < 3) {
            categoryHeader.append(moveCategoryRightButton)
        }
        //Create left move category buttons
        var moveCategoryLeftButton = document.createElement("div")
        moveCategoryLeftButton.className = "moveCategoryButton"
        moveCategoryLeftButton.id = "leftButton"
        moveCategoryLeftButton.setAttribute("onClick","shiftCategory(this,-1)")
        if (columnForSection > 0) {
            categoryHeader.append(moveCategoryLeftButton)
        }
        if (columnForSection == 3 || columnForSection == 0) {
            categoryHeader.className = "categoryHeaderEdge"
        }
        //Add category header to column
        categoryHeader.append(categoryName, deleteCategoryButton)
        document.getElementsByClassName("column")[columnForSection].appendChild(categoryHeader)
        //Create the bigbox
        var bigBox = document.createElement("div");
        bigBox.className = "bigBox";
        //Create the links
        for (j = 1; j < section.length - 1; j += 3) {
            //Create the href (make row clickable)
            var a = document.createElement('a');
            a.href = section[j + 1];
            //Create the row
            var rowContent = document.createElement("div");
            rowContent.className = "tableRow";
            rowContent.style.backgroundImage = "url('" + section[j + 2] + "')"
            //Create the link title
            var linkTitle = document.createElement("span");
            linkTitle.className = "linkTitle";
            linkTitle.innerText = section[j]
            //Create the link URL
            var linkURL = document.createElement("span");
            linkURL.className = "linkURL"
            linkURL.innerText = section[j + 1].replace(/(.*?:\/\/)|(www\.)/g, "")
            //Add link and title into the row
            rowContent.appendChild(linkTitle)
            rowContent.appendChild(linkURL)
            //Add the row into bigbox
            a.appendChild(rowContent)
            bigBox.appendChild(a);
        }
        //Add the row to the bigbox
        if (section.length > 1) {
            bigBox.appendChild(a);
        }
        //Create "Add New Link" button
        var editButtonWrapper = document.createElement("div")
        editButtonWrapper.className = "editButtonWrapper"
        var editButton = document.createElement("button")
        editButton.className = "editButton";
        editButton.setAttribute("onclick", "addShortcut('" + section[0] + "')")
        editButton.innerText = "Add New Link";
        editButtonWrapper.appendChild(editButton);
        bigBox.appendChild(editButtonWrapper);
        //Append the section to the column
        document.getElementsByClassName("column")[columnForSection].appendChild(bigBox);

    }
    //Insert Edit Column Buttons
    for (column = 0; column < 4; column++) {
        var editButtonWrapper = document.createElement("div")
        editButtonWrapper.className = "editButtonWrapper"
        var addColButton = document.createElement("button")
        addColButton.className = "addColumnButton";
        addColButton.innerText = "Add Category";
        addColButton.setAttribute("onclick", "addCategory('" + column + "')")
        editButtonWrapper.appendChild(addColButton);
        document.getElementsByClassName("column")[column].appendChild(editButtonWrapper);
    }
    //Shows edit buttons again if specified by parameter (needed for Applying Changes)
    if (showeditMode) {
        editMode(true)
    }
}

//Delete Category Button
function deleteCategory(categoryLocation) {
    //Split up config into categories
    var categories = config.split("#")
    //Remove blank category
    categories.splice(0,1)
    for (i = 0; i < categories.length; i++) {
        //Split up category into title, links and header
        section = categories[i].split("•");
        //Find and delete section
        if (section[0].replace(/\[.\]/, "") == categoryLocation.parentNode.id) {
            categories.splice(i,1)
        }
    }
    //Combine categories and put it back into config
    config = ""
    for (i = 0; i < categories.length; i++) {
        config = config + "•#" + categories[i]
    }
    document.cookie = config
    loadConfig(true)
}

//Move Category Buttons
function shiftCategory(categoryLocation,shift) {
    //Split up config into categories
    var categories = config.split("#")
    //Remove blank category
    categories.splice(0,1)
    for (i = 0; i < categories.length; i++) {
        //Split up category into title, links and header
        section = categories[i].split("•");
        //Find section
        if (section[0].replace(/\[.\]/, "") == categoryLocation.parentNode.id) {
            //Calculate new column
            var newColumn = parseFloat(section[0].substr(-2, 1)) + shift;
            console.log(newColumn)
            //Replace column number
            section[0] = section[0].replace(/\[.\]/, "[" + newColumn + "]")
                //Combine section and put back into categories
                categories[i] = ""
                for (j = 0; j < section.length - 1; j++) {
                    categories[i] = categories[i] + section[j] + "•"
                }
        }
    }
    //Combine categories and put it back into config
    config = ""
    for (i = 0; i < categories.length; i++) {
        config = config + "#" + categories[i]
    }
    document.cookie = config
    loadConfig(true)
}

//Enable/Disable Edit Mode
function editMode(override) { //Enable edit mode
    if (document.getElementById("editModeButton").innerText == "Edit Page" || override) {
        //Load edit mode stylesheet
        var link = document.createElement('link');
        link.rel = 'stylesheet'
        link.type = 'text/css';
        link.href = 'assets/shortcuts/editMode.css';
        document.getElementsByTagName('head')[0].appendChild(link);
        //Set category names to editable (NOT read-only)
        for (i = 0; i < document.getElementsByClassName("categoryName").length; i++) {
            document.getElementsByClassName("categoryName")[i].readOnly = false
        }
        //Set text of navbar settings button
        document.getElementById("editModeButton").innerHTML = 'Save Changes'
    } else { //Disable edit mode
        //Reset error messages
        document.getElementsByClassName("largeErrorMessageContainer")[0].innerHTML = ""
        var errorMessages = [];
        //Validate changed names of categories are not blank
        for (i = 0; i < document.getElementsByClassName("categoryName").length; i++) {
            if (isNameInvalid(document.getElementsByClassName("categoryName")[i].value)[0]) {
                errorMessages.push("Error: Category name must not be empty!")
            }
            //Remove hashtags and bullet points from name
            document.getElementsByClassName("categoryName")[i].value =  isNameInvalid(document.getElementsByClassName("categoryName")[i].value)[1]
        }
        //Split up config into categories
        var categories = config.split("#")
        for (i = 0; i < document.getElementsByClassName("categoryName").length; i++) {
            for (j = 0; j < categories.length; j++) {
                //Split up category into title, links and header
                section = categories[j].split("•");
            }
        }
        //Validate changed names of categories are not already in use
        if (sameName(valueExtract())==false) {
            errorMessages.push("Error: Category name must not already be in use!")
        }
        //Display error messages
        for (i = 0; i < errorMessages.length; i++) {
            errorMesssageBox = document.createElement("div")
            errorMesssageBox.className = "errorMessageBox"
            document.getElementsByClassName("largeErrorMessageContainer")[0].appendChild(errorMesssageBox)
            document.getElementsByClassName("errorMessageBox")[i].innerText = errorMessages[i]
            window.setTimeout(showErrorMesssges, 10);
        }
        //If no error messages, save changes        
        if (errorMessages == 0) {
            //Disable edit mode stylesheet
            for (i = 0; i < document.styleSheets.length; i++) {                
                if (document.styleSheets[i].href == window.location + 'assets/shortcuts/editMode.css') {
                    document.styleSheets[i].disabled = true;
                }
            }
            //Set category names to read only
            for (i = 0; i < document.getElementsByClassName("categoryName").length; i++) {
                document.getElementsByClassName("categoryName")[i].readOnly = true
            }
            //Set text of navbar settings button
            document.getElementById("editModeButton").innerHTML = 'Edit Page'
        }
        document.cookie = config
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
    if (isNameInvalid(linkTitle)[0]) {
        errorMessages.push("Error: Link Title must not be empty!")
    }
    //Remove hashtags and bullet points from name
    linkTitle = isNameInvalid(linkTitle)[1]
    //URL validation
    var validURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    if (validURL.test(linkURL) == false) {
        errorMessages.push("Error: Link URL is not a valid URL!")
    }
    //Generic icon application
    if (linkIcon == "") {
        linkIcon = "assets/shortcuts/genericIcon.png"
    }
    //Remove hashtags and bullet points from URL and Icon
    linkURL = isNameInvalid(linkURL)[1]
    linkIcon = isNameInvalid(linkIcon)[1]
    //Display error messages
    for (i = 0; i < errorMessages.length; i++) {
        errorMesssageBox = document.createElement("div")
        errorMesssageBox.className = "errorMessageBox"
        document.getElementsByClassName("errorMessageContainer")[0].appendChild(errorMesssageBox)
        document.getElementsByClassName("errorMessageBox")[i].innerText = errorMessages[i]
        window.setTimeout(showErrorMesssges, 10);
    }
    //If no error messages, apply the new link
    if (errorMessages.length == 0) {
        //Hide popup
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
        document.getElementById("addShortcut").style.display = "none";
        //Split up config and add new sections
        var splitConfig = config.split((window.value))
        splitConfig.splice(1, 0, window.value)
        splitConfig.splice(2, 0, "•" + linkTitle + "•" + linkURL + "•" + linkIcon)
        //Merge split config back into one
        config = ""
        for (i = 0; i < splitConfig.length; i++) {
            config = config + splitConfig[i]
        }
        //Display new config
        document.cookie = config
        loadConfig(true)
    }
}

//Function to validate names (works for both links/categories)
function isNameInvalid(name) {
    //Replace hashtags and semi-colons in name
    name = name.replace(/#|•/g,"")
    //Validate name is not blank
    if (name == "") {
        return [true, name]
    } else {
        return [false, name]
    }
}

//Apply Changes ("Add Category")
function applyAddCategory() {
    //Reset Error Messages
    document.getElementsByClassName("errorMessageContainer")[1].innerHTML = ""
    var errorMessages = [];
    //Get content of form
    var categoryName = document.getElementById("categoryName").value
    //Validate category name
    if (isNameInvalid(categoryName)[0]) {
        errorMessages.push("Error: Category name must not be empty!")
    }
    //Remove hashtags and semi-colons from name
    categoryName = isNameInvalid(categoryName)[1]
    //Split up config into categories
    var categories = config.split("#")
    for (j=0; j < categories.length; j++) {
        //Split up category into title, links and header
        section = categories[j].split("•");
        //Validate name of new category is not already in use
        if (categoryName == section[0].replace(/\[.\]/,"")) {
            errorMessages.push("Error: Category name must not already be in use!")
        }
    }
    //Display error messages
    for (i = 0; i < errorMessages.length; i++) {
        errorMesssageBox = document.createElement("div")
        errorMesssageBox.className = "errorMessageBox"
        document.getElementsByClassName("errorMessageContainer")[1].appendChild(errorMesssageBox)
        document.getElementsByClassName("errorMessageBox")[i].innerText = errorMessages[i]
        window.setTimeout(showErrorMesssges, 10);
    }
    //If no error messages, apply the new link
    if (errorMessages.length == 0) {
        //Hide popup
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
        document.getElementById("addCategory").style.display = "none";
        //Split up config and add new sections
        var splitConfig = [config]
        splitConfig.splice(2, 0, "#" + categoryName + "[" + window.value + "]");
        //Merge split config back into one
        config = ""
        for (i = 0; i < splitConfig.length; i++) {
            config = config + splitConfig[i]
        }
        //Display new config
        document.cookie = config
        loadConfig(true)
    }
}

//Function to check that names are not in use
function sameName(values) {
    //gets array of all unique values
    distinctValues = [...new Set(values)]
    //If they are equal then all values must be equal
    if (values.length == distinctValues.length) {
        return true;
    }
    else{return false;}
}

//Function to extract values of categories (for use in validation)
function valueExtract(){
    //Difines array of input tag values
    var allDemvalues =[];
    //loops through and gets actual value of the h1's
    for (var i = 0; i < document.getElementsByClassName("categoryName").length; i++){
        allDemvalues.push(document.getElementsByClassName("categoryName")[i].value)
    }
    return allDemvalues;
}

//Function to display error messages
function showErrorMesssges() {
    for (i = 0; i < document.getElementsByClassName("errorMessageBox").length; i++) {
        document.getElementsByClassName("errorMessageBox")[i].style.fontSize = "13pt"
        document.getElementsByClassName("errorMessageBox")[i].style.opacity = "1"
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
document.getElementsByClassName("popupWrapper")[0].addEventListener("click", function (e) {
    e = window.event || e;
    if (this === e.target) {
        document.getElementsByClassName("popupWrapper")[0].style.display = "none";
        document.getElementById("addCategory").style.display = "none";
        document.getElementById("addShortcut").style.display = "none";
    }
});