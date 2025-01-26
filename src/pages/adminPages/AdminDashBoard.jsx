import * as React from 'react';  
import { extendTheme, styled } from '@mui/material/styles';  
import DashboardIcon from '@mui/icons-material/Dashboard';  
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  
import BarChartIcon from '@mui/icons-material/BarChart';  
import DescriptionIcon from '@mui/icons-material/Description';  
import LayersIcon from '@mui/icons-material/Layers';  
import { AppProvider } from '@toolpad/core/AppProvider';  
import { DashboardLayout } from '@toolpad/core/DashboardLayout';  
import { PageContainer } from '@toolpad/core/PageContainer';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Grid from '@mui/material/Grid2';  
import LocalMallIcon from '@mui/icons-material/LocalMall';  
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';  
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';  
import AddProduct from '../../component/admin/AddProduct'; // Your AddProduct component  
import ProductList from '../../component/admin/ProductList'; // Your ProductList component  
import LogOut from '../../component/admin/LogOut';
import {useAuth} from "../../component/AuthContext"

const NAVIGATION = [  
  {  
    kind: 'header',  
    title: 'Main items',  
  },  
  {  
    segment: 'dashboard',  
    title: 'Dashboard',  
    icon: <DashboardIcon />,  
  },  
  {  
    segment: 'products',  
    title: 'Products',  
    icon: <LocalMallIcon />,  
    children: [  
      {  
        segment: 'add-product',  
        title: 'Add Product',  
        icon: <AddBoxOutlinedIcon />,  
      },  
      {  
        segment: 'product-list',  
        title: 'Product List',  
        icon: <FormatListBulletedOutlinedIcon />,  
      },  
    ],  
  },  
  {  
    segment: 'variants',  
    title: 'Variants',  
    icon: <LayersIcon />,  
  },  
  {  
    segment: 'orders',  
    title: 'Orders',  
    icon: <ShoppingCartIcon />,  
  },  
  {  
    kind: 'divider',  
  },  
  {  
    kind: 'header',  
    title: 'Analytics',  
  },  
  {  
    segment: 'reports',  
    title: 'Reports',  
    icon: <BarChartIcon />,  
    children: [  
      {  
        segment: 'sales',  
        title: 'Sales',  
        icon: <DescriptionIcon />,  
      },  
      {  
        segment: 'traffic',  
        title: 'Traffic',  
        icon: <DescriptionIcon />,  
      },  
    ],  
  },  
  {  
    segment: 'log-out',  
    title: 'log out',  
    icon: < LogoutOutlinedIcon/>,  
  },  
];  

const demoTheme = extendTheme({  
  colorSchemes: { light: true, dark: true },  
  colorSchemeSelector: 'class',  
  breakpoints: {  
    values: {  
      xs: 0,  
      sm: 600,  
      md: 600,  
      lg: 1200,  
      xl: 1536,  
    },  
  },  
});  

function useDemoRouter(initialPath) {  
  const [pathname, setPathname] = React.useState(initialPath);  

  const router = React.useMemo(() => {  
    return {  
      pathname,  
      searchParams: new URLSearchParams(),  
      navigate: (path) => setPathname(String(path)),  
    };  
  }, [pathname]);  

  return router;  
}  

export default function AdminDashBoard(props) {  
  const {userLoggedDetails} =useAuth();
  const { window } = props;  
  const router = useDemoRouter('/dashboard');  
  const demoWindow = window ? window() : undefined;  

  // Component mapping based on the current path  
  const renderComponent = () => {  
    switch (router.pathname) {  
      case '/dashboard':  
        return <h1>Dashboard</h1>; // Replace with actual dashboard component  
      case '/products/add-product':  
        return <AddProduct />;  
        case '/products/product-list':  
        return <ProductList />;  
        case '/log-out':  
        return <LogOut />;  
      default:  
        return <h1>404 Not Found</h1>; // Fallback for unmatched paths  
    }  
  };  

  return (  
    <AppProvider  
      navigation={NAVIGATION}  
      router={router}  
      theme={demoTheme}  
      window={demoWindow}  
    >  
      <DashboardLayout>  
        <PageContainer>  
          <Grid container spacing={1}>  
            <Grid size={12}>  
              {renderComponent()}  
            
            </Grid>  
          </Grid>  
        </PageContainer>  
      </DashboardLayout>  
    </AppProvider>  
  );  
}