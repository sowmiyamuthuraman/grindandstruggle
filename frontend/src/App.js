import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Register from './container/Register/Register';
import Home from './container/Home';


function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/register' exact component={Register} />
    </BrowserRouter>
  );
}

export default App;
