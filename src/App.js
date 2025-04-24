import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homee from './components/Homee';
import Neft from './components/Neft';
import Select from './components/Select';
import Cards from './compound/Cards';
import AnimatedRoute from './AnimatedRoute';



function App() {

  

  return (
    <div className="App">
      <BrowserRouter basename='/dmt' >
        {/* <Routes>
        <Route path="/DMT" element={  <Homee /> } />
          <Route path="/Cards"  element={ <Cards/> } />
          <Route path="/upi" element={ <Upi/> } />
          <Route path="/neft" element={ <Neft/> } />
          <Route path="/imps" element={ <Imps/> } />
        </Routes> */}
        <AnimatedRoute/>
      </BrowserRouter>
    </div>
  );
}

export default App;
