export const getMonthDateRange = (year, month) => {
    const y = Number(year);
    const m = Number(month);
    if (!Number.isInteger(y) || y < 1970 || y > 2100) throw new Error("Geçersiz yıl!");
    if (!Number.isInteger(m) || m < 1 || m > 12) throw new Error("Geçersiz ay!");
    const start = `${y}-${String(m).padStart(2, "0")}-01`;
    const endDate = new Date(y, m, 0);
    const end = `${y}-${String(m).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
    return { start, end };
}