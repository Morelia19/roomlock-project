import bcrypt from 'bcryptjs';

// Script para hashear passwords para testing
async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log(`Password: ${password}`);
    console.log(`Hashed: ${hashed}`);
    console.log('\nPuedes copiar este hash y actualizarlo en la base de datos');
}

// Cambiar el password aquí
const passwordToHash = '123456';
hashPassword(passwordToHash);
