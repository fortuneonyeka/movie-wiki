import React, { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const StarRating = ({
  maxRating = 5,
  color = ["#8B0000", "#DC143C", "#89CFF0", "#0000FF", "#FFD700"],
  size = 25,
  className,
  messages = [],
  defaultRating = 0
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color[tempRating ? tempRating - 1 : rating - 1] || color[0],
    fontSize: `${size}px`,
  };

  // Helper function to get the star color
  const getStarColor = (index) => {
    return color[tempRating ? tempRating - 1 : rating - 1] || color[0];
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            handleRating={() => setRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={getStarColor(i)} // Dynamic star color
            size={size}
          />
        ))}
      </div>
      {/* Dynamically display message based on tempRating or rating */}
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1] || ""
          : ""}
      </p>
    </div>
  );
};

export default StarRating;
