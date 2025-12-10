import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductLists from '../Utils/ProductLists';

const Product = () => {
  const state = useContext(GlobalState);
  // console.log(state)
  const [products] = state.productAPI.products
  // const [isAdmin]=state.userAPI.isAdmin;
 

  return (
    <div className='products'>{
      products.map((product) => {
        return <ProductLists key={product._id} product={product} />
      })
    }

    </div>
  )
}

export default Product
