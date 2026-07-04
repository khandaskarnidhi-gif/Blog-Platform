import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";

import "./SinglePost.css";

function SinglePost() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data.post);
    } catch (error) {
      toast.error("Failed to load post");
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comments/${id}`);
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!comment.trim()) return;

    try {
      await API.post(`/comments/${id}`, {
        comment,
      });

      toast.success("Comment added!");

      setComment("");

      fetchComments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);

      toast.success("Comment deleted");

      fetchComments();
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  if (!post) {
    return <Loader />;
  }

  return (
    <div className="single-post-page">
      <div className="post-box">
        <h1>{post.title}</h1>

        <p className="author">
          By {post.author.username}
        </p>

        <div className="content">
          {post.content}
        </div>
      </div>

      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>

        <form onSubmit={handleComment}>
          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit">
            Add Comment
          </button>
        </form>

        {comments.map((c) => (
          <div className="comment-card" key={c._id}>
            <div>
              <strong>{c.user.username}</strong>

              <p>{c.comment}</p>
            </div>

            {user && user.id === c.user._id && (
              <button
                className="delete-comment"
                onClick={() => deleteComment(c._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SinglePost;