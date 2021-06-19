import { ProfileCard } from "./components/ProfileCard";

export const ColumnForResult = () => {
  return (
    <div className="column is-7">
      <div className="column">
        <div className="content is-medium">
          <h3 className="title is-3">Profile</h3>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};
