export interface Movie {
    name: string;
    description: string;
    casts: string[];
    trailerUrl: string;
    language: string;
    director: string;
    releaseDate: string;
    releaseStatus: string;
    createdAt?: Date;
    updatedAt?: Date;
}