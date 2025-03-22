import { AuthEffects } from "./effects/auth.effects";
import { ContentModelCreationEffects } from "./effects/content-model-creation.effects";
import { InitEffects } from "./effects/init.effects";
import { UserEffects } from "./effects/user.effects";

export const effects = [
  AuthEffects,
  UserEffects,
  InitEffects,
  ContentModelCreationEffects
]
