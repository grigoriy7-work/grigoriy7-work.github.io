import { AuthResult, ResultFetchAuth, SignUpBody } from './types';

export const fetchAuthData = async (email: string, passowrd: string) => {
  const commandId = 'OTUS_React-2025-05';
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

    if (!response.ok) throw new Error('Ошибка при отправки запроса регистрации!');
    const result: AuthResult = await response.json();
    resultFetchAuth.authResult = result;
  } catch (error) {
    resultFetchAuth.serverErrors = error;
  }

  return resultFetchAuth;
};
