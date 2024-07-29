/*
  Warnings:

  - You are about to drop the `Training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TrainingExercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingExercises" DROP CONSTRAINT "_TrainingExercises_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingExercises" DROP CONSTRAINT "_TrainingExercises_B_fkey";

-- DropTable
DROP TABLE "Training";

-- DropTable
DROP TABLE "_TrainingExercises";

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_WorkoutExercises" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutExercises_AB_unique" ON "_WorkoutExercises"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutExercises_B_index" ON "_WorkoutExercises"("B");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutExercises" ADD CONSTRAINT "_WorkoutExercises_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutExercises" ADD CONSTRAINT "_WorkoutExercises_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
