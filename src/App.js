import './App.css';
import { Datatable } from './component/datatable';
import { Navbar } from './component/navbar';

function App() {
  const currentScreen = 'screenA';
  return (
   <>
   <div>
    <Navbar />
    <Datatable currentScreen={currentScreen} />
   </div>
   </>
  );
}

export default App;
