import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Posts from "./components/Posts";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState({
    loading: false,
    posts: [],
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    const apiUrl = `http://127.0.0.1:8000/api/`;
    fetch(apiUrl)
      .then((data) => data.json())
      .then((posts) =>
        setState({
          posts,
          loading: false,
        })
      )
      .catch((err) => setState((prev) => ({ ...prev, loading: false })));
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Posts posts={state.posts} isLoading={state.loading} />
          )}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
