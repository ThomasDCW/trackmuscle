-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
