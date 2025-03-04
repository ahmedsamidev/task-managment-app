interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

interface DeleteTaskResponse {
  message: string;
  statusCode: number;
  taskId: string;
}