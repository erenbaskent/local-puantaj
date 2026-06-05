export function isAdmin(req, res, next) {
    if (!req.user) {
        return res.status(500).json({ ok: false, message: "Sistem hatası: Kullanıcı bilgisine ulaşılamadı!" });
    }

    if (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN") {
        return res.status(403).json({
            ok: false,
            message: "Erişim reddedildi: Bu işlem için Admin yetkiniz bulunmuyor"
        });
    }

    next();
}

export function isSuperAdmin(req, res, next) {
    if (!req.user) {
        return res.status(500).json({ ok: false, message: "Sistem hatası: Kullanıcı bilgisine ulaşılamadı!" });
    }

    if (req.user.role !== "SUPER_ADMIN") {
        return res.status(403).json({
            ok: false,
            message: "Erişim reddedildi: Bu işlem için Süper Admin yetkiniz bulunmuyor"
        });
    }

    next();
}