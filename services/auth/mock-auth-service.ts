import type { AuthService } from "./auth-service";

export const mockAuthService: AuthService = {
  async login(credentials) {
    const response = await fetch("/api/mock-auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  async register(data) {
    const response = await fetch("/api/mock-auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Register failed");
    }

    return response.json();
  },

  async forgotPassword() {
    await new Promise((resolve) => setTimeout(resolve, 700));
  },

  async logout() {
    const response = await fetch("/api/mock-auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },
};
