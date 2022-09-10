import { useEffect, useState } from "react";
import axios from "axios";
import { Request } from "types/api";
import md5 from "md5";
import { IResponse } from "types/characters";

const API_PREFIX = "https://gateway.marvel.com/v1/public";
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

enum Status {
  idle,
  complete,
  error,
}

const useGet = <T extends IResponse, R extends Request>(
  url: string,
  options?: R
): [T | null, Status] => {
  const [result, setResult] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>(Status.idle);

  useEffect(() => {
    const get = async () => {
      try {
        const timestamp = Date.now();
        const hash = md5(timestamp + PRIVATE_KEY! + PUBLIC_KEY!);
        const endpoint = API_PREFIX + "/" + url;
        const result = await axios.get<T>(endpoint, {
          params: {
            hash,
            apikey: PUBLIC_KEY,
            ts: timestamp,
            ...options,
          },
        });
        setStatus(Status.complete);
        setResult(result.data);
      } catch {
        setStatus(Status.error);
      }
    };
    get();
    return () => {
      setStatus(Status.idle);
    };
  }, [url, options]);

  return [result, status];
};
export default useGet;
export { Status };
