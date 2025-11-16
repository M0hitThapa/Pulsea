import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const CustomButton = ({
  children,
  className,

  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md shadow-md/30 dhaode-neutral-700 dark:shadow-neutral-200 bg-cyan-700 hover:bg-cyan-600 text-md font-semibold text-shadow-2xs text-neutral-50  cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
