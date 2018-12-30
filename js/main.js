(function() {
  'use strict';
  var API_KEY = 'AIzaSyBuPZIwjqgs4a0oBqyg_ZzAZAkqxKrGpt4';
  var cx = '006753618627947867668:4fb2xk26yb0';

  var respond = {
    error: {}
  };
  var form = document.querySelector('#search');

  //in case the image is not loaded

  function imgError(image) {
    try {
      image.onerror = '';
      // console.log('Image error:' + image.src);
      image.src = '../img/no-image-available.jpg';
      throw new Error('Image not available');
    } catch (e) {
      // console.log(e);
    }
    return true;
  }

  //This function displays the search result in their respective containers
  function updatePage(newData) {
    document.getElementById('results').innerHTML = '';
    document.getElementById('images').innerHTML = '';

    var response = JSON.parse(newData);

    for (var i = 0; i < response.items.length; i++) {
      // in production code, item.htmlTitle should have the HTML entities escaped.'&q=' + encodeURIComponent(searchTerm);
      var item = response.items[i];
      if (item.pagemap != undefined && item.pagemap.cse_image != undefined) {
        var src = item.pagemap.cse_image[0].src;
        // var url = (response.items[i].
        document.getElementById('results').innerHTML +=
          '<li> <a href=' +
          item.link +
          ' target=' +
          "'_blank'" +
          '>' +
          item.htmlTitle +
          ' </a></li>';

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

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var currentPage = 1;
    sendRequest(currentPage);
    document.getElementById('pages').style.visibility = 'visible';
  });
  document.getElementById('pages').onclick = function(e) {
    var activePage = document.getElementsByClassName('active');
    activePage[0].classList.toggle('active');
    // console.log(element);
    e.srcElement.classList.toggle('active');
    sendRequest(Number(e.srcElement.textContent));
  };
})();
// function imgError(image) {
//   try {
//     image.onerror = '';
//     // console.log('Image error:' + image.src);
//     image.src = '../img/no-image-available.jpg';
//     throw new Error('Image not available');
//   } catch (e) {
//     // console.log(e);
//   }
//   return true;
// }
