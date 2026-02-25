import TracartHomepage from "./components/TracartHomepage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
function Home() {
  const { user, loading, logout } = useAuth();
  if (loading) return <p>Loading...</p>;

  return <div>{user ? <TracartHomepage /> : <AuthForm />}</div>;
}
const App = () => (
  <AuthProvider>
    <Home />
    {/* additional things to be added */}
  </AuthProvider>
);

export default App;
