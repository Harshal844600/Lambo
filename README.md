LAMBORGHINI AVENTADOR /// CINEMATIC EXPERIENCE
License Next.js Tailwind CSS Framer Motion

"The Aventador is a car that refuses to compromise. It is pure emotion."

A high-performance, cinematic web experience showcasing the legendary Lamborghini Aventador. This project pushes the boundaries of web animation, featuring a frame-by-frame scroll sequence, technical exploded views, and a fully interactive 3D-style configurator.

🏎️ Features
🎥 Cinematic Scroll Sequence
Frame-Accurate playback: 200+ frames of high-resolution image sequencing triggered by scroll.
Dynamic HUD Overlay: Data-driven overlays that reveal specs and narrative elements in sync with the visual journey.
🔧 Technical Exploded View
Simulated Mechanics: At the climax of the sequence, the engine components "explode" outward.
Technical Labeling: Wireframe-style UI elements highlight critical engineering details like the Inconel exhaust and pushrod suspension.
🎨 Interactive Configurator
Customization: Change exterior colors, wheel types, and caliper finishes in real-time.
Pricing Calculation: Dynamic price updates based on selected options.
Premium UI: Glassmorphism and smooth spring animations for a luxury feel.
⚡ Performance Optimized
Hardware Acceleration: Heavy animations use will-change and GPU layers for 60fps performance.
Asset Preloading: Smart preloading strategy for the image sequence to minimize jank.
🛠️ Tech Stack
Framework: Next.js (App Router)
Styling: Tailwind CSS (v4 Alpha)
Animation: Framer Motion
State Management: React Hooks (useState, useContext)
🚀 Getting Started
Clone the repository:

git clone https://github.com/your-username/pagani-experience.git
Install dependencies:

npm install
Run the development server:

npm run dev
Open the app: Navigate to http://localhost:3000 to view the experience.

📂 Project Structure
├── 📁 components       # UI Components (Configurator, EngineSection, etc.)
├── 📁 app              # Next.js App Router pages
├── 📁 public           # Static assets (images, fonts)
│   └── 📁 images       # Cinematic scroll sequence frames
└── 📁 data             # Static data for car specs and options
Built with ❤️ for speed and design.
