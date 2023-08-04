function checkFallback<T>(fallback: T, customFallback: T): NonNullable<T> {
  if (customFallback != null) {
    return customFallback;
  }

  return fallback!;
}

function number(
  number: any,
  fallback?: number,
  boundaries?: { max?: number; min?: number }
): number {
  if (number == null) {
    return checkFallback(Number.NaN, fallback);
  }

  const _temp = Number(number);

  if (Number.isNaN(_temp)) {
    return checkFallback(Number.NaN, fallback);
  }

  if (boundaries != null) {
    if (boundaries.min != null && _temp < boundaries.min) return boundaries.min;
    if (boundaries.max != null && _temp > boundaries.max) return boundaries.max;
  }

  return _temp;
}

function string(string: any, fallback?: string): string {
  if (string == null) {
    return checkFallback('', fallback);
  }

  if (typeof string !== 'string') {
    return checkFallback('', fallback);
  }

  return string;
}

export const SafeCast = { number, string };
