import type {
  CareerApplication,
  CareerApplicationStatus,
} from "@/types/career";

import {
  CareerApplicationsListParams,
  CareerService,
} from "../careers/career-service";

type GlobalWithMockCareerApplications = typeof globalThis & {
  __dairyFarmMockCareerApplications?: CareerApplication[];
};

const globalForCareers = globalThis as GlobalWithMockCareerApplications;

const initialCareerApplications: CareerApplication[] = [
  {
    id: "CA-1001",
    fullName: "علی رضایی",
    phone: "09121234567",
    email: "ali@example.com",
    message: "برای همکاری در بخش نگهداری و پرورش دام درخواست دارم.",
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "new",
    createdAt: "2026-08-18T08:30:00.000Z",
  },
  {
    id: "CA-1002",
    fullName: "محمد احمدی",
    phone: "09123456789",
    email: null,
    message: "سابقه فعالیت در واحدهای دامداری و شیردوشی دارم.",
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "reviewing",
    createdAt: "2026-08-17T11:15:00.000Z",
  },
  {
    id: "CA-1003",
    fullName: "رضا کریمی",
    phone: "09351234567",
    email: "reza@example.com",
    message: null,
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "accepted",
    createdAt: "2026-08-15T09:45:00.000Z",
  },

  {
    id: "CA-10403",
    fullName: "سبحان کریمی",
    phone: "09351234567",
    email: "reza@example.com",
    message: null,
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "accepted",
    createdAt: "2026-08-15T09:45:00.000Z",
  },

  {
    id: "CA-104003",
    fullName: "علی کریمی",
    phone: "09351234567",
    email: "reza@example.com",
    message: null,
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "accepted",
    createdAt: "2026-08-15T09:45:00.000Z",
  },

  {
    id: "CA-100",
    fullName: "رضا کریمی",
    phone: "09351234567",
    email: "reza@example.com",
    message: null,
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "accepted",
    createdAt: "2026-08-15T09:45:00.000Z",
  },

  {
    id: "CA-003",
    fullName: "رضا کریمی",
    phone: "09351234567",
    email: "reza@example.com",
    message: null,
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "accepted",
    createdAt: "2026-08-15T09:45:00.000Z",
  },

  {
    id: "CA-10083",
    fullName: "رضا کریمی",
    phone: "09351234567",
    email: "reza@example.com",
    message: null,
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "accepted",
    createdAt: "2026-08-15T09:45:00.000Z",
  },

  {
    id: "CBF-1003",
    fullName: "رضا کریمی",
    phone: "09351234567",
    email: "reza@example.com",
    message: null,
    resumeUrl: "/file/Resume-PDF-file.pdf",
    status: "accepted",
    createdAt: "2026-08-15T09:45:00.000Z",
  },
];

function getMockApplications() {
  if (!globalForCareers.__dairyFarmMockCareerApplications) {
    globalForCareers.__dairyFarmMockCareerApplications = structuredClone(
      initialCareerApplications,
    );
  }

  return globalForCareers.__dairyFarmMockCareerApplications;
}

function setMockApplications(applications: CareerApplication[]) {
  globalForCareers.__dairyFarmMockCareerApplications = applications;
}

export const mockCareerService: CareerService = {
  async getApplications({
    page,
    pageSize,
    search,
    status = "all",
  }: CareerApplicationsListParams) {
    const applications = getMockApplications();

    const safePage = Math.max(page, 1);
    const safePageSize = Math.max(pageSize, 1);

    const normalizedSearch = search?.trim().toLocaleLowerCase("fa-IR") ?? "";

    const filteredApplications = applications.filter((application) => {
      const matchesSearch =
        !normalizedSearch ||
        application.fullName
          .toLocaleLowerCase("fa-IR")
          .includes(normalizedSearch) ||
        application.phone.includes(normalizedSearch) ||
        application.email
          ?.toLocaleLowerCase("fa-IR")
          .includes(normalizedSearch);

      const matchesStatus = status === "all" || application.status === status;

      return matchesSearch && matchesStatus;
    });

    const totalItems = filteredApplications.length;

    const totalPages = Math.max(Math.ceil(totalItems / safePageSize), 1);

    const currentPage = Math.min(safePage, totalPages);

    const startIndex = (currentPage - 1) * safePageSize;
    const endIndex = startIndex + safePageSize;

    return {
      items: filteredApplications.slice(startIndex, endIndex),
      page: currentPage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    };
  },

  async getApplicationById(id) {
    const applications = getMockApplications();

    return applications.find((application) => application.id === id) ?? null;
  },

  async updateApplicationStatus(id, status: CareerApplicationStatus) {
    const applications = getMockApplications();

    const application = applications.find(
      (application) => application.id === id,
    );

    if (!application) {
      throw new Error("درخواست همکاری پیدا نشد.");
    }

    const updatedApplication: CareerApplication = {
      ...application,
      status,
    };

    setMockApplications(
      applications.map((currentApplication) =>
        currentApplication.id === id ? updatedApplication : currentApplication,
      ),
    );

    return updatedApplication;
  },
};
