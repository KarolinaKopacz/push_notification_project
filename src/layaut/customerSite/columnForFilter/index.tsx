export const ColumnForFilter = () => {
  return (
    <>
      <h1>Filtruj wyniki</h1>
      <p className="menu-label">Płeć</p>
      <ul className="menu-list">
        <li>
          <label className="checkbox">
            <input type="checkbox" name="sex_women"></input>
            <span> </span>
            kobieta
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="sex_man"></input>
            <span> </span>
            mężczyzna
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="sex_irrelevant"></input>
            <span> </span>
            bez znaczenia
          </label>
        </li>
      </ul>
      <p className="menu-label">Znajomość języka polskiego</p>
      <ul className="menu-list">
        <li>
          <label className="checkbox">
            <input type="checkbox" name="lang_non"></input>
            <span> </span>
            brak
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="lang_a1"></input>
            <span> </span>
            A1
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="lang_a2"></input>
            <span> </span>
            A2
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="lang_b1"></input>
            <span> </span>
            B1
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="lang_b2"></input>
            <span> </span>
            B2
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="lang_c1"></input>
            <span> </span>
            C1
          </label>
        </li>
      </ul>
      <p className="menu-label">Staż pracy</p>
      <ul className="menu-list">
        <li>
          <label className="checkbox">
            <input type="checkbox" name="seniority_0to2"></input>
            <span> </span>
            0-2 lat
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="seniority_3to5"></input>
            <span> </span>
            3-5 lat
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="seniority_6to10"></input>
            <span> </span>
            6-10 lat
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="seniority_10more"></input>
            <span> </span>
            powyżej 10 lat
          </label>
        </li>
      </ul>
      <p className="menu-label">Doświdczenie z </p>
      <ul className="menu-list">
        <li>
          <label className="checkbox">
            <input type="checkbox" name="experience_demenz"></input>
            <span> </span>
            demencja
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="experience_alzheimer"></input>
            <span> </span>
            alzheimer
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="experience_parkinson"></input>
            <span> </span>
            parkinson
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="experience_diabetes"></input>
            <span> </span>
            cukrzyca
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="experience_paralysis"></input>
            <span> </span>
            osoba sparaliżowana
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="experience_arthritis"></input>
            <span> </span>
            artretyzm
          </label>
        </li>
      </ul>
      <p className="menu-label">Atuty</p>
      <ul className="menu-list">
        <li>
          <label className="checkbox">
            <input type="checkbox" name="advantage_driving_license"></input>
            <span> </span>
            prawo jazdy
          </label>
        </li>
        <li>
          <label className="checkbox">
            <input type="checkbox" name="advantage_no_smoke"></input>
            <span> </span>
            osoba niepaląca
          </label>
        </li>
      </ul>
    </>
  );
};
