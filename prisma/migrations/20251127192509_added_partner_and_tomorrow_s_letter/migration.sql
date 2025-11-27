-- CreateTable
CREATE TABLE "PartnerLink" (
    "id" TEXT NOT NULL,
    "userAId" TEXT NOT NULL,
    "userBId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TomorrowLetter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover" TEXT,
    "receiveDate" TEXT NOT NULL,
    "receiveTime" TEXT NOT NULL,
    "saved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "TomorrowLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerLink_userAId_key" ON "PartnerLink"("userAId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerLink_userBId_key" ON "PartnerLink"("userBId");

-- AddForeignKey
ALTER TABLE "PartnerLink" ADD CONSTRAINT "PartnerLink_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerLink" ADD CONSTRAINT "PartnerLink_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TomorrowLetter" ADD CONSTRAINT "TomorrowLetter_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TomorrowLetter" ADD CONSTRAINT "TomorrowLetter_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
