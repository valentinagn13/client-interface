import { Role } from "./role.model";

export class User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  captchaToken?: string;
  role?: Role;
}
