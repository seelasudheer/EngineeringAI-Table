import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableData from './TableData'
import JsonData from './jsonData'

import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="container-fluid">
         <Router>
<Switch>
  <Route exact path='/' component={TableData}/>
  <Route    path='/jsonData' component={JsonData}/>

</Switch>

         </Router>
    </div>
  );
}

export default App;
