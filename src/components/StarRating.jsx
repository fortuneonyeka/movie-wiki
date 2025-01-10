import React, { useState } from "react";
import PropTypes from "prop-types";
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
  color = ["white", "#DC143C", "#89CFF0", "#0000FF", "#FFD700"],
  size = 25,
  className,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  // Calculate the color dynamically based on the rating
  const getDynamicColor = (ratingValue) => {
    const colorIndex = Math.floor(
      (ratingValue / maxRating) * (color.length - 1)
    );
    return color[colorIndex] || color[color.length - 1];
  };

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: getDynamicColor(tempRating || rating),
    fontSize: `${size}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={getDynamicColor(tempRating || rating)}
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

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  defaultRating: PropTypes.number,
};

export default StarRating;
