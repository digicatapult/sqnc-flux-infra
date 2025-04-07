module.exports = (config = {}) => {
  const isSelfHosted = process.env.RENOVATE_SELF_HOSTED === "true";

  if (!isSelfHosted) {
    console.log("Renovate is disabled when running via GitHub App.");
    return {
      enabled: false,
      onboarding: false,
    };
  }

  console.log("Renovate is running in self-hosted mode.");

  return {
    $schema: "https://docs.renovatebot.com/renovate-schema.json",
    baseBranches: [
      "dev",
    ],
    extends: [
      ":timezone(Europe/London)"
    ],
    onboarding: false,
    requireConfig: false,
    prHourlyLimit: 20,
    prConcurrentLimit: 20,
    recreateWhen: "always",
    flux: {
      fileMatch: [
        "clusters/kind-cluster/.*\\.ya?ml$",
      ],
      ignorePaths: [
        "clusters/l3-sqnc",
        "clusters/sqnc-staging",
      ]
    },
    packageRules: [
      {
        matchManagers: [
          "flux",
        ],
        pinDigests: false
      },
      {
        schedule: [
          "0 9-17 * * *"
        ]
      }
    ],
  };
};
