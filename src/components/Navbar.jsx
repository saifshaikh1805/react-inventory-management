import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { dispatchAction } from '../redux/all';
import { rootActions } from '../redux/root';

class Navbar extends React.Component {

    handleItemClick = (event, data) => {
        dispatchAction(rootActions.SET_ACTIVE_VIEW, data.name);
        this.props.history.push('/' + data.name);
    }

    render() {
        let root = this.props.root;
        return (
            <Menu fixed='top' color='blue' inverted>
                <Menu.Item
                    name='products'
                    active={root.activeView === 'products'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='boxes' />
                     Products
                </Menu.Item>
                <Menu.Item
                    name='locations'
                    active={root.activeView === 'locations'}
                    onClick={this.handleItemClick}
                ><Icon name='map outline' />
                Locations
           </Menu.Item>
                <Menu.Item
                    name='movements'
                    active={root.activeView === 'movements'}
                    onClick={this.handleItemClick}
                ><Icon name='location arrow' />
                Movements
           </Menu.Item>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        root: state.root
    }
}

export default connect(mapStateToProps)(withRouter(Navbar));