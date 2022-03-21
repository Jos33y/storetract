
import '../styles.css'


const CategoryBox = ({category}) => {
    return (
        <>
                <div className="Category-box">
                    <h5>{category.title}</h5>
                    <p>
                        {category.description}
                    </p>
                </div>
        </>
    )

}
export default CategoryBox
