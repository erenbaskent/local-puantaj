const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

export const parseTime = (value, fieldName = "Saat") => {
    if (value == null || value === "") {
        throw new Error(`${fieldName} boş olamaz.`);
    }

    const s = String(value).trim();
    const m = s.match(TIME_RE);
    if (!m) {
        throw new Error(`${fieldName} geçerli değil (HH:mm veya HH:mm:ss)`);
    }

    const sec = m[3] ?? "00";
    return `${m[1]}:${m[2]}:${sec}`;
}   