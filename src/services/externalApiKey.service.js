import axios from "axios";

export const getUserEmails = async (userId, users = null) => {
    const URL = 'https://sors.baskent.edu.tr/ajax_controls/getEmployeeById.php';
    const API_KEY = "7K9pW2mX4vL1nZ8q";
    try {
        if (users && users.length > 0) {

            const promises = users.map(async (user) => {
                const response = await axios.post(URL, {
                    id: user.identity_number,
                    api_key: API_KEY
                });
                return {
                    id: user.identity_number,
                    email: response.data.KULLANICI_ADI
                };
            });

            const emails = await Promise.all(promises);
            return emails;
        }
        else {
            const response = await axios.post(URL, {
                id: userId,
                api_key: API_KEY
            });
            return response;
        }
    } catch (error) {
        if (error.response) {
            console.error("Servis Hatası:", error.response.status, error.response.data);
        } else {
            console.error("Bağlantı Hatası:", error.message);
        }
        throw new Error("Dış servis işlemi başarısız oldu.");
    }
}