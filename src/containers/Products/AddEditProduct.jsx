import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Input, Segment } from 'semantic-ui-react';
import fire from '../../firebaseConfig';
import { dispatchAction } from '../../redux/all';
import { prodActions } from '../../redux/products';

class AddEditProduct extends React.Component {
    handleInputChange = (event, data, inp) => {
        let unsaved = this.props.products.unsaved;
        if (inp === 'id')
            unsaved.id = data.value;
        if (inp === 'name')
            unsaved.name = data.value;
        dispatchAction(prodActions.SET_UNSAVED, unsaved);
    }

    saveProduct = () => {
        let unsaved = this.props.products.unsaved;
        dispatchAction(prodActions.SET_UNSAVED, {...unsaved, saving: true});
        fire.firestore().collection('products').doc(unsaved.id).set({
            name: unsaved.name
        })
        .then(() => {
            dispatchAction(prodActions.SET_MSG, { heading: 'Product ' + (unsaved.mode === 'edit' ? 'updated!' : 'added!'), content: unsaved.id + ' - ' + unsaved.name + ' has been successfully ' + (unsaved.mode ==='edit' ? 'updated.' : 'added.') });
            this.props.history.push('/');
        })
    }

    componentWillUnmount() {
        dispatchAction(prodActions.SET_UNSAVED, { id:'', name:'', saving: false, mode:'add' });
    }

    render() {
        const unsaved = this.props.products.unsaved;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width='5'>
                        <Segment raised>
                            <Header as='h2'>{
                                unsaved.mode === 'edit' ? 'Update' : 'Add new'
                            } product</Header>
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
        products: state.products
    }
}

export default connect(mapStateToProps)(AddEditProduct);