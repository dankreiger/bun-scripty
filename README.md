# Bun-Scripty

Bun-Scripty is a package that allows you to define npm scripts in separate TypeScript files, adapted to work with [Bun](https://bun.sh/). This project is inspired by and based on [scripty](https://github.com/testdouble/scripty) by Test Double.

## Introduction

Bun-Scripty allows you to organize your npm scripts into separate TypeScript files, making them easier to maintain and manage. Instead of cluttering your `package.json` with numerous script commands, you can create individual TypeScript script files for each command.

## Installation

```bash
bun add bun-scripty
```

## Usage

1. Create a `scripts` directory in your project root (or customize the path, see [Customizing Script Path](#customizing-script-path)).
2. Add your TypeScript script files in this directory. For example, `scripts/test.ts` for a `test` script.
3. Make your script files executable:

   ```bash
      chmod +x scripts/test.ts
   ```

4. In your `package.json`, use Bun-Scripty to run your scripts:

   ```json
   {
     "scripts": {
       "test": "bun-scripty"
     }
   }
   ```

Now, when you run `bun run test`, Bun-Scripty will execute the `scripts/test.ts` file.

---

### Valid Delimiters

Other valid separating delimiters are `:`, `.`, `|`, and `/`. These represent the same pattern i.e. a new folder.

```json
// All of the examples below will look for the script in the `scripts/test/unit.ts` file
{
  "scripts": {
    "test:unit": "bun-scripty",
    "test.unit": "bun-scripty",
    "test|unit": "bun-scripty",
    "test/unit": "bun-scripty"
  }
}
```

{
"scripts": {
"test:unit": "bun-scripty",
"test.unit": "bun-scripty",
"test|unit": "bun-scripty",
"test/unit": "bun-scripty"
}
}

```

As of now, the common ':' delimiter works, but bun's zsh autocomplete shows it in a weird way. The other delimiters work as expected
with the autocomplete.

## Features

- Organize npm scripts into separate TypeScript files
- Support for nested directories
- Works seamlessly with Bun
- Customizable script path

## Current Limitations and Future Plans

- **Current Version**: Bun-Scripty currently only supports TypeScript (.ts) files.
- **Future Expansion**: We plan to expand support to other languages in future releases, similar to the original scripty project.

## Acknowledgements

This project is based on the excellent [scripty](https://github.com/testdouble/scripty) package by Test Double. We'd like to express our gratitude for their solid script setup and structure, which served as the foundation for Bun-Scripty.

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
```
