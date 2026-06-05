import { useState } from "react";
import { ShiftForm, type ShiftFormValues } from "@/components/ShiftForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useUIStore } from "@/store/uiStore";
import { MOCK_SHIFTS, type MockShift } from "@/mocks/data";

function formatTime(value: string) {
  return value.slice(0, 5);
}

export default function ShiftsPage() {
  const showNotification = useUIStore((s) => s.showNotification);
  const [shifts, setShifts] = useState(MOCK_SHIFTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<MockShift | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MockShift | null>(null);

  const openCreate = () => {
    setEditingShift(null);
    setModalOpen(true);
  };

  const openEdit = (shift: MockShift) => {
    setEditingShift(shift);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingShift(null);
  };

  const handleSubmit = (values: ShiftFormValues) => {
    if (editingShift) {
      setShifts((prev) =>
        prev.map((s) =>
          s.id === editingShift.id
            ? {
                ...s,
                name: values.name,
                code: values.code,
                start_time: `${values.start_time}:00`,
                end_time: `${values.end_time}:00`,
              }
            : s
        )
      );
      showNotification("Vardiya güncellendi (örnek)", "success");
    } else {
      const newShift: MockShift = {
        id: Date.now(),
        name: values.name,
        code: values.code,
        start_time: `${values.start_time}:00`,
        end_time: `${values.end_time}:00`,
      };
      setShifts((prev) => [...prev, newShift]);
      showNotification("Vardiya oluşturuldu (örnek)", "success");
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setShifts((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    showNotification("Vardiya silindi (örnek)", "success");
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Vardiyalar</h1>
          <p className="text-sm text-stone-500 mt-1">
            Vardiya tanımlarını yönetin
          </p>
        </div>
        <Button onClick={openCreate}>+ Yeni Vardiya</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vardiya Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {!shifts.length ? (
            <p className="text-center text-sm text-stone-500 py-12">
              Henüz vardiya tanımlanmamış.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Kod</TableHead>
                  <TableHead>Başlangıç</TableHead>
                  <TableHead>Bitiş</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shifts.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell className="font-medium">{shift.name}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">
                        {shift.code}
                      </code>
                    </TableCell>
                    <TableCell>{formatTime(shift.start_time)}</TableCell>
                    <TableCell>{formatTime(shift.end_time)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEdit(shift)}>
                          Düzenle
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => setDeleteTarget(shift)}>
                          Sil
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingShift ? "Vardiya Düzenle" : "Yeni Vardiya"}
      >
        <ShiftForm shift={editingShift} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Vardiyayı Sil"
      >
        <p className="text-sm text-stone-600 mb-4">
          <strong>{deleteTarget?.name}</strong> vardiyasını silmek istediğinize
          emin misiniz?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            İptal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Sil
          </Button>
        </div>
      </Modal>
    </div>
  );
}
