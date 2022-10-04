export enum AbilitiesEnum {
  CAN = "can",
  CANNOT = "cannot",
}

export enum ActionsEnum {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
  MANAGE = "manage",
}
export type ActionsType = `${ActionsEnum}`;

export enum SubjectsEnum {
  ALL = "all",
  USER = "User",
  CATEGORY = "Category",
  PRODUCT = "Product",
}
export type SubjectsType = `${SubjectsEnum}`;

export type Fields<T> = [keyof T]

export enum Roles {
  ADMIN = "admin",
  MEMBER = "member",
  DEVELOPER = "developer",
}
export type RolesType = `${Roles}`;