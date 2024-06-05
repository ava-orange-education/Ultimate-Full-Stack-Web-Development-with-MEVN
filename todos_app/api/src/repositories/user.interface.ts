export interface IUserRepository<T> {
    
    getByEmailAndPassword(email: string, password: string): Promise<T | null>;
    
    create(item: T): Promise<T>;
    
}