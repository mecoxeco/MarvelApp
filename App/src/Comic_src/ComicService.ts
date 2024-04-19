import { Comic } from './ComicSchema';

export class ComicService {
    async createComic(comicData: ComicDTO): Promise<Comic> {
        // Create <comic> na API
    }

    async getComicById(id: string): Promise<Comic | null> {
        // GetByID <comic> na API
    }

    async updateComic(id: string, comicData: Partial<ComicTypes>): Promise<Comic | null> {
        // Update <comic> na API   
    }

    async deleteComic(id: string,): Promise <boolean> {
        // Delete <comic> na API
    }
}      