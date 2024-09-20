# Bun-Scripty

**Bun-Scripty** is a tool that enables you to define npm scripts in separate TypeScript files, designed specifically for use with [Bun](https://bun.sh/). This project is inspired by the excellent [scripty](https://github.com/testdouble/scripty) by Test Double.

## Why Bun-Scripty?

Instead of packing your `package.json` with a long list of scripts, Bun-Scripty allows you to organize each script into its own TypeScript file. This not only keeps your `package.json` cleaner but also makes each script easier to manage, debug, and scale.

## Installation

To install Bun-Scripty, simply run:

```bash
bun add bun-scripty
```

## Usage

1. **Create a `scripts` directory** in your project root (you can customize this path later).
2. **Add your TypeScript script files** inside this directory. For example, you could add `scripts/test.ts` for a `test` script.
3. **Make the script files executable** with the following command:

   ```bash
   chmod +x scripts/test.ts
   ```

4. **Update your `package.json`** to use Bun-Scripty for running your scripts:

   ```json
   {
     "scripts": {
       "test": "bun-scripty"
     }
   }
   ```

Now, when you run `bun run test`, Bun-Scripty will execute the `scripts/test.ts` file.

## Valid Script Delimiters

Bun-Scripty supports different delimiters for separating script segments, including `:`, and `_`. While `:` is the standard in npm scripts, it can cause issues with tab autocompletion in some environments, in which case `_` may be more reliable.

For instance, the following `package.json` configuration will map to `scripts/test/unit.ts`:

```json
{
  "scripts": {
    "test:unit": "bun-scripty",
    "test_unit": "bun-scripty"
  }
}
```

## Customizing Script Path

By default, Bun-Scripty looks for script files in the `scripts` directory. To change this, you can customize the path by adding the following configuration to your `package.json`:

```json
{
  "config": {
    "bun-scripty": {
      "scriptPath": "custom/path"
    }
  }
}
```

Alternatively, you can set the `BUN_SCRIPTY_SCRIPT_PATH` environment variable to the desired path.

```bash
export BUN_SCRIPTY_SCRIPT_PATH="custom/path"
```

## Features

- Organize npm scripts into separate, maintainable TypeScript files.
- Support for nested directories for more complex script structures.
- Works seamlessly with Bun.
- Easily customizable script paths.

## Limitations and Future Plans

- **Current Limitation**: Bun-Scripty currently supports only TypeScript (`.ts`) files.
- **Future Plans**: We aim to expand support to other languages, similar to the original scripty project.

## Acknowledgements

This project is heavily inspired by [scripty](https://github.com/testdouble/scripty) from Test Double. We extend our gratitude for their well-structured solution, which served as the basis for Bun-Scripty.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

We welcome contributions! Feel free to submit a pull request with your improvements or ideas.
