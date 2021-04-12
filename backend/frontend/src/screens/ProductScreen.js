import React, { useEffect,  } from 'react'
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import products from '../Product';
import './ProductScreen.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {  IconButton } from '@material-ui/core';
// import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails,createProductReview } from '../actions/productActions'
// import { productDetailsReducer } from '../reducers/productReducer';
import Loader from '../compnonents/Loader';
import Message from '../compnonents/Message'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from "react-router-dom";
// import { PRODUCT_CREATE_REVIEW_RESET  } from '../constants/productConstants'
import { Row, Col, ListGroup, Button , Form } from 'react-bootstrap'
const useStyles = makeStyles({
    root: {
        cursor:'pointer',
        marginTop:'2%',
        marginLeft:'5%',
        marginRight:'25%',
        marginBottom:'2%',
        width: '80%',
        display:'flex',

    },
    media: {
        height: '100%',
    },
});
const usestyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
function ProductScreen() {
    const dispatch = useDispatch()
    // console.log(this.props.location.key)
    const { id } =useParams();
    
    const productDetails =useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
    
    const productReviewCreate =useSelector(state => state.productReviewCreate)
    const {loading:loadingProductReview ,error:errorProductReview,success:successProductReview} = productReviewCreate
    
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    useEffect(()=>{
        dispatch(listProductDetails(id))
    },[dispatch,id])
    
    const classes = usestyles();
    const [qty, setQty] = React.useState(1);
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id, 
            {
                rating,
                comment
            }
        ))
    }
    const handleChange = (event) => {
        setQty(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const history = useHistory();

    return (
        <div className="productScreen">
            {
                loading ? <Loader/> : error ? <Message msg={error}/> :<Link to='/' className="btn btn-light" style={{textDecoration:'none',color:'black',fontSize:'1.2rem',paddingLeft:'4%'}}><IconButton><ArrowBackIosIcon style={{fontSize:'1rem'}}/></IconButton>  Go Back</Link>
            }
           
           <Card className={useStyles().root}>
            <CardActionArea>
                <CardMedia
                    className={useStyles().media}
                    image={product.src}
                    title={product.name}
                    />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                </Typography>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                    Benefits : {product.benefits}
                </Typography>
                
                <Typography style={{marginTop:'4%'}} variant="body2" component="p">
                    Ratings :  {product.rating}&#11088;  {product.numReviews} Reviews
                </Typography>
                
                <Typography style={{marginTop:'4%'}} component="h1">
                   Price : RS {product.price}
                </Typography>
                <Typography style={{marginTop:'4%'}} component="h4">
                   Status : {product.countInStock>0 ?` Product Available !`:`Out of Stock !`} 
                </Typography>
                {
                    product.countInStock> 0 ? 
                        <div>
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Quantity</InputLabel>
                                <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={qty}
                                onChange={handleChange}
                                >
                                <MenuItem value={qty}>
                                    <em>{qty}</em>
                                </MenuItem>
                                {
                                    [...Array(product.countInStock).keys()].map((x)=>{
                                        return(
                                            <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                                        )
                                    })
                                }
                                </Select>
                            </FormControl>
                        </div>
                    :null
                }
                <Button style={{padding:'10px 20px',marginTop:'2%',marginBottom:'2%',}} variant="contained" onClick={() => history.push(`/cart/${product._id}?qty=${qty}`)} disabled={product.countInStock===0?true:false} >Add To Cart</Button>
            </CardContent>
            
            </Card>
            <Row>
                <Col md={6}>
                    <h4>Reviews</h4>
                        {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <br/>
                                        <strong>{review.rating}&nbsp;&#11088;</strong>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                <h4>Write a review</h4>
                                {loadingProductReview && <Loader />}
                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='5'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        disabled={loadingProductReview}
                                        type='submit'
                                        variant='primary'
                                    >
                                        Submit
                                    </Button>

                                </Form>
                            ) : (
                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                )}
                            </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
