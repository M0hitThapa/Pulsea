import { motion, useAnimation, AnimatePresence } from "motion/react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const SmileIcon = forwardRef(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      autoAnimate = false,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (autoAnimate) {
        controls.start("animate");
      }
    }, [autoAnimate, controls]);

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) controls.start("animate");
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter, autoAnimate]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) controls.start("normal");
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave, autoAnimate]
    );

    const faceVariants = {
      normal: {
        scale: 1,
        rotate: 0,
        strokeWidth: 2,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      animate: {
        scale: [1, 1.15, 1.05, 1.1],
        rotate: [0, -3, 3, 0],
        strokeWidth: [2, 2.5, 2.5, 2.5],
        transition: {
          duration: 0.8,
          times: [0, 0.3, 0.6, 1],
          ease: "easeInOut",
        },
      },
    };

    const mouthVariants = {
      normal: {
        d: "M8 14s1.5 2 4 2 4-2 4-2",
        pathLength: 1,
        pathOffset: 0,
        strokeWidth: 2,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      animate: {
        d: "M7 13.5s2.5 3.5 5 3.5 5-3.5 5-3.5",
        pathLength: [0.3, 1, 1],
        pathOffset: [0, 0, 0],
        strokeWidth: 2.5,
        transition: {
          d: { duration: 0.4, ease: "easeOut" },
          pathLength: {
            duration: 0.5,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          },
          delay: 0.1,
        },
      },
    };

    const eyeVariants = {
      normal: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      animate: {
        scale: [1, 1.5, 0.8, 1.2],
        opacity: [1, 1, 1, 1],
        transition: {
          duration: 0.5,
          times: [0, 0.3, 0.6, 1],
          ease: "easeInOut",
        },
      },
    };

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={faceVariants}
        >
          <motion.circle cx="12" cy="12" r="10" />
          <motion.path
            variants={mouthVariants}
            animate={controls}
            initial="normal"
            d="M8 14s1.5 2 4 2 4-2 4-2"
          />
          <motion.line
            x1="9"
            x2="9.01"
            y1="9"
            y2="9"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.line
            x1="15"
            x2="15.01"
            y1="9"
            y2="9"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

SmileIcon.displayName = "SmileIcon";

const AnnoyedIcon = forwardRef(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      autoAnimate = false,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (autoAnimate) {
        controls.start("animate");
      }
    }, [autoAnimate, controls]);

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) controls.start("animate");
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter, autoAnimate]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) controls.start("normal");
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave, autoAnimate]
    );

    const faceVariants = {
      normal: {
        scale: 1,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        scale: 1.05,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    };

    const mouthVariants = {
      normal: {
        scaleX: 1,
        y: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        scaleX: 0.8,
        y: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    };

    const leftEyebrowVariants = {
      normal: {
        rotate: 0,
        y: 0,
        x: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        rotate: 15,
        y: -1,
        x: -0.5,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      },
    };

    const rightEyebrowVariants = {
      normal: {
        rotate: 0,
        y: 0,
        x: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        rotate: 15,
        y: -1,
        x: 0.5,
        transition: {
          duration: 0.25,
          ease: "easeOut",
          delay: 0.05,
        },
      },
    };

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={faceVariants}
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            d="M8 15h8"
            variants={mouthVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M8 9h2"
            variants={leftEyebrowVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14 9h2"
            variants={rightEyebrowVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

AnnoyedIcon.displayName = "AnnoyedIcon";

const EYEBROW_ROTATION = 20;
const DURATION = 0.6;

const pathVariantsFace = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.2, 1.2, 1.2, 1],
    rotate: [0, -3, 3, -1, 1, 0],
    transition: {
      duration: DURATION,
      times: [0, 0.2, 0.4, 0.6, 1],
      ease: "easeInOut",
    },
  },
};

const pathVariantsLeftEyebrow = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, EYEBROW_ROTATION, 0],
    transition: {
      duration: DURATION + 0.2,
    },
  },
};

const pathVariantsRightEyebrow = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -EYEBROW_ROTATION, 0],
    transition: {
      duration: DURATION + 0.2,
    },
  },
};

const pathVariantsEye = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: DURATION,
    },
  },
};

const pathVariantsMouth = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.5, 0],
    transition: {
      duration: DURATION,
    },
  },
};

const AngryIcon = forwardRef(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      autoAnimate = false,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (autoAnimate) {
        controls.start("animate");
      }
    }, [autoAnimate, controls]);

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter, autoAnimate]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave, autoAnimate]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          variants={pathVariantsFace}
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            variants={pathVariantsMouth}
            animate={controls}
            d="M16 16s-1.5-2-4-2-4 2-4 2"
          />
          <motion.path
            variants={pathVariantsLeftEyebrow}
            animate={controls}
            d="M7.5 8 10 9"
          />
          <motion.path
            variants={pathVariantsRightEyebrow}
            animate={controls}
            d="m14 9 2.5-1"
          />
          <motion.path
            variants={pathVariantsEye}
            animate={controls}
            d="M9 10h.01"
          />
          <motion.path
            variants={pathVariantsEye}
            animate={controls}
            d="M15 10h.01"
          />
        </motion.svg>
      </div>
    );
  }
);

AngryIcon.displayName = "AngryIcon";

const FrownIcon = forwardRef(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      autoAnimate = false,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (autoAnimate) {
        controls.start("animate");
      }
    }, [autoAnimate, controls]);

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) controls.start("animate");
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter, autoAnimate]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current && !autoAnimate) controls.start("normal");
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave, autoAnimate]
    );

    const faceVariants = {
      normal: {
        scale: 1,
        rotate: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      animate: {
        scale: [1, 1.15, 1.05, 1.08],
        rotate: [0, -2, 2, 0],
        transition: {
          duration: 0.8,
          times: [0, 0.3, 0.6, 1],
          ease: "easeInOut",
        },
      },
    };

    const mouthVariants = {
      normal: {
        d: "M16 16s-1.5-2-4-2-4 2-4 2",
        pathLength: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      animate: {
        d: "M16 17s-1.5-2.5-4-2.5-4 2.5-4 2.5",
        pathLength: [0.3, 1, 1],
        transition: {
          d: { duration: 0.5, ease: "easeOut" },
          pathLength: {
            duration: 0.5,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          },
          delay: 0.1,
        },
      },
    };

    const leftEyeVariants = {
      normal: {
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      animate: {
        scale: [1, 1.3, 0.9, 1.1],
        y: [0, -0.5, 0.3, 0],
        transition: {
          duration: 0.6,
          times: [0, 0.3, 0.6, 1],
          ease: "easeInOut",
        },
      },
    };

    const rightEyeVariants = {
      normal: {
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      animate: {
        scale: [1, 0.9, 1.3, 1.1],
        y: [0, -0.5, 0.3, 0],
        transition: {
          duration: 0.6,
          times: [0, 0.3, 0.6, 1],
          ease: "easeInOut",
        },
      },
    };

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={faceVariants}
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            variants={mouthVariants}
            animate={controls}
            initial="normal"
            d="M16 16s-1.5-2-4-2-4 2-4 2"
          />
          <motion.line
            x1="9"
            x2="9.01"
            y1="9"
            y2="9"
            variants={leftEyeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.line
            x1="15"
            x2="15.01"
            y1="9"
            y2="9"
            variants={rightEyeVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

FrownIcon.displayName = "FrownIcon";

// Sequential Animation Wrapper Component
const SequentialAnimatedIcons = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const icons = [
    { Component: SmileIcon, name: "Smile", duration: 1000 },
    { Component: AnnoyedIcon, name: "Annoyed", duration: 500 },
    { Component: AngryIcon, name: "Angry", duration: 800 },
    { Component: FrownIcon, name: "Frown", duration: 900 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, icons[currentIconIndex].duration + 500); // Animation duration + pause

    return () => clearTimeout(timer);
  }, [currentIconIndex]);

  return (
    <div className="flex items-center justify-center  ">
      <div className="relative  h-5 w-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {icons.map((icon, index) =>
            index === currentIconIndex ? (
              <motion.div
                key={icon.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <icon.Component
                  autoAnimate={true}
                  size={30}
                  className="bg-[#F7D92C] rounded-full"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SequentialAnimatedIcons;
