import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Input, Segment } from 'semantic-ui-react';
import fire from '../../firebaseConfig';
import { dispatchAction } from '../../redux/all';
import { movementActions } from '../../redux/movementsLocations';

class AddEditLocation extends React.Component {

    handleInputChange = (event, data, inp) => {
        let unsaved = this.props.movementsLocations.unsavedLoc;
        if (inp === 'id')
            unsaved.id = data.value;
        if (inp === 'name')
            unsaved.name = data.value;
        dispatchAction(movementActions.SET_UNSAVED_LOC, unsaved);
    }

    saveProduct = () => {
        let unsaved = this.props.movementsLocations.unsavedLoc;
        dispatchAction(movementActions.SET_UNSAVED_LOC, {...unsaved, saving: true});
        fire.firestore().collection('locations').doc(unsaved.id).set({
            name: unsaved.name
        })
        .then(() => {
            this.props.history.push('/locations');
        })
    }

    componentWillUnmount() {
        dispatchAction(movementActions.SET_UNSAVED_LOC, { id:'', name:'', saving: false, mode:'add' });
    }

    render() {
        const unsaved = this.props.movementsLocations.unsavedLoc;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width='5'>
                        <Segment raised>
                            <Header as='h2'>{
                                unsaved.mode === 'edit' ? 'Update' : 'Add new'
                            } location</Header>
                            <Form>
                                <Form.Field>
                                    <label>Id</label>
                                    {
                                        unsaved.mode === 'edit' ?
                                        <div>{unsaved.id}</div>
                                        :
                                        <Input type='text' value={unsaved.id} onChange={(e,d) => { this.handleInputChange(e,d,'id') }}></Input>
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label>Name</label>
                                    <Input type='text' value={unsaved.name} onChange={(e,d) => { this.handleInputChange(e,d,'name') }}></Input>
                                </Form.Field>
                                <Button fluid primary type='submit' loading={unsaved.saving} onClick={this.saveProduct} disabled={unsaved.id.length < 1 || unsaved.name.length < 1}>Save</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movementsLocations: state.movementsLocations
    }
}

export default connect(mapStateToProps)(AddEditLocation);