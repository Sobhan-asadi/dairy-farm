import type {
  CareerApplication,
  CareerApplicationStatus,
} from "@/types/career";

export type CareerApplicationsListParams = {
  page: number;
  pageSize: number;
  search?: string;
  status?: CareerApplicationStatus | "all";
};

export type PaginatedCareerApplications = {
  items: CareerApplication[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export interface CareerService {
  getApplications(
    params: CareerApplicationsListParams,
  ): Promise<PaginatedCareerApplications>;

  getApplicationById(id: string): Promise<CareerApplication | null>;

  updateApplicationStatus(
    id: string,
    status: CareerApplicationStatus,
  ): Promise<CareerApplication>;
}
