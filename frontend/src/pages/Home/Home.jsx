import { useEffect, useState } from "react";
import "./Home.css";

import API from "../../services/api";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/posts?search=${search}`
      );

      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = () => {
    fetchPosts();
  };

  return (
    <>
      <section className="hero">
        <span className="badge">
          🚀 Welcome to BlogHub
        </span>

        <h1>
          Share Your Ideas <br />
          With The World
        </h1>

        <p>
          Read amazing blogs, share your knowledge,
          connect with developers and inspire others.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>
      </section>

      <section className="latest">
        <h2>Latest Blogs</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="cards">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
  key={post._id}
  post={{
    _id: post._id,
    category: "Blog",
    title: post.title,
    content:
      post.content.length > 120
        ? post.content.substring(0, 120) + "..."
        : post.content,
    author: post.author?.username || "Unknown",
    date: new Date(post.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }}
/>
              ))
            ) : (
              <div className="empty-state">
  <h2>No Blogs Found 📭</h2>

  <p>
    There are no blogs matching your search.
  </p>
</div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;