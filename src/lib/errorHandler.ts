// lib/errorHandler.ts
import { Prisma } from "@prisma/client";

export type AppError = {
  field?: string; // optional field name (like username, email, phone)
  message: string; // human-readable error for frontend
};

export function handleAppError(error: unknown): AppError {
  // Handle Clerk API errors
  if (typeof error === "object" && error !== null && "clerkError" in error) {
    const clerkErr = error as any;
    const firstError = clerkErr.errors?.[0];
    return {
      field: firstError?.meta?.paramName,
      message:
        firstError?.longMessage ||
        firstError?.message ||
        "Authentication error",
    };
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = (error.meta?.target as string[])?.[0];
        return {
          field: target,
          message: `${capitalize(
            target
          )} is already taken. Please use another.`,
        };
      }
      case "P2003":
        return { message: "Invalid reference. Related record does not exist." };
      case "P2025":
        return { message: "Record not found or already deleted." };
      default:
        return { message: "Database error occurred." };
    }
  }

  // Handle generic JS errors
  if (error instanceof Error) {
    return { message: error.message };
  }

  // Fallback
  return { message: "An unexpected error occurred. Please try again." };
}

function capitalize(str?: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
