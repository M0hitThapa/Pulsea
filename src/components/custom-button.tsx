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
        "md:px-4 md:py-2 px-2 py-1 rounded-md shadow-md/10 dhaode-neutral-700 dark:shadow-neutral-200 bg-neutral-800 dark:bg-neutral-200 hover:bg-cyan-500 text-md font-semibold text-shadow-2xs text-neutral-50 dark:text-neutral-900  cursor-pointer transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
