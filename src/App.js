import React from 'react';
import './main.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*
  Components
*/
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';

/*
  Views
*/
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Items from './views/Items';
import NewItem from './views/NewItem';
import Boxes from './views/Boxes';
import Sales from './views/Sales';
import NotFound from './views/NotFound';
import EditItem from './views/EditItem';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <SideBar />
        <section className="content__container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/items" component={Items} />
            <Route exact path="/new-item" component={NewItem} />
            <Route exact path="/items/:id" component={EditItem} />
            <Route exact path="/boxes" component={Boxes} />
            <Route exact path="/sales" component={Sales} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/" component={NotFound} />
          </Switch>
        </section>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
