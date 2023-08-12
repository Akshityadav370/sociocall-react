import styles from '../styles/home.module.css';
import { Comment, Loader, CreatePost, FriendsList } from '../components';
import { useState, useEffect } from 'react';
import { addComment, getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import Post from '../components/Post';


const Home = () => {

  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost/>
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`}/>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

// Props Validation,
// prop-types only works in development mode

export default Home;
