// ORGANIZER SETTINGS. Edit this file to customize the game.

export const gameConfig = {
  event: {
    name: "IEEE Xtreme 20",
    organizer: "IEEE Computer Society",
  },

  // Approved branding assets. Put files in /public/branding/ and set the path,
  // e.g. "/branding/xtreme-20.png". Leave null to show a text placeholder.
  branding: {
    eventLogo: null,
    organizerLogo: null,
  },

  text: {
    welcomeHeading: "Can You Recognize Them All?",
    welcomeSubtitle:
      "10 logos. 10 challenges. How well do you know the tools powering computer science?",
    welcomeNote:
      "Your answers are submitted without immediate feedback. You will see your result at the end.",
    startButton: "Start Challenge",
    inputLabel: "Enter the logo name",
    submitButton: "Submit Answer",
    emptyAnswerError: "Please type an answer before submitting.",
    submissionNotice: "Answer submitted. Moving to the next challenge...",
    completionHeading: "Challenge Complete!",
    thankYou:
      "Thank you for taking part in the IEEE Xtreme 20 Logo Challenge.",
    // {threshold} is replaced with the qualification threshold.
    eligibleMessage:
      "Your score meets the coupon consideration threshold ({threshold}+). Your result has been recorded. Coupon eligibility is subject to organizer verification.",
    notEligibleMessage:
      "Your result has been recorded. Thank you for playing. Follow our channels for future challenges.",
    playAgainButton: "Play Again",
    footerNote:
      "All logos are trademarks of their respective owners and are used for identification only.",
  },

  rules: {
    totalRounds: 10,
    easyCount: 3, // difficulty 1-2
    mediumCount: 4, // difficulty 3
    hardCount: 3, // difficulty 4-5
    qualificationThreshold: 8,
    pointsPerCorrect: 1,
    randomSelection: true,
    allowSkip: false, // true = empty answers are accepted and score 0
    transitionMs: 900, // delay before moving to the next round
  },

  // Where logo images come from:
  //  "jsdelivr"          Simple Icons from jsDelivr CDN (monochrome SVG) [default]
  //  "simpleicons-color" Simple Icons CDN with brand colors
  //  "local"             files in /public/logos/<id>.svg
  logos: {
    source: "jsdelivr",
    simpleIconsVersion: "13", // jsDelivr resolves this to the latest 13.x release
    localExtension: "svg",
  },

  colors: {
    background: "#050B18",
    surface: "#0B1730",
    primary: "#2F7BFF", // electric blue
    secondary: "#22D3EE", // cyan
    textPrimary: "#F4F8FF",
    textSecondary: "#A9B8D4",
  },
};