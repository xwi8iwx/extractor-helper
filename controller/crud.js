const axios = require("axios");
const api = require('../api');


async function create_extractor(req, res) {
  var data = null;
  try {
    data = await api.create_page(req.body);
  } catch (err) {
    return res.status(500).json(err);
  }
  if (data)
    res.json(data);
  else
    res.json({ err: 'Missing some required fields' });
}

async function list_extractors(req, res) {
  var data = null;
  try {
    data = await api.list_pages(1, true, true, true);
  } catch (err) {
    return res.status(500).json(err);
  }
  if (data)
    res.json(data);
  else
    res.json({ err: 'Missing some required fields' });
}

async function update_extractor(req, res) {
  var data = null;
  try {
    data = await api.update_page(req.params['id'], req.body);
  } catch (err) {
    return res.status(500).json(err);
  }
  if (data)
    res.json(data);
  else
    res.json({ err: 'Missing some required fields' });
}

async function delete_extractor(req, res) {
  var data = null;
  try {
    data = await api.delete_page(req.params['id']);
  } catch (err) {
    return res.status(500).json(err);
  }
  if (data)
    res.json(data);
  else
    res.json({ err: 'Missing some required fields' });
}

async function show_extractor_by_id(req, res) {
  var data = null;
  try {
    data = await api.get_page_by_id(req.params['id']);
  } catch (err) {
    return res.status(500).json(err);
  }
  if (data)
    res.json(data);
  else
    res.json({ err: 'Missing some required fields' });
}

async function show_extractor_by_slug(req, res) {
  var data = null;
  try {
    data = await api.get_page_by_slug(req.params['slug']);
  } catch (err) {
    return res.status(500).json(err);
  }
  if (data)
    res.json(data);
  else
    res.json({ err: 'Missing some required fields' });
}

module.exports = {
  create_extractor,
  list_extractors,
  update_extractor,
  delete_extractor,
  show_extractor_by_id,
  show_extractor_by_slug
};
