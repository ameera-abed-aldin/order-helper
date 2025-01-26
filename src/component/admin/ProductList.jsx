import axios from "axios";

const ProductList=()=>{
    const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lMTIzIiwicm9sZSI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNzM3ODA5MTQ3LCJleHAiOjE3Mzg0MTM5NDd9.H5sTCVSn9sLmZRjhupOYnTA3Q1VHsKItJZkM0rbxjhQ"
    axios.get("http://localhost:8080/api/v1/product/get/1",{
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization
          },
    }).then((response)=>{
        console.log(response.data)}).catch(err=>{console.log(err)});
}
export default ProductList;