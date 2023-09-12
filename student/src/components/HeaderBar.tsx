import { Header, Avatar, Group, Text } from "@mantine/core";
import Logo from "../assets/images/logo.svg";
import DefaultAvatar from "../assets/images/avatar.jpg";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

type Props = {
  onLogoClick: () => void;
};

const HeaderBar = (props: Props) => {
  const query = useSelector((state: any) => state.query.value);
  return (
    <Header height={80} className="flex items-center justify-between px-40">
      <div className="flex items-center">
        <img
          src={Logo}
          alt="logo"
          width={100}
          className="cursor-pointer"
          onClick={props.onLogoClick}
        />
      </div>
      <div className="flex-1 flex justify-center mb-4">
        <SearchBar initialQuery={query} />
      </div>
      <Group className="flex items-center">
        <Avatar src={DefaultAvatar} radius="xl" alt="it's me" />
        <Text color="dimmed" size="sm">
          John Doe
        </Text>
      </Group>
    </Header>
  );
};

export default HeaderBar;
