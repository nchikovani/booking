---
name: review-feature-spec
description: Запускает ревью текущей спецификации фичи через subagent spec-reviewer. Использовать после создания спецификации, при «проверь спецификацию», «review feature spec», «ревью фичи».
---

# Ревью спецификации фичи

## Назначение

Команда для вызова subagent `spec-reviewer`, который проверяет спецификацию на критические проблемы, противоречия, недостающие требования и непокрытые edge cases.

## Алгоритм

1. **Определи файл для ревью:**
   - Если пользователь указал файл — используй его
   - Если открыт файл из `docs/features/*.md` — используй его
   - Иначе — возьми последний изменённый файл в `docs/features/` (кроме `_template.md`)

2. **Определи область** из spec (раздел «Область реализации») и **передай только релевантные architecture файлы:**
   - Backend/БД → `docs/architecture-api.md`
   - Admin → `docs/architecture-frontend.md`, `docs/architecture-admin.md`
   - Miniapp → `docs/architecture-frontend.md`, `docs/architecture-miniapp.md`
   - Смешанная → объединение релевантных

3. **Запусти subagent** `spec-reviewer`:
   - Передай spec + **только** architecture файлы по области (см. выше)
   - Subagent выполнит только review, без изменений

4. **Верни пользователю** отчёт subagent'а с найденными проблемами, предложениями решений и списком вопросов для уточнения.

## Примеры вызова

- `/review-feature-spec`
- «Проверь текущую спецификацию фичи»
- «Review feature spec 1.3-services.md»
