import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks';

function PrivateRoute() {
  const auth = useAuth();

  // console.log('Private Route auth:', auth);
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}

const Elementfourofour = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/register" element={<Signup />} />

          <Route exact path="/settings" element={<PrivateRoute />}>
            <Route exact path="/settings" element={<Settings />}></Route>
          </Route>

          <Route exact path="/user/:userId" element={<PrivateRoute/>}>
            <Route exact path="/user/:userId" element={<UserProfile />}></Route>
          </Route>

          <Route exact path="*" element={<Elementfourofour />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
