import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Review } from "@/types/shares";
import React, { useState } from "react";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-red-tertiary/30 hover:bg-red-tertiary/40 border border-red-primary/70 transition-all">
      <CardHeader>
        <div className="flex items-center gap-2">
          <img
            src={
              review.author_details.avatar_path
                ? `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`
                : `https://placehold.co/50x50`
            }
            alt={review.author}
            className="size-12 rounded-full border border-gray-700"
          />
          <div>
            <p className="font-bold text-white">{review.author}</p>
            <p className="text-sm text-gray-400">
              Rating: ⭐{review.author_details.rating || "N/A"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="text-white text-sm text-justify leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: expanded
              ? review.content
              : `${
                  review.content.length >= 500
                    ? `${review.content.slice(0, 500)}...`
                    : review.content
                }`,
          }}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        {review.content.length > 500 && (
          <Button
            className="text-red-primary bg-white hover:bg-white w-fit hover:text-red-primary/90 text-sm hover:shadow-[0_0_8px_white] transition-all"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
