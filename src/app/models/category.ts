export interface PrimeCategory<Category> {
    trivia_categories: Category;
}
export interface Category {
    id: number;
    name: string;
}
export interface CreateQuizForm {
    id: number;
    difficultyLevel: string;
}
export interface DifficultyLevel {
    name: string;
    difficultyName: string;
}