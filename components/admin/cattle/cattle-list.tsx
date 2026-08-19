import type { Cattle } from "@/types/cattle";

import { CattleListItem } from "./cattle-list-item";

type CattleListProps = {
  cattle: Cattle[];
};

export function CattleList({ cattle }: CattleListProps) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="bg-muted/40 text-muted-foreground hidden grid-cols-[1.2fr_1fr_1fr_1fr_1fr_100px] gap-4 border-b px-5 py-3 text-sm font-medium md:grid">
        <span>شماره پلاک</span>
        <span>نژاد</span>
        <span>جنسیت</span>
        <span>وضعیت</span>
        <span>تاریخ ورود</span>
        <span>عملیات</span>
      </div>

      {cattle.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium">دامی پیدا نشد</p>

          <p className="text-muted-foreground mt-2 text-sm">
            شماره پلاک، نام، نژاد یا فیلتر وضعیت را تغییر دهید.
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {cattle.map((item) => (
            <CattleListItem key={item.id} cattle={item} />
          ))}
        </div>
      )}
    </div>
  );
}
