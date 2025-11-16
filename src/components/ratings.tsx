function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  );
}

const Ratings = ({ rating, count }: { rating: number; count: number }) => {
  return (
    <div className="flex gap-2 mb-6">
      {[...Array(5)].map((_, index) => {
        const active = rating > index;
        return (
          <button
            key={index}
            type="button"
            aria-label={`Set rating to ${index + 1}`}
            className="relative group"
          >
            <StarIcon
              className={`h-6 w-6 ${
                active
                  ? "fill-yellow-400 stroke-yellow-500"
                  : "fill-neutral-50 stroke-neutral-500"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Ratings;
