import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pagesize = 7;
  const [progress, setProgress] = useState(0)
  const apikey = process.env.REACT_APP_NEWS_API

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress} />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress}  apikey={apikey} key='general' pagesize={pagesize} country='in' category='general' />}></Route>
          <Route exact path='/business' element={<News setProgress={setProgress}  apikey={apikey} key='business' pagesize={pagesize} country='in' category='business' />}></Route>
          <Route exact path='/entertainment' element={<News setProgress={setProgress}  apikey={apikey} key='entertainment' pagesize={pagesize} country='in' category='entertainment' />}></Route>
          <Route exact path='/health' element={<News setProgress={setProgress}  apikey={apikey} key='health' pagesize={pagesize} country='in' category='health' />}></Route>
          <Route exact path='/science' element={<News setProgress={setProgress}  apikey={apikey} key='science' pagesize={pagesize} country='in' category='science' />}></Route>
          <Route exact path='/sports' element={<News setProgress={setProgress}  apikey={apikey} key='sports' pagesize={pagesize} country='in' category='sports' />}></Route>
          <Route exact path='/technology' element={<News setProgress={setProgress}  apikey={apikey} key='technology' pagesize={pagesize} country='in' category='technology' />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;