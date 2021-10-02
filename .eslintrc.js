module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "plugin:prettier/recommended",
    ],
    "ignorePatterns": [".next/**/*", "node_modules/"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    "rules": {
        "semi": 0,
        "quotes": ["error", "double"],
        "no-unused-vars": "warn",
    }
};