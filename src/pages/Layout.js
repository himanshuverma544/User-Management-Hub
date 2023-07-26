import { Outlet, NavLink } from "react-router-dom";

import { Container } from "reactstrap";

const Layout = () => {
  return (
    <>
      <Container className="header-cont" fluid>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/selected-users">Selected Users</NavLink>
              </li>
            </ul>
          </nav>
        </header>
      </Container>

      <Container className="main-cont" fluid>
        <main>
          <Outlet />
        </main>
      </Container>

      <Container className="footer-cont" fluid>
        <footer></footer>
      </Container>
    </>
  );
};

export default Layout;
