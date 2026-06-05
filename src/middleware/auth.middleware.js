import jwt from "jsonwebtoken";

/** Authorization: Bearer <token> → req.user = { id, username } */
export function authenticateToken(req, res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
        return res.status(401).json({ ok: false, message: "Token gerekli" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ ok: false, message: "JWT_SECRET tanımlı değil" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = { id: decoded.id, username: decoded.username, role: decoded.role };
        next();
    } catch {
        return res.status(403).json({ ok: false, message: "Geçersiz veya süresi dolmuş token" });
    }
}