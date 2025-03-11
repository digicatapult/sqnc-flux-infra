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
    onboarding: false,
    requireConfig: false,
    allowedPostUpgradeCommands: [
      //
    ],
    prHourlyLimit: 20,
    prConcurrentLimit: 20,
    recreateWhen: "always",
    flux: {
      fileMatch: [
        "clusters/kind-cluster/\\.ya?ml$",
      ],
      ignorePaths: [
        "clusters/l3-sqnc",
        "clusters/sqnc-staging",
      ]
    },
    regexManagers: [
      {
        "fileMatch": [
          "clusters/kind-cluster/release\\.ya?ml$",
        ],
        "matchStrings": [
          "registryUrl=(?<registryUrl>.*?)\n *chart: (?<depName>.*?)\n *version: (?<currentValue>.*)\n"
        ],
        "datasourceTemplate": "helm"
      }
    ],
    packageRules: [
      //
    ],
  };
};
