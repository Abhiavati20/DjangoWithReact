import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compnonents/Loader'
import Message from '../compnonents/Message'
import FormContainer from '../compnonents/FormContainer'
import { listProductDetails,updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'
function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [benefits, setBenefits] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading,setUploading ] = useState(false)
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails
    
    const productUpdate = useSelector(state => state.productUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate

    
    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productList')
        }
        else{
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.src)
                setBenefits(product.benefits)
                setCountInStock(product.countInStock)
            }
        }

    }, [dispatch,product, productId, history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, name, price, image,benefits,countInStock }))
    }
    const  uploadFileHandler =  async (e)=>{
        const file =e.target.files[0]
        const formData= new FormData()
        formData.append('image',file)
        formData.append('product_id',productId)
        setUploading(true)
        try{
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'

                }
            }
            const {data}=await axios.post('/api/products/upload/',formData,config)
            setImage(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }
    } 
    return (
        <div>
            <Link to='/admin/productList'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>Benefits</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter benefits'
                                    value={benefits}
                                    onChange={(e) => setBenefits(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductEditScreen
