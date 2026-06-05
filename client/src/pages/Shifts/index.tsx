import { useState } from "react";
import { useShifts, useCreateShift, useUpdateShift, useDeleteShift } from "@/features/shifts/hooks";
import { ShiftForm } from "@/features/shifts/ShiftForm";
import type { ShiftFormValues } from "@/features/shifts/schemas";
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
import { Spinner } from "@/components/ui/spinner";
import { formatTimeDisplay } from "@/lib/formatTime";
import type { Shift } from "@/types";

export default function ShiftsPage() {
  const { data: shifts, isLoading } = useShifts();
  const createShift = useCreateShift();
  const updateShift = useUpdateShift();
  const deleteShift = useDeleteShift();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Shift | null>(null);

  const openCreate = () => {
    setEditingShift(null);
    setModalOpen(true);
  };

  const openEdit = (shift: Shift) => {
    setEditingShift(shift);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingShift(null);
  };

  const handleSubmit = (values: ShiftFormValues) => {
    if (editingShift) {
      updateShift.mutate(
        { id: editingShift.id, payload: values },
        { onSuccess: closeModal }
      );
    } else {
      createShift.mutate(values, { onSuccess: closeModal });
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteShift.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const isFormLoading = createShift.isPending || updateShift.isPending;

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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : !shifts?.length ? (
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
                    <TableCell>{formatTimeDisplay(shift.start_time)}</TableCell>
                    <TableCell>{formatTimeDisplay(shift.end_time)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(shift)}
                        >
                          Düzenle
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget(shift)}
                        >
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
        <ShiftForm
          shift={editingShift}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isLoading={isFormLoading}
        />
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
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteShift.isPending}
          >
            {deleteShift.isPending ? <Spinner size="sm" /> : "Sil"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
