import { Injectable } from '@nestjs/common';
import {db} from '../../common/firebase/firebase-config'
@Injectable()
export class PingService {
  constructor(
  ) {}

  async pingToUser(userId: number) {
    const ref = db.ref(`/ping/${userId}`);
    return ref.once('value', data => {
        return data
    })
  }
}
