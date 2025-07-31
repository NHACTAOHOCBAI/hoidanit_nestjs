import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const salt = 10;
const hashPassword = async (password: string) => {
    try {
        const hash = await bcrypt.hash(password, salt);
        return hash
    }
    catch {
        throw new HttpException("Hash password failed", HttpStatus.BAD_REQUEST)
    }
}
const comparePassword = async (password: string, hashPassword: string) => {
    try {
        return await bcrypt.compare(password, hashPassword)
    }
    catch {
        throw new HttpException("Compare password failed", HttpStatus.BAD_REQUEST)
    }
}
export { hashPassword, comparePassword }