import { AuthResult, ResultFetchAuth, ServerErrors, SignUpBody } from './types';

export const fetchAuthData = async (email: string, passowrd: string) => {
  const commandId = 'OTUS_React-2025-05_Grigoriy';
  const resultFetchAuth: ResultFetchAuth = {};

  try {
    const signUpBody: SignUpBody = {
      email: email,
      password: passowrd,
      commandId: commandId,
    };

    const response = await fetch('http://19429ba06ff2.vps.myjino.ru/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpBody),
    });
    const result = await response.json();
    if (response.ok) {
      resultFetchAuth.authResult = result as AuthResult;
    } else {
      resultFetchAuth.serverErrors = result as ServerErrors;
    }
    return resultFetchAuth;
  } catch (error) {
    throw new Error('Error fetching auth data: ' + error);
  }
};
