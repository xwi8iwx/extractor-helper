const axios = require('axios');
// var qs = require('qs');
var project = process.env.PROJECT;
var api_name = 'taiga';

const crypto = require('./helpers/crypto');

const instance = axios.create({
  baseURL: 'https://api.taiga.io/api/v1',
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${process.env.TOKEN}`,
    'Accept': 'application/json'
  }
});

function list_pages(page = 1, get_all = false, remove_html = false, remove_content = false) {
  if (!page || page < 1)
    page = 1;

  return new Promise(async (resolve, reject) => {
    try {
      var options = {
        params: { project, page }
      };

      if (get_all)
        options['headers'] = { 'x-disable-pagination': 'True' };

      var x = await instance.get('/wiki', options);
      var lst = x.data || [];
      if (lst && lst.length > 0) {
        lst.map((wiki) => {
          if (remove_html)
            wiki.html = '';
          if (remove_content)
            wiki.content = '';
          else if (wiki.content)
            wiki.content = crypto.decrypt(wiki.content);
        });
      }
      resolve(lst);
    } catch (err) {
      reject(err);
    }
  });
}

function create_page(data) {
  if (!data)
    throw new Error('Please provide wiki data for create.');
  if (!data.slug)
    throw new Error('Please provide slug for wiki.');
  if (!data.content)
    throw new Error('Please provide content for wiki.');
  data.project = project;
  data.content = crypto.encrypt(data.content);
  return new Promise(async (resolve, reject) => {
    try {
      var x = await instance.post('/wiki', data);
      resolve(x.data);
    } catch (err) {
      reject(err);
    }
  });
}

function get_page_by_id(page_id) {
  if (!page_id)
    throw new Error('Please provide wiki id.');

  return new Promise(async (resolve, reject) => {
    try {
      var x = await instance.get(`/wiki/${page_id}`);
      var wiki = x.data;
      if (wiki && wiki.content)
        wiki.content = crypto.decrypt(wiki.content);
      resolve(x.data);
    } catch (err) {
      reject(err);
    }
  });
}

function get_page_by_slug(page_slug) {
  if (!page_slug)
    throw new Error('Please provide wiki slug.');

  return new Promise(async (resolve, reject) => {
    try {
      var x = await instance.get(`/wiki/by_slug`, { params: { project, slug: page_slug } });
      var wiki = x.data;
      if (wiki && wiki.content)
        wiki.content = crypto.decrypt(wiki.content);
      resolve(wiki);
    } catch (err) {
      reject(err);
    }
  });
}

function update_page(page_id, data) {
  if (!page_id)
    throw new Error('Please provide wiki id for update.');
  if (!data)
    throw new Error('Please provide wiki data for update.');
  if (!data.slug)
    throw new Error('Please provide slug for wiki.');
  if (!data.content)
    throw new Error('Please provide content for wiki.');
  data.project = project;
  data.content = crypto.encrypt(data.content);

  return new Promise(async (resolve, reject) => {
    try {
      var x = await instance.patch(`/wiki/${page_id}`, data);
      resolve(x.data);
    } catch (err) {
      reject(err);
    }
  });
}

function delete_page(page_id) {
  if (!page_id)
    throw new Error('Please provide wiki id for delete.');

  return new Promise(async (resolve, reject) => {
    try {
      var x = await instance.delete(`/wiki/${page_id}`);
      resolve(x.data);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  list_pages,
  create_page,
  get_page_by_id,
  get_page_by_slug,
  update_page,
  delete_page
}
