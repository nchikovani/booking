---
name: create-implementation-plan
description: Создаёт план реализации по спецификации фичи. Запускает subagent plan-creator. Использовать при «создай план», «plan implementation», «план по спецификации».
---

# План реализации по спецификации

## Алгоритм

1. **Определи файл спецификации:**
   - Если пользователь указал файл — используй его
   - Если открыт файл из `docs/features/*.md` — используй его
   - Иначе — возьми последний изменённый файл в `docs/features/` (кроме `_template.md`)

2. **Перед запуском subagent** — передай в контекст:
   - `docs/features/{X.Y}-{slug}.md` (спецификация)
   - `docs/architecture.md` — обязательно для учёта архитектуры
   - `docs/roadmap.md` — при наличии зависимостей

3. **Запусти subagent** `plan-creator`:
   - Передай путь к spec, architecture.md, roadmap.md
   - Subagent сформирует пошаговый план

4. **Сохрани план** в `docs/plans/{X.Y}-{slug}.md` (то же имя, что у spec: для `docs/features/1.3-services.md` → `docs/plans/1.3-services.md`).

5. **Верни пользователю** сформированный план и путь к сохранённому файлу.

## Примеры вызова

- `/create-implementation-plan`
- «Создай план реализации по текущей спецификации»
- «Plan implementation for 1.3-services»
