import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './shared/configureStore'

import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import Home                     from './components/home/Home'
import TextsRetriever           from './components/text/text'
import About                    from './components/about/about'
import Search                   from './components/search/search'
import Grammar                   from './components/grammar/grammar'
import StoryContainer           from './components/story/story'
// import { Dictionary }               from './components/dictionary/dictionary'
import { Linker }                   from './components/linker/linker'

import { Navbar }                   from './components/navbar/navbar'
import { Footer }                   from './components/footer/footer'
import { NotFound }                 from './components/not-found/not-found'
import { Dashboard }                from './components/update/update'

const store = configureStore()

export default class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <HashRouter>
          <nameforyourprojectbackend />
        </HashRouter>
      </Provider>
    )
  }
}

const nameforyourprojectbackend = () => (
  <div>
    <Navbar />
    <Main />
    <Footer />
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/'                     component={Home} />
      <Route path='/about'                      component={About} />
      <Route exact path='/text'                 component={TextsRetriever} />
      <Route exact path='/text/:id'             component={StoryContainer} />
      <Route path='/text/:id/citation/:clipID'  component={StoryContainer} />
      <Route path='/search'                     component={Search} />
      <Route path='/grammar'                    component={Grammar} />
      <Route path='/linker'                     component={Linker} />
      <Route path='/dashboard'                  component={Dashboard} />
      {/* <Route path='/documentation'          component={Documentation} /> */}
      {/* <Route path='/dictionary'             component={Dictionary} /> */}
      <Route                                    component={NotFound} />
    </Switch>
  </main>
)
