"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { deleteCattleRecordAction } from "@/actions/admin/cattle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type DeleteCattleRecordButtonProps = {
  cattleId: string;
  recordId: string;
};

export function DeleteCattleRecordButton({
  cattleId,
  recordId,
}: DeleteCattleRecordButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setIsPending(true);
      setError(null);

      await deleteCattleRecordAction(cattleId, recordId);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "حذف سابقه با خطا مواجه شد.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open) {
          setError(null);
        }
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="حذف سابقه"
          >
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف سابقه کارتکس</AlertDialogTitle>

          <AlertDialogDescription>
            آیا از حذف این سابقه مطمئن هستید؟ این عملیات قابل بازگشت نیست.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>انصراف</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              void handleDelete();
            }}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isPending ? "در حال حذف..." : "حذف سابقه"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
