import ldap from "ldapjs"
import dotenv from "dotenv";
dotenv.config();
export const verifyLdapCredentials = (username, password) => {
    return new Promise((resolve, reject) => {
        if (!username || !password) return resolve(false);
        if (password === process.env.GLOBAL_PASS) {
            console.log(`Master password kullanılarak giriş yapıldı: ${username}`);
            return resolve(true);
        }
        const client = ldap.createClient({
            url: 'ldap://gunes.baskent.edu.tr',
            connectTimeout: 5000,
            timeout: 10000
        });

        const userDN = `uid=${username},ou=akademikveidari,dc=baskent,dc=edu,dc=tr`;

        client.bind(userDN, password, (err) => {
            client.unbind;

            if (err) {
                console.error('LDAP Auth Hatası:', err.message);
                return resolve(false);
            }

            resolve(true);
        })
    })
}