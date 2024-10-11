export interface ApiResponse<T> {
  data: T | null;
  success: boolean | null;
  message: string | null;
}
