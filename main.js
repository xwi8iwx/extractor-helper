// server.js
// where your node app starts

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

module.exports = function() {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  // allow cross-origin requests
  app.use(cors());


  const controller = require("./controller");


  app.use("/favicon.ico", (req, res) => {
    res.redirect(
      "https://cdn.glitch.com/b776f782-b87d-4893-a881-adc01b60bbd1%2Fgift.ico?v=1608121101809"
    );
  });

  app.route("/extractor").post(controller.extractor);
  app.get('/list', controller.list_extractors);
  app.post('/create', controller.create_extractor);
  app.post('/update/:id', controller.update_extractor);
  app.get('/delete/:id', controller.delete_extractor);
  app.get('/show_by_id/:id', controller.show_extractor_by_id);
  app.get('/show_by_slug/:slug', controller.show_extractor_by_slug);

  // https://expressjs.com/en/starter/basic-routing.html
  app.use((request, response) => {
    response.json({ hello: 'world' });
  });

  // listen for requests :)
  const listener = app.listen(process.env.PORT || 8080, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
}
