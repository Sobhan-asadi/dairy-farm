export type CareerApplicationStatus =
  "new" | "reviewing" | "accepted" | "rejected";

export type CareerApplication = {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  message: string | null;
  resumeUrl: string;
  status: CareerApplicationStatus;
  createdAt: string;
};
