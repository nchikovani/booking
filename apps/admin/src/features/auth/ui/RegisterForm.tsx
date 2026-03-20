import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UiButton, UiCheckbox, UiInput, tokens } from '@repo/ui';
import { ROUTE_LOGIN } from '@shared/constants/routes';
import { validateEmail } from '@shared/lib/validation/email';
import { useRegisterMutation } from '../model/useRegisterMutation';
import { validateAuthPassword, validateAuthPasswordConfirm } from '../model/validation';

export function RegisterForm() {
  const { t } = useTranslation();
  const registerMutation = useRegisterMutation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const consentCheckboxRef = useRef<HTMLButtonElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [editedAfterSubmit, setEditedAfterSubmit] = useState({
    email: false,
    password: false,
    confirm: false,
    consent: false,
  });

  const emailErrKey = submitAttempted && !editedAfterSubmit.email ? validateEmail(email) : null;
  const passwordErrKey =
    submitAttempted && !editedAfterSubmit.password ? validateAuthPassword(password) : null;
  const confirmErrKey =
    submitAttempted && !editedAfterSubmit.confirm
      ? validateAuthPasswordConfirm(password, passwordConfirm)
      : null;
  const consentError = submitAttempted && !editedAfterSubmit.consent && !consent;

  function focusFirstInvalid() {
    if (emailErrKey || validateEmail(email)) {
      emailRef.current?.focus();
      return;
    }
    if (passwordErrKey || validateAuthPassword(password)) {
      passwordRef.current?.focus();
      return;
    }
    passwordConfirmRef.current?.focus();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);
    setEditedAfterSubmit({ email: false, password: false, confirm: false, consent: false });

    const eKey = validateEmail(email);
    const pKey = validateAuthPassword(password);
    const cKey = validateAuthPasswordConfirm(password, passwordConfirm);

    if (eKey || pKey || cKey) {
      setTimeout(focusFirstInvalid, 0);
      return;
    }

    if (!consent) {
      setTimeout(() => consentCheckboxRef.current?.focus(), 0);
      return;
    }

    try {
      await registerMutation.mutateAsync({ email: email.trim(), password });
    } catch {
      // Ошибку уже обрабатывает onError внутри useRegisterMutation.
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Typography component="h1" variant="h2">
        {t('auth.register.title')}
      </Typography>

      <UiInput
        required
        name="email"
        type="email"
        label={t('auth.register.email')}
        placeholder={t('auth.register.emailPlaceholder')}
        autoComplete="email"
        value={email}
        onChange={(ev) => {
          setEmail(ev.target.value);
          if (submitAttempted) {
            setEditedAfterSubmit((prev) => ({ ...prev, email: true }));
          }
        }}
        error={Boolean(emailErrKey)}
        helperText={emailErrKey ? t(`auth.validation.email.${emailErrKey}`) : ''}
        disabled={registerMutation.isPending}
        slotProps={{ htmlInput: { ref: emailRef, 'data-testid': 'auth-register-email' } }}
      />

      <UiInput
        required
        name="password"
        type={showPassword ? 'text' : 'password'}
        label={t('auth.register.password')}
        placeholder={t('auth.register.passwordPlaceholder')}
        autoComplete="new-password"
        spellCheck={false}
        value={password}
        onChange={(ev) => {
          setPassword(ev.target.value);
          if (submitAttempted) {
            setEditedAfterSubmit((prev) => ({ ...prev, password: true }));
          }
        }}
        error={Boolean(passwordErrKey)}
        helperText={passwordErrKey ? t(`auth.validation.password.${passwordErrKey}`) : ''}
        disabled={registerMutation.isPending}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? t('auth.password.hide') : t('auth.password.show')}
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              tabIndex={-1}
            >
              {showPassword ? <VisibilityOffIcon sx={{ color: tokens.color.textSecondary }} /> : <VisibilityIcon sx={{ color: tokens.color.textTertiary }} />}
            </IconButton>
          </InputAdornment>
        }
        slotProps={{ htmlInput: { ref: passwordRef, 'data-testid': 'auth-register-password' } }}
      />

      <UiInput
        required
        name="passwordConfirm"
        type={showPasswordConfirm ? 'text' : 'password'}
        label={t('auth.register.passwordConfirm')}
        placeholder={t('auth.register.passwordConfirmPlaceholder')}
        autoComplete="new-password"
        spellCheck={false}
        value={passwordConfirm}
        onChange={(ev) => {
          setPasswordConfirm(ev.target.value);
          if (submitAttempted) {
            setEditedAfterSubmit((prev) => ({ ...prev, confirm: true }));
          }
        }}
        error={Boolean(confirmErrKey)}
        helperText={confirmErrKey ? t(`auth.validation.passwordConfirm.${confirmErrKey}`) : ''}
        disabled={registerMutation.isPending}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPasswordConfirm ? t('auth.password.hide') : t('auth.password.show')
              }
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
              edge="end"
              tabIndex={-1}
            >
              {showPasswordConfirm ? <VisibilityOffIcon sx={{ color: tokens.color.textSecondary }} /> : <VisibilityIcon sx={{ color: tokens.color.textTertiary }} />}
            </IconButton>
          </InputAdornment>
        }
        slotProps={{
          htmlInput: { ref: passwordConfirmRef, 'data-testid': 'auth-register-password-confirm' },
        }}
      />
      <div className="flex flex-col gap-2">
        <FormControlLabel
          sx={{ alignItems: 'flex-start', mx: 0, gap: 1 }}
          control={
            <UiCheckbox
              ref={consentCheckboxRef}
              checked={consent}
              onChange={(_, checked) => {
                setConsent(Boolean(checked));
                if (submitAttempted) {
                  setEditedAfterSubmit((prev) => ({ ...prev, consent: true }));
                }
              }}
              disabled={registerMutation.isPending}
            />
          }
          label={
            <Typography component="p" variant="caption" color="text.secondary">
              <Trans
                i18nKey="auth.register.consentText"
                components={{
                  offerLink: (
                    <MuiLink
                      component="a"
                      href="/offer"
                      variant="caption"
                      color="primary"
                      underline="hover"
                    />
                  ),
                  privacyLink: (
                    <MuiLink
                      component="a"
                      href="/privacy"
                      variant="caption"
                      color="primary"
                      underline="hover"
                    />
                  ),
                }}
              />
            </Typography>
          }
        />

        {consentError ? (
          <Typography role="alert" variant="body2" sx={{ color: 'error.main' }}>
            {t('auth.register.consentRequired')}
          </Typography>
        ) : null}
      </div>
      <UiButton type="submit" uiVariant="primary" loading={registerMutation.isPending} fullWidth>
        {t('auth.register.submit')}
      </UiButton>

      <div className="flex flex-wrap items-center justify-center gap-1">
        <Typography variant="body2" color="text.secondary" component="p">
          {t('auth.register.hasAccount')}
        </Typography>
        <MuiLink
          component={RouterLink}
          to={ROUTE_LOGIN}
          variant="body2"
          color="primary"
          underline="hover"
        >
          {t('auth.register.loginLink')}
        </MuiLink>
      </div>
    </form>
  );
}
