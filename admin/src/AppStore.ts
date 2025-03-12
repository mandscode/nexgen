
export type AppStore = {
    
    isAuthenticated: boolean;
    isLoading?:boolean;

    setAuthenticated: (isAuthenticated: boolean) => void;

}