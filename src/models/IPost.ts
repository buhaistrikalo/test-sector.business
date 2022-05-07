export interface IPost {
    id: number;
    title: string;
    body: string;
    [index: string]: string | number;
}