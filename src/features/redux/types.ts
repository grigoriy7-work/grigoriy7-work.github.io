import { Role } from '../../types/roles';
import { ServerErrors } from '../forms/AuthForm/types';

export interface Profile {
  email: string;
  name: string;
  about: string;
  role: Role;
}

export interface AuthState {
  token: string;
  isAuthenticated: boolean;
  profile?: Profile;
  loading: boolean;
  errorRegistration?: ServerErrors | null;
}

export interface OperationState {
  operations: OperationType[];
}

interface CategoryType {
  id: string;
  name: string;
}

export interface OperationType {
  id: string;
  /**сумма */
  amount: number;
  /**название категории */
  type: string;
  /**название */
  name: string;
  /**описание */
  description?: string;
  /**дата */
  createdAt: string;
  category?: CategoryType;
}

export type RegistationData = {
  email: string;
  password: string;
};
