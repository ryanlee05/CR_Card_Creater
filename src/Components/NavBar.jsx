import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul className = "fixed flex flex-col justify-center gap-y-50 h-full w-[12vw] bg-black/80">
        <li>
          {/* Use the 'to' prop instead of 'href' */}
          <Link className = "text-white ml-8 text-2xl" to="/">Home</Link>
        </li>
        <li>
          <Link className = "text-white ml-8 text-2xl" to="/customize">Customize</Link>
        </li>
        <li>
          <Link className = "text-white ml-8 text-2xl" to="/view">View Cards</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;