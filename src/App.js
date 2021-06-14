import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {

    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
                setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            })
          })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route path = '/shop' component = {ShopPage}/>
          <Route exact path = '/signin' render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}/>
        </Switch>
      </div>
    );
  } 
  }
  
  const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
  });

  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });

export default connect(mapStateToProps, mapDispatchToProps)(App)

/*
Redux's store has a function call dispatch which allow you generate an action and start redux flow. If you do

store.dispatch({
    type:'action_name',
    payload:''
})
 
An action will be create and a flow will start.
connect  means you want this component to subscribe to event which happen when state changed in store. In other word, it means whenever state get changed in store your component will notified and get rendered.
connect  take four arguments and they are all optionals, that means you can just write connect()(App) without any issue. In this course they focus on first and second arguments. Both are mapStateToProps and mapDispatchToProps. Because it is arguments so you can named whatever name you want.
mapStateToProps : is a function which take state as an argument, this function need to return an object.
mapDispatchToProps: is a function which take dispatch as an argument, this function need to return either an object or a function
After you connect a component you can give first argument mapStateToProps to tell redux this component need to merge some properties which correspond/map to particular state which is in store. Same thing goes to mapDispatchToProps to tell redux this component need to merge some properties which correspond/map to particular action which in your actions.js . You basically give redux a defined plan/map which it's form looks like this
mapStateToProps
const mapStateToProps = state => ({
     PropertyA: state.user.currentUser,
     PropertyB: state.user.profile
});
PropertyA, PropertyB is the name whatever you want and they will appear/merged in props of the component. state is given by redux.
Here you tell redux that hey I have a plan/map for you and it is mapStateToProps, content of this plan/map is like this PropertyA is mapped to state.user.currentUser. PropertyB is mapped to state.user.profile. PropertyA, PropertyB need to be merged to props of this component.
mapDispatchToProps
const mapDispatchToProps = dispatch => ({
     PropertyA: user => dispatch(setCurrentUser(user))
});
PropertyA is the name whatever you want and they will appear in props of the component. dispatch is given by redux. If you give function to dispatch then dispatch will call the given function.
Here you tell redux that hey I have plan/map for you and it is mapDispatchToProps, content of this plan/map is like this PropertyA is a function take user as an argument and it will return a dispatch function. PropertyA need to be merged to props of this component.
Because you create an action in actions.js which return an object with type and payload, so you can just call that action right here in dispatch function. Here they are the same
//Example 1
const mapDispatchToProps = dispatch => ({
     PropertyA: user => dispatch(setCurrentUser(user))
});
 
//Example 2
const mapDispatchToProps = dispatch => ({
     PropertyA: user => dispatch({
         type:'SET_CURRENT_USER',
         payload:user
     })
});
Example1 is identical to Example2
Overall, whenever you do dispatch an action will be generated and redux flow will start.
If you want a component to listen/subscribe to state changed in store you use connect
If you want to merge state or action into your component's props then you either give first or second argument in connect  Both arguments are mapStateToProps and mapDispatchToProps
A side note. If you pass store as props down to react component then you can use store.getState() to retrieve state in store and use store.dispatch() to generate an action and start redux flow. mapStateToProps and mapDispatchToProps is just a way to avoid store to be passed as props down to react component.
*/