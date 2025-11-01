import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export const LOGIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
      }
    }
  }
`;

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginResponse {
  profile: {
    signin: {
      token: string;
    };
  };
}

export const LoginHandlerAsync = async (
  values: LoginVariables,
  loginMutation: useMutation.MutationFunction<LoginResponse, LoginVariables>,
  eventAfter: (token: string) => void
) => {
  try {
    const response = await loginMutation({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
    const newToken = response.data.profile.signin.token;
    eventAfter(newToken);
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        token
      }
    }
  }
`;

export interface SignupVariables {
  email: string;
  password: string;
  commandId: string;
}

export interface SignupResponse {
  profile: {
    signup: {
      token: string;
    };
  };
}

export const SignupHandlerAsync = async (
  values: SignupVariables,
  signupMutation: useMutation.MutationFunction<SignupResponse, SignupVariables>,
  eventAfter: (token: string) => void
) => {
  try {
    const response = await signupMutation({
      variables: {
        email: values.email,
        password: values.password,
        commandId: values.commandId,
      },
    });
    const newToken = response.data.profile.signup.token;
    eventAfter(newToken);
  } catch (error) {
    console.error('Login error:', error);
  }
};
