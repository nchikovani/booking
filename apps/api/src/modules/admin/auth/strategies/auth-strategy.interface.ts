import { AdminUser } from '@repo/prisma';

export interface AuthResult {
  adminUser: AdminUser;
}

export interface AuthStrategy {
  authenticate(credentials: { email: string; password: string }): Promise<AuthResult | null>;
}
