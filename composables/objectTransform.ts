import { pick } from 'lodash';

export const useObjectTransform = () => {
  const transform = <T>(input: unknown, fields: (keyof T)[]) => {
    return pick(input, fields) as T
  }

  return { transform }
}