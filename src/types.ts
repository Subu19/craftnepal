export interface SeasonData {
    title: string;
    cover: string;
    photos: string[];
}

export interface User {
    id: string;
    username: string;
    avatar?: string;
    err?: string;
    isAdmin?: boolean;
}

export interface CommentData {
    username: string;
    comment: string;
    profilePic: string;
    discordId: string;
}

export interface LikeData {
    userId: string;
    username: string;
    profilePic: string;
}

export interface PostAuthor {
    id: string;
    username: string;
    profilePic: string;
}

export interface PostData {
    _id: string;
    id: number;
    caption: string;
    postImage: string;
    author: PostAuthor;
    likes: LikeData[];
    comments: CommentData[];
}

export interface WorldPlaytime {
    world: string;
    value: number;
}

export interface KillsData {
    player: number;
    deaths: number;
    mob: number;
}

export interface BlocksData {
    broken: number;
    placed: number;
}

export interface StatzData {
    playtime: WorldPlaytime[];
    totalPlaytime: number;
    kills: KillsData;
    blocks: BlocksData;
}

export interface StatzResponse { // Wrapper for statz response
    data: StatzData | null;
    err?: string;
}

export interface LeaderboardData {
    playerName: string;
    value: number;
}

export interface LeaderboardResponse {
    data: LeaderboardData[] | null;
    err?: string;
}
