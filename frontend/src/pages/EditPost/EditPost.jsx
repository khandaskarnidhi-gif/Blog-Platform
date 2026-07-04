import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import API from "../../services/api";
import "./EditPost.css";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);

      setFormData({
        title: data.post.title,
        content: data.post.content,
      });
    } catch (error) {
      toast.error("Failed to load post");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/posts/${id}`, formData);

      toast.success("Blog updated successfully!");

      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-post-page">
      <form className="edit-post-form" onSubmit={handleSubmit}>
        <h1>Edit Blog</h1>

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Write your blog..."
          rows="12"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

export default EditPost;