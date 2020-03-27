import { Authority } from './Authority';

export class User {
  id: string;
  uri: string;
  username = '';
  name: string;
  surname: string;
  email: string;
  role: string;
  authorities: Authority[] = [];
  authorization = '';
  password = '';
  passwordReset = false;
  enabled: boolean;

  constructor(values: object = {}) {
    Object.assign(this as any, values);
  }

  getAuthorities(): string[] {
    const au: string[] = [];
    for (const auth of this.authorities) {
      au.push(auth.authority);
    }
    return au;
  }
}
