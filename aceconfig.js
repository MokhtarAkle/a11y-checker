module.exports = {
    ruleArchive: "latest",
    policies: ["WCAG_2_1"],
    failLevels: ["violation", "potentialviolation"],
    reportLevels: [
        "violation",
        "potentialviolation",
        "recommendation",
        "potentialrecommendation",
        "manual",
        "pass",
    ],
    outputFormat: ["json"],
    outputFilenameTimestamp: true,
    label: [process.env.TRAVIS_BRANCH],
    outputFolder: "results",
    baselineFolder: "test/baselines",
    cacheFolder: "/tmp/accessibility-checker"
};