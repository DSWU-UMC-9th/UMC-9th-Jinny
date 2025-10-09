import axios from "axios";
import { useEffect, useState } from "react";

interface useCustomFetchProps {
  url: string;
}

function useCustomFetch<T>({ url }: useCustomFetchProps) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);

      try {
        const { data } = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });

        setData(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, isPending, isError] as const;
}

export default useCustomFetch;
