import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth-constants";

export { SESSION_COOKIE };

type SessionPayload = {
  adminId: string;
  email: string;
};

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error("AUTH_SECRET must be set and at least 24 characters long.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifySession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.adminId !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getCurrentAdmin() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  if (!session) return null;

  return prisma.adminUser.findUnique({
    where: { id: session.adminId },
    select: { id: true, email: true, name: true },
  });
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function validateAdminPassword(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.passwordHash);
  return valid ? admin : null;
}
