import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner"; // hoặc "react-hot-toast"
import { handleApiError } from "@/lib/handleApiError";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
});

// Request interceptor – tự động gắn Authorization token
axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

//   console.log({session})

  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`;
  }

  return config;
});

// Response interceptor – global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage); // show toast automatically

    return Promise.reject(error); // still reject so you can catch if needed
  }
);

export default axiosInstance;




