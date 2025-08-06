-- CreateTable
CREATE TABLE "DraftEvent" (
    "id" TEXT NOT NULL,
    "parentid" TEXT,
    "impactAssessmentId" TEXT,
    "type" TEXT,
    "embargoed" TEXT,
    "estimatedStartDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "eventDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "frequency" TEXT,
    "frequencyInterval" INTEGER,
    "customFrequency" TEXT,
    "selectedDay" TEXT,
    "title" TEXT,
    "scheme" TEXT,
    "description" TEXT,
    "affectedCohortDescription" TEXT,
    "estimatedCohortSize" INTEGER,
    "cluster" TEXT,
    "group" TEXT,
    "department" TEXT,
    "OIC" TEXT,
    "OICEmail" TEXT,

    CONSTRAINT "DraftEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftImpactAssessment" (
    "id" TEXT NOT NULL,
    "perceivedUnhappiness" TEXT,
    "perceivedUnhappinessDetails" TEXT,
    "generateInterest" TEXT,
    "generateInterestDetails" TEXT,
    "haveAnnouncement" TEXT,
    "announcementTypes" TEXT[],
    "haveNotification" TEXT,
    "notificationTypes" TEXT[],
    "notificationDetails" TEXT,
    "haveActionRequired" TEXT,
    "actionRequiredDetails" TEXT,
    "dataInsightDetails" TEXT,
    "initiativesDetails" TEXT,
    "eventWriteUp" TEXT,
    "clearingHOD" TEXT,

    CONSTRAINT "DraftImpactAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedEvent" (
    "id" TEXT NOT NULL,
    "parentid" TEXT,
    "impactAssessmentId" TEXT,
    "type" TEXT NOT NULL,
    "embargoed" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "frequency" TEXT NOT NULL,
    "frequencyInterval" INTEGER,
    "customFrequency" TEXT,
    "selectedDay" TEXT,
    "title" TEXT NOT NULL,
    "scheme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "affectedCohortDescription" TEXT NOT NULL,
    "estimatedCohortSize" INTEGER NOT NULL,
    "cluster" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "OIC" TEXT NOT NULL,
    "OICEmail" TEXT NOT NULL,
    "lastUpdatedBy" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubmittedEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedImpactAssessment" (
    "id" TEXT NOT NULL,
    "perceivedUnhappiness" TEXT NOT NULL,
    "perceivedUnhappinessDetails" TEXT,
    "generateInterest" TEXT NOT NULL,
    "generateInterestDetails" TEXT,
    "haveAnnouncement" TEXT NOT NULL,
    "announcementTypes" TEXT[],
    "haveNotification" TEXT NOT NULL,
    "notificationTypes" TEXT[],
    "notificationDetails" TEXT,
    "haveActionRequired" TEXT NOT NULL,
    "actionRequiredDetails" TEXT,
    "dataInsightDetails" TEXT NOT NULL,
    "initiativesDetails" TEXT NOT NULL,
    "eventWriteUp" TEXT NOT NULL,
    "clearingHOD" TEXT,
    "lastUpdatedBy" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubmittedImpactAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AuthorizedUsers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "group" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "AuthorizedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubmittedEvent_eventDate_idx" ON "SubmittedEvent"("eventDate");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedUsers_email_key" ON "AuthorizedUsers"("email");

-- AddForeignKey
ALTER TABLE "DraftEvent" ADD CONSTRAINT "DraftEvent_impactAssessmentId_fkey" FOREIGN KEY ("impactAssessmentId") REFERENCES "DraftImpactAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedEvent" ADD CONSTRAINT "SubmittedEvent_impactAssessmentId_fkey" FOREIGN KEY ("impactAssessmentId") REFERENCES "SubmittedImpactAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
