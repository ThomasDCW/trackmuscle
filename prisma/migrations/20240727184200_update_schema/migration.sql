/*
  Warnings:

  - You are about to drop the `TrainingExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TrainingExercise" DROP CONSTRAINT "TrainingExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingExercise" DROP CONSTRAINT "TrainingExercise_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_trainingId_fkey";

-- DropTable
DROP TABLE "TrainingExercise";

-- DropTable
DROP TABLE "WorkoutSession";

-- CreateTable
CREATE TABLE "_TrainingExercises" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrainingExercises_AB_unique" ON "_TrainingExercises"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainingExercises_B_index" ON "_TrainingExercises"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- AddForeignKey
ALTER TABLE "_TrainingExercises" ADD CONSTRAINT "_TrainingExercises_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingExercises" ADD CONSTRAINT "_TrainingExercises_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
