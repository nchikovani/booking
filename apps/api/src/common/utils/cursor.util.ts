/**
 * Cursor-based pagination: encode/decode cursor as base64 JSON.
 * Пустая строка или невалидный base64 → null (вызовет INVALID_CURSOR).
 * Общая утилита для модулей с cursor-пагинацией.
 */
export function encodeCursor(id: string): string {
  return Buffer.from(JSON.stringify({ id }), 'utf-8').toString('base64');
}

export function decodeCursor(cursor: string): { id: string } | null {
  if (!cursor || typeof cursor !== 'string' || cursor.trim() === '') {
    return null;
  }
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      'id' in parsed &&
      typeof (parsed as { id: unknown }).id === 'string'
    ) {
      return { id: (parsed as { id: string }).id };
    }
    return null;
  } catch {
    return null;
  }
}
