---
name: update-docs
description: Обновляет документацию после завершения фичи через subagent docs-updater. Синхронизирует spec и план с реализацией, roadmap, architecture. Использовать при «обнови документацию», «update docs», «синхронизируй spec с кодом», «фича завершена».
---

# Обновление документации после фичи

## Назначение

После завершения реализации фичи вызывает subagent `docs-updater`, который приводит документацию в соответствие с кодом: spec, план, roadmap, architecture, TODO, «После MVP».

## Алгоритм

1. **Определи контекст фичи:**
   - Spec: `docs/features/{X.Y}-{slug}.md` (открытый файл или указанный пользователем)
   - План: `docs/plans/{X.Y}-{slug}.md` (то же имя, что у spec)
   - Область изменений: `git diff` или список изменённых модулей/файлов

2. **Определи область** из spec или из изменённых файлов (apps/api → Backend; apps/admin → Admin; apps/miniapp → Miniapp) и **передай только релевантные architecture файлы:**
   - Backend → `docs/architecture-api.md`
   - Admin → `docs/architecture-frontend.md`, `docs/architecture-admin.md`
   - Miniapp → `docs/architecture-frontend.md`, `docs/architecture-miniapp.md`
   - Смешанная → объединение релевантных

3. **Запусти subagent** `docs-updater`:
   - Передай spec, план, область изменений
   - Передай в контекст: `docs/roadmap.md` + **только** architecture файлы по области (см. выше)
   - Subagent прочитает документы и код, обновит spec, план, roadmap, при необходимости только релевантный architecture файл и README

4. **Верни пользователю** сводку обновлённых файлов.

## Примеры вызова

- `/update-docs`
- «Обнови документацию после фичи 1.2»
- «Фича завершена, синхронизируй spec и roadmap»
- «Update docs for 1.3-services»
