import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

//вытаскиваю метадату ролей при помощи Reflector
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
