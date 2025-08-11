import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/addcars">ie para outra pagina</Link>
    </div>
  );
}
