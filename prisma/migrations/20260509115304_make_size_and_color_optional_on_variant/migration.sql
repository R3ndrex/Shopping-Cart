-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_sizeId_fkey";

-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "sizeId" DROP NOT NULL,
ALTER COLUMN "colorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;
