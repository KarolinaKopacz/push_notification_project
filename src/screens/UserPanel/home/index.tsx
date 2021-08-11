import { MenuList } from "../../../modals/menuList";

export const Home = (props: any) => {
  const { userName } = props;

  return (
    <>
      <MenuList
        firstOption="Home"
        secondOption="Dodaj przypomnienie"
        thirdOption="Lista przypomnień"
        userName={userName}
      />
    </>
  );
};
