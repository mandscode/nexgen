import React from "react";
import { Link } from "react-router-dom";

interface Blog {
  id:number;
  title: string;
  description: string;
  imageUrl?: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const truncatedDescription = truncateTextForScreen(blog.description, 16); // Adjust word count

  return (
    <div className="_blog-card">
      <figure className="_blog-card_media_wrapper">
        <img
          className="_blog-card_media"
          src={blog.imageUrl || "/assets/media/images/no-image.jpg"}
          alt={`image not loaded for ${blog.title}`}
        />
      </figure>
      <div className="_blog-card_info_wrapper">
        <div className="_blog-card_info">
          <h6 className="_blog-card_info_title _title_h2">{blog.title}</h6>
          <p className="_blog-card_info_text">{truncatedDescription}</p>
        </div>
        <Link to={`/academy/${blog.id}`} className="_blog-card_info_button _button _is_primary">
          Read more
        </Link>
        <Link to={`/academy/${blog.id}`} className="_blog-card_info_button_responsive">
        </Link>
      </div>
    </div>
  );
};

const truncateTextForScreen = (text: string, maxWords: number): string => {
  if (window.innerWidth <= 1024) {
    const words = text.split(" ");
    return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}...` : text;
  }
  return text; // No truncation for larger screens
};

export default BlogCard;
