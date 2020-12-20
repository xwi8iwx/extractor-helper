const api = require('./api');

module.exports = function() {
  
  api.list_pages(1,true,true).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  
  /*
  api.create_page({content: 'hello world', slug: 'xx1'}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  
  api.update_page(117094, { "version": 1, content: 'hello world 2', slug: 'xx1xx' }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  
  api.get_page_by_id(117094).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  
  api.get_page_by_slug('xx1xx').then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  */
}