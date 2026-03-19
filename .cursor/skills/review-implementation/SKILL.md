---
name: review-implementation
description: Верификация реализации фичи через subagent impl-verifier. Проверяет соответствие кода спецификации, архитектуре и безопасности. Тесты/линт/типы — отдельно через run-verification-checks.
---

# Верификация реализации

## Назначение

Команда для вызова subagent `impl-verifier` (Sonnet), который анализирует код на соответствие спецификации, плану, архитектуре и безопасности. Не запускает тесты — для этого используй `/run-verification-checks`.

## Алгоритм

1. **Определи контекст для ревью:**
   - Спецификация: если пользователь указал — используй; иначе — открытый файл из `docs/features/*.md` или последний изменённый
   - План: `docs/plans/{X.Y}-{slug}.md` (то же имя, что у spec; для `docs/features/1.3-services.md` → `docs/plans/1.3-services.md`). Или из контекста чата, если файла нет
   - Область изменений: изменённые файлы (git diff), или указанный модуль/пакет

2. **Определи область** из spec (раздел «Область реализации») и **передай только релевантные architecture файлы:**
   - Backend/БД → `docs/architecture-api.md`
   - Admin → `docs/architecture-frontend.md`, `docs/architecture-admin.md`
   - Miniapp → `docs/architecture-frontend.md`, `docs/architecture-miniapp.md`
   - Смешанная → объединение релевантных

3. **Опционально:** запусти `/run-verification-checks` и передай результаты subagent'у.

4. **Запусти subagent** `impl-verifier`:
   - Передай spec, план (если есть), список затронутых файлов/модулей
   - Передай в контекст: **только** architecture файлы по области (см. выше)
   - Передай результаты test/lint/check-types (если есть)

5. **Верни пользователю** отчёт с таблицей AC, результатами проверок и списком проблем.

## Примеры вызова

- `/review-implementation`
- «Проверь реализацию фичи 1.2»
- «Review implementation»
- «Верификация перед коммитом»
