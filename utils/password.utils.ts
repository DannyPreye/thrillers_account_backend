import crypto from 'crypto';



export function generatePassword(password: string)
{

    // This function is meant to generate salt and hash to encrypt the user password

    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    };
}

export function validatePassword(password: string, hash: string, salt: string)
{
    // This function is used to verify the user password using the salt and hash on the user model
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}
