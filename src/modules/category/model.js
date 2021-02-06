const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ categories: [] })
  .write()

module.exports.findAll = () => {
    return db.get('categories').value();
}

module.exports.findById = (id) => {
    return db.get('categories')
        .find({ id })
        .value();
}

module.exports.findAllByParentId = (parentId) => {
    return db.get('categories')
        .filter({ parentId })
        .sortBy('sortOrder')
        .value();
}

module.exports.add = (data) => {
    const category = {
        id: shortid.generate(),
        name: data.name || '',
        description: data.description || '',
        parentId: data.parentId || '',
        sortOrder: data.sortOrder || 0,
    }
    const categories = db
      .get('categories')
      .push(category)
      .write();

    return db.get('categories')
      .find({ id: category.id })
      .value();
}

module.exports.update = (id, data) => {
    let categories = db.get('categories')
        .find({ id })
        .assign(data)
        .write();

    return db.get('categories')
      .find({ id })
      .value();
}

module.exports.remove = (id) => {
    return db.get('categories')
        .remove({ id })
        .write();
}