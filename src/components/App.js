import { getPosts } from '../api';
import { useState, useEffect } from 'react';

function App() {
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
