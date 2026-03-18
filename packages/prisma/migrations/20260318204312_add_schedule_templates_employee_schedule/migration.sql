-- CreateTable
CREATE TABLE "schedule_templates" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_template_days" (
    "id" TEXT NOT NULL,
    "schedule_template_id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time_minutes" INTEGER NOT NULL,
    "end_time_minutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_template_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_template_day_breaks" (
    "id" TEXT NOT NULL,
    "schedule_template_day_id" TEXT NOT NULL,
    "start_time_minutes" INTEGER NOT NULL,
    "end_time_minutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedule_template_day_breaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schedules" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "schedule_template_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schedule_days" (
    "id" TEXT NOT NULL,
    "employee_schedule_id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time_minutes" INTEGER NOT NULL,
    "end_time_minutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_schedule_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schedule_day_breaks" (
    "id" TEXT NOT NULL,
    "employee_schedule_day_id" TEXT NOT NULL,
    "start_time_minutes" INTEGER NOT NULL,
    "end_time_minutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_schedule_day_breaks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "schedule_templates_business_id_idx" ON "schedule_templates"("business_id");

-- CreateIndex
CREATE INDEX "schedule_template_days_schedule_template_id_idx" ON "schedule_template_days"("schedule_template_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_template_days_schedule_template_id_day_of_week_key" ON "schedule_template_days"("schedule_template_id", "day_of_week");

-- CreateIndex
CREATE INDEX "schedule_template_day_breaks_schedule_template_day_id_idx" ON "schedule_template_day_breaks"("schedule_template_day_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_schedules_employee_id_key" ON "employee_schedules"("employee_id");

-- CreateIndex
CREATE INDEX "employee_schedules_employee_id_idx" ON "employee_schedules"("employee_id");

-- CreateIndex
CREATE INDEX "employee_schedules_schedule_template_id_idx" ON "employee_schedules"("schedule_template_id");

-- CreateIndex
CREATE INDEX "employee_schedule_days_employee_schedule_id_idx" ON "employee_schedule_days"("employee_schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_schedule_days_employee_schedule_id_day_of_week_key" ON "employee_schedule_days"("employee_schedule_id", "day_of_week");

-- CreateIndex
CREATE INDEX "employee_schedule_day_breaks_employee_schedule_day_id_idx" ON "employee_schedule_day_breaks"("employee_schedule_day_id");

-- AddForeignKey
ALTER TABLE "schedule_templates" ADD CONSTRAINT "schedule_templates_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_template_days" ADD CONSTRAINT "schedule_template_days_schedule_template_id_fkey" FOREIGN KEY ("schedule_template_id") REFERENCES "schedule_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_template_day_breaks" ADD CONSTRAINT "schedule_template_day_breaks_schedule_template_day_id_fkey" FOREIGN KEY ("schedule_template_day_id") REFERENCES "schedule_template_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedules" ADD CONSTRAINT "employee_schedules_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedules" ADD CONSTRAINT "employee_schedules_schedule_template_id_fkey" FOREIGN KEY ("schedule_template_id") REFERENCES "schedule_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedule_days" ADD CONSTRAINT "employee_schedule_days_employee_schedule_id_fkey" FOREIGN KEY ("employee_schedule_id") REFERENCES "employee_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedule_day_breaks" ADD CONSTRAINT "employee_schedule_day_breaks_employee_schedule_day_id_fkey" FOREIGN KEY ("employee_schedule_day_id") REFERENCES "employee_schedule_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;
