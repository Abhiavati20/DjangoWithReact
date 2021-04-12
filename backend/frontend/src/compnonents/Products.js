import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
// import TypeWriter from 'react-typewriter'
const useStyles = makeStyles({
    root: {
        cursor:'pointer',
        marginTop:'2%',
        marginBottom:'2%',
        marginLeft:'3%',
        width: 365,
        borderRadius:'5%',
        minWidth:200,
    },
    media: {
      height: 250,
    },
});
function Products({id,product}) {
    const history = useHistory();
    return (
        <Card onClick={() => history.push(`/products/${product._id}`)} key={id} className={useStyles().root}>
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
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.benefits}
                </Typography>
                <br/>
                <Typography style={{marginLeft:'4%'}}variant="body2" component="p">
                    {product.rating}&#11088;   {product.numReviews} Reviews
                </Typography>
                <Typography style={{margin:'4%'}}variant="h5" component="h1">
                    RS {product.price}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Products
