# Tutorial Monorepo

A monorepo setup using **pnpm workspaces** containing multiple applications and shared packages.

## 📁 Project Structure

```
tutorial/
├── apps/
│   └── landing-page/          # TanStack Start application
├── packages/
│   └── shared-ui/             # Shared React component library with shadcn/ui
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # Workspace configuration
└── pnpm-lock.yaml            # Lock file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)

### Installation

Install all dependencies for the entire monorepo:

```bash
pnpm install
```

This will install dependencies for all packages and apps in the workspace.

## 🎯 Working with Specific Apps/Packages

### Using the `--filter` Flag

pnpm allows you to target specific packages or apps using the `--filter` flag:

#### Development Commands

```bash
pnpm --filter <app> <script>

# Example
pnpm --filter landing-page dev
```

When developing on an internal package, you can use the `--watch` flag to make the package automatically create a new build when detecting changes:

```bash
# Example
pnpm --filter shared-ui build --watch
```

#### Build Commands

```bash
# Build all packages
pnpm run build --recursive

# Build only packages (not apps)
pnpm --filter "./packages/*" build

# Build only apps
pnpm --filter "./apps/*" build

```

## 📦 Managing Internal Dependencies

### Adding Internal Packages to Apps

To add an internal package (like `shared-ui`) to an app (like `landing-page`):

```bash
pnpm add shared-ui --filter landing-page --workspace
```

This will add `"shared-ui": "workspace:^"` to the landing-page's `package.json`.

### Adding External Dependencies

```bash
# Add external dependency to specific app
pnpm add lodash --filter landing-page

# Add dev dependency to specific package
pnpm add -D typescript --filter shared-ui
```
