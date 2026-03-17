---
name: review-implementation-plan
description: Ревью плана реализации через subagent review-implementation-plan. Выявляет архитектурные проблемы, риски безопасности, недостающие шаги и непокрытые edge cases. Использовать после /create-implementation-plan, при «проверь план», «review plan».
---

# Ревью плана реализации

## Назначение

Команда для вызова subagent `review-implementation-plan`, который проверяет план на архитектурные проблемы, риски безопасности, недостающие шаги и непокрытые edge cases. Для каждой проблемы — объяснение и предложение решения.

## Алгоритм

1. **Определи план для ревью:**
   - Если пользователь указал файл — используй его
   - Если открыт файл из `docs/plans/*.md` — используй его
   - Иначе — `docs/plans/{X.Y}-{slug}.md` по имени открытой spec (для `docs/features/1.3-services.md` → `docs/plans/1.3-services.md`)
   - Иначе — найди в контексте последний вывод `create-implementation-plan`
   - Если план не найден — попроси вызвать `/create-implementation-plan` (план сохранится в docs/plans/), затем `/review-implementation-plan`

2. **Запусти subagent** `review-implementation-plan`:
   - Передай путь к файлу плана или полный текст
   - При наличии — путь к связанной спецификации (docs/features/*.md)

3. **Верни пользователю** отчёт subagent'а.

## Примеры вызова

- `/review-implementation-plan` (после /create-implementation-plan)
- «Проверь план реализации»
- «Review implementation plan»
