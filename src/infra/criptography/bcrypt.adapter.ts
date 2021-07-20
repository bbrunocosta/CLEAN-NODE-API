import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'
export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}
  async encrypt (string: string): Promise<string> {
    return await bcrypt.hash(string, this.salt)
  }
}
