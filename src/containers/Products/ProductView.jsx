import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';
import { getMovements } from '../../myFunctions';

class ProductView extends React.Component {
    getQtyData = async () => {
        await getMovements();
    }

    componentDidMount() {
        this.getQtyData();
    }

    render() {
        const prodInView = this.props.products.selectedProd;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width='5'>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <Header as='h2'>{prodInView.id + ' - ' + prodInView.name}</Header>
                                    </Grid.Column>
                                    <Grid.Column width='8'>
                                        <Link to='/movements/add'>
                                            <Button icon labelPosition='left' primary floated='right'>
                                                <Icon name='plus' />
                                                Add movement
                                            </Button>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            {
                                prodInView.qty ?
                                    prodInView.qty.total > 0 ?
                                        <Table striped unstackable>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Warehouse</Table.HeaderCell>
                                                    <Table.HeaderCell>Qty</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {
                                                    prodInView.qty.sort((a, b) => b.qty - a.qty).map(i => {
                                                        if (i.qty > 0)
                                                            {
                                                                return (
                                                                    <Table.Row key={i.locId}>
                                                                        <Table.Cell>{i.locId + ' - ' + i.locName}</Table.Cell>
                                                                        <Table.Cell>{i.qty}</Table.Cell>
                                                                    </Table.Row>
                                                                )
                                                            }
                                                            else
                                                            return ('')
                                                    })
                                                }
                                            </Table.Body>
                                        </Table> : <Message negative>Out of stock.</Message>
                                    : ''
                            }
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

export default connect(mapStateToProps)(ProductView);