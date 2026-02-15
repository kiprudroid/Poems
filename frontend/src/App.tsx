
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Authors from './pages/Authors/Authors';
import Poems from './pages/Poems/Poems';
import Poem from './pages/Poem/Poem';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/author/:authorName" element={<Poems />} />
          <Route path="/poem/:title" element={<Poem />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
