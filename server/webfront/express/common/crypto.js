const crypto=require('crypto');

//AES 算法加密解密 对称
module.exports={
    aesEncrypt(secret,key){//编码，aes192算法，key是密钥
        const cipher = crypto.createCipher('aes192', key);
        var crypted = cipher.update(secret, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    aesDecrypt(secret,key){//解码
        const decipher = crypto.createDecipher('aes192', key);
        var decrypted = decipher.update(secret, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
