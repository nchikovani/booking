import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { UiButton, UiInput } from '@repo/ui';
import { ROUTE_REGISTER } from '@shared/constants/routes';
import { validateEmail } from '@shared/lib/validation/email';
import { useLoginMutation } from '../model/useLoginMutation';
import { validateAuthPassword } from '../model/validation';

export function LoginForm() {
  const { t } = useTranslation();
  const loginMutation = useLoginMutation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [editedAfterSubmit, setEditedAfterSubmit] = useState({ email: false, password: false });

  const emailErrKey = submitAttempted && !editedAfterSubmit.email ? validateEmail(email) : null;
  const passwordErrKey =
    submitAttempted && !editedAfterSubmit.password ? validateAuthPassword(password) : null;

  const emailHelper = emailErrKey ? t(`auth.validation.email.${emailErrKey}`) : '';
  const passwordHelper = passwordErrKey ? t(`auth.validation.password.${passwordErrKey}`) : '';

  function focusFirstInvalid() {
    if (emailErrKey || validateEmail(email)) {
      emailRef.current?.focus();
      return;
    }
    if (passwordErrKey || validateAuthPassword(password)) {
      passwordRef.current?.focus();
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);
    setEditedAfterSubmit({ email: false, password: false });

    const eKey = validateEmail(email);
    const pKey = validateAuthPassword(password);
    if (eKey || pKey) {
      setTimeout(focusFirstInvalid, 0);
      return;
    }

    await loginMutation.mutateAsync({ email: email.trim(), password });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Typography component="h1" variant="h2">
        {t('auth.login.title')}
      </Typography>

      <UiInput
        required
        name="email"
        type="email"
        label={t('auth.login.email')}
        placeholder={t('auth.login.emailPlaceholder')}
        autoComplete="email"
        value={email}
        onChange={(ev) => {
          setEmail(ev.target.value);
          if (submitAttempted) {
            setEditedAfterSubmit((prev) => ({ ...prev, email: true }));
          }
        }}
        error={Boolean(emailErrKey)}
        helperText={emailHelper}
        disabled={loginMutation.isPending}
        slotProps={{
          htmlInput: { ref: emailRef },
        }}
      />

      <UiInput
        required
        name="password"
        type="password"
        label={t('auth.login.password')}
        placeholder={t('auth.login.passwordPlaceholder')}
        autoComplete="current-password"
        spellCheck={false}
        value={password}
        onChange={(ev) => {
          setPassword(ev.target.value);
          if (submitAttempted) {
            setEditedAfterSubmit((prev) => ({ ...prev, password: true }));
          }
        }}
        error={Boolean(passwordErrKey)}
        helperText={passwordHelper}
        disabled={loginMutation.isPending}
        slotProps={{
          htmlInput: { ref: passwordRef },
        }}
      />

      <div className="flex justify-end">
        <MuiLink
          component="a"
          href="/forgot-password"
          variant="body2"
          color="primary"
          underline="hover"
        >
          {t('auth.login.forgotPassword')}
        </MuiLink>
      </div>

      <UiButton type="submit" uiVariant="primary" loading={loginMutation.isPending} fullWidth>
        {t('auth.login.submit')}
      </UiButton>

      <div className="flex flex-wrap items-center justify-center gap-1">
        <Typography variant="body2" color="text.secondary" component="p">
          {t('auth.login.noAccount')}
        </Typography>
        <MuiLink
          component={RouterLink}
          to={ROUTE_REGISTER}
          variant="body2"
          color="primary"
          underline="hover"
        >
          {t('auth.login.registerLink')}
        </MuiLink>
      </div>
    </form>
  );
}
