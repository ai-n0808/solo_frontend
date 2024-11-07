import React, { useRef, useState } from "react";

interface ReviewProps {
  user: { id: number; user_name: string } | null;
  saveReview: (review: string) => void;
  handleView: (view: string) => void;
}

const Review: React.FC<ReviewProps> = ({ handleView, saveReview }) => {
  const [reviewText, setReviewText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
          ref={textAreaRef}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          rows={5}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button
          style={{
            marginRight: "10px",
          }}
          type="submit"
          className="submit-button"
          onClick={() =>
            textAreaRef.current && saveReview(textAreaRef.current.value)
          }
        >
          Submit Review
        </button>
        <button onClick={() => handleView("AllGames")}>Back to home</button>
      </form>
    </div>
  );
};

export default Review;
