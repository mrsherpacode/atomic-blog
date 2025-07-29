//  This is context provider .
import { useContext, useState } from "react";
import { faker } from "@faker-js/faker";
import { createContext } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// There are three steps of Context API
// very first step of Context API
// 1) Here, i'm creating a  Context
// postContext is a component so the name starts with capital letter.

const PostContext = createContext();

// ////////////////////////////////////////////////
function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    //2)Here, i'm providing value to child components.
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

//Here, i'm creating a custom hook for the context
function usePost() {
  const context = useContext(PostContext);
  return context;
}

export { PostProvider, usePost };
