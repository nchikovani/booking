import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import type { AuthResult, AuthStrategy } from './auth-strategy.interface';
import { AdminAuthRepository } from '../repositories/admin-auth.repository';

@Injectable()
export class EmailPasswordStrategy implements AuthStrategy {
  constructor(private readonly repository: AdminAuthRepository) {}

  async authenticate(credentials: { email: string; password: string }): Promise<AuthResult | null> {
    const adminUser = await this.repository.findAdminUserByEmailWithCredential(
      credentials.email.trim().toLowerCase(),
    );

    const provider = adminUser?.authProviders?.[0];
    const credential = provider?.credential;
    if (!credential) return null;

    const valid = await argon2.verify(credential.passwordHash, credentials.password);
    if (!valid) return null;

    return { adminUser: adminUser! };
  }
}
