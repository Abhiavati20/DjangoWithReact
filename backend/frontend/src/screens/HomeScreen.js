import React, { useEffect,  } from 'react'
import Products from '../compnonents/Products';
import './HomeScreen.css'
import { makeStyles } from '@material-ui/core/styles';
// import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../compnonents/Loader';
import Message from '../compnonents/Message'
const useStyles = makeStyles({
    root: {
        marginLeft:0,
        marginRight:0,
        display:'flex',
        flexWrap:'wrap',
        boxSizing:'border-box',
        boxShadow:'rgba(0,0,0,0.5)',
    },
  });
function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state=>state.productList)
    const { error , loading, products} = productList
    useEffect(()=>{
        dispatch(listProducts())

    },[dispatch])
    return (
        <div className="homeScreen">
            <h1>Latest Products</h1>
            {
                loading ? <Loader/> : error ? <Message msg={error}/> :null
            }
            <div className={useStyles().root}>
            {
                products.map(product=>(
                    <Products key={product._id} product={product}/>
                ))
            }
            </div>
        </div>
    )
}

export default HomeScreen
