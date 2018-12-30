<!DOCTYPE <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Google Search Project</title>
    <link rel="shorcut icon" type="image/png" href="./img/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      type="text/css"
      media="screen"
      href="./style/main.css"
    />
  </head>
  <body>
    <div class="container">
      <div class="search-header">
        <form id="search" action="" href="">
          <input
            type="text"
            name="search"
            id="search-item"
            placeholder="Search..."
            autocomplete="off"
            maxlength="25"
            required="required"
          /><input type="submit" id="submit" value="Go!" />
        </form>
      </div>
      <section class="results">
        <div id="images" class="search-images"></div>

        <ul id="results" class="search-results"></ul>
      </section>
      <div id="pages" class="pagination">
        <a href="#" class="active">1</a> <a href="#">2</a> <a href="#">3</a>
        <a href="#">4</a> <a href="#">5</a> <a href="#">6</a>
      </div>
    </div>

    <script src="./js/main.js"></script>
  </body>
</html>
