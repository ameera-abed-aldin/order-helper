import React from 'react';  


const PromotionBanner = () => {  
  return (  
    <div className="container-fluid">  
      <div className="row justify-content-center mt-5">  
        <div className="col-12 col-md-6 text-center" style={{ backgroundColor: 'black', color: 'white',padding:"5rem" }}>  
          <h4 className="blue-color">MAGIC BLACK FRIDAY</h4>  
          <p className='fs-10'>A UNIQUE OPPORTUNITY TO CHOOSE SOMETHING AT SUPER PRICES!</p>  
          <h2 className="font-weight-bold mb-3" style={{ fontSize: '3rem' }}>70%</h2>  
          <a href="#" className="mt-3 link">LOOK AT  ➔</a>  
        </div>  
        <div className="col-12 col-md-6 p-0 img-banner">  
         
        </div>  
      </div>  
    </div>  
  );  
};  

export default PromotionBanner;