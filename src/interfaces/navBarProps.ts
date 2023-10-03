import { CurrentUserType } from "./currentUser"

export interface NavBarProps {
  currentUser: CurrentUserType;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>;
  handleLogout: () => void;
}
