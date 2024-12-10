-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('TECHNICAL', 'NON_TECHNICAL', 'ADMINISTRATIVE');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'DONE', 'INPROGRESS');

-- CreateEnum
CREATE TYPE "OUType" AS ENUM ('SB', 'CHAPTER', 'WIE', 'SIGHT');

-- CreateEnum
CREATE TYPE "PartnerPriority" AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('TECHNICAL', 'NON_TECHNICAL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SB_CHAIR', 'CHAPTER_CHAIR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CHAPTER_CHAIR',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Global" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "logo" TEXT,
    "addressId" INTEGER,
    "email" TEXT,
    "phone" TEXT,
    "socialMedia" TEXT[],
    "nbMmembers" INTEGER NOT NULL,
    "BecomePartnerDoc" TEXT,

    CONSTRAINT "Global_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OU" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "OUN" TEXT NOT NULL,
    "description" TEXT,
    "type" "OUType" NOT NULL,
    "logo" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "socialMedia" TEXT[],

    CONSTRAINT "OU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Officer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "mandateStart" TIMESTAMP(3) NOT NULL,
    "mandateEnd" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "socialMedia" TEXT[],
    "ouId" TEXT NOT NULL,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "cover" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "ouId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "nbAttendees" INTEGER,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "venueId" INTEGER,
    "isRemote" BOOLEAN NOT NULL DEFAULT false,
    "remoteLink" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "longitude" TEXT NOT NULL,
    "Latitude" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT NOT NULL,
    "priority" "PartnerPriority" NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "Type" "AchievementType" NOT NULL,
    "ouId" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MajorActivities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "details" JSONB,
    "cover" TEXT NOT NULL,
    "tags" TEXT[],
    "facebook" TEXT,
    "instagram" TEXT,
    "website" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MajorActivities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "isComingSoon" BOOLEAN NOT NULL,
    "globalId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPartner" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Global" ADD CONSTRAINT "Global_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Officer" ADD CONSTRAINT "Officer_ouId_fkey" FOREIGN KEY ("ouId") REFERENCES "OU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ouId_fkey" FOREIGN KEY ("ouId") REFERENCES "OU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_ouId_fkey" FOREIGN KEY ("ouId") REFERENCES "OU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_globalId_fkey" FOREIGN KEY ("globalId") REFERENCES "Global"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
