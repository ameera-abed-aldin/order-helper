import React from 'react';  
import Card from 'react-bootstrap/Card';  


const CollectionCard= ({ image,title}) => {  
    return (  
        <Card   style={{backgroundImage:`url(${image})`,backgroundSize:"cover"}} className="my-card custom-heigth">  
           
                
                <Card.Title className='collection-title text-center'>{title}</Card.Title>  
                  
             
        </Card>  
    );  
};  

export default CollectionCard;