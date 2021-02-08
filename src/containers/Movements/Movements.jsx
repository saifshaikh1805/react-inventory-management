import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { getAllMovements } from '../../myFunctions';
import { dispatchAction } from '../../redux/all';
import { movementActions } from '../../redux/movementsLocations';
import { prodActions } from '../../redux/products';

class Movements extends React.Component {

    componentDidMount() {
        getAllMovements();
    }

    handeEditBtnClick = (m) => {
        dispatchAction(prodActions.SET_SELECTED, { id: m.prod_id, name: this.props.products.items.find(x => x.id === m.prod_id).name });
        dispatchAction(movementActions.SET_FROM_LOC, m.from_loc);
        dispatchAction(movementActions.SET_TO_LOC, m.to_loc);
        dispatchAction(movementActions.SET_INPUT_QTY, m.qty);
        dispatchAction(movementActions.SET_MOVEMENTS_MODE, 'edit');
        dispatchAction(movementActions.SET_MOVEMENT_ID, m.id);
        this.props.history.push('/movements/add');
    }

    render() {
        let allMovements = this.props.movementsLocations.movements;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column computer={8} tablet={12} mobile={16}>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <Header as='h2'>Movements</Header>
                                    </Grid.Column>
                                    <Grid.Column width='8'>
                                        <Link to='/movements/add'>
                                            <Button icon labelPosition='left' primary floated='right' size='tiny'>
                                                <Icon name='plus' />
                                                Add new
                                            </Button>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Table striped unstackable celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Id</Table.HeaderCell>
                                        <Table.HeaderCell>Product</Table.HeaderCell>
                                        <Table.HeaderCell>From</Table.HeaderCell>
                                        <Table.HeaderCell>To</Table.HeaderCell>
                                        <Table.HeaderCell>Qty</Table.HeaderCell>
                                        <Table.HeaderCell>Last modified</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        allMovements.sort((a, b) => b.ts - a.ts).map(i => {
                                            return (
                                                <Table.Row key={i.id}>
                                                    <Table.Cell>{i.id}</Table.Cell>
                                                    <Table.Cell>{i.prod_id}</Table.Cell>
                                                    <Table.Cell>{i.from_loc === '' ? '---' : i.from_loc}</Table.Cell>
                                                    <Table.Cell>{i.to_loc === '' ? '---' : i.to_loc}</Table.Cell>
                                                    <Table.Cell>{i.qty}</Table.Cell>
                                                    <Table.Cell>{i.ts.toDate().toLocaleDateString() + ' ' + i.ts.toDate().toTimeString().split(' ')[0]}</Table.Cell>
                                                    <Table.Cell>
                                                        <Button primary size='tiny' onClick={() => this.handeEditBtnClick(i)}>Edit</Button>
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
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movementsLocations: state.movementsLocations,
        products: state.products
    }
}

export default connect(mapStateToProps)(Movements);