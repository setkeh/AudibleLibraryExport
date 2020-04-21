// How to use.
// Log on to Audible.com, and open up your library.
// It can be a good idea to increase the number of items per page
// and the time period you look back.

// Next, you want to run this entire file as a script on the page.
// Chrome, Firefox and Internet Explorer does this differently.
// For chrome, press F12 to open the Chrome Dev Tools, and click
// on the Console. Then paste in this whole file in the console
// window and press enter.

// This Script will likely only work on https://www.audible.com.au and https://www.audible.com

// Where we will store our extracted data
var headerRow = [
$(document.createTextNode('Cover')),
$(document.createTextNode('Title')),
$(document.createTextNode('Author')),
$(document.createTextNode('Narrator')),
$(document.createTextNode('Series')),
$(document.createTextNode('Rating')),
];

var tableArray = [headerRow];

// Let's fill in the tableArray!
jQuery('div[class*="adbl-library-content-row"]').each(function(index){
    var row = $( this );
    var cover = row.find('.bc-link.bc-color-link img');
	var title = $(document.createTextNode(row.find('.bc-list-item:nth-of-type(1)').text()));
    var author = row.find('.bc-list-item.authorLabel a');
    var narrator = row.find('.bc-list-item.narratorLabel a');
    var series = row.find('.bc-list-item.seriesLabel a');
	var rating = $(document.createTextNode(row.find('.bc-rating-stars').attr('data-star-count')));

	var result = [cover, title, author, narrator, series, rating];
	tableArray.push(result);
});

// Function to create a table as a child of el.
// data must be an array of arrays (outer array is rows).
function tableCreate(el, data)
{
    var tbl  = document.createElement("table");
    tbl.style.width  = "70%";
	tbl.border = "1";

    for (var i = 0; i < data.length; ++i)
    {
        var tr = tbl.insertRow();
        for(var j = 0; j < data[i].length; ++j)
        {
            var td = tr.insertCell();
			data[i][j].each(function(){
				$(this).clone().appendTo(td);
			});
        }
    }
    el.appendChild(tbl);
}

tableCreate($('body').empty()[0], tableArray);