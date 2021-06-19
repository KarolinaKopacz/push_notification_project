import { ColumnForFilter } from "./columnForFilter";
import { ColumnForResult } from "./columnForResult/ColumnForResult";
import "../../style.css";

export const CustomerSite = () => {
  return (
    <>
      <div className="left-side">
        <ColumnForFilter />
      </div>
      <div className="right-side">
        <ColumnForResult />
      </div>
    </>
  );
};
