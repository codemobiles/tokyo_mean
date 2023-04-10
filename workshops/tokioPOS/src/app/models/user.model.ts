export interface User {
  username: string;
  password: string;
}

export interface AdminUser extends User {
  level: number;
}
