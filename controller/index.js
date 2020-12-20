const axios = require("axios");
const crud = require('./crud');


async function handler_request(req, res) {
  var { slug, url } = req.body;
  if (!slug || !url) {
    return res.status(422).json({ err: 'Please provide both [slug] and [url].' });
  }

  res.json({ err: "Not found" });
}

module.exports = {
  extractor: handler_request,
  create_extractor: crud.create_extractor,
  list_extractors: crud.list_extractors,
  update_extractor: crud.update_extractor,
  delete_extractor: crud.delete_extractor,
  show_extractor: crud.show_extractor
};
