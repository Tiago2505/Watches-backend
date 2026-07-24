-- CreateTable
CREATE TABLE "Watch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Watch_pkey" PRIMARY KEY ("id")
);
