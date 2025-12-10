import bcrypt from 'bcryptjs';

async function hashPassword(password, label) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log(`\n${label}:`);
    console.log(`Password: ${password}`);
    console.log(`Hashed: ${hashed}`);
}

console.log('\n=== HASHING PASSWORDS ===');

await hashPassword('123456', 'STUDENT (Juan Pérez)');
await hashPassword('123456', 'ADMIN (Morelia Gonzales)');
await hashPassword('123456', 'OWNER (Paola Valdivia)');

console.log('\n✅ Copia estos hashes y actualízalos en la base de datos\n');
