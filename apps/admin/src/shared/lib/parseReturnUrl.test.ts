import { describe, expect, it } from 'vitest';
import { parseReturnUrl } from './parseReturnUrl';

describe('parseReturnUrl', () => {
  it('принимает внутренний путь', () => {
    expect(parseReturnUrl('/settings')).toBe('/settings');
  });

  it('принимает путь с query', () => {
    expect(parseReturnUrl('/settings?tab=1')).toBe('/settings?tab=1');
  });

  it('отклоняет protocol-relative (open redirect) // ', () => {
    expect(parseReturnUrl('//evil.com')).toBeNull();
  });

  it('отклоняет путь с :// (декодированная схема)', () => {
    expect(parseReturnUrl('/http://evil.com')).toBeNull();
    expect(parseReturnUrl('/%68ttp://evil.com')).toBeNull();
  });

  it('принимает путь с http в имени сегмента без ://', () => {
    expect(parseReturnUrl('/topics/http-guide')).toBe('/topics/http-guide');
  });

  it('отклоняет корень / (совпадает с ROUTE_HOME, редирект был бы бессмысленным)', () => {
    expect(parseReturnUrl('/')).toBeNull();
    expect(parseReturnUrl('%2F')).toBeNull();
  });

  it('отклоняет login и register', () => {
    expect(parseReturnUrl('/login')).toBeNull();
    expect(parseReturnUrl('/register')).toBeNull();
  });

  it('отклоняет относительный без ведущего слеша', () => {
    expect(parseReturnUrl('settings')).toBeNull();
  });

  it('декодирует один раз и валидирует', () => {
    expect(parseReturnUrl('%2Fsettings')).toBe('/settings');
  });
});
