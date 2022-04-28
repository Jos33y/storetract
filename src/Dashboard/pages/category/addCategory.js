import {Button, Form} from "react-bootstrap";
import React from "react";

const AddCategory = () => {

    return (
        <>
            <Form>
                <div className="mb-4">
                    <label htmlFor="category_name" className="form-label"> Category Name</label>
                    <input type="text" placeholder="Type here" className="form-control" id="category_name"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="category_slug" className="form-label"> Category Slug</label>
                    <input type="text" placeholder="Type here" className="form-control" id="category_slug"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="category_description" className="form-label"> Category Description</label>
                    <textarea placeholder="Type here" rows={4} className="form-control" id="category_desc"></textarea>
                </div>

                <div className="d-grid">
                    <Button className="btn btn-md btn-primary">Create category</Button>
                </div>
            </Form>
        </>
    )

}

export default AddCategory