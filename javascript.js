var config = "#Section1;Example1 Website;example1.com;Example2 Website;example2.com;Example3 Website;example3.com#Section2;Example4 Website;example4.com"
var lineBreak = document.createElement("br")

var categories = config.split("#")
for (i = 1; i < categories.length; i++) {
    section = categories[i].split(";");

    var sectionHeader = document.createElement("h1");
    sectionHeader.innerText = section[0];
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
        linkURL.innerText = section[j + 1]

        rowContent.appendChild(linkTitle)
        rowContent.appendChild(linkURL)

        bigBox.appendChild(rowContent);
    }

    bigBox.appendChild(rowContent);
    document.getElementsByTagName("body")[0].appendChild(bigBox);
}
