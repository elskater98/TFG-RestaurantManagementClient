import {Injectable} from '@angular/core';
@Injectable()
export class Utils {
  constructor() {
  }

  generateUUID():string{
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
