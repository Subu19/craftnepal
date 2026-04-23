// Player/User Types
export interface PlayerOverview {
  playTime: number;
  mobKills: number;
  deaths: number;
  totalBlocksMined: number;
  totalMobsKilled: number;
  distanceWalked: number;
  distanceFlown: number;
  jumps: number;
  damageDealt: number;
  timesLoggedOut: number;
}

export interface PlayerStats {
  custom?: Record<string, number>;
  mined?: Record<string, number>;
  used?: Record<string, number>;
  picked_up?: Record<string, number>;
  dropped?: Record<string, number>;
  killed?: Record<string, number>;
  killed_by?: Record<string, number>;
  crafted?: Record<string, number>;
  broken?: Record<string, number>;
}

export interface Player {
  id?: string; // Legacy field
  uuid: string;
  name: string;
  username?: string; // For backward compatibility with some UI elements
  overview?: PlayerOverview;
  stats?: PlayerStats;
  level?: number;
  rank?: string;
  playtime?: number;
  lastSeen?: string;
  profilePic?: string; // Legacy field for Discord avatar
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  player: Player;
  value: number;
}

export interface Leaderboard {
  type: 'playtime' | 'kills' | 'level' | 'blocks_broken';
  entries: LeaderboardEntry[];
  updatedAt: string;
}

// Feed/Post Types
export interface Post {
  id?: string;
  _id?: string; // MongoDB ID
  author: Player;
  content?: string;
  caption?: string; // Legacy field name
  image?: string;
  postImage?: string; // Legacy field name
  likes?: number | Array<any>; // Can be number or array of likes
  comments?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  id: string;
  _id?: string;
  author?: Player;
  content?: string;
  comment?: string; // Sample uses "comment" for the text
  username?: string;
  profilePic?: string;
  discordId?: string;
  likes?: number | any[];
  createdAt?: string;
  replies?: Comment[];
  isReply?: boolean;
}

// Guide Types
export interface GuideItem {
  title: string;
  text: string;
  image?: string;
  content?: string;
}

export interface GuideSection {
  _id?: string;
  id: string;
  header: string;
  data: GuideItem[];
  image?: string | null;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  image?: string;
  author?: Player;
  updatedAt: string;
}

export interface Command {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  category: string;
}

export interface GuidesData {
  Rules: GuideSection;
  Commands: GuideSection;
  Ranks: GuideSection;
  Market: GuideSection;
  FAQ: GuideSection;
  Others: GuideSection;
}

// Server Event Types
export interface ServerEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Gallery Types
export interface GalleryPhoto {
  url: string;
  key: string;
  name?: string;
  size?: number;
  uploadedAt?: string;
}

export interface SeasonGallery {
  title: string;
  cover: string;
  photos: GalleryPhoto[];
  s3Prefix: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
