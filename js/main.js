'use strict';
var API_KEY = 'Replace the API_KEY here';
var cx = 'Replace the cx here';

var form = document.querySelector('#search');

//in case the image is not loaded it s replaced by a 'not available image'
function imgError(image) {
  try {
    image.onerror = '';
    image.src = '../img/no-image-available.jpg';
    throw new Error('Image not available');
  } catch (e) {
    // console.log(e);
  }
  return true;
}

//This function displays the search results in their respective containers
function updatePage(newData) {
  //clear the search results containers
  document.getElementById('results').innerHTML = '';
  document.getElementById('images').innerHTML = '';

  var response = JSON.parse(newData);
  //iterating over the response object
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    if (item.pagemap != undefined && item.pagemap.cse_image != undefined) {
      var src = item.pagemap.cse_image[0].src;
      //make visible the results ul box
      document.getElementById('results').style.visibility = 'visible';
      document.getElementById('results').innerHTML +=
        '<li> <a href=' +
        item.link +
        ' target=' +
        "'_blank'" +
        '>' +
        item.htmlTitle +
        ' </a></li>';
      document.getElementById('pages').style.visibility = 'visible';
      document.getElementById('images').innerHTML +=
        '<a href=' +
        item.link +
        ' target=' +
        "'_blank'" +
        '><img ' +
        "class='images'" +
        "onerror='imgError(this)'" +
        'src=' +
        src +
        ' /></a>';
    }
  }
}
//creating the url with all the required parameters
function buildUrl(startIndex) {
  var startValue = startIndex + (startIndex - 1) * 9;

  var searchTerm = document.getElementById('search-item').value;
  var searchQuery = searchTerm.trim();
  var url =
    'https://www.googleapis.com/customsearch/v1?key=' +
    API_KEY +
    '&q=' +
    searchQuery +
    '&cx=' +
    cx +
    '&num=10' +
    '&start=' +
    startValue;
  return url;
}
//sending http request
function sendRequest(startIndex) {
  var Http = new XMLHttpRequest();
  var url = buildUrl(startIndex);
  Http.open('GET', url, true);

  Http.send();
  Http.onreadystatechange = function(e) {
    if (Http.readyState == 4 && Http.status == 200) {
      updatePage(Http.responseText);
    }
    try {
      // catching errors for status response 403, 400 , etc
      // and redirecting the user to error page.
      if (Http.readyState == 4 && Http.status !== 200) {
        console.log(Http.status);

        throw new Error(Http.status);
      }
    } catch (e) {
      console.log(e);
      window.location.href = 'http://127.0.0.1:5500/error.html';
    }
  };
}
//hlanding the submit event into the form
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var currentPage = 1;
  sendRequest(currentPage);
});
//toggling the active class to the page container
document.getElementById('pages').onclick = function(e) {
  var activePage = document.getElementsByClassName('active');
  activePage[0].classList.toggle('active');
  // console.log(element);
  e.srcElement.classList.toggle('active');
  sendRequest(Number(e.srcElement.textContent));
};
