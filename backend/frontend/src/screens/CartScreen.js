import './CartScreen.css'
import React, { useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart, removeFromCart} from '../actions/cartActions'
import Message from '../compnonents/Message'
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
function CartScreen({match, location}) {
    const productId = match.params.id
    const history = useHistory();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
     useEffect(()=>{
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id));
    }
    return (
        <div className='cartScreen'>
            {
                cartItems.length===0?(
                    <Message msg="YOUR CART IS EMPTY"/>
                ):(
                    
                            cartItems.map(item => (
                               <Card className="root">
                                    <CardActionArea>
                                        <CardMedia
                                            className='media'
                                            image={item.src}
                                            title={item.name}
                                        />
                                    </CardActionArea>
                                    <CardContent className='content'>
                                        <Link to={`/product/${item.product}`}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.name}
                                            </Typography>
                                        </Link>
                                        <Typography style={{marginTop:'4%'}} component="h3">
                                            RS {item.price}
                                        </Typography>
                                        {
                                            item.countInStock> 0 ? 
                                                    <FormControl style={{marginTop:'4%',}} className="form">
                                                        <InputLabel id="demo-controlled-open-select-label">Quantity</InputLabel>
                                                        <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        key={item.product}
                                                        open={open}
                                                        onClose={handleClose}
                                                        onOpen={handleOpen}
                                                        value={item.qty}
                                                        onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}
                                                        >
                                                            {/* <MenuItem value={item.qty}>
                                                                <em>{item.qty}</em>
                                                            </MenuItem> */}
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x)=>{
                                                                return(
                                                                    <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                        </Select>
                                                    </FormControl>
                                            :null
                                        }
                                        
                                    </CardContent>
                                    <CardActions>
                                        <IconButton>
                                            <DeleteIcon 
                                                style={{color:'black',paddingRight:'4%'}}
                                                onClick={()=>removeFromCartHandler(item.product)}
                                            />
                                        </IconButton>
                                    </CardActions>
                               </Card>
                            ))
                )
            }
            <Card className='card2'>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                        Total Items in cart :- {cartItems.reduce((acc,item)=>acc+item.qty,0)}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        Rs {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        className='card2__button'
                        style={{fontWeight:'800',padding:'10px 20px',marginTop:'2%',marginBottom:'2%',}} 
                        variant="contained" onClick={() => history.push('/login?redirect=shipping')} 
                        disabled={cartItems.length===0?true:false} 
                        >Proceed To Checkout
                    </Button>
                </CardActions>
            </Card>
        </div>  
    )
}

export default CartScreen
