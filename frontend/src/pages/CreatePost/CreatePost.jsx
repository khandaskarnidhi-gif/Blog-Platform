import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import API from "../../services/api";
import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

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

      await API.post("/posts", formData);

      toast.success("Blog created successfully!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h1>Create New Blog</h1>

        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          required
        />
         <p className="counter">
    {formData.title.length}/100
</p>
        <textarea
          name="content"
          placeholder="Write your blog here..."
          rows="12"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        <p className="counter">
    {formData.content.length} Characters
</p>
        <button type="submit">
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;