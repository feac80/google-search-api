How to build a Wikipedia Search App with JavaScript (ES6)
Check this website https://freshman.tech/wikipedia-javascript/

Styling search-bar
https://www.youtube.com/watch?v=rrN3KomhPIw

https://www.youtube.com/watch?v=38rJPEqapoA

handling errors
https://stackoverflow.com/questions/34078809/javascript-xml-http-request-using-the-google-custom-search-element-api

pagination style
https://www.youtube.com/watch?v=D2EvkowvUqA

---

<!-- <script>
        (function() {
          var cx = '006753618627947867668:4fb2xk26yb0';
          var gcse = document.createElement('script');
          gcse.type = 'text/javascript';
          gcse.async = true;
          gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(gcse, s);
        })();
      </script>
      <gcse:search></gcse:search> -->

    <!-- <script>
      //Handler for response from google.
      function hndlr(response) {
        if (response.items == null) {
          //Sometimes there is a strange thing with the results where it says there are 34 results/4 pages, but when you click through to 3 then there is only 30, so page 4 is invalid now.
          //So if we get to the invalid one, send them back a page.
          window.location.replace(
            'searchresults.htm?start=' + (start - 10) + '&q=' + query
          );
          return;
        }
        //Search results load time
        document.getElementById('resInfo-0').innerHTML =
          'About ' +
          response.searchInformation.formattedTotalResults +
          ' results (' +
          response.searchInformation.formattedSearchTime +
          ' seconds)';
        //Clear the div first, CMS is inserting a space for some reason.
        document.getElementById('googleContent').innerHTML = '';
        //Loop through each item in search results
        for (var i = 0; i < response.items.length; i++) {
          var item = response.items[i];
          var content = '';

          content +=
            "<div class='gs-webResult gs-result'>" +
            "<table class='gsc-table-result'><tbody><tr>";
          //Thumbnail image
          if (item.pagemap.cse_thumbnail != null)
            content +=
              "<td class='gsc-table-cell-thumbnail gsc-thumbnail'><div class='gs-image-box gs-web-image-box gs-web-image-box-portrait'><a class='gs-image' href='" +
              item.link +
              "'>" +
              "<img class='gs-image' class = 'gs-image-box gs-web-image-box gs-web-image-box-portrait' src='" +
              item.pagemap.cse_thumbnail[0].src +
              "'></a></td>";
          //Link
          content +=
            "<td><a class='gs-title' href='" +
            item.link +
            "'>" +
            item.htmlTitle +
            '</a><br/>';
          //File format for PDF, etc.
          if (item.fileFormat != null)
            content +=
              "<div class='gs-fileFormat'><span class='gs-fileFormat'>File Format: </span><span class='gs-fileFormatType'>" +
              item.fileFormat +
              '</span></div>';
          //description text and URL text.
          content +=
            item.htmlSnippet.replace('<br>', '') +
            "<br/><div class='gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long' dir='ltr' style='word-break:break-all;'>" +
            item.htmlFormattedUrl +
            '</div>' +
            '<br/></td></tr></tbody></table></div>';
          document.getElementById('googleContent').innerHTML += content;
        }
        //Page Controls
        var totalPages = Math.ceil(
          response.searchInformation.totalResults / 10
        );
        console.log(totalPages);
        var currentPage = Math.floor(start / 10 + 1);
        console.log(currentPage);
        var pageControls =
          "<div class='gsc-results'><div class='gsc-cursor-box gs-bidi-start-align' dir='ltr'><div class='gsc-cursor'>";
        //Page change controls, 10 max.
        for (var x = 1; x <= totalPages && x <= 10; x++) {
          pageControls += "<div class='gsc-cursor-page";
          if (x === currentPage) pageControls += ' gsc-cursor-current-page';
          var pageLinkStart = x * 10 - 9;
          pageControls +=
            "'><a href='search-results.htm?start=" +
            pageLinkStart +
            '&q=' +
            query +
            "'>" +
            x +
            '</a></div>';
        }
        pageControls += '</div></div></div>';
        document.getElementById('googleContent').innerHTML += pageControls;
      }

      //Get search text from query string.
      var query = document.URL.substr(document.URL.indexOf('q=') + 2);
      var start = document.URL.substr(document.URL.indexOf('start=') + 6, 2);
      if (start === '1&' || document.URL.indexOf('start=') === -1) start = 1;

      //Load the script src dynamically to load script with query to call.
      // DOM: Create the script element
      var jsElm = document.createElement('script');
      // set the type attribute
      jsElm.type = 'application/javascript';
      // make the script element load file
      jsElm.src =
        'https://www.googleapis.com/customsearch/v1?key=yourApikeyhere&cx=006753618627947867668:4fb2xk26yb0&start=' +
        start +
        '&q=' +
        query +
        '&callback=hndlr';
      // finally insert the element to the body element in order to load the script
      document.body.appendChild(jsElm);
    </script> -->
