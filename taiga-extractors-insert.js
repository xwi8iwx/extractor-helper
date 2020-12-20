const path = require('path');
const folder = path.join(__dirname, './extractors');
const fs = require('fs');
const api = require('./api');

module.exports = function() {
  return new Promise(async (resolve, reject) => {
    console.log('folder', folder);
    if (fs.existsSync(folder)) {
      fs.readdir(folder, async (err, files) => {
        arr_promises = [];

        files.forEach(file => {
          var file_slug = path.basename(file, path.extname(file));
          console.log(file, path.join(folder, file), file_slug);

          arr_promises.push(
            new Promise((res, rej) => {
              api.create_page({ slug: file_slug, content: fs.readFileSync(path.join(folder, file)) }).then(wiki => res(wiki)).catch(ex => res(null))
            })
          );
        });

        Promise.all(arr_promises).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    }
  });
}