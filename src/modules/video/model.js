const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ videos: [] })
  .write()

module.exports.findAll = () => {
    return db.get('videos').value();
}

module.exports.findById = (id) => {
    return db.get('videos')
        .find({ id })
        .value();
}

module.exports.findAllByCategoryId = (categoryId) => {
    return db.get('videos')
        .filter({ categoryId })
        .sortBy('sortOrder')
        .value();
}

module.exports.add = (data) => {
    const video = {
        id: shortid.generate(),
        name: data.name || '',
        categoryId: data.parentId || '',
        sortOrder: data.sortOrder || 0,
    }
    const videos = db
      .get('videos')
      .push(video)
      .write();

    return db.get('videos')
      .find({ id: video.id })
      .value();
}

module.exports.update = (id, data) => {
    let videos = db.get('videos')
        .find({ id })
        .assign(data)
        .write();

    return db.get('videos')
      .find({ id })
      .value();
}

module.exports.remove = (id) => {
    return db.get('videos')
        .remove({ id })
        .write();
}