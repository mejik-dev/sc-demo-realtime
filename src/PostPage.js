import React, { useState } from 'react';
import { gql, useSubscription, useQuery } from '@apollo/client';
import PostForm from './PostForm';

const POST_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      description
      user {
        firstName
      }
    }
  }
`;

const GET_POST = gql`
  query getPosts {
    posts(orderBy: id_DESC) {
      id
      description
      user {
        firstName
      }
    }
  }
`;

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  const { data, error, loading } = useQuery(GET_POST, {
    onCompleted: (data) => {
      setPosts(data.posts);
    },
  });

  const { data: subscriptionData } = useSubscription(POST_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const newPost = data?.subscriptionData?.data?.postAdded;
      setPosts((posts) => [newPost, ...posts]);
    },
  });

  return (
    <div>
      <p>Feed</p>
      <PostForm />
      {posts.map((post) => (
        <div key={post.id}>
          {' '}
          <p>{`${post?.user?.firstName}: ${post?.description}`}</p>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
