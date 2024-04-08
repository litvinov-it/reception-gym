-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(15) NOT NULL,
    "lastName" VARCHAR(15) NOT NULL,
    "middleName" VARCHAR(15) NOT NULL,
    "passportSeries" INTEGER NOT NULL,
    "passportNumber" INTEGER NOT NULL,
    "dateOfBirth" VARCHAR(10) NOT NULL,
    "phoneNumber" VARCHAR(10) NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "dateAbonement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(15) NOT NULL,
    "lastName" VARCHAR(15) NOT NULL,
    "middleName" VARCHAR(15) NOT NULL,
    "passportSeries" INTEGER NOT NULL,
    "passportNumber" INTEGER NOT NULL,
    "dateOfBirth" VARCHAR(10) NOT NULL,
    "phoneNumber" VARCHAR(10) NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shedule" (
    "clientId" INTEGER NOT NULL,
    "trainerId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shedule_pkey" PRIMARY KEY ("clientId","trainerId")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "role" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_phoneNumber_key" ON "Client"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_phoneNumber_key" ON "Trainer"("phoneNumber");

-- AddForeignKey
ALTER TABLE "shedule" ADD CONSTRAINT "shedule_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shedule" ADD CONSTRAINT "shedule_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
