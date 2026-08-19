"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { deleteCattleAction } from "@/actions/admin/cattle";
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

type DeleteCattleButtonProps = {
  cattleId: string;
};

export function DeleteCattleButton({ cattleId }: DeleteCattleButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setIsPending(true);
      setError(null);

      const result = await deleteCattleAction(cattleId);

      if (!result.success) {
        setError(result.message);
      }
    } catch {
      setError("حذف دام با خطا مواجه شد.");
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
          <Button type="button" variant="destructive">
            <Trash2 className="size-4" />
            حذف دام
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف دام</AlertDialogTitle>

          <AlertDialogDescription>
            آیا از حذف این دام مطمئن هستید؟ اگر دام دارای سابقه کارتکس باشد،
            امکان حذف آن وجود ندارد.
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
            {isPending ? "در حال حذف..." : "حذف دام"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
