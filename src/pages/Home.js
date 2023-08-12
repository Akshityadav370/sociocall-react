import styles from '../styles/home.module.css';
import { Comment, Loader } from '../components';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      // console.log('response', response);

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg"
                alt="user-pic"
              />
              <div>
                <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://www.svgrepo.com/show/1198/like.svg"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://www.svgrepo.com/show/493993/comments.svg"
                  alt="comments-icon"
                />
                <span>2</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} key={`comment-${comment._id}`} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Props Validation,
// prop-types only works in development mode


export default Home;
