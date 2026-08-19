import { FilePlus2, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Cattle } from "@/types/cattle";

import { DeleteCattleButton } from "./delete-cattle-button";

type CattleActionsProps = {
  cattle: Cattle;
};

export function CattleActions({ cattle }: CattleActionsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button
        nativeButton={false}
        render={
          <Link href={`/admin/cattle/${cattle.id}/records/new`}>
            <FilePlus2 />
            افزودن سابقه
          </Link>
        }
      />

      <Button
        nativeButton={false}
        variant="outline"
        render={
          <Link href={`/admin/cattle/${cattle.id}/edit`}>
            <Pencil />
            ویرایش مشخصات
          </Link>
        }
      />

      <DeleteCattleButton cattleId={cattle.id} />
    </div>
  );
}
