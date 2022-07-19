import * as React from "react";

import { gql, useQuery, useMutation } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts(orderBy: createdAt_DESC) {
      id
      description
      createdBy {
        email
      }
    }
  }
`;
const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`;
const ON_POST_ADDED = gql`
  subscription OnPostAdded {
    postAdded {
      id
      description
      createdBy {
        email
      }
    }
  }
`;

export const usePost = () => {
  const { data, error, loading, subscribeToMore } = useQuery(GET_POSTS);

  const [description, setDescription] = React.useState("");

  const [createPost] = useMutation(CREATE_POST);

  React.useEffect(() => {
    subscribeToMore({
      document: ON_POST_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newPostItem = subscriptionData.data.postAdded;

        return Object.assign({}, prev, {
          posts: [newPostItem, ...prev.posts],
        });
      },
    });
  }, [subscribeToMore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPost({
        variables: {
          input: { description },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const posts = data?.posts ?? [];

  return { error, loading, posts, handleSubmit, setDescription };
};
