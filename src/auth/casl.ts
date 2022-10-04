import { Ability, ForcedSubject, AbilityClass, AbilityBuilder } from "@casl/ability";
import { ActionsType, RolesType, SubjectsType } from "@/types/Abilities";
import { User } from "@prisma/client";

// This is an example 
// const ability = new Ability<[ActionsType, SubjectsType]>()
// ability.can("create", "Category");
// ! Abilities definition
type AppAbilities = [
  ActionsType,
  SubjectsType | ForcedSubject<Exclude<SubjectsType, "all">>
]

export type AppAbility = Ability<AppAbilities>;
export const AppAbility = Ability as AbilityClass<AppAbility>

// ! Roles definition
type DefinePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void;
type Roles = RolesType

const rolePermissions: Record<Roles, DefinePermissions> = {
  admin(user, { can }) {
    can("create", "all")
  },
  member(user, { can }) {
    can("create", "Product")
    can("read", "Product")
    can("update", "Product")
  },
  developer(user, { can }) {
    can("manage", "all")
  },
}

export function defineAbilityFor(user: User): AppAbility {
  const builder = new AbilityBuilder(Ability);
}