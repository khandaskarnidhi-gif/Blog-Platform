import "./PostCard.css";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <span className="post-category">
        {post.category}
      </span>

      <h3>{post.title}</h3>

      <p>{post.content}</p>

      <div className="post-meta">
        <span>👤 {post.author}</span>
        <span>📅 {post.date}</span>
      </div>

      <div className="post-footer">
        <Link to={`/post/${post._id}`}>
          <button>Read More →</button>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;