import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

function useApi<T>(config: AxiosRequestConfig): ApiResponse<T> {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios(config);
        setData(response.data);
      } catch (error:any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [config]);

  return { data, loading, error };
}

export default useApi;
