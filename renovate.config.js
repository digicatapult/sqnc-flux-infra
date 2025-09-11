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
      "main",
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
      },
      {
        matchManagers: ["flux"],
        matchFileNames: [
          "clusters/kind-cluster/**/*.yaml",
          "clusters/kind-cluster/**/*.yml",
        ],
        postUpgradeTasks: {
          fileFilters: [
            "clusters/kind-cluster/**/*.yaml",
            "clusters/kind-cluster/**/*.yml"
          ]
        },
        separateMajorMinor: true,
        separateMultipleMajor: true,
        separateMinorPatch: false,
        groupName: null,
        automerge: true,
        addLabels: ["automerge", "kind"],
      },
      {
        matchManagers: ["flux"],
        matchFileNames: [
          "clusters/kind-cluster/**/*.yaml",
          "clusters/kind-cluster/**/*.yml"
        ],
        postUpgradeTasks: {
          fileFilters: [
            "clusters/kind-cluster/**/*.yaml",
            "clusters/kind-cluster/**/*.yml"
          ]
        },
        matchUpdateTypes: ["major"],
        groupName: null,
        automerge: false,
        labels: ["dependencies", "flux", "kind"]
      },
    ],
  };
};
