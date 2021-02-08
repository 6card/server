const videoModel = require('./model');


module.exports = (app) => {
  app.get(`/videos`, async (req, res) => {
    return res.status(200).send(videoModel.findAll());
  });

  app.get(`/videos/category(/:id)?`, async (req, res) => {
    const { id } = req.params;
    return res.status(200).send(videoModel.findAllByCategoryId(id || null));
  });

  app.get(`/videos/:id`, async (req, res) => {
    const { id } = req.params;
    return res.status(200).send(videoModel.findById(id));
  });

  app.post(`/videos`, async (req, res) => {
    const video = videoModel.add(req.body);

    return res.status(201).send({
      error: false,
      video
    });
  })

  app.put(`/videos`, async (req, res) => {
    const { id, data } = req.body;

    const video = videoModel.update(id, data);

    return res.status(202).send({
      error: false,
      video
    });
  });

  app.delete(`/videos/:id`, async (req, res) => {
    const { id } = req.params;
    videoModel.remove(id);
    return res.status(202).send({
      error: false
    })

  })

}