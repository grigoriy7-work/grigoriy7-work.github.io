import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import s from './ProfileCompletedForm.sass';
import { Title } from '../../../shared/ui/Title';
import { useTranslation } from 'react-i18next';
import { ProfileForm, ProfileFormValues, ProfileFormErrors } from './../../../features/forms/ProfileForm';
import { FormikConfig, useFormik } from 'formik';
import { Button } from 'antd';
import { isNotDefinedString } from './../../../utils/validation';

export type ProfileCompletedFormProps = {
  className?: string;
};

export const ProfileCompletedForm = memo<ProfileCompletedFormProps>(({ className }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = React.useState<{ name?: string; about?: string } | null>({
    name: 'John Doe',
    about: 'programmer',
  });

  const { onSubmit, validate, initialValues } = useMemo<
    Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    return {
      initialValues: {
        name: profile?.name,
        about: profile?.about,
      },
      onSubmit: (values, { setErrors }) => {
        console.log('Submitted values:', values);
      },
      validate: (values) => {
        const errors = {} as ProfileFormErrors;
        if (isNotDefinedString(values.name)) {
          errors.name = t(`errors.is_required`);
        }
        return errors;
      },
    };
  }, [profile, t]);

  const formManager = useFormik<ProfileFormValues>({
    initialValues,
    onSubmit,
    validate,
  });

  const { submitForm, setValues } = formManager;

  return (
    <div className={cn(/*s.root,*/ className)}>
      <Title /*className={s.title}*/>{t(`screens.ProfileScreen.updateProfile.title`)}</Title>
      <ProfileForm formManager={formManager} />
      <Button type="primary" onClick={submitForm}>
        {t(`screens.ProfileScreen.updateProfile.save`)}
      </Button>
    </div>
  );
});
