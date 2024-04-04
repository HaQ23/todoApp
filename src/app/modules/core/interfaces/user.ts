export class User {
  constructor(
    public email: string,
    public username: string,
    public idUser: number
  ) {}
}
export interface LoginUser {
  userName: string;
  password: string;
}
export interface GetUsersResponse {
  userName: string;
  email: string;
  password: string;
  id: number;
}
export type PostUserResponse = GetUsersResponse;
export type PostUser = Omit<GetUsersResponse, 'id'>;
