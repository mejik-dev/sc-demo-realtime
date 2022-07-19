import * as React from "react";

import { usePost } from "../hooks/usePost";

const PostPage = () => {
  const { error, loading, posts, handleSubmit, setDescription } = usePost();

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind?"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr />
      <h2>Feeds</h2>
      {error ? (
        <p>Something went wrong while fetching the data...</p>
      ) : (
        <>
          {loading ? (
            <p>Loading, please wait...</p>
          ) : (
            <>
              <ul>
                {posts.map((post) => (
                  <li key={post.id}>
                    <p>
                      {post.description || "Empty post"}{" "}
                      <span style={{ fontSize: "0.8rem" }}>
                        (Created by: {post.createdBy.email})
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
              {!posts.length && <p>Empty feed</p>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostPage;
