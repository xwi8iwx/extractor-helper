const path = require('path');
const folder = path.join(__dirname, './extractors');
const fs = require('fs');
const api = require('./api');

module.exports = function(file, id, version = 1) {
  var file_slug = path.basename(file, path.extname(file));
  console.log(file, path.join(folder, file), file_slug);

  return api.update_page(id, { version, slug: file_slug, content: fs.readFileSync(path.join(folder, file)) })
}