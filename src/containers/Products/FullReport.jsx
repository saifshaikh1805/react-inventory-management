import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { expexcel, getAllMovements } from '../../myFunctions';
import { dispatchAction } from '../../redux/all';
import { movementActions } from '../../redux/movementsLocations';
import { prodActions } from '../../redux/products';

class FullReport extends React.Component {

    componentDidMount() {
        getAllMovements();
    }

    handleMoveBtnClick = (id, fromLoc) => {
        dispatchAction(prodActions.SET_SELECTED, { id });
        dispatchAction(movementActions.SET_FROM_LOC,fromLoc);
        this.props.history.push('/movements/add');
    }

    handleExcelBtnClick = () => {
        expexcel('tbl-report');
    }

    render() {
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width='7'>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <Header as='h2'>Stock report (All products)</Header>
                                    </Grid.Column>
                                    <Grid.Column width='8'>
                                        <Button icon labelPosition='left' primary floated='right' size='tiny' onClick={this.handleExcelBtnClick}>
                                            <Icon name='file excel' />
                                                Export to excel
                                            </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Table striped unstackable celled className='tbl-report'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Product</Table.HeaderCell>
                                        <Table.HeaderCell>Warehouse</Table.HeaderCell>
                                        <Table.HeaderCell>Qty</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        this.props.products.organizedMaster.filter(x => x.qty > 0).map((i, ind) => {
                                            return (
                                                <Table.Row key={ind}>
                                                    <Table.Cell>{i.prodId}</Table.Cell>
                                                    <Table.Cell>{i.locId}</Table.Cell>
                                                    <Table.Cell>{i.qty}</Table.Cell>
                                                    <Table.Cell>
                                                        <Button size='tiny' fluid icon labelPosition='left' primary floated='right' onClick={() => {this.handleMoveBtnClick(i.prodId, i.locId)}}>
                                                            <Icon name='plus' />
                                                            Move to another location
                                                        </Button>
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
        products: state.products
    }
}

export default connect(mapStateToProps)(FullReport);