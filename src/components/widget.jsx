import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const Widget = () => {
  const [rating, setRating] = useState(3);
  return (
    <div className="fixed  bottom-4 left-4 z-50 w-[280px]">
      <Button>Feedback</Button>
      <div className="space-y-2">
        <h3 className="text-md font-semibold">Send us your feedback</h3>
        <form className="">
          <div>
            <div className="">
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input id="name" placeholder="Enter your name" className="mb-2" />
            </div>
            <div className="">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                className="mb-2"
              />
            </div>
          </div>
          <div className="">
            <Label htmlFor="feedback" className="mb-2">
              Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think"
              className="mb-2"
            />
          </div>
          <div className="flex  justify-between items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-5 w-5 cursor-pointer ${
                    rating > index
                      ? "fill-primary"
                      : "fill-muted stroke-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function StarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-star"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  );
}
