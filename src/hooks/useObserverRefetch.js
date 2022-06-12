import { useInView } from "react-intersection-observer";

export default function useObserverRefetch(next, loading, refetch) {
    const { ref, inView } = useInView({
        rootMargin: "100px 0px",
        onChange: async () => {
          if (inView && loading === false) {
            if (next !== null) {
              refetch(next);
            }
          }
        },
      });
      return ref;
}