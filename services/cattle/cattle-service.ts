import type { Cattle } from "@/types/cattle";
import type { CattleRecord } from "@/types/cattle-record";

export type CattleListParams = {
  page: number;
  pageSize: number;
  search?: string;
  status?: Cattle["status"] | "all";
};

export type PaginatedCattle = {
  items: Cattle[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type CreateCattleInput = Omit<Cattle, "id" | "createdAt" | "updatedAt">;

export type UpdateCattleInput = Partial<CreateCattleInput>;

export type CreateCattleRecordInput = CattleRecord extends infer Record
  ? Record extends CattleRecord
    ? Omit<Record, "id" | "cattleId" | "createdAt" | "updatedAt">
    : never
  : never;

export type UpdateCattleRecordInput = CreateCattleRecordInput;

export interface CattleService {
  getCattle(params: CattleListParams): Promise<PaginatedCattle>;

  getCattleById(id: string): Promise<Cattle | null>;

  getCattleByTagNumber(tagNumber: string): Promise<Cattle | null>;

  createCattle(data: CreateCattleInput): Promise<Cattle>;

  updateCattle(id: string, data: UpdateCattleInput): Promise<Cattle>;

  deleteCattle(id: string): Promise<void>;

  getCattleRecords(cattleId: string): Promise<CattleRecord[]>;

  getCattleRecordById(
    cattleId: string,
    recordId: string,
  ): Promise<CattleRecord | null>;

  createCattleRecord(
    cattleId: string,
    data: CreateCattleRecordInput,
  ): Promise<CattleRecord>;

  updateCattleRecord(
    cattleId: string,
    recordId: string,
    data: UpdateCattleRecordInput,
  ): Promise<CattleRecord>;

  deleteCattleRecord(cattleId: string, recordId: string): Promise<void>;
}
