import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class Bcrypt {
  static hash(password: string): string {
    const salt = genSaltSync();

    return hashSync(password, salt);
  }

  static compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
