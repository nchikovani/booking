export function parseExpiresToSeconds(expires: string): number {
  const match = expires.match(/^(\d+)([smhd])$/);
  if (!match || !match[1]) return 900;
  const val = parseInt(match[1], 10);
  const unit = match[2];
  if (unit === 's') return val;
  if (unit === 'm') return val * 60;
  if (unit === 'h') return val * 3600;
  if (unit === 'd') return val * 86400;
  return 900;
}
