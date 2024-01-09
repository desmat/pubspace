import { v4 as uuidv4 } from 'uuid';

export function uuid(): string {
  return uuidv4().substring(0, 8);
}
