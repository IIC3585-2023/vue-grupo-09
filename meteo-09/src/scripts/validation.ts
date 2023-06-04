export interface Status {
  valid: boolean;
  message?: string;
}

type Rule = (value: string) => Status;

export const required: Rule = (value: string): Status => {
  const result = Boolean(value.trim());
  return {
    valid: result,
    message: result ? undefined : 'Este campo es obligatorio'
  }
}

export const isValidLatitude: Rule = (value: string): Status => {
  const latitude = Number(value);
  let result = !isNaN(latitude);
  if (result) {
    result = -90 <= latitude && latitude <= 90;
  }
  return {
    valid: result,
    message: result ? undefined : 'Debes colocar un número entre -90 y 90'
  }
}

export const isValidLongitude: Rule = (value: string): Status => {
  const longitude = Number(value);
  let result = !isNaN(longitude);
  if (result) {
    result = -180 <= longitude && longitude <= 180;
  }
  return {
    valid: result,
    message: result ? undefined : 'Debes colocar un número entre -180 y 180'
  }
}

export function validate (value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value);
    if (!result.valid) {
      return result;
    }
  }

  return {
    valid: true
  }
}
