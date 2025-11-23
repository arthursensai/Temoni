import { NextResponse } from "next/server";
import withAuth from "@/lib/auth/withAuth";

import withRateLimit from "@/lib/security/withRateLimit";

const limit = withRateLimit(30, 60);

export const GET = withAuth(async (req, session) => {
  if (!session.user.discordId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rateLimitResponse = await limit(session.user.id);

  if (rateLimitResponse) return rateLimitResponse;

  const loveQuotes = [
    "Love is not a promise spoken, but a presence that proves itself in absence.",
    "Love grows in silence, not in words.",
    "True love is felt in the heart before it is heard by the ears.",
    "Love is the art of seeing the invisible and cherishing it.",
    "A heart in love knows the language of longing.",
    "Love is measured by patience, not by passion.",
    "Love whispers in gestures, not in declarations.",
    "When love is real, it finds its way even through distance.",
    "Love is not held, it is shared freely.",
    "A glance of love speaks more than a thousand letters.",
    "Love does not seek perfection, but embraces flaws.",
    "In absence, love is the thread that ties hearts together.",
    "Love is not possession; it is appreciation.",
    "The depth of love is shown in quiet support, not loud words.",
    "Love is a journey felt more than spoken.",
    "Love is remembered in little acts, not grand promises.",
    "True love is steady, like a flame in the wind.",
    "Love is the echo of kindness in another heart.",
    "A loving heart sees beauty where others see none.",
    "Love is felt more in moments than in memories.",
    "The truest love is gentle and unwavering.",
    "Love grows quietly, like roots beneath the soil.",
    "Words can fade, but love leaves an enduring mark.",
    "Love is the light that softens every shadow.",
    "To love is to give without expectation.",
    "Love is the melody that lingers when words end.",
    "Even in silence, love speaks volumes.",
    "Love is not about holding on, but letting hearts connect.",
    "Love is a quiet understanding in the midst of chaos.",
    "Hearts in love recognize each other without introduction.",
    "Love is a sanctuary for those who dare to trust.",
    "Love is not hurried; it is nurtured.",
    "Love is patience witnessed in everyday life.",
    "A heart that loves sees with clarity beyond sight.",
    "Love is the courage to be vulnerable.",
    "In love, absence is the test and presence is the proof.",
    "Love is a bridge built with compassion and care.",
    "To love is to treasure moments, not possessions.",
    "True love lingers even when voices fade.",
    "Love is the quiet force that moves mountains within hearts.",
    "Love is not a question, but an answer in action.",
    "A heart in love listens with more than ears.",
    "Love blooms where trust is sown.",
    "Love does not vanish in distance; it transforms.",
    "The power of love lies in its constancy, not its intensity.",
    "Love is a gentle revolution within the soul.",
    "Love is the warmth felt in a cold world.",
    "True love sees the soul, not the mask.",
    "Love is the anchor in the storms of life.",
    "Love is the poetry that life itself cannot write.",
    "A heart that loves never counts the cost.",
  ];

  const randomNumber = Math.floor(Math.random() * loveQuotes.length);

  const randomQuote = loveQuotes[randomNumber];

  return NextResponse.json({ quote: randomQuote, ok: true }, { status: 200 });
});
