-- CreateTable
CREATE TABLE "AllowedUser" (
    "id" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "AllowedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AllowedUser_discordId_key" ON "AllowedUser"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "AllowedUser_email_key" ON "AllowedUser"("email");
