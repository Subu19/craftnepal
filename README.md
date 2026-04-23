# CraftNepal - Modern Minecraft Server Hub

A sleek, modern web platform for the CraftNepal Minecraft server, built with cutting-edge web technologies. Experience player statistics, leaderboards, guides, and community features in a beautifully animated interface.

## 🚀 Features

- **Player Statistics Dashboard** - Search and view detailed player stats
- **Global Leaderboards** - Compete across multiple categories (playtime, kills, level, blocks)
- **Server Guides** - Comprehensive searchable documentation
- **Community Feed** - Share moments with the community
- **Real-time Updates** - Powered by React Query with automatic caching
- **Smooth Animations** - Framer Motion animations throughout
- **Fully Responsive** - Mobile-first design that works on all devices
- **Dark Theme** - Minecraft-inspired dark aesthetic with teal and purple gradients

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with latest features |
| **Vite** | Lightning-fast build tool and dev server |
| **TypeScript** | Type-safe code development |
| **Tailwind CSS** | Utility-first styling framework |
| **Framer Motion** | Advanced animations |
| **React Query** | Server state management |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |

## 📦 Quick Start

### Prerequisites
- Node.js 16+ and npm/bun

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update VITE_API_URL in .env to your backend
```

### Development

```bash
# Start dev server (hot reload enabled)
npm run dev
```

Visit `http://localhost:5174` in your browser.

### Build for Production

```bash
# Build and type-check
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── app/                 # Application shell & layouts
├── shared/              # Shared utilities, types, API config
├── features/            # Feature modules (players, leaderboard, guides, feed)
├── pages/               # Page components
└── main.tsx            # Entry point
```

See [MIGRATION.md](./MIGRATION.md) for detailed architecture documentation.

## 🎨 Theming

Customize the theme in `tailwind.config.ts`:

```typescript
colors: {
  primary: '#1f3e47',    // Teal
  secondary: '#090515',  // Dark Purple
  accent: '#eb5569',     // Red
}
```

## 🔌 API Integration

Update the API endpoint in `.env`:

```env
VITE_API_URL=https://your-api.com/api
```

The app expects API endpoints like:
- `GET /players/:username` - Player stats
- `GET /leaderboards/:type` - Leaderboards
- `GET /guides` - Server guides
- `GET /posts` - Feed posts

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages

```bash
npm run build
# Deploy the dist/ folder
```

### Traditional Hosting

```bash
npm run build
# Upload dist/ folder to your hosting
```

## 📝 Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run TypeScript & ESLint checks
```

## 🎯 Key Pages

| Page | Route | Features |
|------|-------|----------|
| Home | `/` | Hero, features, top players |
| Leaderboard | `/leaderboard` | Multi-tab rankings |
| Guides | `/guides` | Search, filter, categories |
| Stats | `/stats` | Player search & detailed stats |
| Feed | `/feed` | Posts, likes, comments |

## 💡 Usage Examples

### Using API Hooks

```tsx
import { usePlayer } from '@/features/players/hooks/usePlayer';

function PlayerCard({ username }) {
  const { data: player, isLoading } = usePlayer(username);
  
  if (isLoading) return <Skeleton />;
  
  return <Card>{player.username}</Card>;
}
```

### Creating Animations

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 🐛 Troubleshooting

### Port Already in Use
Vite automatically uses the next available port. Check terminal output.

### API Connection Issues
- Verify `VITE_API_URL` in `.env`
- Ensure backend is running
- Check browser console for CORS errors

### Build Errors
```bash
npm run lint    # Check for TypeScript errors
npm run build   # Full build test
```

## 📖 Documentation

- [Migration Guide](./MIGRATION.md) - Detailed architecture & setup
- [Tailwind Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [React Query Docs](https://tanstack.com/query)
- [Vite Docs](https://vitejs.dev)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

CraftNepal © 2024. All rights reserved.

## 🎮 Join Us

Experience the CraftNepal Minecraft server and join our community of 2000+ active players!

- **Server IP**: play.craftnepal.com
- **Discord**: [discord.gg/craftnepal](https://discord.gg/craftnepal)
- **Website**: [craftnepal.com](https://craftnepal.com)

---

**Built with ❤️ for the CraftNepal Community**
