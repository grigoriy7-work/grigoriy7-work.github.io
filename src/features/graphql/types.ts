export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
      fieldName?: string;
      stacktrace: string;
    };

    name: string;
    message: string;
  }[];
};

export enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD', // Если не корректный email или пароль
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST', // При регистрации если пользователь уже существует
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED', // Обязательное поле. В ошибке будет дополнительное поле fieldName с указанием, какое конкретно поле обязательно
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD', // Некорректный старый пароль при попытке его изменить
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD', // Пароль не соответствует регулярному выражению /^[\w-@{}()#$%^&*+=!~]{8,}$/
  ERR_NOT_VALID = 'ERR_NOT_VALID', // Не валидный id сущности
  ERR_AUTH = 'ERR_AUTH', // Токен не передан, либо не прошел авторизацию
  ERR_NO_FILES = 'ERR_NO_FILES', // Ошибка при загрузке файлов
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED', // Нет доступа к данной операции (нельзя редактировать заказ другого пользователя)
  ERR_NOT_FOUND = 'ERR_NOT_FOUND', // Сущность не найдена
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR', // Не валидные данные, например, не указано name

  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER', // Серверная ошибка. Обратитесь ко мне, этой ошибки быть не должно
}
