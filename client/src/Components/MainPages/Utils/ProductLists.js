import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

const ProductLists = ({ product }) => {

    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    return (

        <div className="product-card">
            {isAdmin ?
                <><Link id='' to='' > <img src={product.image?.url} alt='' width='100%' /></Link></>
                : <><Link id='' to={`/detail/${product._id}`} > <img src={product.image?.url} alt='' width="100" /></Link></>}
            <div className='product_box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>₹ {product.price}</span>
                <p>{product.description}</p>
            </div>
            <div className='row_btn'>
                {
                    isAdmin ? <>
                        <Link id='btn_buy' to={`/delete/${product._id}`} >Delete</Link>
                        <Link id='btn_view' to={`/edit/${product._id}`} >Edit</Link>
                    </> : <></>
                }
            </div>
        </div >

    );
};

export default ProductLists;
