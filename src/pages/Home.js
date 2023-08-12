import styles from '../styles/home.module.css';
import { Comment, Loader, CreatePost, FriendsList } from '../components';
import { useState, useEffect } from 'react';
import { addComment, getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';


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
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg"
                  alt="user-pic"
                />
                <div>
                  <Link
                    state={{
                      user: post.user,
                    }}
                    to={{
                      pathname: `/user/${post.user._id}`,
                    }}
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
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
                  <span>{post.likes.length}</span>
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
      {auth.user && <FriendsList />}
    </div>
  );
};

// Props Validation,
// prop-types only works in development mode

export default Home;
