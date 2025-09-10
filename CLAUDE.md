# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive machine learning playground for educational purposes, allowing users to visualize and experiment with fundamental ML algorithms. Live at http://ml-playground.com

## Common Development Commands

### Development
```bash
npm run dev      # Start webpack in watch mode for development
```

### Production Build
```bash
npm run build    # Create optimized production build
```

## Architecture

### Tech Stack
- **Framework**: React 15.5.4 with ES2015/JSX
- **Build Tool**: Webpack 2.2.1 with Babel transpilation
- **Styling**: Bootstrap 4.3.1 + LESS
- **Math Library**: mathjs for neural network computations
- **SVM Library**: svm.js for Support Vector Machine implementation

### Model Architecture

Each ML model extends a base pattern:
1. **Model Classes** (`src/*.jsx`): Individual model implementations (KNN, Perceptron, SVM, Neural Network, Decision Tree)
2. **Canvas System** (`src/canvas.jsx`): Interactive drawing surface for data points
3. **Data Store** (`src/store.jsx`): Centralized data management for training points
4. **UI Controller** (`src/ui.jsx`): Model selection, parameter controls, and visualization

### Key Implementation Patterns

1. **Model Interface**: All models implement common methods:
   - `train(data)`: Train on dataset
   - `predict(point)`: Classify a single point
   - `visualize()`: Generate prediction heatmap for canvas

2. **Canvas Interaction**: Click to add points, right-click to remove, color represents class

3. **State Management**: Centralized store pattern without Redux, using direct React state updates

### File Structure
```
src/
├── main.jsx         # App bootstrap and tutorial setup
├── ui.jsx           # Main UI component with model controls
├── canvas.jsx       # Interactive canvas for data visualization
├── store.jsx        # Data point storage and management
├── s.jsx            # Global configuration constants
└── [model].jsx      # Individual ML model implementations
```

## Supported Models

- **KNN** (`knn.jsx`): K-Nearest Neighbors with adjustable K value
- **Perceptron** (`perceptron.jsx`): Linear binary classifier
- **SVM** (`svm.jsx`): Support Vector Machine with RBF kernel
- **Neural Network** (`ann.jsx`): Multi-layer perceptron with backpropagation
- **Decision Tree** (`tree.jsx`): ID3-based decision tree classifier