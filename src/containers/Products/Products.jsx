import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';
import { dispatchAction } from '../../redux/all';
import { movementActions } from '../../redux/movementsLocations';
import { prodActions } from '../../redux/products';

class Products extends React.Component {

    componentDidMount() {
        /*    fire.firestore().collection('products').get()
               .then(res => {
                   this.setProds(res);
               }) */
        dispatchAction(prodActions.RESET_SELECTED, '');
        dispatchAction(movementActions.SET_MOVEMENTS, []);
    }

    handleDismiss = () => {
        dispatchAction(prodActions.SET_MSG, false);
    }

    handleBtnClick = (prod, target) => {
        switch (target) {
            case 'edit':
                let unsaved = this.props.products.unsaved;
                dispatchAction(prodActions.SET_UNSAVED, { ...unsaved, ...prod, mode: 'edit' });
                this.props.history.push('/products/add-edit');
                break;
            case 'view':
                dispatchAction(prodActions.SET_SELECTED, { ...prod });
                this.props.history.push('/products/view');
                break;
            case 'movement':
                dispatchAction(prodActions.SET_SELECTED, { ...prod });
                this.props.history.push('/movements/add');
                break;
                default: 
                console.log('default case');
        }
    }

    componentWillUnmount() {
        dispatchAction(prodActions.SET_MSG, false);
    }

    render() {
        const items = this.props.products.items;
        return (
            <Grid stackable>
                {
                    items.length > 0 ?
                        <Grid.Row centered>
                            <Grid.Column computer={8} tablet={12} mobile={16}>
                                {
                                    this.props.products.msg ?
                                        <Message positive attached
                                            onDismiss={this.handleDismiss}
                                            header={this.props.products.msg.heading}
                                            content={this.props.products.msg.content}
                                        />
                                        :
                                        ''
                                }
                                <Segment raised attached={this.props.products.msg ? 'bottom' : false}>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width='8'>
                                                <Header as='h2'>All Products</Header>
                                            </Grid.Column>
                                            <Grid.Column width='8'>
                                            <Link to='/products/full-report'>
                                                    <Button icon labelPosition='left' primary floated='right' size='tiny'>
                                                        <Icon name='file text' />
                                                View full report
                                            </Button>
                                                </Link>
                                                <Link to='/products/add-edit'>
                                                    <Button icon labelPosition='left' primary floated='right' size='tiny'>
                                                        <Icon name='plus' />
                                                Add new
                                            </Button>
                                                </Link>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <Table striped selectable unstackable>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Id</Table.HeaderCell>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                                {/* <Table.HeaderCell></Table.HeaderCell> */}
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                items.map(i => {
                                                    return (
                                                        <Table.Row key={i.id}>
                                                            <Table.Cell>{i.id}</Table.Cell>
                                                            <Table.Cell>{i.name}</Table.Cell>
                                                            <Table.Cell>
                                                                <Button icon primary size='tiny' fluid onClick={() => { this.handleBtnClick(i, 'view') }}>View balance</Button>
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Button icon primary size='tiny' fluid onClick={() => { this.handleBtnClick(i, 'edit') }}>Edit product</Button>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    )
                                                })
                                            }
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        : ''
                }
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Products);