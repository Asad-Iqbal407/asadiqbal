import { SignJWT, jwtVerify } from 'jose';

const ISSUER = 'asadiqbal-portfolio';
const TOKEN_LIFETIME = '12h';

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set to a random string of at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

/** Creates a signed, expiring admin session token for the given user id. */
export async function signAdminToken(userId: string): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(TOKEN_LIFETIME)
    .sign(getSecret());
}

/**
 * Verifies an admin token and returns the user id it was issued to,
 * or null if the token is missing, invalid, tampered with or expired.
 * Throws only if the server is misconfigured (no JWT_SECRET).
 */
export async function verifyAdminToken(token: string): Promise<string | null> {
  const secret = getSecret();
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: ISSUER,
      algorithms: ['HS256'],
    });
    return payload.role === 'admin' && typeof payload.sub === 'string' ? payload.sub : null;
  } catch {
    return null;
  }
}
