import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';


const Products = () => {
    return (
      <div>
          <BrowserRouter>
                <Switch>
                <Route exact path="/admin/products">
                        <List />
                    </Route>
                    <Route path="/admin/products/:productId" >
                        <Form />
                    </Route>
                </Switch>
          </BrowserRouter>
      </div>
    );
}

export default Products;