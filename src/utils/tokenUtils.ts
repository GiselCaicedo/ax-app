import { SignJWT } from 'jose';

export async function generateToken(clientCode: string): Promise<string> {


  try {
    const token = await new SignJWT({ clientCode })
      // Establecer el emisor
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      // Establecer la expiración a 24 horas
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode('secret'));

    return token;
  } catch (err) {
    throw err;
  }
}

