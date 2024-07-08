import { Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <nav>
        <h1>Projects</h1>
        <input type="text" placeholder="Search Projects" />

        <section>
          <form>
            <input type="text" placeholder="Create Project" />
            <button type="submit">Create</button>
          </form>
        </section>

        <section>
          <h2>My Projects</h2>
          <ul>
            <li>Project 1</li>
            <li>Project 2</li>
            <li>Project 3</li>
          </ul>
        </section>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SideBar;
