import type { Cattle } from "@/types/cattle";
import type { CattleRecord } from "@/types/cattle-record";

import type {
  CattleListParams,
  CattleService,
  CreateCattleInput,
  CreateCattleRecordInput,
  UpdateCattleInput,
  UpdateCattleRecordInput,
} from "./cattle-service";

type CattleMockStore = {
  cattle: Cattle[];
  records: CattleRecord[];
};

type GlobalWithCattleMock = typeof globalThis & {
  __dairyFarmCattleMock?: CattleMockStore;
};

const globalForCattle = globalThis as GlobalWithCattleMock;

const initialCattle: Cattle[] = [
  {
    id: "CTL-1001",
    tagNumber: "1405-001",
    name: null,
    gender: "female",
    breed: "هلشتاین",
    birthDate: "2024-03-15",
    entryDate: "2024-03-15",
    motherTagNumber: "1399-128",
    fatherTagNumber: null,
    status: "active",
    notes: null,
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-01T08:00:00.000Z",
  },
  {
    id: "CTL-1002",
    tagNumber: "1405-002",
    name: null,
    gender: "female",
    breed: "هلشتاین",
    birthDate: "2023-11-08",
    entryDate: "2023-11-08",
    motherTagNumber: "1398-074",
    fatherTagNumber: null,
    status: "active",
    notes: "دام در دوره شیردهی قرار دارد.",
    createdAt: "2026-08-02T08:00:00.000Z",
    updatedAt: "2026-08-02T08:00:00.000Z",
  },
  {
    id: "CTL-1003",
    tagNumber: "1405-003",
    name: null,
    gender: "male",
    breed: "سمینتال",
    birthDate: "2024-06-20",
    entryDate: "2024-06-20",
    motherTagNumber: null,
    fatherTagNumber: null,
    status: "sold",
    notes: null,
    createdAt: "2026-08-03T08:00:00.000Z",
    updatedAt: "2026-08-10T08:00:00.000Z",
  },
];

const initialRecords: CattleRecord[] = [
  {
    id: "REC-1001",
    cattleId: "CTL-1001",
    type: "weight",
    date: "2026-08-05",
    weightKg: 485,
    notes: null,
    createdAt: "2026-08-05T08:00:00.000Z",
    updatedAt: "2026-08-05T08:00:00.000Z",
  },
  {
    id: "REC-1002",
    cattleId: "CTL-1001",
    type: "milk-production",
    date: "2026-08-10",
    amountLiters: 31.5,
    notes: "ثبت تولید روزانه شیر",
    createdAt: "2026-08-10T08:00:00.000Z",
    updatedAt: "2026-08-10T08:00:00.000Z",
  },
  {
    id: "REC-1003",
    cattleId: "CTL-1001",
    type: "vaccination",
    date: "2026-08-12",
    vaccineName: "واکسن تب برفکی",
    dose: "۲ میلی‌لیتر",
    nextDoseDate: null,
    notes: null,
    createdAt: "2026-08-12T08:00:00.000Z",
    updatedAt: "2026-08-12T08:00:00.000Z",
  },
];

function getStore(): CattleMockStore {
  if (!globalForCattle.__dairyFarmCattleMock) {
    globalForCattle.__dairyFarmCattleMock = {
      cattle: structuredClone(initialCattle),
      records: structuredClone(initialRecords),
    };
  }

  return globalForCattle.__dairyFarmCattleMock;
}

export const mockCattleService: CattleService = {
  async getCattle({
    page,
    pageSize,
    search,
    status = "all",
  }: CattleListParams) {
    const { cattle } = getStore();

    const safePage = Math.max(page, 1);
    const safePageSize = Math.max(pageSize, 1);

    const normalizedSearch = search?.trim().toLocaleLowerCase("fa-IR") ?? "";

    const filteredCattle = cattle.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.tagNumber.toLocaleLowerCase("fa-IR").includes(normalizedSearch) ||
        item.name?.toLocaleLowerCase("fa-IR").includes(normalizedSearch) ||
        item.breed.toLocaleLowerCase("fa-IR").includes(normalizedSearch);

      const matchesStatus = status === "all" || item.status === status;

      return matchesSearch && matchesStatus;
    });

    const totalItems = filteredCattle.length;

    const totalPages = Math.max(Math.ceil(totalItems / safePageSize), 1);

    const currentPage = Math.min(safePage, totalPages);

    const startIndex = (currentPage - 1) * safePageSize;

    return {
      items: filteredCattle.slice(startIndex, startIndex + safePageSize),
      page: currentPage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    };
  },

  async getCattleById(id) {
    const { cattle } = getStore();

    return cattle.find((item) => item.id === id) ?? null;
  },

  async getCattleByTagNumber(tagNumber) {
    const { cattle } = getStore();

    return cattle.find((item) => item.tagNumber === tagNumber) ?? null;
  },

  async createCattle(data: CreateCattleInput) {
    const store = getStore();

    const cattle: Cattle = {
      id: `CTL-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.cattle = [cattle, ...store.cattle];

    return cattle;
  },

  async updateCattle(id, data: UpdateCattleInput) {
    const store = getStore();

    const cattle = store.cattle.find((item) => item.id === id);

    if (!cattle) {
      throw new Error("دام پیدا نشد.");
    }

    const updatedCattle: Cattle = {
      ...cattle,
      ...data,
      id: cattle.id,
      updatedAt: new Date().toISOString(),
    };

    store.cattle = store.cattle.map((item) =>
      item.id === id ? updatedCattle : item,
    );

    return updatedCattle;
  },

  async deleteCattle(id) {
    const store = getStore();

    const cattleExists = store.cattle.some((item) => item.id === id);

    if (!cattleExists) {
      throw new Error("دام پیدا نشد.");
    }

    const hasRecords = store.records.some((record) => record.cattleId === id);

    if (hasRecords) {
      throw new Error(
        "این دام دارای سابقه کارتکس است و امکان حذف مستقیم آن وجود ندارد.",
      );
    }

    store.cattle = store.cattle.filter((item) => item.id !== id);
  },

  async getCattleRecords(cattleId) {
    const { records } = getStore();

    return records.filter((record) => record.cattleId === cattleId);
  },

  async getCattleRecordById(cattleId, recordId) {
    const { records } = getStore();

    return (
      records.find(
        (record) => record.id === recordId && record.cattleId === cattleId,
      ) ?? null
    );
  },

  async createCattleRecord(cattleId, data: CreateCattleRecordInput) {
    const store = getStore();

    const cattleExists = store.cattle.some((item) => item.id === cattleId);

    if (!cattleExists) {
      throw new Error("دام پیدا نشد.");
    }

    const record: CattleRecord = {
      id: `REC-${Date.now()}`,
      cattleId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.records = [record, ...store.records];

    return record;
  },

  async updateCattleRecord(cattleId, recordId, data: UpdateCattleRecordInput) {
    const store = getStore();

    const record = store.records.find(
      (item) => item.id === recordId && item.cattleId === cattleId,
    );

    if (!record) {
      throw new Error("سابقه موردنظر پیدا نشد.");
    }

    const updatedRecord: CattleRecord = {
      ...data,
      id: record.id,
      cattleId: record.cattleId,
      createdAt: record.createdAt,
      updatedAt: new Date().toISOString(),
    };

    store.records = store.records.map((item) =>
      item.id === recordId && item.cattleId === cattleId ? updatedRecord : item,
    );

    return updatedRecord;
  },

  async deleteCattleRecord(cattleId, recordId) {
    const store = getStore();

    const recordExists = store.records.some(
      (record) => record.id === recordId && record.cattleId === cattleId,
    );

    if (!recordExists) {
      throw new Error("سابقه موردنظر پیدا نشد.");
    }

    store.records = store.records.filter(
      (record) => !(record.id === recordId && record.cattleId === cattleId),
    );
  },
};
