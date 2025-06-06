# PkgFinder 🔍📦

PkgFinder is a lightweight and fast browser extension that adds smart package discovery directly to your address bar. Just type `pkg` followed by a query and instantly jump to your favorite package registry.

---

## ✨ Features

- 🔍 **Omnibox-powered**: Search directly from the browser address bar.
- 🧠 **Smart Suggestions**: Instant autocomplete from your most-used registries.
- 💾 **Recent History**: Remembers your latest lookups and shows them as fallback.
- 🎨 **Visual Flair Modes**: Toggle between compact and detailed suggestion views.
- 🚀 **Built with TypeScript**, modularized and scalable.

---

## 🚀 Quick Start

### 1. Clone the repo:

```bash
git clone https://github.com/yorickcleerbout/PkgFinder.git
cd PkgFinder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the extension

```bash
npm run build
```

### 4. Load the extension:

* Go to `chrome://extensions`
* Enable **Developer Mode**
* Click "**Load unpacked**"
* Select the `/dist` folder

## 🔧 Usage

* Focus the address bar (Ctrl+L or click)
* Type `pkg`, then space, followed by your query:

```rust
pkg npm axios
pkg py requests
pkg pub provider
```

You’ll see suggestions with version info, description, and links — click one to jump directly to the package.

## 📚 Supported Registries

| Prefix     | Registry      | Language        | Icon | Base URL                                 |
|------------|---------------|-----------------|------|-------------------------------------------|
| `npm`      | npm           | JavaScript      | 🟢   | [https://www.npmjs.com/package/](https://www.npmjs.com/package/)    |
| `py`       | PyPI          | Python          | 🐍   | [https://pypi.org/project/](https://pypi.org/project/)         |
| `pub`      | pub.dev       | Dart / Flutter  | 🎯   | [https://pub.dev/packages/](https://pub.dev/packages/)         |


## 🛠 Coming Soon

These additional ecosystems are planned:

* 🦀 cargo → crates.io (Rust)
* 🐘 packagist → PHP Composer
* 💠 nuget → .NET & C#
* 💎 gem → RubyGems
* ☕ maven → Java / Kotlin
* 🐹 go → Go modules
* 🧭 **Popup UI** — Quickly view and manage recent searches, toggle flair mode, or set a default registry via a small browser popup.

Want to suggest a registry? Open an [issue](https://github.com/yorickcleerbout/pkgfinder/issues) or [pull request](https://github.com/yorickcleerbout/pkgfinder/pulls)!

## 💡 Dev Notes

* Manifest V3 compliant
* Written in modern TypeScript
* Uses modular fetch routers for each registry
* Shared type system and formatter across registries

## 📄 License

This project is licensed under the [MIT License](LICENSE).
