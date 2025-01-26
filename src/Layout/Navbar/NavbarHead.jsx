
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router";
import { FaShoppingCart } from 'react-icons/fa';  
import { Badge } from 'react-bootstrap'; 
export  default function NavbarHead(){
const itemCount=0;

    return(<>
     <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#" className='logo'>EA</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex justify-content-between"
            style={{ maxHeight: '100px',width: '100%' }}
            navbarScroll
          >
            <div className='d-flex'>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">About us</Nav.Link>
            <Nav.Link href="#action2">Catlog</Nav.Link>
            <Nav.Link href="#action2">Sale</Nav.Link>
            </div>
            <div className='d-flex'>
            <Nav.Link href="#action2">
            <div style={{ position: 'relative', cursor: 'pointer' }}>  
            <FaShoppingCart size={20} />  
            { 
            <Badge pill  className='bg-blue' style={{ position: 'absolute', top: '-5px', right: '-10px' }}>  
          {itemCount}  
          </Badge>  
           }  
         </div> 
         </Nav.Link> 
            <Nav.Link href="#" >       
             <Link to="/login" className="link">Login</Link>
            </Nav.Link>
            </div>
          </Nav>
       
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

    </>

    )
}