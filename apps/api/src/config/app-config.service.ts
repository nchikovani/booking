import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, PathValue } from './configuration.types';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get<K extends string>(
    path: K,
    defaultValue?: PathValue<Configuration, K>,
  ): PathValue<Configuration, K> {
    const value = this.config.get(path, defaultValue);
    return (value ?? defaultValue) as PathValue<Configuration, K>;
  }
}
