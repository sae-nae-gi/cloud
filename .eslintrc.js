module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    extends: ["airbnb", "prettier"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
        legacyDecorators: true,
        },
        allowImportExportEverywhere: true,
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-hooks",
    ],
    "rules": {
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "import/first": "off",
        "import/order": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-empty-function": "off",
    }
};