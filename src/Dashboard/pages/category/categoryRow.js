import {Link} from "react-router-dom";
import React from "react";

const CategoryRow = ({category, id}) => {

    return (
        <>
            <td>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" value=""/>
                </div>
            </td>
            <td>{+1}</td>
            <td className="bold">{category.title}</td>
            <td>{category.description}</td>
            {/*<td>/{category.categoryUrl}</td>*/}
            <td className="text-end">
                <div className="dropdown">
                    <Link to="#" data-bs-toggle="dropdown" class="btn btn-outline-secondary">
                        <i className="fas fa-ellipsis-v"></i>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to="#" className="dropdown-item"> View details</Link>
                        <Link to="#" className="dropdown-item"> Edit info</Link>
                        <Link to="#" className="dropdown-item text-danger"> Delete</Link>
                    </div>
                </div> {/* dropdown ends*/}
            </td>
        </>
    )

}
export default CategoryRow