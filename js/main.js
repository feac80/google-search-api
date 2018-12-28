const API_KEY = 'AIzaSyBuPZIwjqgs4a0oBqyg_ZzAZAkqxKrGpt4';
const cx = '006753618627947867668:4fb2xk26yb0';

var form = document.querySelector('#search');
// const API_KEY = 'AIzaSyBkwfJrKfdiDH46XaDLQelzGe84md52GXU';
// document.querySelector("iframe").addEventListener("load", function() {

//   this.style.backgroundColor = "red";
//   alert(this.nodeName);

// });
//This function displays the search result in their continers
function displayImage(response) {
  document.getElementById('results').innerHTML = '';
  document.getElementById('images').innerHTML = '';

  for (var i = 0; i < response.items.length; i++) {
    // in production code, item.htmlTitle should have the HTML entities escaped.'&q=' + encodeURIComponent(searchTerm);
    var item = response.items[i];
    if (item.pagemap != undefined && item.pagemap.cse_image != undefined) {
      var src = item.pagemap.cse_image[0].src;
      // var url = (response.items[i].
      document.getElementById('results').innerHTML +=
        "<li> <a href='" + src + "'>" + item.htmlTitle + ' </a></li>';

      document.getElementById('images').innerHTML +=
        '<a href=' +
        item.link +
        ' target=' +
        "'_blank'" +
        '><img ' +
        "class='images'" +
        'src=' +
        src +
        ' /></a>';
    }
  }
}
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var searchTerm = document.getElementById('search-item').value;
  var searchQuery = searchTerm.trim();

  console.log(searchQuery);

  const Http = new XMLHttpRequest();
  const url =
    'https://www.googleapis.com/customsearch/v1?key=' +
    API_KEY +
    '&q=' +
    searchQuery +
    '&cx=' +
    cx +
    '&num=10';

  Http.open('GET', url, true);
  Http.send();

  Http.onreadystatechange = e => {
    // console.log('readyState:' + this.readyState);
    // console.log('status:' + this.status);
    // console.log(e);
    // console.log(Http.responseText);
    console.log(Http.readyState);
    if (Http.readyState == 4 && Http.status == 200) {
      //console.log(Http.responseText);
      console.log(JSON.parse(Http.responseText));
      displayImage(JSON.parse(Http.responseText));
    }
  };
});
