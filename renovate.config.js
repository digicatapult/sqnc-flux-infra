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
    extends: [
      "config:best-practices"
    ],
    // configMigration: true,
    // extends: [
    //   "config:recommended",
    //   "docker:pinDigests",
    //   "helpers:pinGitHubActionDigests",
    //   ":pinDevDependencies"
    // ],
    flux: {
      fileMatch: [
        "clusters/kind-cluster/base/flux-system/gotk-components.ya?ml$",
      ],
      ignorePaths: [
        "clusters/l3-sqnc",
        "clusters/sqnc-staging",
      ]
    },
    kubernetes: {
      fileMatch: [
        "clusters/kind-cluster/.*\\.ya?ml$",
      ],
      ignorePaths: [
        "clusters/l3-sqnc",
        "clusters/sqnc-staging",
        "**/flux-system/**",
      ]
    },
    kustomize: {
      fileMatch: [
        "clusters/kind-cluster/**kustomization.ya?ml$",
      ],
      ignorePaths: [
        "clusters/l3-sqnc",
        "clusters/sqnc-staging",
      ]
    },
    packageRules: [
      //
    ],
  };
};
