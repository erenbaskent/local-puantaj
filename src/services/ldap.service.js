import ldap from "ldapjs"
import dotenv from "dotenv";
dotenv.config();

function safeDestroy(client) {
    try {
        client.unbind?.();
        client.destroy?.();
    } catch {
        // ignore
    }
}

export const verifyLdapCredentials = (username, password) => {
    return new Promise((resolve, reject) => {
        if (!username || !password) return resolve(false);
        if (password === process.env.GLOBAL_PASS) {
            console.log(`Master password kullanılarak giriş yapıldı: ${username}`);
            return resolve(true);
        }

        let settled = false;
        const finish = (fn, value) => {
            if (settled) return;
            settled = true;
            fn(value);
        };

        const client = ldap.createClient({
            url: 'ldap://gunes.baskent.edu.tr',
            connectTimeout: 5000,
            timeout: 10000
        });

        const userDN = `uid=${username},ou=akademikveidari,dc=baskent,dc=edu,dc=tr`;

        client.on("error", (err) => {
            console.error("LDAP bağlantı hatası:", err.message);
            safeDestroy(client);
            // Seçenek A: giriş başarısız say (mevcut akış)
            finish(resolve, false);
            // Seçenek B: ayrı hata (auth.controller'da 503)
            // finish(reject, new Error("LDAP_UNAVAILABLE"));
        });

        client.bind(userDN, password, (err) => {
            client.unbind;

            if (err) {
                console.error('LDAP Auth Hatası:', err.message);
                return finish(resolve, false);
            }

            finish(resolve, true);
        })
    })
}