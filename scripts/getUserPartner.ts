import { prisma } from "@/lib/database/prisma";

const getUserPartner = async (userID: string) => {
  try {
    const partnerLink = await prisma.partnerLink.findFirst({
      where: {
        OR: [{ userAId: userID }, { userBId: userID }],
      },
      include: {
        userA: true,
        userB: true,
      },
    });

    return partnerLink;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default getUserPartner;
