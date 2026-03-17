-- CreateTable
CREATE TABLE "service_categories" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "category_id" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "break_after_minutes" INTEGER DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_categories_business_id_idx" ON "service_categories"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "service_categories_business_id_name_key" ON "service_categories"("business_id", "name");

-- CreateIndex
CREATE INDEX "services_business_id_idx" ON "services"("business_id");

-- CreateIndex
CREATE INDEX "services_business_id_category_id_idx" ON "services"("business_id", "category_id");

-- CreateIndex
CREATE INDEX "services_business_id_position_idx" ON "services"("business_id", "position");

-- AddForeignKey
ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
