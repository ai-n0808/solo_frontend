import React, { useState } from "react";

interface ReviewProps {
  user: { id: number; user_name: string } | null;
  handleView: (view: string) => void;
}

const Review: React.FC<ReviewProps> = ({ handleView }) => {
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (reviewText.trim()) {
      setReviewText("");
      handleView("AllGames");
    }
  };

  return (
    <div className="review-format" style={{ textAlign: "center" }}>
      <h1>Write your review here</h1>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          rows={5}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" className="submit-button">
          Submit Review
        </button>
        <button onClick={() => handleView("AllGames")}>Back to home</button>
      </form>
    </div>
  );
};

export default Review;
