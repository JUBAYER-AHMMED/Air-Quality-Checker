const NavBar = () => {
  return (
    <div className="container">
      <header className="py-3">
        <ul className="nav nav-pills navContainer">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              History
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default NavBar;
