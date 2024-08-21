import { Box } from '@mui/material';
import './App.css';
import { Datatable } from './component/datatable';
import { Navbar } from './component/navbar';
import {Footercomponent} from './component/Footer';

function App() {
  const currentScreen = 'screenA';
  return (
   <>
   <div>
    <Navbar />
    <Box  sx={{
            paddingTop: '30px',     
            paddingRight: '20px',   
            paddingLeft: '20px',    
            paddingBottom: '10px',  
            // border: '2px solid black', 
            borderRadius: '4px',   
          }}> 
      <Datatable currentScreen={currentScreen} />  
    </Box>
    <Footercomponent />
   </div>
   </>
  );
}

export default App;
