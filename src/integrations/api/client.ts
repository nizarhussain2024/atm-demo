export type InvokeResult<T> = { data: T | null; error: { message: string } | null };

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const apiClient = {
  functions: {
    invoke: async <T = unknown>(
      functionName: string,
      options: { body: unknown }
    ): Promise<InvokeResult<T>> => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/${functionName}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(options.body),
        });

        const data = (await response.json()) as T & { error?: string };

        if (!response.ok) {
          return {
            data: null,
            error: { message: (data as any)?.error || "API request failed" },
          };
        }

        return { data, error: null };
      } catch (error: any) {
        return {
          data: null,
          error: { message: error?.message || "Network error" },
        };
      }
    },
  },
};

