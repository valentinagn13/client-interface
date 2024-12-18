import { Permission } from "./permission.model";
import { Role } from "./role.model";

export class RolePermission {
  _id?: string;
  role?: Role;
  permission?: Permission;
}
