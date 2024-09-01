import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface RetryConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
}

export async function axiosRetry(config: RetryConfig): Promise<AxiosResponse> {
  const { retry = 3, retryDelay = 1000, ...axiosConfig } = config;

  for (let attempt = 0; attempt < retry; attempt++) {
    try {
      return await axios(axiosConfig);
    } catch (err) {
      if (attempt === retry - 1) throw err;

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (
          axiosError.code === "ECONNABORTED" ||
          (axiosError.response && axiosError.response.status >= 500)
        ) {
          console.log(
            `Attempt ${attempt + 1} failed. Retrying in ${retryDelay}ms...`,
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }
      }

      throw err;
    }
  }

  throw new Error("Max retries reached");
}
