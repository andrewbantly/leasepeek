interface CurrentUser {
    username: string;
    userId: number;
}

export type CurrentUserType = CurrentUser | null;

export type UserProps = {
    currentUser: CurrentUserType;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>;
  };