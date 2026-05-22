CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "businessName" TEXT,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "projectUrl" TEXT,
    "instagramStoryUrl" TEXT NOT NULL,
    "screenshotUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Review_isPublished_idx" ON "Review"("isPublished");
CREATE INDEX "Review_sortOrder_idx" ON "Review"("sortOrder");
CREATE INDEX "Review_createdAt_idx" ON "Review"("createdAt");
