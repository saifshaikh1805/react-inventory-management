import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { dispatchAction } from '../../redux/all';
import { movementActions } from '../../redux/movementsLocations';

class Locations extends React.Component {

    handleEditBtnClick = (l) => {
        dispatchAction(movementActions.SET_UNSAVED_LOC, { id:l.id, name:l.name, saving: false, mode:'edit' });
        this.props.history.push('/locations/add');
    }
 
    render() {
        const items = this.props.movementsLocations.locations;
        return (
            <Grid stackable>
                {
                    items.length > 0 ?
                        <Grid.Row centered>
                            <Grid.Column computer={8} tablet={12} mobile={16}>
                                <Segment raised>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width='8'>
                                                <Header as='h2'>All Locations</Header>
                                            </Grid.Column>
                                            <Grid.Column width='8'>
                                            <Link to='/locations/add'>
                                                    <Button icon labelPosition='left' primary floated='right' size='tiny'>
                                                        <Icon name='file text' />
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
                                                {/* <Table.HeaderCell></Table.HeaderCell> */}
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
                                                            <Button icon primary size='tiny' fluid onClick={() => {this.handleEditBtnClick(i)}}>Edit</Button>
                                                            </Table.Cell>
                                                            {/* <Table.Cell>
                                                                <Button icon primary size='tiny' fluid onClick={() => { this.handleBtnClick(i, 'movement') }}>Add movement</Button>
                                                            </Table.Cell> */}
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
        movementsLocations: state.movementsLocations
    }
}

export default connect(mapStateToProps)(Locations);