export interface User {
  id: number;
  name: string;
}

export const IsUser = (user: any): user is User => {
  return (user as User).id !== undefined && (user as User).name !== undefined;
};
