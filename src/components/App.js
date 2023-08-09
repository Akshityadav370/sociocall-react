import { getPosts } from '../api';
import { useEffect, useState } from 'react';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks';


const Elementfourofour = () => {
  return <h1>404</h1>;
};

function App() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const auth = useAuth();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     console.log('response', response);

  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }

  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home posts={[]} />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="*" element={<Elementfourofour />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
