import React from 'react';
import { gql, useMutation } from '@apollo/client';

const ADDPOST_QUERY = gql`
  mutation addPost($input: CreatePostInput!) {
    createPost(input: $input) {
      description
      user {
        id
      }
    }
  }
`;

const PostForm = () => {
  const [description, setDescription] = React.useState();
  const [id, setId] = React.useState(localStorage.getItem('mguserid'));

  const [addPost, { data, loading, error }] = useMutation(ADDPOST_QUERY);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    addPost({
      variables: {
        input: {
          description,
          userId: id,
        },
      },
    });
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="share post"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
