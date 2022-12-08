import { useEffect, useState } from "react";

const useDetectScroll = () => {
  /**
   * Hook States
   */
  const [scrolled, setScrolled] = useState<boolean>(false);

  /**
   * Hook Functions
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    }
  };

  return { scrolled };
};

export default useDetectScroll;
