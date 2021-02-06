const categoryModel = require('./model');

/*
category = {
    id: string,
    name: string,
    description:string,
    parentId: string,
    sortOrder: number,
}
*/


module.exports = (app) => {

    app.get(`/categories/new`, async (req, res) => {
        const data = {
            id: shortid.generate(),
            name: 'Tutorials2',
            description: 'Tutorials2',
            parentId: 'tYBkXlI8f',
            sortOrder: 2,
        };

        const categories = db
            .get('categories')
            .push(data)
            .write();

        const category = db.get('categories')
            .find({ id: data.id })
            .value();

        return res.status(201).send({
            error: false,
            code: 201,
            message: '',
            data: category
        });
    });

  app.get(`/categories`, async (req, res) => {
    return res.status(200).send(categoryModel.findAll());
  });

  app.get(`/categories/parent(/:id)?`, async (req, res) => {
    const { id } = req.params;
    return res.status(200).send(categoryModel.findAllByParentId(id || null));
  });

  app.get(`/categories/:id`, async (req, res) => {
    const { id } = req.params;
    return res.status(200).send(categoryModel.findById(id));
  });

  
  

  app.post(`/categories`, async (req, res) => {
    const category = categoryModel.add(req.body);

    return res.status(201).send({
      error: false,
      category
    });
  })

  app.put(`/categories`, async (req, res) => {
    const { id } = req.body;

    const category = categoryModel.update(id, req.body);

    return res.status(202).send({
      error: false,
      category
    });
  });

  app.delete(`/categories/:id`, async (req, res) => {
    const { id } = req.params;
    categoryModel.remove(id);
    return res.status(202).send({
      error: false
    })

  })

}