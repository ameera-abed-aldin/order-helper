import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';  
import React from 'react';
import {Link} from 'react-router';
export default function ProductCard({product}){
  const [isFavorited, setIsFavorited] = React.useState(false);  
 

  const handleFavoriteClick = () => {  
    setIsFavorited((prev) => !prev);  
    // You can also handle other actions here, like sending a request to a server  
  };  
    return(
        <Card  className='card-width border-0 shadow hover' >
        <Button variant="link" onClick={handleFavoriteClick} className='text-end fav-icon'>  
          {isFavorited ? (  
            <AiFillHeart style={{ color: '#4f47ff', fontSize: '2rem' }} />  
          ) : (  
            <AiOutlineHeart style={{ color: '#4f47ff', fontSize: '2rem' }} />  
          )}  
        </Button>  
      <Card.Img variant="top"  style={{ width: '100%', objectFit: 'cover', height: '350px' }} src={`data:image/png;base64,${product.mainImage}`}/>
      <Card.Body>
        <Card.Title className='fs-6'>
          <Link  to={`/products/${product.productId}`} className='link text-dark'>{product.name}</Link>
          </Card.Title>
        <div className='d-flex justify-content-between' style={{alignItems: "baseline"}}>
        <p className='font-price'>
        {product.price}$
        </p>
        <div className='bg-blue text-center text-white p-2 fs-10 card-hover rounded'> +Add To Cart</div>
        </div>   
      </Card.Body>
    </Card>
    )
}