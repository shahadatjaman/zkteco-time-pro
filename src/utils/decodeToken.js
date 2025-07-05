// utils/decodeToken.ts
import { jwtDecode } from 'jwt-decode'; // ✅ Correct named import

export const decodeToken = token => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
