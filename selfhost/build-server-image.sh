#!/bin/bash
# Build the PurpleBot server image on the Linux server, from the AppImage in dist/.
# deploy.sh server calls this script over SSH. Build the AppImage there first:
#   bun install --frozen-lockfile && bun run dist:linux

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
IMAGE="${1:-ghcr.io/tokenine/purplebot:latest}"

appimage="$(ls -1 "$REPO_ROOT"/dist/PurpleBot-*-x86_64.AppImage 2>/dev/null | sort -V | tail -1 || true)"
[ -n "$appimage" ] || {
  echo "build-server-image: no dist/PurpleBot-*-x86_64.AppImage in $REPO_ROOT. Build it first: bun install --frozen-lockfile && bun run dist:linux" >&2
  exit 1
}

# The build context holds the AppImage alone, under the name docker/Dockerfile expects.
# A hard link needs no second copy.
context="$SCRIPT_DIR/image"
mkdir -p "$context"
ln -f "$appimage" "$context/PurpleBot.AppImage"

docker build --file "$REPO_ROOT/docker/Dockerfile" --tag "$IMAGE" "$context"
echo "build-server-image: built $IMAGE from $(basename "$appimage")"
