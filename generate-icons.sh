#!/bin/bash

# Script to generate PWA icons from SVG
# Requires: imagemagick or librsvg (install with: brew install librsvg)

cd "$(dirname "$0")/icons"

# Icon sizes needed for PWA
sizes=(72 96 128 144 152 192 384 512)

echo "Generating PWA icons..."

# Check if rsvg-convert is available (preferred)
if command -v rsvg-convert &> /dev/null; then
    echo "Using rsvg-convert..."
    for size in "${sizes[@]}"; do
        echo "Creating ${size}x${size} icon..."
        rsvg-convert -w $size -h $size icon.svg -o "icon-${size}x${size}.png"
    done
# Check if ImageMagick is available
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick convert..."
    for size in "${sizes[@]}"; do
        echo "Creating ${size}x${size} icon..."
        convert -background none -resize "${size}x${size}" icon.svg "icon-${size}x${size}.png"
    done
# Check if sips is available (macOS built-in, but needs PNG input)
elif command -v sips &> /dev/null; then
    echo "Warning: sips requires PNG input. Please install librsvg or imagemagick:"
    echo "  brew install librsvg"
    echo "  or"
    echo "  brew install imagemagick"
    exit 1
else
    echo "Error: No image conversion tool found."
    echo "Please install one of the following:"
    echo "  brew install librsvg (recommended)"
    echo "  brew install imagemagick"
    exit 1
fi

echo "✅ Icon generation complete!"
echo ""
echo "Generated icons:"
ls -lh icon-*.png
