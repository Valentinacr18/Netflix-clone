import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails'; 
import MyList from './pages/MyList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <Navbar onSearch={(text) => setSearchTerm(text)} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/my-list" element={<MyList />} />
      </Routes>
    </Router>
  );
}

export default App;

