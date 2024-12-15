import type { Config } from "release-it";

export default {
  git: {
    requireBranch: "main",
    commitMessage: "chore: release v${version}",
  },
  hooks: {
    "before:init": ["git pull", "yarn lint", "yarn build"],
  },
  github: {
    release: true,
  },
  npm: {
    publish: true,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "conventionalcommits",
        types: [
          {
            type: "feat",
            section: "Features",
          },
          {
            type: "fix",
            section: "Bug Fixes",
          },
        ],
      },
      infile: "CHANGELOG.md",
    },
  },
} satisfies Config;
