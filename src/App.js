import './App.css';

import Home from './components/Home';
import FlashCards from './components/FlashCards';
import Game from './components/Game';

import {createStore} from 'redux'
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';

const store = createStore(reducer)


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/flashcards" element={<FlashCards />}/>
            <Route path="/game" element={<Game />}/>
          </Routes>
        </Navbar>
      </Router>
    </Provider>
  );
}

export default App;
