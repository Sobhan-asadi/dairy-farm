"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { deleteNewsAction } from "@/actions/admin/news";
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

type DeleteNewsButtonProps = {
  newsId: number;
  newsTitle: string;
};

export function DeleteNewsButton({ newsId, newsTitle }: DeleteNewsButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    try {
      setIsPending(true);

      await deleteNewsAction(newsId);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`حذف ${newsTitle}`}
          >
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف خبر</AlertDialogTitle>

          <AlertDialogDescription>
            آیا از حذف «{newsTitle}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>انصراف</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isPending ? "در حال حذف..." : "حذف خبر"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
