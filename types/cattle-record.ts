export type CattleRecordType =
  | "health"
  | "treatment"
  | "vaccination"
  | "breeding"
  | "calving"
  | "milk-production"
  | "weight";

type BaseCattleRecord = {
  id: string;
  cattleId: string;
  date: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type HealthRecord = BaseCattleRecord & {
  type: "health";
  condition: string;
  symptoms: string | null;
};

export type TreatmentRecord = BaseCattleRecord & {
  type: "treatment";
  diagnosis: string;
  medication: string | null;
  dosage: string | null;
  veterinarian: string | null;
};

export type VaccinationRecord = BaseCattleRecord & {
  type: "vaccination";
  vaccineName: string;
  dose: string | null;
  nextDoseDate: string | null;
};

export type BreedingRecord = BaseCattleRecord & {
  type: "breeding";
  method: "natural" | "artificial-insemination";
  bullTagNumber: string | null;
  inseminationCode: string | null;
  result: "pending" | "pregnant" | "not-pregnant";
};

export type CalvingRecord = BaseCattleRecord & {
  type: "calving";
  calfCount: number;
  liveCalfCount: number;
  complications: string | null;
};

export type MilkProductionRecord = BaseCattleRecord & {
  type: "milk-production";
  amountLiters: number;
};

export type WeightRecord = BaseCattleRecord & {
  type: "weight";
  weightKg: number;
};

export type CattleRecord =
  | HealthRecord
  | TreatmentRecord
  | VaccinationRecord
  | BreedingRecord
  | CalvingRecord
  | MilkProductionRecord
  | WeightRecord;
