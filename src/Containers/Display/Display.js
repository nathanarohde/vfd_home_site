import React, { Component } from 'react'
import axios from 'axios'
import './Display.css'
import TitleBox from '../../Components/TitleBox/TitleBox'
import Cartoon from '../../Components/Cartoon/Cartoon'
import Button from '../../Components/Button/Button'
import { Link } from 'react-router-dom';
// import CartoonTotal from '../../Cartoons/Cartoons.json'
// const LazyCartoon = React.lazy(() => import('../../Components/Cartoon/Cartoon'))
// import asyncComponent from '../../hoc/asyncComponent'
// const AsyncImage = asyncComponent(() => {
//   return import('../../Components/Image/Image')
// })


class Display extends Component {
  state = {
    displayedCartoon: 0,
    lastCartoon: 0,
    firstMount: true,
    cartoonData: ''
  }

  componentDidMount() {
    if (this.state.firstMount === true ){
      axios.get('https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/Cartoons.json')
            .then( response => {
              this.setState({ firstMount: false });
              this.setState({ lastCartoon: response.data.lastCartoon }, () => this.setDisplayedCartoon());
            })
            .catch( error => {
              console.log( error )
            })
            .finally( this.asyncGetCartoonData );
    }
  }

  setDisplayedCartoon = ( ) => {
    // if currentPage is less than last cartoon display currentPage
    if ( this.state.lastCartoon > this.props.currentPage ) {
      this.setState({ displayedCartoon: this.props.currentPage });
      // console.log(this.props.history);
    // else display the last cartoon
    } else {
      this.setState({ displayedCartoon: this.state.lastCartoon });
      // console.log(this.props.history);
    }
  }

  asyncGetCartoonData = ( ) => {
    let url = 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/' + this.state.displayedCartoon + '/cartoon.json';
    axios.get(url)
          .then( response => {
            this.setState({ cartoonData: response.data })
          })
          .catch( error => {
            console.log( error )
          });
  }

  perviousCartoon = () => {
    this.setState({ displayedCartoon: this.state.displayedCartoon - 1 }, () => { this.asyncGetCartoonData() } );
    // <Route path="/:id" exact component={Cartoon} />
  }

  nextCartoon = () => {
    this.setState({ displayedCartoon: this.state.displayedCartoon + 1 }, () => { this.asyncGetCartoonData()
                                                                                  // <Link to={`/${this.state.displayedCartoon}`}/>
                                                                               } );
    // <Route path="/:id" exact component={Cartoon} />
  }

  render () {
    // console.log(props);
    // let cartoon = `../../Cartoons/${this.state.cartoons}/Panels/1.png`
      // cartoons = this.state.cartoons.map(cartoon => {
      //   return (
      //     // <AsyncImage key={cartoon} source={cartoon} />
      //   )
      // });

                      // { cartoons }
      // {
      //   this.state.mounted && (
      //     <Suspense fallback={<div>...Loading</div>}>
      //       <LazyCartoon source={ cartoon }>
      //       </LazyCartoon>
      //     </Suspense>
      //   )
      // }
    return (
      <div className="displayField">
        { this.state.displayedCartoon !== 0 &&
          <div>
            <TitleBox title={ this.state.cartoonData.title } date={ this.state.cartoonData.date }/>
            <Cartoon source={ this.state.displayedCartoon }/>
          </div>
        }
        { this.state.displayedCartoon > 1 &&
          <Button disabled={ this.state.displayedCartoon < 1 }
                  clicked={ this.perviousCartoon }>
            <Link to={`/${this.state.displayedCartoon - 1 }`}>
              Previous
            </Link>
          </Button>
        }
        { this.state.displayedCartoon < this.state.lastCartoon  &&
          <Button clicked={ this.nextCartoon }>
            <Link to={`/${this.state.displayedCartoon + 1 }`}>
              Next
            </Link>
          </Button>
        }
      </div>
    )
  }
}

export default Display;
