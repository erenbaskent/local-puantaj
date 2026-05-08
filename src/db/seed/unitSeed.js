import Unit from "../../models/unit.model.js";

export const createUnitSeed = async () => {
    const names = [{code: "001.01.01.10", name: "BİLGİ İŞLEM MERKEZİ"}];
    try {
        const units = await Unit.findAll();
        if (units.length > 0) {
            return;
        }
        const unitData = names.map(name => ({ code: name.code, name: name.name }));
        await Unit.bulkCreate(unitData);
        console.log("Birim seed eklendi. Oluşturulan birim isimleri: " + names.join(", "));
    } catch(error) {
        console.error(error);
        throw error;
    }
}