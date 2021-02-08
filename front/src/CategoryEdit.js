import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useFormField from './hooks/form-field';
import categoryService from './services/category.service';

export default function CategoryEdit() {
    const { id } = useParams();
    const nameField = useFormField();
    const descriptionField = useFormField();
    const parentField = useFormField();
    const sortField = useFormField()

    const [ category, setCategory ] = useState(null);
    const [ categories, setCategories ] = useState(null);

    useEffect(() => {
        getCategory();
        getCategories();
    }, [id]);

    const getCategory = async () => {
        let res = await categoryService.getById(id);
        setCategory(res);
        nameField.setValue(res.name);
        descriptionField.setValue(res.description);
        parentField.setValue(res.parentId);
        sortField.setValue(res.sortOrder);
    }

    const getCategories = async () => {
        let res = await categoryService.getAll();
        setCategories(res);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      categoryService.update(id, {
          name: nameField.value, 
          description: descriptionField.value,
          parentId: parentField.value,
          sortOrder: sortField.value
        });
    };
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' {...nameField} />
        </div>
        <div>
          <label htmlFor='description'>description</label>
          <textarea id='description' {...descriptionField} />
        </div>
        <div>
          <label htmlFor='sort'>SortOrder</label>
          <input type='text' id='sort' {...sortField} />
        </div>
        <div>
          <label htmlFor='parent'>parent category</label>
          <select id='parent' {...parentField}>
            <option  value=''>ParentCategory</option>
            {(categories && categories.length > 0) && (
                categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
            )}
          </select>
        </div>
        <button type="submit">Go!</button>
      </form>
    );
  }