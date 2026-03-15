import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class EmailService {
  constructor(private readonly logger: Logger) {}

  /**
   * Stub: логирует запрос сброса пароля. Письмо не отправляется.
   */
  sendPasswordResetEmail(email: string, link: string, token: string): void {
    this.logger.log(
      { email, link, token },
      '[PasswordReset] Запрос сброса пароля (stub — письмо не отправлено)',
    );
  }
}
