import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const { data } = await API.get("/posts/my-posts");
      setPosts(data.posts);
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`);

      toast.success("Blog deleted successfully!");

      fetchMyPosts();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>My Profile</h1>

        <h3>{user?.username}</h3>

        <p>{user?.email}</p>

        <div className="stats">
          <div>
            <h2>{posts.length}</h2>
            <p>Total Blogs</p>
          </div>
        </div>

      </div>

      <div className="my-blogs">

          <h2>My Blogs</h2>

          {loading ? (
            <Loader />
          ) : posts.length === 0 ? (
            <p>No blogs created yet.</p>
          ) : (
            posts.map((post) => (
            <div className="blog-item" key={post._id}>

              <div>

                <h3>{post.title}</h3>

                <p>
                  {post.content.substring(0, 100)}...
                </p>

              </div>

              <div className="actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/edit-post/${post._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Profile;